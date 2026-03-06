#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

function printUsageAndExit() {
  const scriptName = path.basename(process.argv[1]);
  console.error(
    [
      `Usage: node ${scriptName} <pathToFileOrDir> [options]`,
      "",
      "Options:",
      "  --in-place                 Write changes back to original files (default).",
      "  --out <outputDir>          Write to output directory, mirroring structure.",
      "  --backup                   Create <file>.bak before overwriting (in-place only).",
      "  --dry-run                  Print what would change, do not write.",
      "  --ext .md,.mdx,.txt        Comma-separated extensions to process (default: .md,.mdx,.txt).",
      "  --include a,b,c            Optional: only process files whose path includes any token.",
      "  --exclude a,b,c            Exclude directories/files whose path includes any token",
      "                             (default: node_modules,.git,dist,build,out,coverage).",
      "",
      "Examples:",
      `  node ${scriptName} ./docs --in-place --backup`,
      `  node ${scriptName} ./docs --dry-run`,
      `  node ${scriptName} ./docs --out ./cleaned-docs`,
      `  node ${scriptName} . --ext .md,.mdx --exclude node_modules,.git,dist`,
    ].join("\n")
  );
  process.exit(1);
}

function splitCsv(value) {
  if (!value) {
    return [];
  }
  return value
    .split(",")
    .map((part) => part.trim())
    .filter((part) => part.length > 0);
}

function parseArgs(argv) {
  const args = argv.slice(2);
  if (args.length === 0) {
    printUsageAndExit();
  }

  const firstNonFlagIndex = args.findIndex((value) => value && value[0] !== "-");
  if (firstNonFlagIndex === -1) {
    printUsageAndExit();
  }

  const options = {
    inputPath: args[firstNonFlagIndex],
    inPlace: true,
    outputDir: null,
    backup: false,
    dryRun: false,
    extensions: [".md", ".mdx", ".txt"],
    includeTokens: [],
    excludeTokens: ["node_modules", ".git", "dist", "build", "out", "coverage"],
  };

  for (let index = 0; index < args.length; index += 1) {
    const token = args[index];

    if (token === "--in-place") {
      options.inPlace = true;
      continue;
    }

    if (token === "--backup") {
      options.backup = true;
      continue;
    }

    if (token === "--dry-run") {
      options.dryRun = true;
      continue;
    }

    if (token === "--out") {
      const nextValue = args[index + 1];
      if (!nextValue || nextValue[0] === "-") {
        console.error("Error: --out requires a value.");
        process.exit(1);
      }
      options.outputDir = nextValue;
      options.inPlace = false;
      index += 1;
      continue;
    }

    if (token === "--ext") {
      const nextValue = args[index + 1];
      if (!nextValue || nextValue[0] === "-") {
        console.error("Error: --ext requires a value.");
        process.exit(1);
      }
      options.extensions = splitCsv(nextValue).map((ext) => {
        if (ext.startsWith(".")) {
          return ext.toLowerCase();
        }
        return `.${ext.toLowerCase()}`;
      });
      index += 1;
      continue;
    }

    if (token === "--include") {
      const nextValue = args[index + 1];
      if (!nextValue || nextValue[0] === "-") {
        console.error("Error: --include requires a value.");
        process.exit(1);
      }
      options.includeTokens = splitCsv(nextValue);
      index += 1;
      continue;
    }

    if (token === "--exclude") {
      const nextValue = args[index + 1];
      if (!nextValue || nextValue[0] === "-") {
        console.error("Error: --exclude requires a value.");
        process.exit(1);
      }
      options.excludeTokens = splitCsv(nextValue);
      index += 1;
      continue;
    }
  }

  if (options.outputDir && options.backup) {
    console.error("Error: --backup only works with --in-place.");
    process.exit(1);
  }

  return options;
}

function applyReplacements(text) {
  const replacements = [
    // Curly quotes → ASCII quotes
    { pattern: /\u2019/g, replacement: "'" }, // ’
    { pattern: /\u2018/g, replacement: "'" }, // ‘
    { pattern: /\u201C/g, replacement: '"' }, // “
    { pattern: /\u201D/g, replacement: '"' }, // ”

    // Dashes/minus variants → hyphen-minus
    { pattern: /\u2013/g, replacement: "-" }, // – en dash
    { pattern: /\u2014/g, replacement: "-" }, // — em dash
    { pattern: /\u2212/g, replacement: "-" }, // − minus
  ];

  let updatedText = text;
  for (const { pattern, replacement } of replacements) {
    updatedText = updatedText.replace(pattern, replacement);
  }
  return updatedText;
}

function shouldSkipPath(absolutePath, excludeTokens) {
  const normalizedPath = absolutePath.split(path.sep).join("/").toLowerCase();
  for (const token of excludeTokens) {
    const normalizedToken = token.toLowerCase();
    if (normalizedToken.length === 0) {
      continue;
    }
    if (normalizedPath.includes(normalizedToken)) {
      return true;
    }
  }
  return false;
}

function shouldIncludeFile(absolutePath, includeTokens) {
  if (!includeTokens || includeTokens.length === 0) {
    return true;
  }

  const normalizedPath = absolutePath.split(path.sep).join("/").toLowerCase();
  for (const token of includeTokens) {
    const normalizedToken = token.toLowerCase();
    if (normalizedToken.length === 0) {
      continue;
    }
    if (normalizedPath.includes(normalizedToken)) {
      return true;
    }
  }
  return false;
}

function hasAllowedExtension(filePath, extensions) {
  const lowerName = filePath.toLowerCase();
  return extensions.some((ext) => lowerName.endsWith(ext));
}

function collectFilesRecursively(startPath, options) {
  const results = [];

  function walk(currentPath) {
    if (shouldSkipPath(currentPath, options.excludeTokens)) {
      return;
    }

    const stat = fs.statSync(currentPath);

    if (stat.isDirectory()) {
      const entries = fs.readdirSync(currentPath);
      for (const entry of entries) {
        walk(path.join(currentPath, entry));
      }
      return;
    }

    if (!stat.isFile()) {
      return;
    }

    if (!hasAllowedExtension(currentPath, options.extensions)) {
      return;
    }

    if (!shouldIncludeFile(currentPath, options.includeTokens)) {
      return;
    }

    results.push(currentPath);
  }

  walk(startPath);
  return results;
}

function ensureParentDir(filePath) {
  const parent = path.dirname(filePath);
  fs.mkdirSync(parent, { recursive: true });
}

function processOneFile(inputFilePath, options, inputRootForOutput) {
  const originalText = fs.readFileSync(inputFilePath, "utf8");
  const updatedText = applyReplacements(originalText);
  const didChange = updatedText !== originalText;

  if (!didChange) {
    return { didChange: false, wrote: false, inputFilePath, outputFilePath: null };
  }

  if (options.dryRun) {
    return { didChange: true, wrote: false, inputFilePath, outputFilePath: null };
  }

  if (options.inPlace) {
    if (options.backup) {
      fs.writeFileSync(`${inputFilePath}.bak`, originalText, "utf8");
    }
    fs.writeFileSync(inputFilePath, updatedText, "utf8");
    return { didChange: true, wrote: true, inputFilePath, outputFilePath: inputFilePath };
  }

  const absoluteOutputRoot = path.resolve(process.cwd(), options.outputDir);
  const relativePath = path.relative(inputRootForOutput, inputFilePath);
  const outputFilePath = path.join(absoluteOutputRoot, relativePath);

  ensureParentDir(outputFilePath);
  fs.writeFileSync(outputFilePath, updatedText, "utf8");
  return { didChange: true, wrote: true, inputFilePath, outputFilePath };
}

function main() {
  const options = parseArgs(process.argv);

  const absoluteInputPath = path.resolve(process.cwd(), options.inputPath);
  if (!fs.existsSync(absoluteInputPath)) {
    console.error(`Error: path not found: ${absoluteInputPath}`);
    process.exit(1);
  }

  const inputStat = fs.statSync(absoluteInputPath);
  const inputRootForOutput = inputStat.isDirectory()
    ? absoluteInputPath
    : path.dirname(absoluteInputPath);

  const filesToProcess = inputStat.isDirectory()
    ? collectFilesRecursively(absoluteInputPath, options)
    : [absoluteInputPath];

  let changedCount = 0;
  let wroteCount = 0;

  for (const filePath of filesToProcess) {
    const outcome = processOneFile(filePath, options, inputRootForOutput);
    if (outcome.didChange) {
      changedCount += 1;
      if (options.dryRun) {
        console.log(`[dry-run] would update: ${filePath}`);
      } else if (options.inPlace) {
        console.log(`updated: ${filePath}`);
      } else {
        console.log(`updated: ${filePath} -> ${outcome.outputFilePath}`);
      }
    }
    if (outcome.wrote) {
      wroteCount += 1;
    }
  }

  const totalCount = filesToProcess.length;
  if (options.dryRun) {
    console.log(`\nScanned ${totalCount} file(s). Would change ${changedCount}.`);
  } else {
    console.log(`\nScanned ${totalCount} file(s). Changed ${changedCount}. Wrote ${wroteCount}.`);
  }
}

main();
