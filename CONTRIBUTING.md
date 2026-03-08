# Contributing to webext-user-scripts

Thank you for your interest in contributing! This document outlines the process for contributing to this project.

## Getting Started

1. **Fork the repository** — Click the "Fork" button on GitHub
2. **Clone your fork:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/webext-user-scripts.git
   cd webext-user-scripts
   ```

3. **Install dependencies:**
   ```bash
   pnpm install
   ```

## Making Changes

1. **Create a new branch:**
   ```bash
   git checkout -b my-feature-branch
   ```

2. **Make your changes** — Ensure your code follows the project's style and conventions

3. **Run tests:**
   ```bash
   pnpm test
   ```

4. **Build the project:**
   ```bash
   pnpm build
   ```

## Submitting a Pull Request

1. **Push your changes:**
   ```bash
   git push origin my-feature-branch
   ```

2. **Open a Pull Request** — Go to the original repository and click "New Pull Request"

3. **Describe your changes** — Include a clear description of what your changes do and why they're needed

## Code Style

- Use TypeScript for all new code
- Follow the existing code style in the project
- Add JSDoc comments for public APIs
- Ensure type safety

## Testing

- Run tests before submitting: `pnpm test`
- Add tests for new functionality
- Ensure all existing tests pass

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
