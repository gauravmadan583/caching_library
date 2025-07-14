import { CacheInterface, CacheType, EvictionPolicyType } from "./interface";
import MemoryCache from "./memory_cache";


class Cache implements CacheInterface {

    private cache: CacheInterface;

    constructor(cacheType: CacheType, evictionPolicy: EvictionPolicyType, thresholdCapacity: number) {        
        switch(cacheType) {
            case CacheType.Memory:
                this.cache = new MemoryCache(evictionPolicy, thresholdCapacity);
                break;
            // case CacheType.Redis:
            //     this.cache = new Map();
            //     break;
            // case CacheType.Disk:
            //     this.cache = new Map();
            //     break;
            default:
                throw new Error("Invalid cache type");
        }
    }

    public get(key: string) {
        return this.cache.get(key);
    }

    public set(key: string, value: any, expiration?: Date) {
        this.cache.set(key, value, expiration);
    }

    public getCacheType() {
        return this.cache.getCacheType();
    }

    public getEvictionPolicy() {
        return this.cache.getEvictionPolicy();
    }
}


export default Cache;