# Contributing to webext-user-scripts

Thank you for your interest in contributing! This project aims to provide TypeScript helpers for the Chrome userScripts API.

## Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/theluckystrike/webext-user-scripts.git
   cd webext-user-scripts
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

4. Run tests:
   ```bash
   npm test
   ```

## Project Structure

```
webext-user-scripts/
├── src/
│   ├── index.ts        # Main source code
│   └── index.test.ts   # Tests
├── package.json
├── tsconfig.json
└── README.md
```

## Code Style

- Use TypeScript with strict mode enabled
- Follow existing code patterns
- Add JSDoc comments for public APIs
- Run `npm run build` before submitting

## Testing

Since this library interacts with the Chrome `userScripts` API, tests require Chrome 120+ with developer mode enabled. Tests are written with Vitest.

Run tests:
```bash
npm test
```

## Submitting Changes

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Make your changes
4. Run tests and build
5. Commit with clear messages
6. Push to your fork
7. Open a pull request

## Issues

Found a bug or have a feature request? Please open an issue on GitHub with:
- Clear description
- Steps to reproduce (for bugs)
- Expected vs actual behavior

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
