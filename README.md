# webext-user-scripts

A TypeScript-friendly wrapper for the Chrome User Scripts API (Manifest V3).

## Installation

```bash
npm install webext-user-scripts
```

## Usage

```typescript
import { UserScripts } from 'webext-user-scripts';

// Register a user script
await UserScripts.register([{
  id: 'my-script',
  matches: ['https://*.google.com/*'],
  js: [{ code: 'console.log("Hello from user script!");' }],
  world: 'USER_SCRIPT'
}]);

// Get registered scripts
const scripts = await UserScripts.getRegistered();

// Update a script
await UserScripts.update([{
  id: 'my-script',
  runAt: 'document_start'
}]);

// Unregister a script
await UserScripts.unregister({ ids: ['my-script'] });
```

## API

### `UserScripts.register(scripts)`
Registers one or more user scripts.

### `UserScripts.getRegistered(filter?)`
Returns all registered user scripts.

### `UserScripts.unregister(filter?)`
Unregisters one or more user scripts.

### `UserScripts.update(scripts)`
Updates one or more user scripts.

### `UserScripts.unregisterAll()`
Unregisters all user scripts.

### `UserScripts.isRegistered(id)`
Checks if a user script with the given ID is registered.

### `UserScripts.getById(id)`
Gets a registered user script by ID.

---

[zovo.one](https://zovo.one)
