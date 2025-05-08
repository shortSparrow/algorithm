/**
 * Tree Traversal - це прохід по всім нодам, але лише один раз, є різні способи це зробити, тут ми розглянемо:
 *    - Breadth First Search(BFS) - пошук по горизонталі
 *    - Depth First Search (DFS) - пошук по вертикалі, який розділяється на:
 *          - Deep First PreOrder
 *          - Deep First PostOrder
 *          - Deep First InOrder
*/


/**
 *  
 *  BFS - Breadth First Search
 *              
 *               -> 10
 *                 /   \
 *             -> 6   -> 15
 *               /  \     \
 *           -> 3    8  -> 20
 *  
 * [10, 6, 15, 3, 8, 20]
 * 
 * Ми повинні відвідати всіх sibling на поточному рівні перш ніж піти далі вниз, я використовую binary tree,
 * але це не обмежено лише binary tree, це має сенс до всіх дерев. Тож спочатку я відвідую 10, далі відвідую
 * 6 і 15, після цього іду далі і відвідую 3, 8, 20
 * 
 * 
 * 
 * Breads First Search також також відповідь на 2 питання:
 *  1. Чи є connection між A і B
 *  2. Який найшвидший шлях від А до B (без враховування ваги edge, вважаємо що вони всі однакові)
 * 
 * Тобто уявимо що треба знайти продавця манго у facebook, я почну шукати у своїх друзів, до яких у мене
 * відстань в 1 рівень глибини, якщо не знайду то почну шукати у друзів моїх друзів, це вже
 * рівень глибини 2 і більше. І так я зможу знайти найкоротший зв'язок до продавця манго 
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

  BFS() {
    const data = []
    const queue = []
    let node = null

    queue.push(this.root)

    while(queue.length) {
      node = queue.shift()
      data.push(node)

      if(node.left) queue.push(node.left)
      if(node.right) queue.push(node.right)
    }

    console.log(data)
    return data
  }

}

const tree = new BinarySearchTree()
tree.insert(10)
tree.insert(6)
tree.insert(15)
tree.insert(3)
tree.insert(8)
tree.insert(20)

tree.BFS()

/**
 *                10
 *              /    \
 *             6      15
 *           /   \      \
 *          3     8      20
 * 
 */
