import EvictionPolicyInterface from "./interface";
import { EvictionPolicyType } from "../interface";
import Node from "../node";
class LFU implements EvictionPolicyInterface {

    private evictionPolicyType = EvictionPolicyType.LFU;

    private frequencyMap: Map<string, number>;
    private frequencyList: Map<number, Node[]>;

    constructor() {
        this.frequencyMap = new Map();
        this.frequencyList = new Map();
    }

    public evict(): Node | null {
        // TODO: Implement LFU eviction policy
        const minFrequency = Math.min(...this.frequencyList.keys());
        const nodes = this.frequencyList.get(minFrequency) || [];
        const node = nodes.shift();
        if (!node) {
            return null;
        }
        
        return node;
    }

    public add(node: Node): void {
        // TODO: Implement LFU add policy
        const key = node.getKey();
        if (!key) {
            return;
        }

        const frequency = this.frequencyMap.get(key) || 0;
        this.frequencyMap.set(key, frequency + 1);
        this.frequencyList.get(frequency + 1)!.push(node);
    }

    public getEvictionPolicy(): EvictionPolicyType {
        return this.evictionPolicyType;
    }

}

export default LFU;