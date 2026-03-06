#!/usr/bin/env node
/**
 * Rename Docusaurus docs files from snake_case to kebab-case (only non-API docs),
 * and update references across markdown, sidebars.js, and redirects.conf.
 *
 * Key fixes vs the draft:
 * - Mapping is by doc-relative path (e.g. "guides/auto_scheduling.md"), not by basename,
 *   so "guides/auto_scheduling.md" won't affect "api/config/auto_scheduling.md".
 * - Nothing under any "/api/" path segment is renamed or rewritten.
 * - Updates Docusaurus ids in sidebars (no extension) and URL targets in redirects.conf.
 */

const fs = require("fs");
const path = require("path");

const repoRoot = process.cwd();

const TEXT_EXTENSIONS = new Set([
  ".md",
  ".mdx",
  ".js",
  ".ts",
  ".tsx",
  ".json",
  ".yml",
  ".yaml",
  ".conf",
]);

/**
 * Where references may appear.
 * Add/remove roots as needed (script will skip missing paths).
 */
const REFERENCE_TARGETS = [
  "docs",
  "i18n",
  "sidebars.js",
  "docusaurus.config.js",
  path.join("docker", "redirects.conf"),
];

/**
 * Content roots to rename:
 * - docs/
 * - i18n/*docusaurus-plugin-content-docs/** (current + versioned)
 */
function getDocsContentRoots() {
  const roots = [];

  const docsRoot = path.join(repoRoot, "docs");
  if (fs.existsSync(docsRoot) && fs.statSync(docsRoot).isDirectory()) {
    roots.push(docsRoot);
  }

  const i18nRoot = path.join(repoRoot, "i18n");
  if (!fs.existsSync(i18nRoot) || !fs.statSync(i18nRoot).isDirectory()) {
    return roots;
  }

  const locales = fs.readdirSync(i18nRoot, { withFileTypes: true }).filter((d) => d.isDirectory());
  for (const localeDir of locales) {
    const pluginDocsDir = path.join(i18nRoot, localeDir.name, "docusaurus-plugin-content-docs");
    if (!fs.existsSync(pluginDocsDir) || !fs.statSync(pluginDocsDir).isDirectory()) {
      continue;
    }

    // "current" and "version-*" are the common ones; we'll include any directory under it.
    const versions = fs
      .readdirSync(pluginDocsDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => path.join(pluginDocsDir, d.name));

    roots.push(...versions);
  }

  return roots;
}

function walkDirectory(rootDir) {
  const results = [];
  const stack = [rootDir];

  while (stack.length > 0) {
    const currentDir = stack.pop();
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
      } else {
        results.push(fullPath);
      }
    }
  }

  return results;
}

function toPosixPath(p) {
  return p.split(path.sep).join("/");
}

function hasApiSegment(posixRelativePath) {
  // true if path contains "/api/" or starts with "api/"
  return posixRelativePath === "api" || posixRelativePath.startsWith("api/") || posixRelativePath.includes("/api/");
}

function getDocRelPath(contentRootAbs, fileAbsPath) {
  // relative path inside docs root (posix)
  const rel = path.relative(contentRootAbs, fileAbsPath);
  return toPosixPath(rel);
}

function computeRenameForFile(fileAbsPath) {
  const dirName = path.dirname(fileAbsPath);
  const baseName = path.basename(fileAbsPath); // e.g. auto_scheduling.md
  const ext = path.extname(baseName);
  const stem = baseName.slice(0, baseName.length - ext.length);

  const newStem = stem.replace(/_/g, "-");
  if (newStem === stem) {
    return null;
  }

  const newBaseName = newStem + ext;
  const newAbsPath = path.join(dirName, newBaseName);

  return { newAbsPath, newBaseName };
}

/**
 * Builds a replacement mapping keyed by doc-relative paths:
 *  - "guides/auto_scheduling.md" -> "guides/auto-scheduling.md"
 * plus derived ids/urls without extension.
 */
function renameMarkdownFilesAndBuildMapping() {
  const contentRoots = getDocsContentRoots();
  const mapping = [];

  for (const contentRootAbs of contentRoots) {
    const allFiles = walkDirectory(contentRootAbs);

    for (const fileAbsPath of allFiles) {
      const ext = path.extname(fileAbsPath);
      if (ext !== ".md" && ext !== ".mdx") {
        continue;
      }

      const docRelPath = getDocRelPath(contentRootAbs, fileAbsPath);

      // Never touch anything under /api/
      if (hasApiSegment(docRelPath)) {
        continue;
      }

      const renameInfo = computeRenameForFile(fileAbsPath);
      if (!renameInfo) {
        continue;
      }

      const oldDocRelPath = docRelPath; // e.g. guides/auto_scheduling.md
      const newDocRelPath = toPosixPath(path.relative(contentRootAbs, renameInfo.newAbsPath));

      // Rename on disk
      console.log(`RENAME: ${toPosixPath(path.relative(repoRoot, fileAbsPath))} -> ${toPosixPath(path.relative(repoRoot, renameInfo.newAbsPath))}`);
      fs.renameSync(fileAbsPath, renameInfo.newAbsPath);

      // Also store id variants without extension (Docusaurus ids)
      const oldId = oldDocRelPath.replace(/\.(md|mdx)$/i, "");
      const newId = newDocRelPath.replace(/\.(md|mdx)$/i, "");

      mapping.push({
        oldDocRelPath,
        newDocRelPath,
        oldId,
        newId,
      });
    }
  }

  // Sort by length (desc) to avoid partial collisions
  mapping.sort((a, b) => b.oldDocRelPath.length - a.oldDocRelPath.length);

  return mapping;
}

function shouldProcessAsTextFile(filePathAbs) {
  const ext = path.extname(filePathAbs);
  if (!TEXT_EXTENSIONS.has(ext)) {
    return false;
  }
  return true;
}

function getAllReferenceFiles() {
  const files = [];

  for (const target of REFERENCE_TARGETS) {
    const abs = path.join(repoRoot, target);
    if (!fs.existsSync(abs)) {
      continue;
    }

    const stat = fs.statSync(abs);
    if (stat.isFile()) {
      files.push(abs);
      continue;
    }

    if (stat.isDirectory()) {
      files.push(...walkDirectory(abs));
    }
  }

  return Array.from(new Set(files));
}

function applyReplacementsToContent(originalContent, mapping) {
  let updated = originalContent;

  for (const entry of mapping) {
    // 1) Replace doc-relative paths with extension (works for "../guides/auto_scheduling.md" too)
    updated = updated.split(entry.oldDocRelPath).join(entry.newDocRelPath);

    // 2) Replace ids in sidebars/config (no extension)
    //    Example: "integrations/react/quick_start_wrapper" -> ".../quick-start-wrapper"
    updated = updated.split(entry.oldId).join(entry.newId);

    // 3) Replace URL-ish forms used in redirects.conf: "/something/<id>/".
    //    We handle both with and without trailing slash.
    updated = updated.split(`${entry.oldId}/`).join(`${entry.newId}/`);
    updated = updated.split(`/${entry.oldId}/`).join(`/${entry.newId}/`);
    updated = updated.split(`/${entry.oldId}"`).join(`/${entry.newId}"`);
    updated = updated.split(`/${entry.oldId}'`).join(`/${entry.newId}'`);
  }

  return updated;
}

function updateReferences(mapping) {
  if (mapping.length === 0) {
    console.log("No files renamed. Skipping reference updates.");
    return;
  }

  const allRefFiles = getAllReferenceFiles();
  const visited = new Set();

  for (const fileAbsPath of allRefFiles) {
    if (visited.has(fileAbsPath)) {
      continue;
    }
    visited.add(fileAbsPath);

    if (!shouldProcessAsTextFile(fileAbsPath)) {
      continue;
    }

    const rel = toPosixPath(path.relative(repoRoot, fileAbsPath));
    const content = fs.readFileSync(fileAbsPath, "utf8");

    // Important: we only generate mapping from non-api renamed pages,
    // so API references should remain unchanged automatically.
    const updated = applyReplacementsToContent(content, mapping);

    if (updated !== content) {
      console.log(`UPDATE: ${rel}`);
      fs.writeFileSync(fileAbsPath, updated, "utf8");
    }
  }
}

function main() {
  console.log("=== Step 1: Rename docs files (snake_case -> kebab-case), excluding /api/ ===");
  const mapping = renameMarkdownFilesAndBuildMapping();

  if (mapping.length === 0) {
    console.log("No matching files found to rename. Done.");
    return;
  }

  console.log("\nRenamed entries:");
  for (const entry of mapping) {
    console.log(`  ${entry.oldDocRelPath} -> ${entry.newDocRelPath}`);
  }

  console.log("\n=== Step 2: Update references in md/mdx, sidebars.js, redirects.conf ===");
  updateReferences(mapping);

  console.log("\nAll done. Run a Docusaurus build to verify link integrity.");
}

main();
