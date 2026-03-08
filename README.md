# webext-user-scripts

[![npm version](https://img.shields.io/npm/v/webext-user-scripts)](https://www.npmjs.com/package/webext-user-scripts)
[![GitHub stars](https://img.shields.io/github/stars/theluckystrike/webext-user-scripts)](https://github.com/theluckystrike/webext-user-scripts/stargazers)
[![License](https://img.shields.io/github/license/theluckystrike/webext-user-scripts)](LICENSE)
[![Node.js CI](https://github.com/theluckystrike/webext-user-scripts/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/webext-user-scripts/actions/workflows/ci.yml)

Typed helpers for the Chrome userScripts API — register, update, and manage user scripts in Manifest V3 extensions.

## Why This Library?

The Chrome [User Scripts API](https://developer.chrome.com/docs/extensions/develop/concepts/user-scripts) is powerful but new in Manifest V3. Unlike content scripts declared in the manifest, user scripts offer:

- **Dynamic registration** — Register/unregister without reloading the extension
- **Isolated world** — Run scripts in their own JavaScript context
- **No manifest changes** — Add/modify scripts without touching manifest.json
- **MAIN world execution** — Run in the same context as the page's JavaScript

The raw API can be tricky with TypeScript. This library provides a clean, typed wrapper.

## Features

- `register` — Register user scripts with full type safety
- `update` — Update existing scripts
- `unregister` / `unregisterAll` — Remove scripts
- `getRegistered` / `getById` — List and find scripts
- `isRegistered` — Check script existence
- **World config** — Support for both `USER_SCRIPT` and `MAIN` worlds

## Installation

```bash
npm install webext-user-scripts
# or
pnpm add webext-user-scripts
```

## Requirements

- **Chrome 120+** (Chromium-based browsers supporting User Scripts API)
- **Manifest V3**
- **Permission**: `"userScripts"` in manifest.json
- **Developer mode**: Must be enabled in `chrome://extensions`

```json
{
  "permissions": ["userScripts"]
}
```

## Usage

### Basic Registration

```typescript
import { UserScripts } from 'webext-user-scripts';

await UserScripts.register([{
  id: 'my-script',
  matches: ['https://*.google.com/*'],
  js: [{ code: 'console.log("Hello from user script!");' }],
  world: 'USER_SCRIPT'
}]);
```

### Managing Scripts

```typescript
const scripts = await UserScripts.getRegistered();
const script = await UserScripts.getById('my-script');
const exists = await UserScripts.isRegistered('my-script');

await UserScripts.update([{ id: 'my-script', runAt: 'document_start' }]);
await UserScripts.unregister({ ids: ['my-script'] });
await UserScripts.unregisterAll();
```

### Using External Files

```typescript
await UserScripts.register([{
  id: 'content-script',
  matches: ['https://*.example.com/*'],
  js: [{ file: 'user-script.js' }],
  world: 'USER_SCRIPT',
  runAt: 'document_end'
}]);
```

### MAIN World Execution

```typescript
await UserScripts.register([{
  id: 'main-world-script',
  matches: ['https://*.example.com/*'],
  js: [{ code: 'window.myExtensionAPI.init();' }],
  world: 'MAIN'
}]);
```

## API Reference

| Method | Description |
|--------|-------------|
| `register(scripts)` | Register one or more user scripts |
| `getRegistered(filter?)` | Get all registered scripts, optionally filtered |
| `getById(id)` | Get a specific script by ID |
| `isRegistered(id)` | Check if a script exists |
| `update(scripts)` | Update existing scripts |
| `unregister(filter)` | Unregister scripts by ID(s) |
| `unregisterAll()` | Unregister all user scripts |

### Types

```typescript
interface UserScript {
  id: string;
  matches?: string[];
  excludeMatches?: string[];
  js?: { code?: string; file?: string }[];
  runAt?: 'document_start' | 'document_end' | 'document_idle';
  allFrames?: boolean;
  world?: 'USER_SCRIPT' | 'MAIN';
}

interface UserScriptFilter {
  ids?: string[];
}
```

## Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 120+ |
| Edge | 120+ |
| Opera | 106+ |
| Brave | 1.60+ |

## Part of @zovo/webext

This package is part of **@zovo/webext** — typed helpers for Chrome extensions:

- [webext-user-scripts](https://github.com/theluckystrike/webext-user-scripts) — User Scripts API
- [webext-storage](https://github.com/theluckystrike/webext-storage) — Storage API
- [webext-messaging](https://github.com/theluckystrike/webext-messaging) — Type-safe messaging

## License

MIT License — see [LICENSE](LICENSE).

---

Built at [zovo.one](https://zovo.one) by [theluckystrike](https://github.com/theluckystrike)
