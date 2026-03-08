# Contributing to webext-user-scripts

Thank you for your interest in contributing! This document outlines the process for contributing to this project.

## Getting Started

1. **Fork the repository**
   
   Click the "Fork" button on the repository page to create your own copy.

2. **Clone your fork**
   
   ```bash
   git clone https://github.com/YOUR_USERNAME/webext-user-scripts.git
   cd webext-user-scripts
   ```

3. **Install dependencies**
   
   This project uses pnpm for package management:
   
   ```bash
   pnpm install
   ```

4. **Create a feature branch**
   
   ```bash
   git checkout -b feature/my-new-feature
   ```

## Development

### Running Tests

```bash
pnpm test
```

### Building

```bash
pnpm build
```

### Type Checking

```bash
pnpm exec tsc --noEmit
```

## Making Changes

1. Make your changes in your feature branch
2. Ensure all tests pass: `pnpm test`
3. Ensure type checking passes: `pnpm exec tsc --noEmit`
4. Build the project: `pnpm build`
5. Commit your changes with a descriptive message
6. Push to your fork
7. Create a Pull Request

## Pull Request Guidelines

- Describe what your changes do and why they're needed
- Link any related issues
- Ensure all tests and checks pass
- Update documentation if needed

## Code Style

- Use TypeScript
- Follow existing code conventions
- Add tests for new functionality
- Keep changes focused and atomic

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
