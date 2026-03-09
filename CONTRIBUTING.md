# Contributing to webext-user-scripts

Thank you for your interest in contributing! This document outlines the process for contributing to this project.

## Getting Started

1. **Fork the repository** — Click the "Fork" button on GitHub
2. **Clone your fork** — `git clone https://github.com/YOUR_USERNAME/webext-user-scripts.git`
3. **Add the upstream remote** — `git remote add upstream https://github.com/theluckystrike/webext-user-scripts.git`

## Development Setup

This project uses [pnpm](https://pnpm.io/) for package management. If you don't have pnpm installed, you can install it via:

```bash
npm install -g pnpm
```

### Install Dependencies

```bash
pnpm install
```

### Build the Project

```bash
pnpm run build
```

### Run Tests

```bash
pnpm run test
```

## Creating a Branch

Create a new branch for your feature or bugfix:

```bash
git checkout -b feature/your-feature-name
```

Or for bugfixes:

```bash
git checkout -b fix/description-of-fix
```

## Making Changes

1. Make your changes in your feature branch
2. Ensure the code builds and tests pass
3. Commit your changes with a clear commit message:

```bash
git add .
git commit -m "Add feature: description of your changes"
```

## Submitting a Pull Request

1. Push your branch to your fork:

```bash
git push origin feature/your-feature-name
```

2. Open a Pull Request against the `main` branch of the original repository
3. Fill in the PR template with:
   - A clear description of the changes
   - Any related issues or context
   - Testing steps (if applicable)

## Code Style

- Use **TypeScript** for all new code
- Follow the existing code style (ESLint rules are included)
- Add type annotations for function parameters and return types
- Write meaningful variable and function names

## Testing

All new features should include tests. Run the test suite with:

```bash
pnpm run test
```

## Questions?

If you have questions, feel free to open an issue for discussion before submitting a PR.

---

Thank you for contributing!
