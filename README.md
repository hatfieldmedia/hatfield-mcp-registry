# hatfield-mcp-registry

A minimal MCP server registry containing only the [Playwright MCP server](https://github.com/microsoft/playwright-mcp), hosted on GitHub Pages.

Used to restrict [Hatfield Media](https://github.com/hatfieldmedia) GitHub Copilot org MCP access to Playwright only via **Registry only** policy.

**Registry URL:** `https://hatfieldmedia.github.io/hatfield-mcp-registry`

## How it works

A Node.js script reads `mcp-registry.json` and generates `index.html` files in a directory structure under `docs/`. GitHub Pages serves `/path/index.html` at `/path/`, satisfying all three required MCP registry endpoints:

- `GET /v0.1/servers`
- `GET /v0.1/servers/{serverName}/versions/latest`
- `GET /v0.1/servers/{serverName}/versions/{version}`

## GitHub Copilot org setup

1. Go to **[Org Settings → Copilot → Policies](https://github.com/organizations/hatfieldmedia/settings/copilot/policies)**
2. Ensure **MCP servers in Copilot** is **Enabled**
3. Set **MCP Registry URL** to `https://hatfieldmedia.github.io/hatfield-mcp-registry`
4. Set **Restrict MCP access to registry servers** → **Registry only**

## Updating the Playwright version

1. Edit `mcp-registry.json` — update `version` and `packages[].version`
2. Push to `main` — the action redeploys automatically

Check latest version: https://www.npmjs.com/package/@playwright/mcp
