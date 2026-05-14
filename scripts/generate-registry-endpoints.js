#!/usr/bin/env node
/**
 * Generates GitHub Pages endpoint files from mcp-registry.json.
 *
 * Output structure under docs/v0.1/servers/:
 *   index.html                                      -> GET /v0.1/servers
 *   {serverName}/versions/latest/index.html         -> GET /v0.1/servers/{serverName}/versions/latest
 *   {serverName}/versions/{version}/index.html      -> GET /v0.1/servers/{serverName}/versions/{version}
 *
 * GitHub Pages serves /path/index.html at /path/, satisfying all three required endpoints.
 */

const fs = require('fs');
const path = require('path');

const REGISTRY_FILE = path.join(__dirname, '..', 'mcp-registry.json');
const OUTPUT_BASE = path.join(__dirname, '..', 'docs', 'v0.1', 'servers');

function main() {
  const registry = JSON.parse(fs.readFileSync(REGISTRY_FILE, 'utf-8'));

  // GET /v0.1/servers
  const indexPath = path.join(OUTPUT_BASE, 'index.html');
  fs.mkdirSync(path.dirname(indexPath), { recursive: true });
  fs.writeFileSync(indexPath, JSON.stringify(registry));
  console.log('✓ GET /v0.1/servers');

  for (const serverEntry of registry.servers) {
    const { name, version } = serverEntry.server;
    const { packages: _, ...serverWithoutPackages } = serverEntry.server;
    const entry = JSON.stringify({ server: serverWithoutPackages, _meta: serverEntry._meta });

    const versionsDir = path.join(OUTPUT_BASE, name, 'versions');

    // GET /v0.1/servers/{name}/versions/latest
    const latestPath = path.join(versionsDir, 'latest', 'index.html');
    fs.mkdirSync(path.dirname(latestPath), { recursive: true });
    fs.writeFileSync(latestPath, entry);

    // GET /v0.1/servers/{name}/versions/{version}
    const versionPath = path.join(versionsDir, version, 'index.html');
    fs.mkdirSync(path.dirname(versionPath), { recursive: true });
    fs.writeFileSync(versionPath, entry);

    console.log(`✓ ${name} (v${version})`);
  }
}

main();
