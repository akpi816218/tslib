export class Queue<T> {
	_items: T[];
	maxSize: number;
	_startIndex: number;
	size: number;

	/**
	 * Creates a new queue
	 * @param {T[]} items The items to initialize the queue with
	 */
	constructor(items: T[] = [], maxSize?: number) {
		/**
		 * @property {number} maxSize The maximum number of items the queue can hold
		 */
		this.maxSize = maxSize || items.length;

		if (this.maxSize < 1)
			throw new Error('Queue must have a minimum size of at least 1');

		/**
		 * @private
		 * @property {T[]} _items The items in the queue
		 */
		this._items = items;

		/**
		 * @private
		 * @property {number} _startIndex The index of the first item in the queue
		 */
		this._startIndex = 0;

		/**
		 * @property {number} size The number of items currently in the queue
		 */
		this.size = items.length;
	}

	/**
	 * @property {number} length The number of items currently in the queue
	 */
	get length() {
		return this.size;
	}

	/**
	 * Append an item to the end of the queue
	 * @param {T} item The item to add to the queue
	 * @returns {number} The new size of the queue
	 */
	pushEnd(item: T): number {
		if (this.isFull())
			throw new Error('Queue is full and cannot accept new items');
		this._items[(this._startIndex + this.size) % this.maxSize] = item;
		return ++this.size;
	}

	/**
	 * Remove and return the first item from the queue
	 * @returns {T} The first item in the queue
	 */
	popStart(): T | null {
		if (this.isEmpty()) return null;
		this.size--;
		return this._items[this._startIndex++ % this.maxSize];
	}

	/**
	 * Determine whether the queue is full
	 * @returns {boolean} Whether the queue is full
	 */
	isFull(): boolean {
		if (this.size === this.maxSize) return true;
		return false;
	}

	/**
	 * Determine whether the queue is empty
	 * @returns {boolean} Whether the queue is empty
	 */
	isEmpty(): boolean {
		return this.size === 0;
	}
}
export default Queue;

const q = new Queue<number>([], 5);
q.pushEnd(1);
console.log(q._startIndex, q.size); // 0 1
q.pushEnd(2);
console.log(q._startIndex, q.size); // 0 2
q.pushEnd(3);
console.log(q._startIndex, q.size); // 0 3
q.pushEnd(4);
console.log(q._startIndex, q.size); // 0 4
q.pushEnd(5);
console.log(q._startIndex, q.size, q.isFull()); // 0 5 true
try {
	q.pushEnd(6);
} catch (e) {
	console.error(e.toString());
} // Error: Queue is full and cannot accept new items
console.log(q.popStart()); // 1
console.log(q.popStart()); // 2
console.log(q.popStart()); // 3
console.log(q.popStart()); // 4
console.log(q.popStart()); // 5
console.log(q.popStart()); // null
console.log(q.isEmpty()); // true
console.log(q._startIndex, q.size, Array.from(q._items.entries())); // 5 0 [ [ 0, 1 ], [ 1, 2 ], [ 2, 3 ], [ 3, 4 ], [ 4, 5 ] ]
q.pushEnd(6);
console.log(q._startIndex, q.size, Array.from(q._items.entries())); // 0 1 [ [ 0, 6 ], [ 1, 2 ], [ 2, 3 ], [ 3, 4 ], [ 4, 5 ] ]
