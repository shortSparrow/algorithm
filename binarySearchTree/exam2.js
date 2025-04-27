/**
 * Extra Challenge: Binary Search Tree - isBalanced Exercise
 * Write a function on the BinarySearchTree class:
 * 
 * isBalanced - returns true if the BST is balanced, otherwise returns false.
 * 
 * A balanced tree is defined as a tree where the depth of all leaf nodes or nodes with
 * single children differ by no more than one.
 * 
 * 
 * Моє рішення полягає у тому аби рекурсивно пройтися по всім нодам і знайти найбільшу глибину і найменшу,
 * і як тільки різниця між ними стане > 1 то значить дерево не збалансоване, таке саме рішення використовують
 * Gemini і Udemy, просто в дещо інших формах
 * 
 * Але моє рішення більш ефективне бо зупиняє рекурсію як тільки визначено що дерево не симетричне,
 * наприклад для дерева 
 *          1
 *           \
 *            2
 *             \
 *              3
 *               \
 *                4
 *                  ...
 * де n 1000 то для мого рішення шибина рекурсії 3 і всього ітерації 6, а для Gemini глибина 1000, а
 * ітерації 2000, а для Udemy глибина теж 1000, але кількість ітерації 4000
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

  // My solution
  isBalanced() {
    let min = null
    let max = null
    let isBalanced = true

    const helper = (node = this.root, depth = -1) => {
      if(isBalanced === false) {
        return
      }
      depth++
      if(node) {
        helper(node.left, depth)
        helper(node.right, depth)
      } else {
        if(min === null) {
          min = depth
        }
        if(max === null) {
          max = depth
        }

        if(depth > max) {
          max = depth
        }

        if(depth < min) {
          min = depth
        }

        if((max - min) >= 2) {
          isBalanced = false
        }
      }
    }
    helper()

    if(isBalanced) {
      console.log('BALANCED')
    } else {
      console.log('NOT BALANCED')
    }
  }

  // From AI (Gemini)
  isBalancedV2() {
    const getHeight = (node) => {
      if (!node) {
        return 0
      }
      const leftHeight = getHeight(node.left)
      const rightHeight = getHeight(node.right)

      if (leftHeight === -1 || rightHeight === -1 || Math.abs(leftHeight - rightHeight) > 1) {
        return -1 // -1 вказує, що піддерево не збалансоване
      }
      return Math.max(leftHeight, rightHeight) + 1
    }

    const isBalanced= getHeight(this.root) !== -1

    if(isBalanced) {
      console.log('BALANCED')
    } else {
      console.log('NOT BALANCED')
    }
  }

  // From Udemy
  isBalancedV3(node = this.root) {
    if (node === null) {
      return;
    }
 
    function minDepth(node) {
      if (node === null) {
        return 0;
      }
      return 1 + Math.min(minDepth(node.left), minDepth(node.right));
    }
 
    function maxDepth(node) {
      if (node === null) {
        return 0;
      }
      return 1 + Math.max(maxDepth(node.left), maxDepth(node.right));
    }

    const isBalanced =  maxDepth(node) - minDepth(node) <= 1;

    if(isBalanced) {
      console.log('BALANCED')
    } else {
      console.log('NOT BALANCED')
    }
  }
}


/**
 * Balanced
 *                15             15                15
 *              /    \            \              /     \
 *             10     20           16           7       16
 *               \                            /   \    /  \
 *                12                         4     10 15   40
 *                                         /  \
 *                                        2    5
 * 
 * Not balanced                
 *                  5                             15                      
 *                /  \                         /     \
 *                    6                       7       16  
 *                  /  \                    /   \    /  \
 *                      7                  4    10 15   40
 *                                       /  \
 *                                      2    5
 *                                     / \  / \
 *                                    1  0 3   6
 */


const binarySearchTree = new BinarySearchTree()
binarySearchTree.insert(8)
binarySearchTree.insert(3)
binarySearchTree.insert(10)
binarySearchTree.insert(1)
binarySearchTree.insert(6)
binarySearchTree.insert(14)
binarySearchTree.insert(4)
binarySearchTree.insert(7)
binarySearchTree.insert(13)

// 2. Лівобічно неврівноважене дерево
const leftUnbalancedBST = new BinarySearchTree()
leftUnbalancedBST.insert(10)
leftUnbalancedBST.insert(5)
leftUnbalancedBST.insert(2)
leftUnbalancedBST.insert(1)

// 3. Правобічно неврівноважене дерево
const rightUnbalancedBST = new BinarySearchTree()
rightUnbalancedBST.insert(1)
rightUnbalancedBST.insert(2)
rightUnbalancedBST.insert(5)
rightUnbalancedBST.insert(10)

// 4. Збалансоване, але не ідеальне дерево
const balancedBST = new BinarySearchTree()
balancedBST.insert(7)
balancedBST.insert(3)
balancedBST.insert(10)
balancedBST.insert(1)
balancedBST.insert(5)
balancedBST.insert(9)
balancedBST.insert(11)

// 5. Дерево з невеликою різницею у висотах, але збалансоване
const slightlyUnbalancedBST = new BinarySearchTree()
slightlyUnbalancedBST.insert(5)
slightlyUnbalancedBST.insert(3)
slightlyUnbalancedBST.insert(7)
slightlyUnbalancedBST.insert(2)
slightlyUnbalancedBST.insert(4)
slightlyUnbalancedBST.insert(6)
slightlyUnbalancedBST.insert(8)
slightlyUnbalancedBST.insert(9)

const longOneWayBST = new BinarySearchTree()
for(let i=0; i<1_000; i++) {
  longOneWayBST.insert(i+1) 
}

console.log('balancedBST is balanced:', balancedBST.isBalanced())
console.log('leftUnbalancedBST is balanced:', leftUnbalancedBST.isBalanced())
console.log('rightUnbalancedBST is balanced:', rightUnbalancedBST.isBalanced())
console.log('balancedBST is balanced:', balancedBST.isBalanced())
console.log('slightlyUnbalancedBST is balanced:', slightlyUnbalancedBST.isBalanced())
console.log('longOneWayBST is balanced:', longOneWayBST.isBalanced())

// console.log('balancedBST is balanced:', balancedBST.isBalancedV2())
// console.log('leftUnbalancedBST is balanced:', leftUnbalancedBST.isBalancedV2())
// console.log('rightUnbalancedBST is balanced:', rightUnbalancedBST.isBalancedV2())
// console.log('balancedBST is balanced:', balancedBST.isBalancedV2())
// console.log('slightlyUnbalancedBST is balanced:', slightlyUnbalancedBST.isBalancedV2())
// console.log('longOneWayBST is balanced:', longOneWayBST.isBalanced())


// console.log('balancedBST is balanced:', balancedBST.isBalancedV3())
// console.log('leftUnbalancedBST is balanced:', leftUnbalancedBST.isBalancedV3())
// console.log('rightUnbalancedBST is balanced:', rightUnbalancedBST.isBalancedV3())
// console.log('balancedBST is balanced:', balancedBST.isBalancedV3())
// console.log('slightlyUnbalancedBST is balanced:', slightlyUnbalancedBST.isBalancedV3())
// console.log('longOneWayBST is balanced:', longOneWayBST.isBalanced())

