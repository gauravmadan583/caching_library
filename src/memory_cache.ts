import EvictionPolicyInterface from "./evictionPolicy/interface";
import {CacheInterface, CacheType, EvictionPolicyType} from "./interface";
import Node from "./node";
import EvictionPolicy from "./evictionPolicy";

class MemoryCache implements CacheInterface {

    private cacheType = CacheType.Memory;

    private cache: Map<string, Node>;
    private evictionPolicy: EvictionPolicyInterface;
    private thresholdCapacity: number;
    constructor(evictionPolicy: EvictionPolicyType, thresholdCapacity: number) {
        this.cache = new Map();
        this.evictionPolicy = new EvictionPolicy(evictionPolicy);
        this.thresholdCapacity = thresholdCapacity;
    }

    private postActions(node: Node) {
        
        this.evictionPolicy.add(node);
        
        if (this.cache.size > this.thresholdCapacity) {
            const evictedNode = this.evictionPolicy.evict();
            if (evictedNode) {
                this.cache.delete(evictedNode.getKey()!);
            }
        }
    }

    public get(key: string) {
        // Check if key exists in cache
        const node = this.cache.get(key);

        if (!node) {
            return null;
        }

        // Check if node has expired
        const value = node.getValue();

        if (value === null) {
            
            return null;
        }

        // Add node to eviction policy
        if (this.evictionPolicy.getEvictionPolicy() in [EvictionPolicyType.LRU, EvictionPolicyType.LFU]) {
            this.evictionPolicy.add(node);
        }

        // Return value
        return value;
    }
    
    public set(key: string, value: any, expiration?: Date) {
        const node = new Node(key, value, expiration);
        this.cache.set(key, node);

        this.postActions(node);
    }

    
    public getEvictionPolicy() {
        return this.evictionPolicy.getEvictionPolicy();
    }

    public getCacheType() {
        return this.cacheType;
    }
}

export default MemoryCache;