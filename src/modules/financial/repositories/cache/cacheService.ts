const CACHE_EXPIRATION_TIME = 3 * 60 * 1000;

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

export class CacheService {
  private cache: Map<string, CacheItem<unknown>> = new Map();

  get<T>(key: string): T | null {
    const cachedItem = this.cache.get(key);
    
    if (!cachedItem) return null;
    
    const now = Date.now();
    if (now - cachedItem.timestamp > CACHE_EXPIRATION_TIME) {
      this.cache.delete(key);
      return null;
    }
    
    return cachedItem.data as T;
  }
  
  set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }
  
  getExpired<T>(key: string): T | null {
    const cachedItem = this.cache.get(key);
    return cachedItem ? cachedItem.data as T : null;
  }
  
  clear(key?: string): void {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }
}

export const cacheService = new CacheService();
