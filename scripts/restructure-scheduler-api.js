#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require("fs/promises");
const path = require("path");
const { spawnSync } = require("child_process");

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

async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function normalizeUrlPath(value) {
  if (!value) {
    return "";
  }
  return value.trim().replace(/\\/g, "/");
}

function ensureLeadingSlash(urlPath) {
  const normalized = normalizeUrlPath(urlPath);
  if (normalized.startsWith("/")) {
    return normalized;
  }
  return `/${normalized}`;
}

function ensureTrailingSlash(urlPath) {
  const normalized = normalizeUrlPath(urlPath);
  if (normalized.endsWith("/")) {
    return normalized;
  }
  return `${normalized}/`;
}

function stripLeadingSlash(urlPath) {
  const normalized = normalizeUrlPath(urlPath);
  if (normalized.startsWith("/")) {
    return normalized.slice(1);
  }
  return normalized;
}

function stripTrailingSlash(urlPath) {
  const normalized = normalizeUrlPath(urlPath);
  if (normalized.endsWith("/")) {
    return normalized.slice(0, -1);
  }
  return normalized;
}

function parseRedirectsLine(line) {
  const trimmed = line.trim();
  if (trimmed.length === 0) {
    return null;
  }
  if (trimmed.startsWith("#")) {
    return null;
  }

  const parts = trimmed.split(/\s+/);
  if (parts.length < 2) {
    return null;
  }

  return { from: parts[0].trim(), to: parts[1].trim() };
}

function ensureStartsWithSlashButNotDouble(value) {
  const normalized = ensureLeadingSlash(value);
  return normalized.replace(/\/{2,}/g, "/");
}

function stripHostedBase(hostedUrlPath, hostedBase) {
  // hostedUrlPath examples:
  //   /scheduler/api/scheduler_close/
  // hostedBase:
  //   /scheduler
  //
  // result should be repo url path:
  //   /api/scheduler_close/
  const full = ensureLeadingSlash(normalizeUrlPath(hostedUrlPath));
  const base = stripTrailingSlash(ensureLeadingSlash(normalizeUrlPath(hostedBase)));

  if (base === "" || base === "/") {
    return full;
  }

  if (full === base) {
    return "/";
  }

  if (full.startsWith(`${base}/`)) {
    return full.slice(base.length);
  }

  // If it doesn't match, return as-is (caller may skip)
  return full;
}

function detectApiKindAndSlug(basename) {
  // Basename examples (from existing api pages):
  // scheduler_date_format_config
  // scheduler_date_grid_template
  // scheduler_datastore_other
  // scheduler_close
  // scheduler_onafterbatchupdate_event  (NOTE: sometimes suffix is _event, not _events)
  //
  // Rules requested:
  // - remove "scheduler_" prefix from all
  // - _config => kind=config, slug without suffix
  // - _template => kind=template, slug without suffix
  // - _other => kind=other, slug without suffix
  // - _events OR _event => kind=events, slug without suffix
  // - no suffix => kind=method, slug = remainder

  const requiredPrefix = "scheduler_";
  if (!basename.startsWith(requiredPrefix)) {
    return null;
  }

  const withoutPrefix = basename.slice(requiredPrefix.length);

  const suffixToKind = [
    { suffix: "_config", kind: "config" },
    { suffix: "_template", kind: "template" },
    { suffix: "_other", kind: "other" },
    { suffix: "_events", kind: "event" },
    { suffix: "_event", kind: "event" },
  ];

  for (const item of suffixToKind) {
    if (withoutPrefix.endsWith(item.suffix)) {
      const slug = withoutPrefix.slice(0, -item.suffix.length);
      if (!slug) {
        return null;
      }
      return { kind: item.kind, slug };
    }
  }

  return { kind: "method", slug: withoutPrefix };
}

function buildTargetHostedUrl(hostedBase, kind, slug) {
  // Hosted URL:
  // /scheduler/api/config/date_format/
  const base = stripTrailingSlash(ensureLeadingSlash(hostedBase));
  const hosted = `${base}/api/${kind}/${slug}/`;
  return ensureTrailingSlash(ensureStartsWithSlashButNotDouble(hosted));
}

function buildTargetRepoUrl(kind, slug) {
  // Repo doc URL path (matches docs/api/**):
  // /api/config/date_format/
  return ensureTrailingSlash(`/api/${kind}/${slug}/`);
}

function repoUrlToDocsFileCandidates(docsRootAbs, repoUrlPath) {
  // repoUrlPath example: /api/scheduler_close/
  // docs file: docs/api/scheduler_close.md or .mdx
  const relativeNoSlash = stripLeadingSlash(stripTrailingSlash(repoUrlPath));
  return [
    path.join(docsRootAbs, `${relativeNoSlash}.md`),
    path.join(docsRootAbs, `${relativeNoSlash}.mdx`),
  ];
}

async function resolveExistingDocFilePathFromRepoUrl(docsRootAbs, repoUrlPath) {
  const candidates = repoUrlToDocsFileCandidates(docsRootAbs, repoUrlPath);
  for (const candidate of candidates) {
    if (await pathExists(candidate)) {
      return candidate;
    }
  }
  return null;
}

function buildNewDocFilePathFromRepoUrl(docsRootAbs, repoTargetUrlPath, extension) {
  const relativeNoSlash = stripLeadingSlash(stripTrailingSlash(repoTargetUrlPath));
  return path.join(docsRootAbs, `${relativeNoSlash}${extension}`);
}

function runRenamerScript(options) {
  const {
    nodeBinary,
    renamerScriptPathAbs,
    docsRootRel,
    oldFileAbs,
    newFileAbs,
    sidebarsRel,
    redirectsRel,
    oldUrlHosted,
    newUrlHosted,
    dryRun,
  } = options;

  const args = [
    renamerScriptPathAbs,
    "--docs-root",
    docsRootRel,
    "--old",
    oldFileAbs,
    "--new",
    newFileAbs,
    "--sidebars",
    sidebarsRel,
    "--redirects",
    redirectsRel,
    "--old-url",
    oldUrlHosted,
    "--new-url",
    newUrlHosted,
  ];

  if (dryRun) {
    console.log(`[dry-run] node ${args.map((a) => JSON.stringify(a)).join(" ")}`);
    return { ok: true };
  }

  const result = spawnSync(nodeBinary, args, { stdio: "inherit" });
  if (result.status !== 0) {
    return { ok: false, exitCode: result.status ?? 1 };
  }
  return { ok: true };
}

async function main() {
  const args = parseArgs(process.argv);

  const repoRoot = process.cwd();
  const nodeBinary = args["node"] || process.execPath;

  const renamerRel = args["renamer"] || "scripts/rename-doc.js";

  const docsRootRel = args["docs-root"] || "docs";
  const sidebarsRel = args["sidebars"] || "sidebars.js";
  const redirectsRel = args["redirects"] || "docker/redirects.conf";

  // Hosted URL base prefix (exists only in redirects.conf)
  // Example: hosted URLs are /scheduler/api/...
  const hostedBase = args["hosted-base"] || "/scheduler";

  // Filters for picking correct redirects lines
  const legacyPrefix = args["legacy-prefix"] || "/api__scheduler_"; // left side
  const hostedApiPrefix = args["hosted-api-prefix"] || `${stripTrailingSlash(ensureLeadingSlash(hostedBase))}/api/`; // right side

  const dryRun = Boolean(args["dry-run"]);

  const docsRootAbs = path.resolve(repoRoot, docsRootRel);
  const redirectsAbs = path.resolve(repoRoot, redirectsRel);
  const renamerAbs = path.resolve(repoRoot, renamerRel);

  if (!(await pathExists(docsRootAbs))) {
    console.error(`Docs root not found: ${docsRootAbs}`);
    process.exit(1);
  }
  if (!(await pathExists(redirectsAbs))) {
    console.error(`redirects.conf not found: ${redirectsAbs}`);
    process.exit(1);
  }
  if (!(await pathExists(renamerAbs))) {
    console.error(`Renamer script not found: ${renamerAbs}`);
    process.exit(1);
  }

  const redirectsContent = await fs.readFile(redirectsAbs, "utf8");
  const redirectLines = redirectsContent.split(/\r?\n/);

  const relevantRedirects = [];
  for (const line of redirectLines) {
    const parsed = parseRedirectsLine(line);
    if (!parsed) {
      continue;
    }

    const from = ensureLeadingSlash(parsed.from);
    const toHosted = ensureLeadingSlash(parsed.to);

    if (!from.startsWith(legacyPrefix)) {
      continue;
    }
    if (!toHosted.startsWith(hostedApiPrefix)) {
      continue;
    }

    relevantRedirects.push({ fromLegacy: from, toHosted });
  }

  if (relevantRedirects.length === 0) {
    console.log("No matching redirects found. Nothing to do.");
    return;
  }

  console.log(`Found ${relevantRedirects.length} candidate API pages to restructure.`);

  let processed = 0;
  let skipped = 0;
  let failed = 0;

  for (const item of relevantRedirects) {
    const legacyUrl = ensureLeadingSlash(item.fromLegacy);
    const currentHostedUrl = ensureTrailingSlash(item.toHosted);

    // Convert hosted URL -> repo URL (/scheduler/api/... -> /api/...)
    const currentRepoUrl = ensureTrailingSlash(stripHostedBase(currentHostedUrl, hostedBase));

    // We only support /api/... repo url paths
    if (!currentRepoUrl.startsWith("/api/")) {
      console.log(`SKIP: hosted URL did not map to /api/: ${currentHostedUrl} -> ${currentRepoUrl}`);
      skipped += 1;
      continue;
    }

    const currentRepoNoTrail = currentRepoUrl.replace(/\/$/, "");
    const basename = path.posix.basename(currentRepoNoTrail);

    const kindInfo = detectApiKindAndSlug(basename);
    if (!kindInfo) {
      console.log(`SKIP: cannot classify basename "${basename}" from ${currentRepoUrl}`);
      skipped += 1;
      continue;
    }

    const targetRepoUrl = buildTargetRepoUrl(kindInfo.kind, kindInfo.slug);
    const targetHostedUrl = buildTargetHostedUrl(hostedBase, kindInfo.kind, kindInfo.slug);

    const oldFileAbs = await resolveExistingDocFilePathFromRepoUrl(docsRootAbs, currentRepoUrl);
    if (!oldFileAbs) {
      console.log(`SKIP: file not found for repo URL: ${currentRepoUrl} (from ${currentHostedUrl})`);
      skipped += 1;
      continue;
    }

    const extension = path.extname(oldFileAbs); // .md or .mdx
    const newFileAbs = buildNewDocFilePathFromRepoUrl(docsRootAbs, targetRepoUrl, extension);

    console.log("\n---");
    console.log(`Legacy redirect: ${legacyUrl}`);
    console.log(`Current hosted:  ${currentHostedUrl}`);
    console.log(`Current repo:    ${currentRepoUrl}`);
    console.log(`Target hosted:   ${targetHostedUrl}`);
    console.log(`Target repo:     ${targetRepoUrl}`);
    console.log(`Old file:        ${oldFileAbs}`);
    console.log(`New file:        ${newFileAbs}`);

    const result = runRenamerScript({
      nodeBinary,
      renamerScriptPathAbs: renamerAbs,
      docsRootRel,
      oldFileAbs,
      newFileAbs,
      sidebarsRel,
      redirectsRel,
      oldUrlHosted: legacyUrl,      // legacy -> new hosted url
      newUrlHosted: targetHostedUrl,
      dryRun,
    });

    if (!result.ok) {
      console.log(`FAILED: ${basename} (exit code ${result.exitCode})`);
      failed += 1;
      continue;
    }

    processed += 1;
  }

  console.log("\n==== Summary ====");
  console.log(`Processed: ${processed}`);
  console.log(`Skipped:   ${skipped}`);
  console.log(`Failed:    ${failed}`);

  if (failed > 0) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
