# hatfield-mcp-registry

A minimal MCP server registry containing only approved servers, hosted on GitHub Pages:

- [Playwright MCP server](https://github.com/microsoft/playwright-mcp)

Used to restrict [Hatfield Media](https://github.com/hatfieldmedia) GitHub Copilot org MCP access to only these servers via **Registry only** policy.

> **Note on local/command-based servers (e.g. Laravel Boost):** Copilot CLI/VS Code enforce the allowlist by computing a "fingerprint" of the locally configured server and comparing it to one derived from the registry entry. The fingerprint can only be computed when the server's launch `command` is one of a fixed set recognized by GitHub's `@github/mcp-registry` package: `npx`/`npm`, `uvx`/`pip`, `dotnet`, `docker`, `brew`, `mcpb`. Servers launched via any other command (e.g. `php artisan boost:mcp` for Laravel Boost) will always report "unable to compute fingerprint from local configuration" and be blocked, **regardless of registry configuration**. Laravel Boost was removed from this registry for that reason — do not re-add it unless GitHub extends this command list, or unless it's wrapped in one of the supported launchers (e.g. a `docker` invocation).

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
2. Push to `master` — the action redeploys automatically

Check latest versions:
- Playwright: https://www.npmjs.com/package/@playwright/mcp

## Adding a new server

1. Add an entry to `servers` in `mcp-registry.json` following the [server.json schema](https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json)
2. Update `metadata.count`
3. Run `node scripts/generate-registry-endpoints.js` to regenerate `docs/` (or let the CI action do it on push)
4. Push to `master`
5. **Before adding a local/command-based server**, confirm its launch `command` is one of: `npx`, `npm`, `uvx`, `pip`, `dotnet`, `docker`, `brew`, `mcpb`. If not, the server cannot pass Copilot's fingerprint verification and will be blocked no matter how it's configured here (see note above).
