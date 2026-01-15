# mono-sdk

A TypeScript monorepo with multiple packages, built with Turborepo, tsdown, and Changesets.

## Requirements

- Node.js >= 22.0.0
- Yarn 1.x

## Packages

| Package            | Description                           |
| ------------------ | ------------------------------------- |
| `@mono-sdk/mono-1` | Base utilities package                |
| `@mono-sdk/mono-2` | Extended features (depends on mono-1) |

## Getting Started

```bash
# Install dependencies
yarn install

# Build all packages
yarn build

# Type check
yarn typecheck

# Development mode (watch)
yarn dev
```

## Project Structure

```
mono-sdk/
├── packages/
│   ├── mono-1/          # Base package
│   └── mono-2/          # Extended package (imports mono-1)
├── .changeset/          # Changesets config
├── .github/workflows/   # CI/CD
│   ├── ci.yml           # Build & typecheck
│   ├── release.yml      # Stable releases (main)
│   └── release-beta.yml # Beta releases (develop)
├── turbo.json           # Turborepo config
└── package.json         # Workspace root
```

## Release Workflow

| Branch    | Release Type | npm Tag  | Example      |
| --------- | ------------ | -------- | ------------ |
| `main`    | Stable       | `latest` | 1.0.0        |
| `develop` | Beta         | `beta`   | 1.0.0-beta.0 |

### Creating a Release

```bash
# 1. Create a changeset
yarn changeset

# 2. Commit and push
git add . && git commit -m "feat: add feature"
git push

# 3. CI handles the rest:
#    - main branch: Creates Version PR → merge → publishes stable
#    - develop branch: Auto-publishes beta versions
```

### Beta Releases

```bash
# Work on develop branch
git checkout develop

# Make changes, create changeset
yarn changeset

# Push - CI auto-publishes as beta
git push
```

### Promote Beta to Stable

```bash
# Exit prerelease mode
yarn prerelease:exit

# Merge develop into main
git checkout main
git merge develop
git push
```

## Available Scripts

| Script                  | Description                      |
| ----------------------- | -------------------------------- |
| `yarn build`            | Clean and build all packages     |
| `yarn dev`              | Watch mode                       |
| `yarn typecheck`        | Type check all packages          |
| `yarn lint`             | Lint all packages                |
| `yarn lint:fix`         | Lint and auto-fix issues         |
| `yarn format`           | Format code with Prettier        |
| `yarn format:check`     | Check formatting                 |
| `yarn clean`            | Clean build artifacts            |
| `yarn ctix`             | Generate index.ts barrel files   |
| `yarn changeset`        | Create a changeset               |
| `yarn version-packages` | Apply changesets                 |
| `yarn release`          | Build and publish                |
| `yarn prerelease:beta`  | Enter beta mode                  |
| `yarn prerelease:exit`  | Exit prerelease mode             |

## Installation

```bash
# Install stable version
yarn add @mono-sdk/mono-1 @mono-sdk/mono-2

# Install beta version
yarn add @mono-sdk/mono-1@beta @mono-sdk/mono-2@beta
```

## License

MIT
