export interface UserScript {
  id: string;
  matches?: string[];
  excludeMatches?: string[];
  js?: { code?: string; file?: string }[];
  runAt?: 'document_start' | 'document_end' | 'document_idle';
  allFrames?: boolean;
  world?: 'USER_SCRIPT' | 'MAIN';
}

export interface UserScriptFilter {
  ids?: string[];
}

/**
 * A wrapper for the Chrome User Scripts API.
 */
export class UserScripts {
  private static get api(): any {
    if (typeof chrome === 'undefined' || !chrome.userScripts) {
      throw new Error('Chrome User Scripts API is not available.');
    }
    return chrome.userScripts;
  }

  /**
   * Registers one or more user scripts.
   */
  static async register(scripts: UserScript[]): Promise<void> {
    return this.api.register(scripts);
  }

  /**
   * Returns all registered user scripts.
   */
  static async getRegistered(filter: UserScriptFilter = {}): Promise<UserScript[]> {
    return this.api.getRegistered(filter);
  }

  /**
   * Unregisters one or more user scripts.
   */
  static async unregister(filter: UserScriptFilter = {}): Promise<void> {
    return this.api.unregister(filter);
  }

  /**
   * Updates one or more user scripts.
   */
  static async update(scripts: UserScript[]): Promise<void> {
    return this.api.update(scripts);
  }

  /**
   * Unregisters all user scripts.
   */
  static async unregisterAll(): Promise<void> {
    return this.unregister({});
  }

  /**
   * Checks if a user script with the given ID is registered.
   */
  static async isRegistered(id: string): Promise<boolean> {
    const scripts = await this.getRegistered({ ids: [id] });
    return scripts.length > 0;
  }

  /**
   * Gets a registered user script by ID.
   */
  static async getById(id: string): Promise<UserScript | undefined> {
    const scripts = await this.getRegistered({ ids: [id] });
    return scripts[0];
  }
}
