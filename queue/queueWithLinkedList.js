
/**
 * StaQueue ck це структура даних де виконується умова first in - first out
 */

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  enqueue(value) {
    const newNode = new Node(value)
    if(this.size === 0) {
      this.first = newNode
      this.last = newNode
    } else {
      // через посилання коли ми оновлюємо this.last.next то оновлюється і this.fist.next
      this.last.next = newNode
      this.last = newNode
    }

    this.size++
    return newNode
  }

  dequeue() {
    if(this.size === 0) {
      return null
    }

    const temp = this.first
    if(this.first === this.last) {
      this.last = null
    }
    this.first = this.first.next
    this.size--
    return temp.value

  }
}

const queue = new Queue()
queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)

queue.dequeue()


/**
 * BIG O
 * Insert - O(1)
 * Remove - O(1)
 * Search - O(n)
 * Access - O(n)
 */