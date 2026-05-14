#!/usr/bin/env node
/**
 * Generates GitHub Pages endpoint files from mcp-registry.json.
 * Uses index.html in directories so GitHub Pages serves them at the right paths.
 */

const fs = require('fs');
const path = require('path');

const REGISTRY_FILE = path.join(__dirname, '..', 'mcp-registry.json');
const DOCS_DIR = path.join(__dirname, '..', 'docs');

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
}

function main() {
  const registry = JSON.parse(fs.readFileSync(REGISTRY_FILE, 'utf-8'));

  // GET /v0.1/servers
  writeFile(path.join(DOCS_DIR, 'v0.1', 'servers', 'index.html'), JSON.stringify(registry));
  console.log('✓ GET /v0.1/servers');

  for (const serverEntry of registry.servers) {
    const { name, version } = serverEntry.server;
    const entry = JSON.stringify({ server: serverEntry.server, _meta: serverEntry._meta });

    const versionsDir = path.join(DOCS_DIR, 'v0.1', 'servers', name, 'versions');

    writeFile(path.join(versionsDir, 'latest', 'index.html'), entry);
    writeFile(path.join(versionsDir, version, 'index.html'), entry);

    console.log(`✓ ${name} (v${version})`);
  }

  console.log('\n✅ Done');
}

main();
