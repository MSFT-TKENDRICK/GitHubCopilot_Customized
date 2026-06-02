#!/usr/bin/env node

const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const REDACTION = '[REDACTED]';
const dryRun = process.argv.includes('--dry-run');

const patterns = [
  /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,
  /\b(?:\+?1[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)\d{3}[-.\s]?\d{4}\b/g,
  /\b\d{3}-\d{2}-\d{4}\b/g,
  /\b(?:\d[ -]*?){13,19}\b/g,
  /\b(?:api[_-]?key|token|password|secret)\s*[:=]\s*[^\s`'\"]+/gi
];

let stdin = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => {
  stdin += chunk;
});
process.stdin.on('end', () => {
  try {
    const files = findMarkdownFiles(stdin);
    const redactedFiles = redactFiles(files);

    if (redactedFiles.length > 0) {
      console.log(JSON.stringify({
        systemMessage: `Redacted possible PII from ${redactedFiles.length} Markdown file(s): ${redactedFiles.join(', ')}`
      }));
    } else {
      console.log(JSON.stringify({ continue: true }));
    }
  } catch (error) {
    console.error(`Markdown PII redaction hook failed: ${error.message}`);
    process.exit(1);
  }
});

if (process.stdin.isTTY) {
  process.stdin.emit('end');
}

function findMarkdownFiles(rawInput) {
  const candidates = new Set();
  collectPathsFromHookInput(rawInput, candidates);
  collectChangedMarkdownFiles(candidates);

  return [...candidates]
    .map(normalizeWorkspacePath)
    .filter(Boolean)
    .filter(filePath => filePath.toLowerCase().endsWith('.md'))
    .filter(filePath => fs.existsSync(filePath) && fs.statSync(filePath).isFile());
}

function collectPathsFromHookInput(rawInput, candidates) {
  if (!rawInput.trim()) {
    return;
  }

  try {
    collectStrings(JSON.parse(rawInput), value => {
      if (/\.md$/i.test(value) || /\.md[:#]/i.test(value)) {
        candidates.add(value.replace(/[:#].*$/, ''));
      }
    });
  } catch {
    for (const match of rawInput.matchAll(/[^\s"']+\.md/gi)) {
      candidates.add(match[0]);
    }
  }
}

function collectChangedMarkdownFiles(candidates) {
  const status = execFileSync(
    'git',
    ['status', '--short', '--untracked-files=all'],
    { encoding: 'utf8' }
  );

  for (const line of status.split(/\r?\n/)) {
    const filePath = line.slice(3).trim();
    if (filePath.toLowerCase().endsWith('.md')) {
      candidates.add(filePath);
    }
  }
}

function collectStrings(value, visit) {
  if (typeof value === 'string') {
    visit(value);
    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      collectStrings(item, visit);
    }
    return;
  }

  if (value && typeof value === 'object') {
    for (const item of Object.values(value)) {
      collectStrings(item, visit);
    }
  }
}

function normalizeWorkspacePath(filePath) {
  const normalized = filePath.replace(/\\/g, '/');
  const absolutePath = path.resolve(normalized);
  const workspaceRoot = process.cwd();

  if (!absolutePath.startsWith(workspaceRoot)) {
    return null;
  }

  return absolutePath;
}

function redactFiles(files) {
  const redactedFiles = [];

  for (const filePath of files) {
    const original = fs.readFileSync(filePath, 'utf8');
    const redacted = patterns.reduce(
      (content, pattern) => content.replace(pattern, REDACTION),
      original
    );

    if (redacted !== original) {
      redactedFiles.push(path.relative(process.cwd(), filePath).replace(/\\/g, '/'));
      if (!dryRun) {
        fs.writeFileSync(filePath, redacted, 'utf8');
      }
    }
  }

  return redactedFiles;
}