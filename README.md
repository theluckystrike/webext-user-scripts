# webext-user-scripts

[![GitHub stars](https://img.shields.io/github/stars/theluckystrike/webext-user-scripts)](https://github.com/theluckystrike/webext-user-scripts/stargazers)
[![License](https://img.shields.io/github/license/theluckystrike/webext-user-scripts)](LICENSE)
[![Last commit](https://img.shields.io/github/last-commit/theluckystrike/webext-user-scripts)](https://github.com/theluckystrike/webext-user-scripts/commits)

A TypeScript-friendly wrapper for the Chrome User Scripts API (Manifest V3). This library provides a clean, typed interface for registering, managing, and updating user scripts in Chrome extensions.

## What are User Scripts?

User Scripts are JavaScript files that run in the context of web pages, similar to content scripts but with some key differences:

- **Isolated world**: User scripts run in their own JavaScript world, separate from the page and content scripts
- **No manifest required**: Unlike content scripts, user scripts don't need to be declared in manifest.json
- **Dynamic registration**: Scripts can be registered and unregistered at runtime
- **Direct DOM access**: Scripts can access the page's DOM directly

## Installation

```bash
npm install webext-user-scripts
```

## Requirements

- Chrome 120+ (or Chromium-based browsers supporting the User Scripts API)
- Manifest V3
- TypeScript 5.0+ (for TypeScript projects)

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

### Managing Scripts

```typescript
// Get all registered scripts
const scripts = await UserScripts.getRegistered();

// Get scripts by ID
const script = await UserScripts.getById('my-script');

// Check if a script is registered
const isRegistered = await UserScripts.isRegistered('my-script');

// Update a script
await UserScripts.update([{
  id: 'my-script',
  runAt: 'document_start'
}]);

// Unregister a script
await UserScripts.unregister({ ids: ['my-script'] });

// Unregister all scripts
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

## API Reference

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
