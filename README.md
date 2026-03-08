<div align="center">

# webext-user-scripts

Typed userScripts API helpers for Chrome extensions. Register, update, and manage user scripts in Manifest V3.

[![npm version](https://img.shields.io/npm/v/webext-user-scripts)](https://www.npmjs.com/package/webext-user-scripts)
[![npm downloads](https://img.shields.io/npm/dm/webext-user-scripts)](https://www.npmjs.com/package/webext-user-scripts)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/webext-user-scripts)

[Installation](#installation) · [Quick Start](#quick-start) · [API](#api) · [License](#license)

</div>

---

## Features

- **Register scripts** -- inject user scripts into matching pages
- **Update scripts** -- modify registered scripts at runtime
- **Unregister** -- remove scripts cleanly
- **Get all** -- list currently registered user scripts
- **World configuration** -- configure the user script execution world
- **Typed** -- full TypeScript support for the MV3 userScripts API

## Installation

```bash
npm install webext-user-scripts
```

<details>
<summary>Other package managers</summary>

```bash
pnpm add webext-user-scripts
# or
yarn add webext-user-scripts
```

</details>

## Quick Start

```typescript
import { UserScripts } from "webext-user-scripts";

await UserScripts.register([{
  id: "my-script",
  matches: ["*://example.com/*"],
  js: [{ code: 'console.log("injected!")' }],
}]);

const scripts = await UserScripts.getAll();
await UserScripts.unregister(["my-script"]);
```

## API

| Method | Description |
|--------|-------------|
| `register(scripts)` | Register user scripts |
| `update(scripts)` | Update registered scripts |
| `unregister(ids)` | Unregister scripts by ID |
| `getAll()` | List all registered user scripts |
| `configureWorld(config)` | Configure the user script execution world |

## Permissions

```json
{ "permissions": ["userScripts"] }
```

## Part of @zovo/webext

This package is part of the [@zovo/webext](https://github.com/theluckystrike) family -- typed, modular utilities for Chrome extension development:

| Package | Description |
|---------|-------------|
| [webext-storage](https://github.com/theluckystrike/webext-storage) | Typed storage with schema validation |
| [webext-messaging](https://github.com/theluckystrike/webext-messaging) | Type-safe message passing |
| [webext-tabs](https://github.com/theluckystrike/webext-tabs) | Tab query helpers |
| [webext-cookies](https://github.com/theluckystrike/webext-cookies) | Promise-based cookies API |
| [webext-i18n](https://github.com/theluckystrike/webext-i18n) | Internationalization toolkit |

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License -- see [LICENSE](LICENSE) for details.

---

<div align="center">

Built by [theluckystrike](https://github.com/theluckystrike) · [zovo.one](https://zovo.one)

</div>
