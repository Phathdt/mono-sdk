# mono-sdk

A TypeScript monorepo with multiple packages, built with Turborepo and tsdown.

## Requirements

- Node.js >= 22.0.0
- Yarn 1.x

## Packages

| Package           | Description                             |
| ----------------- | --------------------------------------- |
| `@phathdt/mono-1` | Base utilities package                  |
| `@phathdt/mono-2` | Extended features (depends on mono-1)   |
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

## Release Workflow

### Branches

| Branch    | Purpose              | Version Format            | npm Tag  |
| --------- | -------------------- | ------------------------- | -------- |
| `main`    | Stable releases      | `0.0.6`                   | `latest` |
| `develop` | Beta/testing         | `0.0.5-beta.{commit}`     | `beta`   |

### Development Flow

```
feature/* → develop (auto beta) → PR to main → Release PR → stable
```

1. **Feature development**: Branch from `main`, merge to `develop`
2. **Beta testing**: Every push to `develop` auto-publishes beta versions
3. **Stable release**: Create PR from `develop` to `main`, merge Release PR

### Beta Releases (Automatic)

Every push to `develop` automatically publishes beta versions:

```bash
# Packages published with commit hash
@phathdt/mono-1@0.0.5-beta.eab485e
@phathdt/mono-2@0.0.6-beta.eab485e
@phathdt/mono-3@0.0.4-beta.eab485e

# Install beta
yarn add @phathdt/mono-1@beta
```

### Stable Releases (Via PR)

Uses [Release Please](https://github.com/googleapis/release-please) with conventional commits:

1. Push to `main` → Release Please creates Release PR
2. Merge Release PR → publishes stable versions

#### Conventional Commit Types

| Type              | Release | Description     |
| ----------------- | ------- | --------------- |
| `feat`            | minor   | New feature     |
| `fix`             | patch   | Bug fix         |
| `docs`            | -       | Documentation   |
| `chore`           | -       | Maintenance     |
| `BREAKING CHANGE` | major   | Breaking change |

## Available Scripts

| Script              | Description                  |
| ------------------- | ---------------------------- |
| `yarn build`        | Clean and build all packages |
| `yarn dev`          | Watch mode                   |
| `yarn typecheck`    | Type check all packages      |
| `yarn lint`         | Lint all packages            |
| `yarn lint:fix`     | Lint and auto-fix issues     |
| `yarn format`       | Format code with Prettier    |
| `yarn clean`        | Clean build artifacts        |

## Installation

```bash
# Install stable version
yarn add @phathdt/mono-1 @phathdt/mono-2 @phathdt/mono-3

# Install beta version
yarn add @phathdt/mono-1@beta @phathdt/mono-2@beta @phathdt/mono-3@beta
```

## License

MIT
