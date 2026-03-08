# webext-user-scripts

[![npm version](https://img.shields.io/npm/v/webext-user-scripts.svg)](https://www.npmjs.com/package/webext-user-scripts)
[![npm downloads](https://img.shields.io/npm/dm/webext-user-scripts.svg)](https://www.npmjs.com/package/webext-user-scripts)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)

TypeScript-friendly helpers for the Chrome [User Scripts API](https://developer.chrome.com/docs/extensions/reference/api/userScripts) — a powerful Manifest V3 API that enables extensions to register and manage user scripts programmatically.

## Why This Library?

The Chrome User Scripts API is relatively new and can be tricky to use:

- **Type safety** — Full TypeScript support with proper interfaces for all API parameters
- **Convenience methods** — Helpers like `isRegistered()` and `getById()` that the raw API doesn't provide
- **World configuration** — Easily configure whether scripts run in the `USER_SCRIPT` or `MAIN` world
- **Manifest V3 ready** — Built specifically for the modern Chrome extension platform

## Features

- **Register** user scripts with full configuration options
- **Update** existing user scripts in place
- **Unregister** individual scripts or all scripts
- **List** registered scripts with filtering
- **World config** — Support for both `USER_SCRIPT` and `MAIN` execution contexts
- **Lightweight** — Zero runtime dependencies

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

## Usage

### Basic Registration

```typescript
import { UserScripts } from 'webext-user-scripts';

// Register a user script
await UserScripts.register([{
  id: 'my-script',
  matches: ['https://*.google.com/*'],
  js: [{ code: 'console.log("Hello from user script!");' }],
  world: 'USER_SCRIPT'
}]);
```

### Checking Registration Status

```typescript
import { UserScripts } from 'webext-user-scripts';

// Check if a script is registered
const isRegistered = await UserScripts.isRegistered('my-script');
console.log('Script registered:', isRegistered);

// Get a specific script by ID
const script = await UserScripts.getById('my-script');
if (script) {
  console.log('Script matches:', script.matches);
}
```

### Updating Scripts

```typescript
import { UserScripts } from 'webext-user-scripts';

// Update a user script
await UserScripts.update([{
  id: 'my-script',
  runAt: 'document_start',
  js: [{ code: 'console.log("Updated!");' }]
}]);
```

### Listing and Unregistering

```typescript
import { UserScripts } from 'webext-user-scripts';

// Get all registered scripts
const scripts = await UserScripts.getRegistered();
console.log('Registered scripts:', scripts);

// Unregister specific scripts
await UserScripts.unregister({ ids: ['my-script'] });

// Unregister all scripts
await UserScripts.unregisterAll();
```

## API Reference

### `UserScripts.register(scripts)`

Registers one or more user scripts.

**Parameters:**
- `scripts: UserScript[]` — Array of user script objects

**Returns:** `Promise<void>`

### `UserScripts.getRegistered(filter?)`

Returns all registered user scripts, optionally filtered.

**Parameters:**
- `filter?: UserScriptFilter` — Optional filter object

**Returns:** `Promise<UserScript[]>`

### `UserScripts.unregister(filter?)`

Unregisters one or more user scripts.

**Parameters:**
- `filter?: UserScriptFilter` — Optional filter object with `ids` array

**Returns:** `Promise<void>`

### `UserScripts.update(scripts)`

Updates one or more user scripts.

**Parameters:**
- `scripts: UserScript[]` — Array of user script objects with IDs to update

**Returns:** `Promise<void>`

### `UserScripts.unregisterAll()`

Unregisters all user scripts.

**Returns:** `Promise<void>`

### `UserScripts.isRegistered(id)`

Checks if a user script with the given ID is registered.

**Parameters:**
- `id: string` — The script ID to check

**Returns:** `Promise<boolean>`

### `UserScripts.getById(id)`

Gets a registered user script by ID.

**Parameters:**
- `id: string` — The script ID to retrieve

**Returns:** `Promise<UserScript | undefined>`

## Permissions

To use this library, your extension needs:

1. **`"userScripts"` permission** in `manifest.json`:

```json
{
  "permissions": ["userScripts"]
}
```

2. **Developer mode enabled** — The User Scripts API only works when the extension is installed in Developer mode.

## Browser Support

- **Chrome** 120+ (full support)
- **Edge** 120+ (Chromium-based, full support)

The User Scripts API is a Chrome-specific API. Other browsers may not support it.

## Part of @zovo/webext

This library is part of the [@zovo/webext](https://github.com/zovo) collection of TypeScript utilities for building modern Chrome extensions.

## Related

- [Chrome User Scripts API Documentation](https://developer.chrome.com/docs/extensions/reference/api/userScripts)
- [Chrome Extensions Documentation](https://developer.chrome.com/docs/extensions)
- [Manifest V3 Migration Guide](https://developer.chrome.com/docs/extensions/mv3/intro)

---

[zovo.one](https://zovo.one)
