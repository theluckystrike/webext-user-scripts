# Contributing to webext-user-scripts

Thank you for your interest in contributing! This guide will help you get started.

## Getting Started

### Fork the Repository

Click the "Fork" button on the GitHub page to create your own copy of the repository.

### Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/webext-user-scripts.git
cd webext-user-scripts
```

### Install Dependencies

This project uses [pnpm](https://pnpm.io/) for package management:

```bash
pnpm install
```

### Create a Branch

Create a new branch for your feature or fix:

```bash
git checkout -b feature/your-feature-name
```

Or for bug fixes:

```bash
git checkout -b fix/description-of-fix
```

## Development

### Build the Project

```bash
pnpm build
```

### Run Tests

```bash
pnpm test
```

### Type Checking

```bash
pnpm typecheck
```

## Making Changes

1. Make your changes in the `src/` directory
2. Ensure all tests pass: `pnpm test`
3. Verify the build works: `pnpm build`
4. Commit your changes with a descriptive message

## Pull Request Process

1. **Push your branch** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open a Pull Request** against the `main` branch of the original repository

3. **Describe your changes** clearly in the PR description:
   - What problem does this fix?
   - What solution does it provide?
   - How can reviewers test this?

4. **Ensure CI passes** — all tests and builds must succeed

## Code Style

- Use TypeScript with strict mode enabled
- Follow existing code conventions in the project
- Add JSDoc comments for public APIs
- Write tests for new functionality

## Questions?

If you have questions about contributing, feel free to open an issue for discussion.

---

Thank you for helping improve **webext-user-scripts**!
