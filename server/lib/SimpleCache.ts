class SimpleCache<T> {
    private readonly map: Map<string, T>;
    private readonly defaultTtl: number;

    constructor(defaultTtl: number = 60000) {
        this.map = new Map();
        this.defaultTtl = defaultTtl;
    }

    public set(key: string, value: T, ttl?: number) {
        let _ttl = ttl || this.defaultTtl;
        this.map.set(key, value);
        setTimeout(() => {
            this.map.delete(key);
        }, _ttl);
    }

    public get(key: string): T | undefined {
        return this.map.get(key);
    }
}

export default SimpleCache;