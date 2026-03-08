# webext-user-scripts

[![npm version](https://img.shields.io/npm/v/webext-user-scripts.svg)](https://www.npmjs.com/package/webext-user-scripts)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-3178c6.svg)](https://www.typescriptlang.org/)
[![CI](https://github.com/theluckystrike/webext-user-scripts/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/webext-user-scripts/actions/workflows/ci.yml)

Typed helpers for the Chrome [UserScripts API](https://developer.chrome.com/docs/extensions/reference/api/userScripts) — register, update, and manage user scripts in Manifest V3.

## Why This Library?

The Chrome UserScripts API is a powerful but relatively new API introduced in Chrome 120+. It allows extensions to register user scripts that run in web pages with access to the extension's DOM APIs, separate from content scripts. However, the raw API is:

- **Poorly documented** — The official Chrome documentation provides minimal guidance
- **Tricky to use correctly** — Type safety is lacking, and error handling is verbose
- **New and unfamiliar** — Many developers aren't aware of its capabilities

This library provides a **type-safe, promise-based wrapper** that makes working with user scripts simple and safe.

## Features

- **Register user scripts** — Easily register one or more user scripts with full type safety
- **Update scripts** — Modify existing registered scripts in place
- **Unregister scripts** — Remove scripts by ID or unregister all at once
- **List registered scripts** — Query all registered scripts with optional filtering
- **World configuration** — Support for both `USER_SCRIPT` and `MAIN` execution worlds
- **Part of @zovo/webext** — Designed to work seamlessly with other Zovo web extension utilities

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

## Quick Start

### Register a User Script

```typescript
import { UserScripts } from 'webext-user-scripts';

await UserScripts.register([
  {
    id: 'my-script',
    matches: ['https://*.google.com/*', 'https://example.com/*'],
    js: [{ code: 'console.log("Hello from user script!");' }],
    world: 'USER_SCRIPT',
    runAt: 'document_start',
    allFrames: false,
  },
]);
```

### Update a User Script

```typescript
await UserScripts.update([
  {
    id: 'my-script',
    runAt: 'document_end', // Change the run time
    js: [{ code: 'console.log("Updated script!");' }],
  },
]);
```

### List All Registered Scripts

```typescript
const scripts = await UserScripts.getRegistered();
console.log(`Found ${scripts.length} registered scripts`);

for (const script of scripts) {
  console.log(`Script ID: ${script.id}, Matches: ${script.matches?.join(', ')}`);
}
```

### Check if a Script is Registered

```typescript
const isRegistered = await UserScripts.isRegistered('my-script');
if (isRegistered) {
  console.log('Script is active!');
}
```

### Get a Script by ID

```typescript
const script = await UserScripts.getById('my-script');
if (script) {
  console.log(`Found script: ${script.id}`);
}
```

### Unregister a Script

```typescript
await UserScripts.unregister({ ids: ['my-script'] });
```

### Unregister All Scripts

```typescript
await UserScripts.unregisterAll();
```

## API Reference

| Method | Description | Returns |
|--------|-------------|---------|
| `UserScripts.register(scripts)` | Registers one or more user scripts | `Promise<void>` |
| `UserScripts.getRegistered(filter?)` | Returns all registered user scripts, optionally filtered by IDs | `Promise<UserScript[]>` |
| `UserScripts.update(scripts)` | Updates one or more existing user scripts | `Promise<void>` |
| `UserScripts.unregister(filter?)` | Unregisters one or more user scripts by ID | `Promise<void>` |
| `UserScripts.unregisterAll()` | Unregisters all user scripts | `Promise<void>` |
| `UserScripts.isRegistered(id)` | Checks if a user script with the given ID is registered | `Promise<boolean>` |
| `UserScripts.getById(id)` | Gets a registered user script by ID | `Promise<UserScript \| undefined>` |

### Types

#### `UserScript`

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

#### `UserScriptFilter`

```typescript
interface UserScriptFilter {
  ids?: string[];
}
```

## Permissions

To use the UserScripts API, your extension needs:

1. **`userScripts` permission** in your `manifest.json`:

```json
{
  "permissions": ["userScripts"]
}
```

2. **Developer mode** must be enabled in Chrome (users need to enable this manually in `chrome://extensions`)

### Manifest V3 Configuration

Ensure your `manifest.json` is using Manifest V3:

```json
{
  "manifest_version": 3
}
```

## Browser Support

| Browser | Minimum Version |
|---------|-----------------|
| Chrome | 120+ |
| Edge | 120+ (Chromium-based) |

> **Note:** The UserScripts API is a Chrome-specific API. It is not available in Firefox, Safari, or other browsers at this time.

## Part of @zovo/webext

This library is part of the **@zovo/webext** ecosystem — a collection of TypeScript utilities for building Chrome extensions. Check out our other packages for more functionality:

- `@zovo/webext` — Core utilities and helpers

## License

MIT License — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  <a href="https://zovo.one">
    <img src="https://zovo.one/logo.svg" alt="Zovo" width="100" />
  </a>
  <br />
  Part of <a href="https://zovo.one">Zovo</a>
</p>
