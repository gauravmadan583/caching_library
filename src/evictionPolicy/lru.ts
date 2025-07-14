import EvictionPolicyInterface from "./interface";
import { EvictionPolicyType } from "../interface";
import Node from "../node";
class LRU implements EvictionPolicyInterface {

    private evictionPolicyType = EvictionPolicyType.LRU;

    private head: Node | null;
    private tail: Node | null;

    constructor() {
        this.head = null;
        this.tail = null;
    }

    public evict(): Node | null {
        // TODO: Implement LRU eviction policy

        if (this.tail === null) {
            return null;
        }

        // Remove tail from list
        const node = this.tail;
        this.tail = this.tail.getPrev();
        this.tail?.setNext(null);

        // Clean up the evicted node's references
        node.setNext(null);
        node.setPrev(null);

        // Return node
        return node;
    }

    public add(node: Node): void {
        // TODO: Implement LRU add policy

        // Remove node from current position
        node.getPrev()?.setNext(node.getNext());
        node.getNext()?.setPrev(node.getPrev());

        // Add node to head of list
        node.setNext(this.head);
        node.setPrev(null);
        this.head = node;

        // If tail is null, set tail to node
        if (this.tail === null) {
            this.tail = node;
        }
    }

    public getEvictionPolicy(): EvictionPolicyType {
        return this.evictionPolicyType;
    }

}

export default LRU;