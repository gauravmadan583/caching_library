import { EvictionPolicyType } from "../interface";
import LRU from "./lru";
import LFU from "./lfu";
import FIFO from "./fifo";
import Node from "../node";
import EvictionPolicyInterface from "./interface";
// Abstract base class for eviction policies
class EvictionPolicy implements EvictionPolicyInterface {
    private evictionPolicy: EvictionPolicyInterface;

    constructor(evictionPolicy: EvictionPolicyType) {

        switch(evictionPolicy) {
            case EvictionPolicyType.LRU:
                this.evictionPolicy = new LRU();
                break;
            case EvictionPolicyType.LFU:
                this.evictionPolicy = new LFU();
                break;
            case EvictionPolicyType.FIFO:
                this.evictionPolicy = new FIFO();
                break;
            default:
                throw new Error("Invalid eviction policy");
        }
    }

    public evict(): Node | null {
        return this.evictionPolicy.evict();
    }

    public add(node: Node): void {
        this.evictionPolicy.add(node);
    }

    public getEvictionPolicy(): EvictionPolicyType {
        return this.evictionPolicy.getEvictionPolicy();
    }
}

export default EvictionPolicy;