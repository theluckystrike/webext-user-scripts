# webext-user-scripts

[![npm version](https://img.shields.io/npm/v/webext-user-scripts.svg)](https://www.npmjs.com/package/webext-user-scripts)
[![npm downloads](https://img.shields.io/npm/dm/webext-user-scripts.svg)](https://www.npmjs.com/package/webext-user-scripts)
[![License](https://img.shields.io/npm/l/webext-user-scripts.svg)](https://github.com/theluckystrike/webext-user-scripts/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)

A TypeScript-friendly wrapper for the Chrome [User Scripts API](https://developer.chrome.com/docs/extensions/reference/api/userScripts) in Manifest V3 extensions.

## Why This Package?

The Chrome User Scripts API is a powerful but relatively new API introduced in Chrome 120+. It allows extensions to register user scripts that run in isolated worlds, providing a cleaner alternative to content scripts for many use cases. However, the raw API lacks TypeScript support and has some quirks that make it tedious to use directly.

**webext-user-scripts** provides:
- Full TypeScript definitions with autocomplete
- A clean, promise-based API
- Helpful utility methods (`isRegistered`, `getById`, `unregisterAll`)
- Proper error handling

## Features

- **Register** user scripts with full type safety
- **Update** existing registered scripts
- **Unregister** individual scripts or all at once
- **List** all registered scripts with optional filtering
- **World configuration** — run scripts in `USER_SCRIPT` (isolated) or `MAIN` (DOM-accessible) worlds
- **Manifest V3** compatible — works with Chrome 120+

## Installation

```bash
npm install webext-user-scripts
```

Or with pnpm:

```bash
pnpm add webext-user-scripts
```

Or with yarn:

```bash
yarn add webext-user-scripts
```

## Usage Examples

### Basic Registration

Register a simple user script that runs on specific pages:

```typescript
import { UserScripts } from 'webext-user-scripts';

await UserScripts.register([{
  id: 'my-script',
  matches: ['https://*.example.com/*'],
  js: [{ code: 'console.log("Hello from user script!");' }],
  world: 'USER_SCRIPT'
}]);
```

### Using External Files

Load user scripts from external files:

```typescript
import { UserScripts } from 'webext-user-scripts';

await UserScripts.register([{
  id: 'content-script',
  matches: ['https://*.google.com/*'],
  js: [{ file: 'content.js' }],
  runAt: 'document_end',
  world: 'USER_SCRIPT'
}]);
```

### Checking Registration Status

Check if a script is already registered before re-registering:

```typescript
import { UserScripts } from 'webext-user-scripts';

const scriptId = 'my-script';

if (!(await UserScripts.isRegistered(scriptId))) {
  await UserScripts.register([{
    id: scriptId,
    matches: ['https://*.example.com/*'],
    js: [{ code: '// script content' }],
    world: 'USER_SCRIPT'
  }]);
}
```

### Updating Scripts

Update an existing script's configuration:

```typescript
import { UserScripts } from 'webext-user-scripts';

await UserScripts.update([{
  id: 'my-script',
  runAt: 'document_start'  // Change run timing
}]);
```

### Getting Script by ID

Retrieve a specific script's configuration:

```typescript
import { UserScripts } from 'webext-user-scripts';

const script = await UserScripts.getById('my-script');
if (script) {
  console.log('Script matches:', script.matches);
}
```

## API Reference

### `UserScripts.register(scripts)`

Registers one or more user scripts.

**Parameters:**
- `scripts` — Array of `UserScript` objects

**Returns:** `Promise<void>`

**Example:**
```typescript
await UserScripts.register([{
  id: 'my-script',
  matches: ['https://*/*'],
  js: [{ code: 'console.log("Hi");' }]
}]);
```

---

### `UserScripts.getRegistered(filter?)`

Returns all registered user scripts, optionally filtered by IDs.

**Parameters:**
- `filter` (optional) — Object with `ids` array

**Returns:** `Promise<UserScript[]>`

**Example:**
```typescript
const allScripts = await UserScripts.getRegistered();
const specificScripts = await UserScripts.getRegistered({ ids: ['script-1', 'script-2'] });
```

---

### `UserScripts.unregister(filter?)`

Unregisters one or more user scripts.

**Parameters:**
- `filter` (optional) — Object with `ids` array. If empty, unregisters all scripts.

**Returns:** `Promise<void>`

**Example:**
```typescript
await UserScripts.unregister({ ids: ['my-script'] });
// Or unregister all:
await UserScripts.unregister({});
```

---

### `UserScripts.unregisterAll()`

Unregisters all registered user scripts.

**Returns:** `Promise<void>`

**Example:**
```typescript
await UserScripts.unregisterAll();
```

---

### `UserScripts.update(scripts)`

Updates one or existing user scripts. Only specified properties are updated.

**Parameters:**
- `scripts` — Array of `UserScript` objects with IDs

**Returns:** `Promise<void>`

**Example:**
```typescript
await UserScripts.update([{
  id: 'my-script',
  runAt: 'document_idle'
}]);
```

---

### `UserScripts.isRegistered(id)`

Checks if a user script with the given ID is registered.

**Parameters:**
- `id` — Script ID string

**Returns:** `Promise<boolean>`

**Example:**
```typescript
const exists = await UserScripts.isRegistered('my-script');
```

---

### `UserScripts.getById(id)`

Gets a registered user script by its ID.

**Parameters:**
- `id` — Script ID string

**Returns:** `Promise<UserScript | undefined>`

**Example:**
```typescript
const script = await UserScripts.getById('my-script');
if (script) {
  console.log(script.matches);
}
```

---

## UserScript Interface

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Unique identifier for the script |
| `matches` | `string[]` | URL patterns where the script should run |
| `excludeMatches` | `string[]` | URL patterns to exclude |
| `js` | `{ code?: string; file?: string }[]` | Script content or file paths |
| `runAt` | `'document_start' \| 'document_end' \| 'document_idle'` | When to inject the script |
| `allFrames` | `boolean` | Whether to run in all frames |
| `world` | `'USER_SCRIPT' \| 'MAIN'` | Execution world (isolated vs main) |

## Permissions Required

To use the User Scripts API, add the following to your `manifest.json`:

```json
{
  "permissions": ["userScripts"],
  "host_permissions": ["<all_urls>"]
}
```

**Important:** The User Scripts API requires **Developer Mode** to be enabled in `chrome://extensions`.

## Browser Support

| Browser | Minimum Version |
|---------|-----------------|
| Chrome | 120+ |
| Edge | 120+ |

> **Note:** The User Scripts API is Chrome/Chromium-only at this time.

## Part of @zovo/webext

This package is part of the **@zovo/webext** collection — a set of TypeScript utilities for building Chrome extensions.

- [@zovo/webext-storage](https://github.com/theluckystrike/webext-storage) — Typed storage API helpers
- [@zovo/webext-messaging](https://github.com/theluckystrike/webext-messaging) — Type-safe message passing

## License

MIT © [theluckystrike](https://github.com/theluckystrike)

---

[zovo.one](https://zovo.one) · [GitHub](https://github.com/theluckystrike/webext-user-scripts) · [npm](https://www.npmjs.com/package/webext-user-scripts)
