# webext-user-scripts

[![npm version](https://img.shields.io/npm/v/webext-user-scripts)](https://www.npmjs.com/package/webext-user-scripts)
[![GitHub stars](https://img.shields.io/github/stars/theluckystrike/webext-user-scripts)](https://github.com/theluckystrike/webext-user-scripts/stargazers)
[![License](https://img.shields.io/github/license/theluckystrike/webext-user-scripts)](LICENSE)
[![Last commit](https://img.shields.io/github/last-commit/theluckystrike/webext-user-scripts)](https://github.com/theluckystrike/webext-user-scripts/commits)
[![Node.js CI](https://github.com/theluckystrike/webext-user-scripts/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/webext-user-scripts/actions/workflows/ci.yml)

Typed helpers for the Chrome userScripts API — register, update, and manage user scripts in Manifest V3 extensions.

## Why This Library?

The Chrome [User Scripts API](https://developer.chrome.com/docs/extensions/develop/concepts/user-scripts) is a powerful but relatively new API in Manifest V3 that allows extensions to register scripts dynamically at runtime. Unlike content scripts declared in the manifest, user scripts offer:

- **Dynamic registration**: Register and unregister scripts without reloading the extension
- **Isolated world**: Run scripts in their own JavaScript context, separate from the page
- **No manifest declaration**: Scripts can be added/modified without touching manifest.json
- **Direct DOM access**: Scripts can interact with the page's DOM directly
- **MAIN world execution**: Run in the same context as the page's JavaScript

The raw API can be tricky to use correctly with TypeScript. This library provides a clean, typed wrapper that makes working with user scripts seamless.

## Features

- **`register`** — Register one or more user scripts with full type safety
- **`update`** — Update existing scripts (change code, matches, run timing, etc.)
- **`unregister`** — Unregister specific scripts by ID
- **`unregisterAll`** — Clear all registered scripts
- **`getRegistered`** — List all currently registered scripts with optional filtering
- **`getById`** — Get a specific script by its ID
- **`isRegistered`** — Check if a script with a given ID exists
- **World config** — Support for both `USER_SCRIPT` and `MAIN` worlds

## Installation

```bash
npm install webext-user-scripts
```

Or with pnpm:

```bash
pnpm add webext-user-scripts
```

## Requirements

- **Chrome 120+** (or Chromium-based browsers supporting the User Scripts API)
- **Manifest V3**
- **Permission**: `"userScripts"` in your manifest
- **Developer mode**: Must be enabled in `chrome://extensions`

Add to your `manifest.json`:

```json
{
  "permissions": ["userScripts"]
}
```

## Usage

### Basic Registration

Register a user script that runs on Google:

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

Get all registered scripts, check existence, and manage lifecycle:

```typescript
// Get all registered scripts
const scripts = await UserScripts.getRegistered();

// Get a specific script by ID
const script = await UserScripts.getById('my-script');

// Check if a script is registered
const isRegistered = await UserScripts.isRegistered('my-script');

// Update a script's configuration
await UserScripts.update([{
  id: 'my-script',
  runAt: 'document_start'
}]);

// Unregister specific scripts
await UserScripts.unregister({ ids: ['my-script'] });

// Unregister all scripts
await UserScripts.unregisterAll();
```

### Using External Files

Load scripts from external files instead of inline code:

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

Run scripts in the page's main JavaScript context:

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
| `getRegistered(filter?)` | Get all registered scripts, optionally filtered by IDs |
| `getById(id)` | Get a specific script by ID |
| `isRegistered(id)` | Check if a script exists |
| `update(scripts)` | Update existing scripts |
| `unregister(filter)` | Unregister scripts by ID(s) |
| `unregisterAll()` | Unregister all user scripts |

### `UserScripts.register(scripts: UserScript[]): Promise<void>`

Registers one or more user scripts.

```typescript
await UserScripts.register([{
  id: 'my-script',
  matches: ['<all_urls>'],
  js: [{ code: 'alert("Hello!");' }],
  world: 'USER_SCRIPT'
}]);
```

### `UserScripts.getRegistered(filter?: UserScriptFilter): Promise<UserScript[]>`

Returns all registered user scripts, optionally filtered by IDs.

```typescript
const allScripts = await UserScripts.getRegistered();
const specificScripts = await UserScripts.getRegistered({ ids: ['script-1', 'script-2'] });
```

### `UserScripts.unregister(filter?: UserScriptFilter): Promise<void>`

Unregisters one or more user scripts by ID.

```typescript
await UserScripts.unregister({ ids: ['my-script'] });
```

### `UserScripts.update(scripts: UserScript[]): Promise<void>`

Updates one or more existing user scripts.

```typescript
await UserScripts.update([{
  id: 'my-script',
  runAt: 'document_idle'
}]);
```

### `UserScripts.unregisterAll(): Promise<void>`

Unregisters all user scripts.

```typescript
await UserScripts.unregisterAll();
```

### `UserScripts.isRegistered(id: string): Promise<boolean>`

Checks if a user script with the given ID is registered.

```typescript
const exists = await UserScripts.isRegistered('my-script');
```

### `UserScripts.getById(id: string): Promise<UserScript | undefined>`

Gets a registered user script by ID.

```typescript
const script = await UserScripts.getById('my-script');
if (script) {
  console.log(script.id, script.matches);
}
```

## TypeScript Types

### `UserScript`

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
```

### `UserScriptFilter`

```typescript
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

This package is part of the **@zovo/webext** collection — a suite of typed helpers for building Chrome extensions with TypeScript.

- [webext-user-scripts](https://github.com/theluckystrike/webext-user-scripts) — User Scripts API helpers
- [webext-storage](https://github.com/theluckystrike/webext-storage) — Typed storage API helpers
- [webext-messaging](https://github.com/theluckystrike/webext-messaging) — Type-safe messaging between extension contexts

## Project Structure

```
webext-user-scripts/
├── src/
│   ├── index.ts        # Main source code
│   └── index.test.ts   # Test suite
├── LICENSE             # MIT License
├── package.json        # Package configuration
├── tsconfig.json       # TypeScript configuration
└── README.md           # This file
```

## License

MIT License - see [LICENSE](LICENSE) for details.

---

Built at [zovo.one](https://zovo.one) by [theluckystrike](https://github.com/theluckystrike)

Part of the **[@zovo/webext](https://github.com/theluckystrike/webext)** ecosystem.
