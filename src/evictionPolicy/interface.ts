import { EvictionPolicyType } from "../interface";
import Node from "../node";

interface EvictionPolicyInterface {
    evict(): Node | null;
    add(node: Node): void;
    getEvictionPolicy(): EvictionPolicyType;
}

export default EvictionPolicyInterface;