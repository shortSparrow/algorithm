/**
 * Tree Traversal - це прохід по всім нодам, але лише один раз, є різні способи це зробити, тут ми розглянемо:
 *    - Breadth First Search(BFS) - пошук по горизонталі
 *    - Depth First Search (DFS) - пошук по вертикалі, який розділяється на:
 *          - Deep First PreOrder
 *          - Deep First PostOrder
 *          - Deep First InOrder
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

  /**
   *  
   *  DFS PreOrder - Depth First Search PreOrder 
   *              
   *                   10
   *                 /    \
   *                6      15
   *               /  \      \
   *              3    8     20
   *  
   * послідовність -> 10, 6, 3, 8, 15, 20
   * 
   * 
   * Ми повинні спочатку відвідати ноду, а потім її ліві підноди, а потім праві
   * 
   * Починаємо з 10, далі ідемо до лівої ноди 6, потім до її лівої ноди 3, далі "повертаємося" до ноди 6 і ідемо
   * до ноди 8. Ми відвідали все ліве піддерево 10, тепер ідемо до правого піддерева, ідемо до 15, потім до 20
   * 
   * 
   * 
   *                   10
   *                 /    \
   *                6      15
   *               /  \      \
   *              3    8      20
   *            /  \  /  \
   *           2    1 4   22
   *                
   * послідовність -> 10,6,3,2,1,8,4,22,15,20
   * 
   *
   *                   10
   *                 /    \
   *                6      15
   *              /   \      \
   *             3     8      20
   *           /  \   /  \
   *          2    1  4   22
   *              / \
   *             9   7
   * 
   * послідовність -> 10,6,3,2,1,9,7,8,4,22,15,20
   */

  DFSPreOrder() {
    const data = []

    function traverse(node) {
      data.push(node.value)

      if(node.left) traverse(node.left)
      if(node.right) traverse(node.right)
    }

    traverse(this.root)

    console.log(data)
    return data
  }

  /**
   *  
   *  DFS PostOrder - Depth First Search PostOrder 
   *              
   *                   10
   *                 /    \
   *                6      15
   *               /  \      \
   *              3    8     20
   *  
   * послідовність -> 3, 8, 6, 20, 15, 10
   * 
   * Починаючи з ноди 10 ідемо в кінець лового піддерева, доходимо до ноди 3, далі беремо її брата з правого
   * боку - ноду 8, потім беремо їх батька - нода 6, потім у праві ноді їх батька ідемо в кінець - нода 20,
   * потім повертаємося до ноди 15, і в кінці до батька - нода 10
   * 
   * 
   *                   10
   *                 /    \
   *                6      15
   *               /  \      \
   *              3    8      20
   *            /  \  /  \
   *           2    1 4   22
   *                
   * послідовність -> 2, 1, 3, 4, 22, 8, 6, 20, 15, 10
   * 
   *
   *                   10
   *                 /    \
   *                6      15
   *              /   \      \
   *             3     8      20
   *           /  \   /  \
   *          2    1  4   22
   *              / \
   *             9   7
   * 
   * послідовність -> 2, 9, 7, 1, 3, 4, 22, 8, 6, 20 , 15, 10
   */

  DFSPostOrder() {
    const data = []

    function traverse(node) {
      if(node.left) data.push(traverse(node.left))
      if(node.right) data.push(traverse(node.right))

      return node.value
    }

    data.push(traverse(this.root))

    console.log(data);
    return data
  }

  /**
   *  
   *  DFS InOrder - Depth First Search InOrder 
   *              
   *                   10
   *                 /    \
   *                6      15
   *               /  \      \
   *              3    8     20
   *  
   * послідовність -> 3, 6, 8, 10, 15, 20
   * 
   * 
   * Ми починаємо з ноди 10 і ідемо в ліве піддерево в останню ліву ноду - це нода 3. Отже беремо ноду 3,
   * потім ідемо до її батька (нода 6), потім до правої дитини (нода 8), потім до батька ноди 6 - це нода 10,
   * потім до ноди 15 і шукаємо її ліву ноду, оскільки її немає то беремо 15 і йдемо до працої дитини - нода 20,
   * у неї шукаємо ліву, але її немає, тоді беремо ноду 20
   * 
   * 
   *                   10
   *                 /    \
   *                6      15
   *               /  \      \
   *              3    8      20
   *            /  \  /  \
   *           2    1 4   22
   *                
   * послідовність -> 2, 3, 1, 6, 4, 8, 22, 10, 15, 20
   * 
   *
   *                   10
   *                 /    \
   *                6      15
   *              /   \      \
   *             3     8      20
   *           /  \   /  \
   *          2    1  4   22
   *              / \
   *             9   7
   * 
   * послідовність ->  2, 3, 9, 1, 7, 6, 4, 8, 22, 10, 15, 20
   * 
   * 
   * *При дереві Binary Search Tree inOrder завжди поверне відсортовану послідовність, зробимо binary search tree
   * 
   *                   10
   *                 /    \
   *                6      15
   *              /   \      \
   *             3     8      20
   *           /  \   /  \      \
   *          2    4  7   9     22
   *                   \
   *                    7.5
   * 
   * послідовність ->  2, 3, 4, 6, 7, 7.5, 8, 9, 10, 15, 20, 22
   */
  DFSInOrder() {
    const data = []

    function traverse(node) {
      if(node.left) traverse(node.left)
      data.push(node.value)
      if(node.right) traverse(node.right)
    }

    traverse(this.root)

    console.log(data);
    return data
  }
}

// ДЕРЕВО 1
// const tree = new BinarySearchTree()
// tree.insert(10)
// tree.insert(6)
// tree.insert(15)
// tree.insert(3)
// tree.insert(8)
// tree.insert(20)

// tree.DFSPreOrder() // [ 10, 6, 3, 8, 15, 20 ]
// tree.DFSPostOrder() // [ 3, 8, 6, 20, 15, 10 ]
// tree.DFSInOrder() // [ 3, 6, 8, 10, 15, 20 ]


/**
 *                10
 *              /    \
 *             6      15
 *           /   \      \
 *          3     8      20
 * 
 */


// ДЕРЕВО 2
// const tree = new BinarySearchTree()
// const root = new Node(10)
// const node_6 = new Node(6)
// const node_15 = new Node(15)
// const node_3 = new Node(3)
// const node_8 = new Node(8)
// const node_20 = new Node(20)
// const node_2 = new Node(2)
// const node_1 = new Node(1)
// const node_4= new Node(4)
// const node_22 = new Node(22)

// root.left = node_6
// root.right = node_15
// node_6.left = node_3
// node_6.right = node_8
// node_3.left = node_2
// node_3.right = node_1
// node_8.left = node_4
// node_8.right = node_22
// node_15.right = node_20
// tree.root = root

// tree.DFSPreOrder() // [10, 6,  3,  2,  1, 8, 4, 22, 15, 20 ]
// tree.DFSPostOrder() // [ 2, 1, 3, 4, 22, 8, 6, 20, 15, 10 ]
// tree.DFSInOrder() // [ 2,  3,  1,  6,  4, 8, 22, 10, 15, 20 ]


/**
*                   10
*                 /    \
*                6      15
*               /  \      \
*              3    8      20
*            /  \  /  \
*           2    1 4   22
*                
*/


// ДЕРЕВО 3
const tree = new BinarySearchTree()
const root = new Node(10)
const node_6 = new Node(6)
const node_15 = new Node(15)
const node_3 = new Node(3)
const node_8 = new Node(8)
const node_20 = new Node(20)
const node_2 = new Node(2)
const node_1 = new Node(1)
const node_4= new Node(4)
const node_22 = new Node(22)
const node_9 = new Node(9)
const node_7 = new Node(7)

root.left = node_6
root.right = node_15
node_6.left = node_3
node_6.right = node_8
node_3.left = node_2
node_3.right = node_1
node_8.left = node_4
node_1.left = node_9
node_1.right = node_7
node_8.right = node_22
node_15.right = node_20
tree.root = root

tree.DFSPreOrder() // [ 10,  6, 3, 2,  1, 9,  7, 8, 4, 22, 15, 20 ]
tree.DFSPostOrder() // [ 2,  9, 7, 1,  3, 4, 22, 8, 6, 20, 15, 10 ]
tree.DFSInOrder() // [ 2,  3, 9,  1,  7, 6,  4, 8, 22, 10, 15, 20 ]

/**
*
*                   10
*                 /    \
*                6      15
*              /   \      \
*             3     8      20
*           /  \   /  \
*          2    1  4   22
*              / \
*             9   7
 */
