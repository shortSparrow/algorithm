
/**
 * Stack це структура даних де виконується умова first in - last out
 */

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  push(value) {
    const newNode = new Node(value);

    if (this.first === null) {
      this.first = newNode;
      this.last = newNode;
    } else {
      const temp = this.first;
      this.first = newNode;
      this.first.next = temp;
    }

    this.size++;

    return this.size;
  }

  pop() {
    if (this.first === null) {
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

const stack = new Stack()

/**
 * Я не бачу різниці між stack через linkedList і array, окрім в time complexity
 * для отримання якогось елемента
 * 
 * Можливо також є відмінність коли ми переповнюємо масив і тоді js має створити новий
 * масив з більшої кількістю пам'яті, тоді push у випадку переповнення масиву може зайняти O(n) часу,
 * але це вже питання до того як працюють масиви у конкретній мові програмування
 * 
 * BIG O
 * Insert - O(1)
 * Remove - O(1)
 * Access - O(n)
 * Search - O(n)
 */