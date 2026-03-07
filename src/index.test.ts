import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserScripts } from './index';

describe('UserScripts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // @ts-ignore
    global.chrome = {
      userScripts: {
        register: vi.fn(),
        getRegistered: vi.fn(),
        unregister: vi.fn(),
        update: vi.fn(),
      },
    };
  });

  it('should register scripts', async () => {
    const scripts = [{ id: 's1', matches: ['https://*.google.com/*'] }];
    await UserScripts.register(scripts);
    expect(chrome.userScripts.register).toHaveBeenCalledWith(scripts);
  });

  it('should get registered scripts', async () => {
    const mockScripts = [{ id: 's1' }];
    vi.mocked(chrome.userScripts.getRegistered).mockResolvedValue(mockScripts as any);
    const result = await UserScripts.getRegistered({ ids: ['s1'] });
    expect(chrome.userScripts.getRegistered).toHaveBeenCalledWith({ ids: ['s1'] });
    expect(result).toEqual(mockScripts);
  });

  it('should unregister scripts', async () => {
    await UserScripts.unregister({ ids: ['s1'] });
    expect(chrome.userScripts.unregister).toHaveBeenCalledWith({ ids: ['s1'] });
  });

  it('should update scripts', async () => {
    const scripts = [{ id: 's1', matches: ['https://*.google.com/*'] }];
    await UserScripts.update(scripts);
    expect(chrome.userScripts.update).toHaveBeenCalledWith(scripts);
  });

  it('should unregister all', async () => {
    await UserScripts.unregisterAll();
    expect(chrome.userScripts.unregister).toHaveBeenCalledWith({});
  });

  it('should check if script is registered', async () => {
    vi.mocked(chrome.userScripts.getRegistered).mockResolvedValue([{ id: 's1' }] as any);
    expect(await UserScripts.isRegistered('s1')).toBe(true);

    vi.mocked(chrome.userScripts.getRegistered).mockResolvedValue([] as any);
    expect(await UserScripts.isRegistered('s2')).toBe(false);
  });

  it('should get script by ID', async () => {
    const mockScript = { id: 's1' };
    vi.mocked(chrome.userScripts.getRegistered).mockResolvedValue([mockScript] as any);
    const script = await UserScripts.getById('s1');
    expect(script).toEqual(mockScript);

    vi.mocked(chrome.userScripts.getRegistered).mockResolvedValue([] as any);
    expect(await UserScripts.getById('s2')).toBeUndefined();
  });

  it('should throw error if API not available', async () => {
    // @ts-ignore
    delete global.chrome;
    await expect(UserScripts.register([])).rejects.toThrow('Chrome User Scripts API is not available.');
  });
});
