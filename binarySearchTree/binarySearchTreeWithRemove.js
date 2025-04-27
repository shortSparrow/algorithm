class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }



  insert(value) {
    const newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
      return this;
    }

    let current = this.root;
    while (true) {
      if (value === current.value) {
        return undefined;
      }

      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        } else {
          current = current.left;
        }
      } else if (value > current.value) {
        if (current.right === null) {
          current.right = newNode;
          return this;
        } else {
          current = current.right;
        }
      }
    }
  }


  _getParentNode(value) {
    let currentNode = this.root
    let parent = null

    do {
      if(value > currentNode.value) {
        parent = currentNode
        currentNode = currentNode.right
      } else if(value < currentNode.value) {
        parent = currentNode
        currentNode = currentNode.left
      } else {
        return parent
      }

    } while(currentNode !== null)

      return parent
  }


  _getParentNode2(value) {
    let currentNode = this.root
    let parent = null

    while(currentNode.value !== value && currentNode !== null) {
      parent = currentNode
      if(value > currentNode.value) {
        currentNode = currentNode.right
      } else if(value < currentNode.value) {
        currentNode = currentNode.left
      }
    }

      return parent
  }


  /**
   * Є два способи знайти замінник:
   *    1. Найбільший вузол у лівому піддереві (попередник) - _getNodeToReplace
   *    2. Найменший вузол у правому піддереві (наступник) - _getNodeToReplaceV2
   * 
   * Я використовую перший варіант
   */
  _getNodeToReplace(node) {
    let currentNode = node.left
    let parent = node

    while(currentNode.right != null) {
      parent = currentNode
      currentNode = currentNode.right
    }
    
    return [parent, currentNode]
  }

  _getNodeToReplaceV2(node) {
    let currentNode = node.right
    let parent = node

    while(currentNode.left != null) {
      parent = currentNode
      currentNode = currentNode.left
    }

    
    return [parent, currentNode]
  }



  remove(value) {
    const parent = this._getParentNode(value)
    if(parent === null) {
      return null
    }

    let node = null
    let ref = ''

    if(value > parent.value) {
      node = parent.right
      ref = 'right'
    } else if(value < parent.value) {
      node = parent.left
      ref = 'left'
    }

    if(node.right && node.left) {
        const [parentNodeToReplace, nodeToReplace] = this._getNodeToReplaceV2(node)

        /**
         * Цей if є обов'язковим, оскільки _getNodeToReplace повертає батька ноди яку ми поставимо замість тої яку видалимо, але ми не знаємо
         * nodeToReplace це parentNodeToReplace.left чи parentNodeToReplace.right. Далі йде пояснення чому ми не знаємо
         * 
         * Шукаємо у лівому піддереві найбільший вузол. Якщо ліве піддерево не має вузлів то воно і є найбільшим, а отже 
         * посилання на нього буде parent.left, а якщо у нього є діти і оскільки ми шукаємо найбільше значення то ми будемо шукати у правих піддеревах
         * лівого піддерева, і тоді посилання буде parent.right
         * 
         *              15            remove 10             15
         *            /    \                              /    \
         *           10     20                           1      20
         *         /   \                                  \
         *        1     12                                 12
         * 
         *    З node10 ідемо в ліве піддерево (node 1), у нього немає дочірніх елементів - оже він є найбільший елемент, яким ми замінемо node 10 
         *    отже з node10 посилання на node1 буде node10.left                                         
         *                                             
         * 
         *              15            remove 10             15
         *            /    \                              /    \
         *           10     20                           5      20
         *         /   \                               /   \
         *        1     12                            1     12
         *         \                                  
         *          5   
         *                                 
         *    З node10 ідемо в ліве піддерево (node 1), у нього є дочірні елементи - оже проводимо пошук найбільшого значення в них
         *    (найбільше значення це завжди right). З node1 ідемо у node5, у нього немає дочірніх отже node5 - найбільше значення,
         *    отже посилання на нього буде node1.right
         * 
         * Так само і для якщо _getNodeToReplace буде шукати не найбільше значення у лівому піддереві, а найменше значення у правому піддереві.
         * Посилання може бути parent.right (якщо немає дочірніх) і parent.left (якщо дочірні є)
         */
        if(parentNodeToReplace.left.value === nodeToReplace.value) {
          // на випадок якщо у parentNodeToReplace.left є right child треба його зберегти
          parentNodeToReplace.left = parentNodeToReplace.left?.right ?? null
        } else {
          parentNodeToReplace.right =  parentNodeToReplace.right?.right ?? null
        }
        nodeToReplace.right = parent[ref].right
        nodeToReplace.left = parent[ref].left
        parent[ref] = nodeToReplace

        return node
    }

    if(node.right && !node.left) {
      parent[ref] = node.right
      return node
    }

    if(!node.left && node.left) {
      parent[ref] = node.left
      return node
    }

    if(!node.left && !node.right) {
      parent[ref] = null
      return node
    }

  }
}

// var binarySearchTree = new BinarySearchTree();
// binarySearchTree
//     .insert(15)
//     .insert(20)
//     .insert(10)
//     .insert(12)
//     .insert(1)
//     .insert(5)
//     .insert(50);
// binarySearchTree.remove(50);
// binarySearchTree.root.right.value // 20
// binarySearchTree.root.right.right // null
 
// binarySearchTree.remove(5);
// binarySearchTree.root.left.left.value // 1
// binarySearchTree.root.left.left.right // null
 

// var binarySearchTree = new BinarySearchTree();
// binarySearchTree
//     .insert(15)
//     .insert(20)
//     .insert(10)
//     .insert(12)
//     .insert(1)
//     .insert(5)
//     .insert(50);
 
// binarySearchTree.remove(1);
// binarySearchTree.root.left.left.value // 5
// binarySearchTree.root.left.left.left // null
// binarySearchTree.root.left.left.right // null
 
// binarySearchTree.remove(20);
// binarySearchTree.root.right.value // 50
// binarySearchTree.root.right.right // null
// binarySearchTree.root.right.left // null
 
// var binarySearchTree = new BinarySearchTree();
// binarySearchTree
//     .insert(15)
//     .insert(20)
//     .insert(10)
//     .insert(12)
//     .insert(1)
//     .insert(5)
//     .insert(50)
//     .insert(60)
//     .insert(30)
//     .insert(25)
//     .insert(23)
//     .insert(24)
//     .insert(70);
 
// binarySearchTree.remove(10);
// binarySearchTree.root.left.value // 12
// binarySearchTree.root.left.left.value // 1
// binarySearchTree.root.left.left.right.value // 5
 
// binarySearchTree.remove(50);
// binarySearchTree.root.right.value // 20
// binarySearchTree.root.right.right.value // 60
// binarySearchTree.root.right.right.left.value // 30
 
// var binarySearchTree = new BinarySearchTree();
// binarySearchTree
//     .insert(22)
//     .insert(49)
//     .insert(85)
//     .insert(66)
//     .insert(95)
//     .insert(90)
//     .insert(100)
//     .insert(88)
//     .insert(93)
//     .insert(89)
 
// binarySearchTree.remove(85);
// binarySearchTree.root.right.right.value // 88
// binarySearchTree.root.right.right.right.left.left.value // 89



