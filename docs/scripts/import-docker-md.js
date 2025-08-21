const fs = require('fs');
const path = require('path');

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function listMarkdownFiles(dirPath) {
  if (!fs.existsSync(dirPath)) return [];
  return fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter((d) => d.isFile() && d.name.toLowerCase().endsWith('.md'))
    .map((d) => path.join(dirPath, d.name))
    .sort((a, b) => a.localeCompare(b));
}

function slugifyFileName(name) {
  const withoutExt = name.replace(/\.[^/.]+$/, '');
  return withoutExt
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

function extractTitle(markdown) {
  const lines = markdown.split(/\r?\n/);
  for (const line of lines) {
    const m = line.match(/^\s*#\s+(.+)/);
    if (m) return m[1].trim();
  }
  return null;
}

function stripFirstH1(markdown) {
  const lines = markdown.split(/\r?\n/);
  let stripped = false;
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!stripped && /^\s*#\s+/.test(line)) {
      stripped = true;
      continue; // skip first H1
    }
    out.push(line);
  }
  return out.join('\n').trimStart();
}

function writeDoc(destDir, index, srcFile, content) {
  const baseName = path.basename(srcFile);
  const seq = String(index + 1).padStart(2, '0');
  const slug = slugifyFileName(baseName);
  const destFile = path.join(destDir, `${seq}-${slug}.md`);

  const originalTitle = extractTitle(content) || slug.replace(/-/g, ' ');
  const numberedTitle = `${seq}. ${originalTitle}`;
  const body = stripFirstH1(content);

  const frontmatter = [
    '---',
    `title: ${JSON.stringify(numberedTitle)}`,
    `sidebar_label: ${JSON.stringify(numberedTitle)}`,
    '---',
    '',
  ].join('\n');

  const final = `${frontmatter}${body ? '\n' + body : ''}\n`;
  fs.writeFileSync(destFile, final, 'utf8');
  return destFile;
}

function importSection({ label, src, dest }) {
  const docsRoot = path.resolve(__dirname, '..', 'docs');
  const srcAbs = path.resolve(__dirname, '..', src);
  const destAbs = path.join(docsRoot, dest);
  ensureDir(destAbs);

  const files = listMarkdownFiles(srcAbs);
  let count = 0;
  files.forEach((file, idx) => {
    writeDoc(destAbs, idx, file, fs.readFileSync(file, 'utf8'));
    count += 1;
  });
  return { label, dest: destAbs, imported: count };
}

(function main() {
  const sections = [
    { label: 'Docker CLI', src: path.join('..', 'Docker Command Line Interface'), dest: 'docker-cli' },
    { label: 'Docker Compose', src: path.join('..', 'Docker Compose'), dest: 'docker-compose' },
    { label: 'Docker Custom Images', src: path.join('..', 'Docker Custom Images'), dest: 'docker-custom-images' },
    { label: 'Docker Networking', src: path.join('..', 'Docker Networking'), dest: 'docker-networking' },
    { label: 'Docker Volumes', src: path.join('..', 'Docker Volumes'), dest: 'docker-volumes' },
    { label: 'Docker Orchestration', src: path.join('..', 'Docker Orchestration'), dest: 'docker-orchestration' },
    { label: 'Docker for Developers', src: path.join('..', 'Docker for Developers'), dest: 'docker-for-developers' },
  ];

  const results = sections.map(importSection);
  const summaryLines = results.map((r) => `Imported ${r.imported} docs into ${path.basename(r.dest)} (${r.label})`);
  console.log(summaryLines.join('\n'));
})();
