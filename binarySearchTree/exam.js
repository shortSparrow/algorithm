/**
 * Extra Challenge: Binary Search Tree - findSecondLargest Exercise
 * Write a function on the BinarySearchTree class:
 * 
 * findSecondLargest - finds and returns the second largest value in the BST. 
 * If the tree has fewer than two nodes, return undefined.
 * 
 * 
 * 
 * Суть вирішення полягає у пошуку полягає у пошуку найбільшого значення, а потім є 2 можливих варіанти:
 *    1. Найбільша нода не має дітей, отже друга за величиною нода - це її батько
 *    2. Найбільша нода має ліву дитину - отже друга за величиною нода - це ліва піднода
 */

class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null
  }

  insert(value) {
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

  findSecondLargest() {
    if(this.root === null) {
      return undefined
    }

    let greatestNode = this.root
    let parent = null
    
    while(greatestNode.right !== null) {
      parent = greatestNode
      greatestNode = greatestNode.right
    }

    // three has only 1 node
    if(greatestNode === this.root) {
      return undefined
    }

    if(greatestNode.left === null) {
      return parent.value
    }

    if(greatestNode.left !== null) {
      return greatestNode.left.value
    }
  }
}

var binarySearchTree = new BinarySearchTree();
binarySearchTree.insert(15);
binarySearchTree.insert(20);
binarySearchTree.insert(10);
binarySearchTree.insert(12);
console.log(binarySearchTree.findSecondLargest()); // returns 15

binarySearchTree.insert(16);
console.log(binarySearchTree.findSecondLargest()); // returns 16


/**
 * 
 *                15
 *              /    \
 *             10     20
 *               \
 *                12
 * 
 * 
 *                15
 *              /    \
 *             10     20
 *               \   /
 *               12  16
 * 
 */