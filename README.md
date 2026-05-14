# playwright-mcp-registry

A minimal MCP server registry containing only the [Playwright MCP server](https://github.com/microsoft/playwright-mcp), hosted on GitHub Pages.

Used to restrict GitHub Copilot org MCP access to Playwright only via **Registry only** policy.

## How it works

A Node.js script reads `mcp-registry.json` and generates `index.html` files in a directory structure under `docs/`. GitHub Pages serves `/path/index.html` at `/path/`, satisfying all three required MCP registry endpoints.

## Setup

1. **Create a public GitHub repo** and push these files
2. **Enable GitHub Pages**: Repo Settings → Pages → Source: **GitHub Actions**
3. Push to `main` — the workflow generates and deploys the registry automatically
4. Your registry URL will be: `https://<your-org>.github.io/<repo-name>`

> ⚠️ The repo must be **public** — GitHub Copilot cannot fetch from private GitHub Pages.

## GitHub Copilot org setup

1. Go to **Org Settings → Copilot → Policies**
2. Ensure **MCP servers in Copilot** is **Enabled**
3. Set **MCP Registry URL** to your GitHub Pages URL (no trailing slash, no `/v0.1/servers`)
4. Set **Restrict MCP access to registry servers** → **Registry only**

## Updating the Playwright version

1. Edit `mcp-registry.json` — update `version` and the `packages[].version`
2. Push to `main` — the action redeploys automatically

Check latest version: https://www.npmjs.com/package/@playwright/mcp
