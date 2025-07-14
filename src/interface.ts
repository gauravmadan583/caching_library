export interface CacheInterface {
    get(key: string): any;
    set(key: string, value: any, expiration?: Date): void;
    getEvictionPolicy(): EvictionPolicyType;
    getCacheType(): CacheType;
}

export enum CacheType {
    Memory = "Memory",
    Redis = "Redis",
    Disk = "Disk"
}

export enum EvictionPolicyType {
    LRU = "LRU",
    LFU = "LFU",
    FIFO = "FIFO"
}