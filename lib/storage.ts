/**
 * Safe client-side storage wrapper that prevents SecurityError / DOMException
 * in sandboxed iframes or environments where localStorage is restricted.
 */
class SafeStorage {
  private mem = new Map<string, string>();

  getItem(key: string): string | null {
    try {
      if (typeof window !== 'undefined' && 'localStorage' in window && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch {
      // Storage access blocked or restricted
    }
    return this.mem.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    try {
      if (typeof window !== 'undefined' && 'localStorage' in window && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch {
      // Storage access blocked or restricted
    }
    this.mem.set(key, value);
  }

  removeItem(key: string): void {
    try {
      if (typeof window !== 'undefined' && 'localStorage' in window && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch {
      // Storage access blocked or restricted
    }
    this.mem.delete(key);
  }
}

export const safeStorage = new SafeStorage();

/**
 * Safe dark-mode media query checker
 */
export function safePrefersDark(): boolean {
  try {
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      return window.matchMedia('(prefers-color-scheme: dark)')?.matches ?? false;
    }
  } catch {
    // ignore
  }
  return false;
}

/**
 * Safe history.pushState wrapper
 */
export function safePushState(path: string): void {
  try {
    if (typeof window !== 'undefined' && window.history && typeof window.history.pushState === 'function') {
      window.history.pushState({}, '', path);
    }
  } catch {
    // ignore iframe sandbox pushState restrictions
  }
}
