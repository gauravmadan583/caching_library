import { EvictionPolicyType } from "../interface";
import EvictionPolicyInterface from "./interface";
import Node from "../node";

class FIFO implements EvictionPolicyInterface {

    private queue: Node[];
    private evictionPolicyType = EvictionPolicyType.FIFO;

    constructor() {
        this.queue = [];
    }

    public evict(): Node | null {
        // TODO: Implement FIFO eviction policy
        return this.queue.shift() || null;
    }

    public add(node: Node): void {
        // TODO: Implement FIFO add policy
        this.queue.push(node);
    }

    public getEvictionPolicy(): EvictionPolicyType {
        return this.evictionPolicyType;
    }
}

export default FIFO;