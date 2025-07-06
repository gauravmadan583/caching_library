class Node {
    private key: string;
    private value: any;
    private expiration: Date | null;
    private next: Node | null;
    private prev: Node | null;

    constructor(key: string, value: any, expiration?: Date) {
        this.key = key;
        this.value = value;
        this.expiration = expiration || null;
        this.next = null;
        this.prev = null;
    }

    public getKey() {
        if (this.expiration && this.expiration < new Date()) {
            return null;
        }

        return this.key;
    }

    public getValue() {
        if (this.expiration && this.expiration < new Date()) {
            return null;
        }

        return this.value;
    }
    
    public getNext() {
        return this.next;
    }

    public getPrev() {
        return this.prev;
    }

    public setNext(next: Node | null) {
        this.next = next;
    }

    public setPrev(prev: Node | null) {
        this.prev = prev;
    }
}

export default Node;