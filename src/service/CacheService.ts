const CACHE_TTL = 1000 * 60;    // 1 minute

export default class CacheService {
    private memoryCacheByKey: { [key: string]: { value: any, expiredAt: number } } = {};
    private memoryCache: { value: any, expiredAt: number } = { value: undefined, expiredAt: Date.now() };

    public get(p?: string): any {
        if (p) {
            if (!this.memoryCacheByKey[p]) {
                throw new Error(`[cache]: Memory cache for key ${p} is empty`);
            }
            return this.memoryCacheByKey[p].value;
        } else {
            if (!this.memoryCache) {
                throw new Error(`[cache]: Memory cache is empty`);
            }
            return this.memoryCache.value;
        }
    }

    public has(p?: string): boolean {
        if (p) {
            return this.memoryCacheByKey[p] !== undefined;
        } else {
            return this.memoryCache.value !== undefined;
        }
    }

    public expired(p?: string): boolean {
        const now = Date.now();
        if (p) {
            return now >= this.memoryCacheByKey[p].expiredAt;
        } else {
            return now >= this.memoryCache.expiredAt;
        }
    }

    public set(t: any, p?: string) {
        const now = Date.now();
        if (p) {
            this.memoryCacheByKey[p] = { value: t, expiredAt: now + CACHE_TTL };
        } else {
            this.memoryCache =  { value: t, expiredAt: now + CACHE_TTL };
        }
    }
}

