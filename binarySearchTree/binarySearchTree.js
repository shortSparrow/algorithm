
/**
 * Binary Search Tree - це Binary Tree (кожна нода може мати не більше 2-ох дітей) яке відсортоване.
 * Якщо значення більше root воно іде до правої ноди, якщо менше то до лівої ноди. Даі процес продовжується,
 * якщо значення більше ноди воно іде направо, якщо менше то наліво
 *            10
 *          /   \
 *         5     12
 *       /  \    /  \
 *      3    7  11   23
 */

class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

/**
 * Реалізовано 2 методи insert, але через цикл кращий бо на великих обсягах даних не буде переповнення стеку
 * 
 * Глибина рекурсії для perfect binary tree буде log2 n (логарифм за основою 2 від n).
 * Для n = 1_000_000 -> 20
 * 
 * Але для найгіршого випадку коли у мене числа 1 2 3 4 5 ... , тоді глибина рекурсії буде n, 
 * що призведе до переповнення стеку
 */
class BinarySearchTree {
  constructor() {
    this.root = null
  }

  // insert через рекурсію
  insertWithRecursion(value, node) {
    const newNode = new Node(value)

    if(this.root === null) {
      this.root = newNode
      return this
    }
    
    if(node === undefined) {
      node = this.root
    }

    if(value === node.value) {
      // в цій реалізації я просто ігнорую дублікати, але можна у Node мати значення count, і збільшувати його
      return undefined
    }

    if(value > node.value) {
      if(node.right) {
        return this.insertWithRecursion(value, node.right)
      } else {
        node.right = newNode
        return this
      }
    } else {
      if(node.left) {
        return this.insertWithRecursion(value, node.left)
      } else {
        node.left = newNode
        return this
      }
    }
  }


  // insert через цикл
  insertWithLoop(value) {
    const newNode = new Node(value)
    if(this.root === null) {
      this.root = newNode
      return this
    } 

    let current = this.root
    while(true) {
      if(value === current.value) {
        // в цій реалізації я просто ігнорую дублікати, але можна у Node мати значення count, і збільшувати його
        return undefined
      }

      if(value < current.value) {
        if(current.left === null) {
          current.left = newNode
          return this
        } else {
          current = current.left
        }
      } else if(value > current.value) {
        if(current.right === null) {
          current.right = newNode
          return this
        } else {
          current = current.right
        }
      }
    }
  }

  find(value) {
    let currentNode = this.root
    let match = null

    while(match === null) {
      if(currentNode === null) {
        // last node, match not found
        match = undefined
        break
      }

      if(value === currentNode.value) {
        match = currentNode
        break
      }

      if(value > currentNode.value) {
        currentNode = currentNode.right
      } else {
        currentNode = currentNode.left
      }
    }

    return match
  }
}

const tree = new BinarySearchTree()
tree.insertWithLoop(15)
tree.insertWithLoop(11)

/**
 *                  10
 *                /   \
 *                      15
 *                
 *              insert(11)
 *          
 *                  10
 *                /   \
 *                      15
 *                     /  \
 *                    11        
 */


/**
 * BIG O
 * 
 * Average/Best case:
 *  Insertion - O(log n) 
 *  Searching - O(log n)
 * 
 * Worst case:
 *  Insertion - O(n) 
 *  Searching - O(n)
 * 
 * Worst case:
 *                 1
 *                  \
 *                   2
 *                    \
 *                     3
 *                      \
 *                       4
 */


/**
    Демонстрація найгіршого випадку

    console.time("Заповнення дерева");
    const tree = new BinarySearchTree();
    for (let i = 1; i < 1_000_000; i++) {
      tree.insertWithLoop(i);
    }
    console.timeEnd("Заповнення дерева");


 * 1_000_0 - 90 ms
 * 1_000_00 - 18 s
 * 1_000_000 - ? (явно більше 10 хвилин)
 */
