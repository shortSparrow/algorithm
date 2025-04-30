

class MaxBinaryHeap {
  constructor() {
    this.values = []
  }

  insert(value) {
    this.values.push(value)
    this.bubbleUp()
  }
  
  bubbleUp() {
    // get parent Math.floor( (n - 1)/2 )
    let idx = this.values.length - 1
    let element = this.values[idx]
    let parentIndex = Math.floor( (idx - 1) / 2 )

    // parentIndex >= 0 потрібен бо коли element піднявся до індексу 0 то parentIndex -1, а це неможливо
    while(parentIndex >= 0 && element > this.values[parentIndex]) {
      this.values[idx] = this.values[parentIndex]
      this.values[parentIndex] = element
      idx = parentIndex
      element = this.values[idx]
      parentIndex = Math.floor( (idx - 1) / 2 )
    }

    return this.values
  }

  extractMax() {
    const lastNode = this.values.pop()
    if(this.values.length === 0) {
      return []
    }
    const max = this.values[0]
    this.values[0] = lastNode
    this.bubbleDown()

    return max
  }


  bubbleDown() {
    let nodeIdx = 0;
    
    while (true) {
      const leftChildIdx = 2 * nodeIdx + 1;
      const rightChildIdx = 2 * nodeIdx + 2;
      const node = this.values[nodeIdx];
  
      let leftChild = null;
      let rightChild = null;
      let swap = null;

      if (leftChildIdx < this.values.length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild > node) {
          swap = leftChildIdx;
        }
      }

      if (rightChildIdx < this.values.length) {
        rightChild = this.values[rightChildIdx];
        if (
          (rightChildIdx === null && rightChild > node) ||
          (rightChildIdx !== null && rightChild > leftChild)
        ) {
          swap = rightChildIdx;
        }
      }

      if (swap === null) {
        break
      }

      this.values[nodeIdx] = this.values[swap];
      this.values[swap] = node;
      nodeIdx = swap;
    }

  }
}

const maxBinaryHeap = new MaxBinaryHeap()
maxBinaryHeap.insert(100)
maxBinaryHeap.insert(19)
maxBinaryHeap.insert(36)
maxBinaryHeap.insert(17)
maxBinaryHeap.insert(12)

// console.log(maxBinaryHeap.values)
// maxBinaryHeap.extractMax()
// console.log(maxBinaryHeap.values)
// maxBinaryHeap.extractMax()
// console.log(maxBinaryHeap.values)
// maxBinaryHeap.extractMax()
// console.log(maxBinaryHeap.values)
// maxBinaryHeap.extractMax()
// console.log(maxBinaryHeap.values)
// maxBinaryHeap.extractMax()
// console.log(maxBinaryHeap.values)


/**
 * 
 * Може здатися що insert (додаємо елемент в кінець масиву і він вспливає) призведе до перекосу дерева, але це не так, оскільки
 * кінець масиву після кожної ітерації "зміщується" праворуч доки не дійде до кінця і тоді знову починаючи з ліва буде зміщатися вправо.
 * 
 * Щоб продемонструвати це будемо додавати нове число і малювати дерево
 * 
 *        1            2            3               4                5                  6                     7
 *                   /            /   \           /   \            /   \              /   \                 /   \
 *                  1            1     2         3     2          3     2            4     5               4     6
 *                                              /                / \               /  \   /              /  \   /  \
 *                                             1                1   3             1    3  2             1    3 2    5
 * 
 * Як бачимо у нас дерево заповнюється рівномірно
 * 
 */

// const maxBinaryHeap = new MaxBinaryHeap()
// maxBinaryHeap.insert(1)
// console.log(maxBinaryHeap.values)
// maxBinaryHeap.insert(2)
// console.log(maxBinaryHeap.values)
// maxBinaryHeap.insert(3)
// console.log(maxBinaryHeap.values)
// maxBinaryHeap.insert(4)
// console.log(maxBinaryHeap.values)
// maxBinaryHeap.insert(5)
// console.log(maxBinaryHeap.values)
// maxBinaryHeap.insert(6)
// console.log(maxBinaryHeap.values)
// maxBinaryHeap.insert(7)
// console.log(maxBinaryHeap.values)