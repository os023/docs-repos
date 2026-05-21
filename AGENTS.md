# AGENTS.md

## Cursor Cloud specific instructions

This is a brand-new Node.js repository (initial commit only). The `.gitignore` covers Node.js, Next.js, Nuxt.js, Gatsby, Svelte, Vite, and other JS ecosystem tools.

### Environment

- **Node.js**: Managed via `nvm`. The VM ships with Node v22 LTS, npm, pnpm, and yarn pre-installed.
- **No application code** exists yet. Once application code is added, update this file with build/test/lint/run instructions.

### Notes for future agents

- When `package.json` is added, install dependencies with the package manager matching the lockfile (`package-lock.json` → npm, `yarn.lock` → yarn, `pnpm-lock.yaml` → pnpm).
- No services, databases, or external dependencies are required at this time.
- No lint, test, or build commands exist yet.
