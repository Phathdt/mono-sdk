# mono-sdk

A TypeScript monorepo with multiple packages, built with Turborepo, tsdown, and Release Please.

## Requirements

- Node.js >= 22.0.0
- Yarn 1.x

## Packages

| Package            | Description                           |
| ------------------ | ------------------------------------- |
| `@phathdt/mono-1` | Base utilities package                |
| `@phathdt/mono-2` | Extended features (depends on mono-1) |
| `@phathdt/mono-3` | Additional features (depends on mono-1) |

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
│   ├── mono-2/          # Extended package (imports mono-1)
│   └── mono-3/          # Additional package (imports mono-1)
├── .github/workflows/   # CI/CD
│   ├── ci.yml           # Build & typecheck
│   ├── release.yml      # Stable releases (main)
│   └── release-beta.yml # Beta releases (develop)
├── turbo.json           # Turborepo config
└── package.json         # Workspace root
```

## Release Workflow

Uses [Release Please](https://github.com/googleapis/release-please) with conventional commits.

| Branch    | Release Type | npm Tag  | Example      |
| --------- | ------------ | -------- | ------------ |
| `main`    | Stable       | `latest` | 1.0.0        |
| `develop` | Beta         | `beta`   | 1.0.0-beta.0 |

### Creating a Release

1. Use conventional commits:
   ```bash
   git commit -m "feat: add new feature"
   git commit -m "fix: resolve bug"
   ```

2. Push to main - Release Please creates a Release PR automatically

3. Merge the Release PR - packages are published to npm

### Conventional Commit Types

| Type     | Release | Description          |
| -------- | ------- | -------------------- |
| `feat`   | minor   | New feature          |
| `fix`    | patch   | Bug fix              |
| `docs`   | -       | Documentation only   |
| `chore`  | -       | Maintenance          |
| `BREAKING CHANGE` | major | Breaking change |

## Available Scripts

| Script              | Description                  |
| ------------------- | ---------------------------- |
| `yarn build`        | Clean and build all packages |
| `yarn dev`          | Watch mode                   |
| `yarn typecheck`    | Type check all packages      |
| `yarn lint`         | Lint all packages            |
| `yarn lint:fix`     | Lint and auto-fix issues     |
| `yarn format`       | Format code with Prettier    |
| `yarn format:check` | Check formatting             |
| `yarn clean`        | Clean build artifacts        |

## Installation

```bash
# Install packages
yarn add @phathdt/mono-1 @phathdt/mono-2 @phathdt/mono-3
```

## License

MIT
