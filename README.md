# webext-user-scripts

[![npm version](https://img.shields.io/npm/v/webext-user-scripts.svg)](https://www.npmjs.com/package/webext-user-scripts)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Typed helpers for the Chrome [userScripts API](https://developer.chrome.com/docs/extensions/reference/api/userScripts) — register, update, and manage user scripts in Manifest V3 extensions.

## Why This Exists

The Chrome userScripts API is a powerful but niche addition to Manifest V3 that allows extensions to register scripts that run in the "user script" world — a isolated context separate from both the extension's content scripts and the page's own JavaScript. This enables:

- **User script injection** — Allow users to install scripts that modify web pages
- **Isolated execution** — Scripts run in a sandbox separate from the page and extension
- **Cross-extension scripting** — Share scripts between extensions using the shared userScripts API

However, the raw API is:
- **Poorly documented** — The official docs are sparse on details
- **Tricky to use correctly** — Type safety is minimal, errors are cryptic
- **Untyped** — Raw JavaScript with no IntelliSense support

This wrapper provides:
- **Full TypeScript support** — Every method and type is typed
- **Safe API surface** — Clear error messages when things go wrong
- **Convenience methods** — Common operations simplified

## Features

- ✅ **Register user scripts** — Define scripts with matches, JS content, and execution context
- ✅ **Update scripts** — Modify existing registered scripts in place
- ✅ **Unregister scripts** — Remove specific scripts or all at once
- ✅ **List registered scripts** — Query what's currently registered
- ✅ **World configuration** — Choose between `USER_SCRIPT` (isolated) or `MAIN` (page) world
- ✅ **TypeScript-first** — Complete type definitions included

## Installation

```bash
npm install webext-user-scripts
```

## Requirements

- **Chrome 120+** — The userScripts API was introduced in Chrome 120
- **`userScripts` permission** — Must be declared in manifest.json
- **Developer mode** — Must be enabled in `chrome://extensions`

### manifest.json

```json
{
  "name": "My User Script Extension",
  "version": "1.0.0",
  "manifest_version": 3,
  "permissions": ["userScripts"],
  "host_permissions": ["<all_urls>"]
}
```

## Quick Start

```typescript
import { UserScripts, type UserScript } from 'webext-user-scripts';

// Define a user script
const myScript: UserScript = {
  id: 'my-script',
  matches: ['https://*.google.com/*'],
  js: [{ code: 'console.log("Hello from user script!");' }],
  world: 'USER_SCRIPT',
  runAt: 'document_start'
};

// Register the script
await UserScripts.register([myScript]);

// Check if registered
const isRegistered = await UserScripts.isRegistered('my-script');
console.log('Script registered:', isRegistered);

// Get all registered scripts
const scripts = await UserScripts.getRegistered();
console.log('Registered scripts:', scripts);

// Update the script (e.g., change runAt)
await UserScripts.update([{
  id: 'my-script',
  runAt: 'document_idle'
}]);

// Unregister when done
await UserScripts.unregister({ ids: ['my-script'] });

// Or unregister all scripts
await UserScripts.unregisterAll();
```

## API Reference

### `UserScripts.register(scripts: UserScript[]): Promise<void>`

Registers one or more user scripts. Each script requires:
- `id` (required) — Unique identifier for the script
- `matches` (required) — URL patterns where the script runs
- `js` (required) — Array of script sources (code or file)

Optional properties:
- `excludeMatches` — URL patterns to exclude
- `runAt` — When to inject: `document_start`, `document_end`, or `document_idle`
- `allFrames` — Inject into all frames (default: false)
- `world` — Execution context: `USER_SCRIPT` (isolated) or `MAIN` (page)

### `UserScripts.getRegistered(filter?: UserScriptFilter): Promise<UserScript[]>`

Returns all registered user scripts. Optionally filter by IDs.

```typescript
// Get all scripts
const all = await UserScripts.getRegistered();

// Get specific scripts
const filtered = await UserScripts.getRegistered({ ids: ['script-1', 'script-2'] });
```

### `UserScripts.unregister(filter?: UserScriptFilter): Promise<void>`

Unregisters one or more user scripts. Use an empty filter to unregister all.

```typescript
// Unregister specific scripts
await UserScripts.unregister({ ids: ['my-script'] });

// Unregister all scripts
await UserScripts.unregister({});
```

### `UserScripts.update(scripts: UserScript[]): Promise<void>`

Updates one or more existing user scripts. Only provided properties are updated.

```typescript
await UserScripts.update([{
  id: 'my-script',
  runAt: 'document_end',
  js: [{ code: 'console.log("Updated!");' }]
}]);
```

### `UserScripts.unregisterAll(): Promise<void>`

Convenience method to unregister all user scripts.

### `UserScripts.isRegistered(id: string): Promise<boolean>`

Checks if a user script with the given ID is currently registered.

### `UserScripts.getById(id: string): Promise<UserScript | undefined>`

Gets a registered user script by its ID. Returns `undefined` if not found.

## Types

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

## World Configuration

The `world` property determines the JavaScript context where your script runs:

| World | Description |
|-------|-------------|
| `USER_SCRIPT` | Isolated world, separate from the page. Best for security. Shares across extensions using userScripts API. |
| `MAIN` | Same context as the page's own JavaScript. Can access/modify page variables directly. |

## Permissions

### Required
- `userScripts` — Required to use the API

### Optional (but often needed)
- Host permissions for the URLs you want to match (e.g., `https://*/*`, `<all_urls>`)

### Developer Mode

The userScripts API **requires Developer Mode to be enabled** in Chrome. Users must:
1. Go to `chrome://extensions`
2. Enable "Developer mode" toggle
3. (For unpacked extensions) Reload your extension after any changes

## Browser Support

| Browser | Minimum Version |
|---------|-----------------|
| Chrome | 120+ |
| Edge | 120+ (Chromium-based) |

> **Note:** The userScripts API is a Chrome-only feature. Firefox and Safari do not currently support it.

## Part of @zovo/webext

`webext-user-scripts` is part of the **@zovo/webext** family of TypeScript libraries for Chrome extension development:

- [webext-user-scripts](https://github.com/theluckystrike/webext-user-scripts) — userScripts API helpers
- [webext-content-scripts](https://github.com/theluckystrike/webext-content-scripts) — Content script utilities
- [webext-messaging](https://github.com/theluckystrike/webext-messaging) — Extension messaging
- [webext-storage](https://github.com/theluckystrike/webext-storage) — Storage abstractions

## License

MIT License — see [LICENSE](LICENSE) for details.

---

[zovo.one](https://zovo.one) · [GitHub](https://github.com/theluckystrike/webext-user-scripts)
