
/**
 * Stack це структура даних де виконується умова first in - last out
 */

class Node {
  constructor(value) {
    this.value = value;
  }
}

class Stack {
  constructor() {
    this.items = [];
  }

  push(value) {
    const newNode = new Node(value);
    this.items.push(newNode);

    return this.items.length;
  }

  pop() {
    return this.items.pop();
  }
}

const stack = new Stack();

/**
 * Якщо використовуємо array то можна навіть не робити таку конструкцію як stack, можна просто використати масив
 * 
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
 * Access - O(1)
 * Search - O(n)
 */
