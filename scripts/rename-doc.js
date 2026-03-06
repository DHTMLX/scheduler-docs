#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require("fs/promises");
const path = require("path");

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i += 1) {
    const token = argv[i];
    if (token.startsWith("--")) {
      const key = token.slice(2);
      const value = argv[i + 1];
      if (value && !value.startsWith("--")) {
        args[key] = value;
        i += 1;
      } else {
        args[key] = true;
      }
    }
  }
  return args;
}

function toPosixPath(anyPath) {
  return anyPath.split(path.sep).join("/");
}

function normalizePathLike(value) {
  return value.replace(/\\/g, "/");
}

function stripKnownExtensions(p) {
  return p.replace(/\.(md|mdx)$/i, "");
}

function splitLinkTarget(targetRaw) {
  const match = targetRaw.match(/^([^?#]*)(.*)$/);
  if (!match) {
    return { base: targetRaw, suffix: "" };
  }
  return { base: match[1], suffix: match[2] || "" };
}

async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function listFilesRecursive(rootDirAbsolute, includeExtensionsSet) {
  const results = [];

  async function walk(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const entryPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        await walk(entryPath);
      } else {
        const ext = path.extname(entry.name).toLowerCase();
        if (includeExtensionsSet.has(ext)) {
          results.push(entryPath);
        }
      }
    }
  }

  await walk(rootDirAbsolute);
  return results;
}

function docIdFromAbsolutePath(absoluteDocPath, docsRootAbsolute) {
  const relativeToDocsRoot = path.relative(docsRootAbsolute, absoluteDocPath);
  const relativePosix = toPosixPath(relativeToDocsRoot);
  return stripKnownExtensions(relativePosix);
}

function docsRelativeFilePathFromAbsolutePath(absoluteDocPath, docsRootAbsolute) {
  // Returns path under docs/ including extension, POSIX style
  const relativeToDocsRoot = path.relative(docsRootAbsolute, absoluteDocPath);
  return toPosixPath(relativeToDocsRoot);
}

async function ensureParentDirExists(fileAbsolutePath) {
  const dirPath = path.dirname(fileAbsolutePath);
  await fs.mkdir(dirPath, { recursive: true });
}

async function renameFileEnsuringDirs(oldAbs, newAbs) {
  await ensureParentDirExists(newAbs);
  await fs.rename(oldAbs, newAbs);
}

async function updateFileIfChanged(filePath, transformFn) {
  const before = await fs.readFile(filePath, "utf8");
  const after = transformFn(before);
  if (after !== before) {
    await fs.writeFile(filePath, after, "utf8");
    return true;
  }
  return false;
}

function shouldSkipLinkTarget(target) {
  return /^(mailto:|https?:|#)/i.test(target);
}

function buildExactTargetsForDocsRewrite(oldDocId, oldDocsRelWithExt) {
  const oldDocsRelNoExt = stripKnownExtensions(oldDocsRelWithExt);

  // We match both:
  // - doc-id style: api/foo, /api/foo
  // - file style: api/foo.md, /api/foo.md, also oldDocsRelWithExt exactly
  // - and no-ext file style: api/foo (same as doc-id) and oldDocsRelNoExt
  return new Set([
    // doc id style
    oldDocId,
    `/${oldDocId}`,

    // file style (based on doc id)
    `${oldDocId}.md`,
    `${oldDocId}.mdx`,
    `/${oldDocId}.md`,
    `/${oldDocId}.mdx`,

    // file style (based on actual old file path under docs)
    oldDocsRelWithExt,
    `/${oldDocsRelWithExt}`,
    oldDocsRelNoExt,
    `/${oldDocsRelNoExt}`,
  ]);
}

function rewriteTargetForDocsFileLinks(rawTarget, replacement) {
  // replacement: { oldDocId, newDocId, oldDocsRelWithExt, newDocsRelWithExt }
  const trimmed = rawTarget.trim();
  if (shouldSkipLinkTarget(trimmed)) {
    return null;
  }

  // We rewrite only "clean" docs-relative targets.
  // If someone uses ./ or ../ links, we intentionally leave them unchanged
  // because resolving them correctly requires the current file location context.
  if (trimmed.startsWith("./") || trimmed.startsWith("../")) {
    return null;
  }

  const { base, suffix } = splitLinkTarget(trimmed);
  const baseNorm = normalizePathLike(base);

  const exactTargets = buildExactTargetsForDocsRewrite(
    replacement.oldDocId,
    replacement.oldDocsRelWithExt
  );

  if (!exactTargets.has(baseNorm)) {
    return null;
  }

  // Your tooling expects docs-relative *file paths*, not doc ids.
  // Always emit without leading slash: e.g. "views/timeline.md"
  const rewrittenBase = replacement.newDocsRelWithExt;

  return `${rewrittenBase}${suffix}`;
}

function replaceMarkdownLinks(content, replacements) {
  const linkRegex = /(!?\[[^\]]*?\])\(([^)]+)\)/g;

  return content.replace(linkRegex, (full, label, rawTarget) => {
    for (const replacement of replacements) {
      const rewritten = rewriteTargetForDocsFileLinks(rawTarget, replacement);
      if (rewritten !== null) {
        return `${label}(${rewritten})`;
      }
    }
    return full;
  });
}

function replaceHtmlAnchorHrefs(content, replacements) {
  const anchorHrefRegex = /<a\b[^>]*?\bhref\s*=\s*(["'])(.*?)\1/gi;

  return content.replace(anchorHrefRegex, (fullMatch, quote, hrefValueRaw) => {
    for (const replacement of replacements) {
      const rewritten = rewriteTargetForDocsFileLinks(hrefValueRaw, replacement);
      if (rewritten !== null) {
        return fullMatch.replace(hrefValueRaw, rewritten);
      }
    }
    return fullMatch;
  });
}

function replaceSidebarsText(content, replacements) {
  // Sidebars keep doc-id references (unchanged behavior).
  let updated = content;

  for (const { oldDocId, newDocId } of replacements) {
    const escapedOldDocId = oldDocId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const quotedDocIdPattern = new RegExp(`(["'])${escapedOldDocId}\\1`, "g");

    updated = updated.replace(quotedDocIdPattern, (match, quoteChar) => {
      return `${quoteChar}${newDocId}${quoteChar}`;
    });
  }

  return updated;
}

function upsertRedirectLine(redirectsContent, oldUrl, newUrl) {
  const lines = redirectsContent.split(/\r?\n/);
  const trimmedOldUrl = oldUrl.trim();
  const trimmedNewUrl = newUrl.trim();

  let found = false;

  const updatedLines = lines.map((line) => {
    const trimmed = line.trim();
    if (trimmed.length === 0 || trimmed.startsWith("#")) {
      return line;
    }

    const parts = trimmed.split(/\s+/);
    const from = parts[0];

    if (from === trimmedOldUrl) {
      found = true;
      return `${trimmedOldUrl} ${trimmedNewUrl}`;
    }

    return line;
  });

  if (!found) {
    updatedLines.push(`${trimmedOldUrl} ${trimmedNewUrl}`);
  }

  return updatedLines.join("\n");
}

async function collectI18nLocales(i18nRootAbs) {
  if (!(await pathExists(i18nRootAbs))) {
    return [];
  }

  const entries = await fs.readdir(i18nRootAbs, { withFileTypes: true });
  return entries.filter((e) => e.isDirectory()).map((e) => e.name);
}

function i18nDocsRootForLocale(repoRoot, locale) {
  return path.join(repoRoot, "i18n", locale, "docusaurus-plugin-content-docs", "current");
}

async function main() {
  const args = parseArgs(process.argv);

  const repoRoot = process.cwd();
  const docsRootRel = args["docs-root"] || "docs";
  const docsRootAbs = path.resolve(repoRoot, docsRootRel);

  const oldPathInput = args["old"];
  const newPathInput = args["new"];

  const sidebarsPathRel = args["sidebars"] || "sidebars.js";
  const redirectsPathRel = args["redirects"] || "docker/redirects.conf";

  if (!oldPathInput || !newPathInput) {
    console.error(
      "Usage:\n" +
        "  node scripts/rename-doc.js \\\n" +
        "    --docs-root docs \\\n" +
        "    --old docs/api/old.md \\\n" +
        "    --new docs/api/new.md \\\n" +
        "    --sidebars sidebars.js \\\n" +
        "    --redirects docker/redirects.conf \\\n" +
        "    --old-url /api__old.html \\\n" +
        "    --new-url /scheduler/api/new/\n"
    );
    process.exit(1);
  }

  const oldAbs = path.resolve(repoRoot, oldPathInput);
  const newAbs = path.resolve(repoRoot, newPathInput);

  if (!(await pathExists(oldAbs))) {
    console.error(`Old file not found: ${oldAbs}`);
    process.exit(1);
  }

  if (!(await pathExists(docsRootAbs))) {
    console.error(`Docs root not found: ${docsRootAbs}`);
    process.exit(1);
  }

  const oldDocId = docIdFromAbsolutePath(oldAbs, docsRootAbs);
  const newDocId = docIdFromAbsolutePath(newAbs, docsRootAbs);

  const oldDocsRelWithExt = docsRelativeFilePathFromAbsolutePath(oldAbs, docsRootAbs);
  const newDocsRelWithExt = docsRelativeFilePathFromAbsolutePath(newAbs, docsRootAbs);

  const replacements = [
    { oldDocId, newDocId, oldDocsRelWithExt, newDocsRelWithExt },
  ];

  console.log(`Docs root: ${docsRootAbs}`);
  console.log(`Renaming main doc:\n  ${oldAbs}\n  -> ${newAbs}`);
  console.log(`Doc id mapping:\n  ${oldDocId}\n  -> ${newDocId}`);
  console.log(`Docs-file link mapping:\n  ${oldDocsRelWithExt}\n  -> ${newDocsRelWithExt}`);

  // 1) Rename the main file (creates folders if needed)
  await renameFileEnsuringDirs(oldAbs, newAbs);

  // 5a) Rename i18n copies (if exist) with the same relative move under docs/
  const i18nRootAbs = path.join(repoRoot, "i18n");
  const locales = await collectI18nLocales(i18nRootAbs);

  const oldRelToDocs = path.relative(docsRootAbs, oldAbs);
  const newRelToDocs = path.relative(docsRootAbs, newAbs);

  let renamedI18nCount = 0;
  for (const locale of locales) {
    const localeDocsRootAbs = i18nDocsRootForLocale(repoRoot, locale);
    if (!(await pathExists(localeDocsRootAbs))) {
      continue;
    }

    const oldI18nAbs = path.join(localeDocsRootAbs, oldRelToDocs);
    const newI18nAbs = path.join(localeDocsRootAbs, newRelToDocs);

    if (await pathExists(oldI18nAbs)) {
      console.log(`Renaming i18n (${locale}):\n  ${oldI18nAbs}\n  -> ${newI18nAbs}`);
      await renameFileEnsuringDirs(oldI18nAbs, newI18nAbs);
      renamedI18nCount += 1;
    }
  }

  // 2) Update references in docs + i18n md/mdx (markdown links + raw <a href>)
  const markdownExtensions = new Set([".md", ".mdx"]);

  const docsFiles = await listFilesRecursive(docsRootAbs, markdownExtensions);

  let i18nFiles = [];
  for (const locale of locales) {
    const localeDocsRootAbs = i18nDocsRootForLocale(repoRoot, locale);
    if (await pathExists(localeDocsRootAbs)) {
      const localeFiles = await listFilesRecursive(localeDocsRootAbs, markdownExtensions);
      i18nFiles.push(...localeFiles);
    }
  }

  const allMarkdownFiles = [...docsFiles, ...i18nFiles];

  let updatedRefsCount = 0;
  for (const filePath of allMarkdownFiles) {
    const changed = await updateFileIfChanged(filePath, (text) => {
      let updatedText = text;
      updatedText = replaceMarkdownLinks(updatedText, replacements);
      updatedText = replaceHtmlAnchorHrefs(updatedText, replacements);
      return updatedText;
    });
    if (changed) {
      updatedRefsCount += 1;
    }
  }

  console.log(`Updated references in md/mdx files: ${updatedRefsCount}`);
  console.log(`Renamed i18n doc copies: ${renamedI18nCount}`);

  // 3) Update sidebars.js (doc ids)
  const sidebarsAbs = path.resolve(repoRoot, sidebarsPathRel);
  if (await pathExists(sidebarsAbs)) {
    const sidebarsChanged = await updateFileIfChanged(sidebarsAbs, (text) =>
      replaceSidebarsText(text, replacements)
    );
    console.log(`Updated sidebars: ${sidebarsChanged ? "yes" : "no changes"}`);
  } else {
    console.log(`Sidebars not found at ${sidebarsAbs} (skipped).`);
  }

  // 4) Update redirects.conf (unchanged behavior)
  const redirectsAbs = path.resolve(repoRoot, redirectsPathRel);
  const oldUrlArg = args["old-url"];
  const newUrlArg = args["new-url"];

  const defaultOldUrl = `/${oldDocId}/`;
  const defaultNewUrl = `/${newDocId}/`;

  const oldUrl = oldUrlArg || defaultOldUrl;
  const newUrl = newUrlArg || defaultNewUrl;

  if (await pathExists(redirectsAbs)) {
    const redirectsChanged = await updateFileIfChanged(redirectsAbs, (text) =>
      upsertRedirectLine(text, oldUrl, newUrl)
    );
    console.log(
      `Updated redirects: ${redirectsChanged ? "yes" : "no changes"} (${oldUrl} -> ${newUrl})`
    );
  } else {
    console.log(`Redirects file not found at ${redirectsAbs} (skipped).`);
  }

  console.log("Done.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
