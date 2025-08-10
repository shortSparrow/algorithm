/**
 * Priority queue використовує minBinaryHeap (найменше значення завжди буде наверху)
 *
 * !Увага
 * Поточна реалізація не гарантує що якщо додано два елементи з однаковим priority то вони будуть
 * дістані з queue в послідовності в якій їх поклали, для цього потрібна додаткова обробка
 */

class Node {
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
  }
}
class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(value, priority) {
    const node = new Node(value, priority);
    this.values.push(node);

    return this.bubbleUp();
  }

  bubbleUp() {
    // get parent Math.floor( (n - 1)/2 )
    let idx = this.values.length - 1;
    let element = this.values[idx];
    let parentIndex = Math.floor((idx - 1) / 2);

    // parentIndex >= 0 потрібен бо коли element піднявся до індексу 0 то parentIndex -1, а це неможливо
    while (
      parentIndex >= 0 &&
      element.priority < this.values[parentIndex].priority
    ) {
      this.values[idx] = this.values[parentIndex];
      this.values[parentIndex] = element;
      idx = parentIndex;
      element = this.values[idx];
      parentIndex = Math.floor((idx - 1) / 2);
    }

    return this.values;
  }

  dequeue() {
    const lastNode = this.values.pop();
    if (this.values.length === 0) {
      return [];
    }
    const min = this.values[0];
    this.values[0] = lastNode;
    this.bubbleDown();

    return min;
  }

  bubbleDown(idx=0) {
    let nodeIdx = idx;

    while (true) {
      const leftChildIdx = 2 * nodeIdx + 1;
      const rightChildIdx = 2 * nodeIdx + 2;
      const node = this.values[nodeIdx];

      let leftChild = null;
      let rightChild = null;
      let swap = null;

      if (leftChildIdx < this.values.length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild.priority < node.priority) {
          swap = leftChildIdx;
        }
      }

      if (rightChildIdx < this.values.length) {
        rightChild = this.values[rightChildIdx];
        if (
          (rightChildIdx === null && rightChild.priority < node.priority) ||
          (rightChildIdx !== null && rightChild.priority < leftChild.priority)
        ) {
          swap = rightChildIdx;
        }
      }

      if (swap === null) {
        break;
      }

      this.values[nodeIdx] = this.values[swap];
      this.values[swap] = node;
      nodeIdx = swap;
    }
  }

  delete(value) {
    const index = this.values.findIndex((item) => item.value === value);

    if (index == -1) {
      return null;
    }

    const lastItem = this.values.pop();
    this.values[index] = lastItem;
    // this.bubbleDown(index); // Починаємо bubbleDown з індексу а не з кореня
  }
}

const priorityQueue = new PriorityQueue();
priorityQueue.enqueue("regular task", 3);
priorityQueue.enqueue("regular task", 3);
priorityQueue.enqueue("emergency task", -1);
priorityQueue.enqueue("middle task", 2);
priorityQueue.enqueue("hight task", 1);
console.log(priorityQueue.values);

console.log("------------");

console.log(priorityQueue.values);
priorityQueue.dequeue();
console.log(priorityQueue.values);
priorityQueue.dequeue();
console.log(priorityQueue.values);
priorityQueue.dequeue();
console.log(priorityQueue.values);
priorityQueue.dequeue();
console.log(priorityQueue.values);
priorityQueue.dequeue();
console.log(priorityQueue.values);
