import { Queue } from './Queue';

/**
 * Represents a double-ended queue (DEQ).
 * @template T The type of elements stored in the DEQ.
 */
export class DEQ<T> extends Queue<T> {
	/**
	 * Creates a new DEQ.
	 * @param {T[]} [items] The items to initialize the DEQ with.
	 * @param {number} [maxSize] The maximum size of the DEQ.
	 */
	constructor(items: T[] = [], maxSize?: number) {
		super(items, maxSize);
	}

	/**
	 * Removes and returns the element from the end of the DEQ.
	 * @returns {T} The element removed from the end of the DEQ.
	 * @throws {Error} If the DEQ is empty.
	 */
	popEnd(): T {
		if (this.isEmpty()) throw new Error('DEQ is empty');
		this.size--;
		return this._items[(this._startIndex + this.size) % this.maxSize];
	}

	/**
	 * Inserts an element at the start of the DEQ.
	 * @param {T} item The item to insert.
	 * @returns {number} The new size of the DEQ.
	 * @throws {Error} If the DEQ is full and cannot accept new items.
	 */
	pushStart(item: T): number {
		if (this.isFull())
			throw new Error('DEQ is full and cannot accept new items');
		this._startIndex = (this._startIndex - 1 + this.maxSize) % this.maxSize;
		this._items[this._startIndex] = item;
		return ++this.size;
	}
}
export default DEQ;

/**
	const q = new DEQ<number>([], 4);
	q.pushEnd(2);
	q.pushStart(1);
	q.pushEnd(3);
	q.pushStart(0);
	console.log(q.isFull()); // true
	console.log(q.popEnd()); // 3
	console.log(q.popStart()); // 0
	console.log(q.popEnd()); // 2
	console.log(q.popStart()); // 1
	console.log(q.isEmpty()); // true

*/
