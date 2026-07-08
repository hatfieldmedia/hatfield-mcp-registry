# hatfield-mcp-registry

A minimal MCP server registry containing only approved servers, hosted on GitHub Pages:

- [Playwright MCP server](https://github.com/microsoft/playwright-mcp)
- [Laravel Boost MCP server](https://github.com/laravel/boost)

Used to restrict [Hatfield Media](https://github.com/hatfieldmedia) GitHub Copilot org MCP access to only these servers via **Registry only** policy.

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

## Updating a server version

1. Edit `mcp-registry.json` — update `version` and `packages[].version` for the relevant server
2. Push to `main` — the action redeploys automatically

Check latest versions:
- Playwright: https://www.npmjs.com/package/@playwright/mcp
- Laravel Boost: https://packagist.org/packages/laravel/boost

## Adding a new server

1. Add an entry to `servers` in `mcp-registry.json` following the [server.json schema](https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json)
2. Update `metadata.count`
3. Run `node scripts/generate-registry-endpoints.js` to regenerate `docs/` (or let the CI action do it on push)
4. Push to `main`
