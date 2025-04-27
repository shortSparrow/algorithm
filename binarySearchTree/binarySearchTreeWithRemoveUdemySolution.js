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


  remove(val) {
    var target = this.root;
    var parent;

    // FIND TARGET NODE, ASSIGN PARENT NODE
    while (target.value !== val) {
      parent = target;
      if (val < target.value) {
        target = target.left;
      } else {
        target = target.right;
      }
    }

    // IF TARGET IS NOT THE ROOT
    if (target !== this.root) {
      // IF NO CHILD NODES
      if (target.left === null && target.right === null) {
        if (parent.left === target) {
          parent.left = null;
        } else {
          parent.right = null;
        }
        // IF TWO CHILDREN NODES - NOT WORKING: NEED TO REACH END-NODE
      } else if (target.left !== null && target.right !== null) {
        let rightParent = target;
        let right = target.right;
        if (right.left === null) {
          right.left = target.left;
          if (parent.left === target) {
            parent.left = right;
          } else {
            parent.right = right;
          }
        } else {
          while (right.left !== null) {
            rightParent = right;
            right = right.left;
          }
          if (parent.left === target) {
            parent.left.value = right.value;
          } else {
            parent.right.value = right.value;
          }
          if (right.right !== null) {
            rightParent.left = right.right;
          } else {
            rightParent.left = null;
          }
        }
        // IF ONE CHILD NODE
      } else {
        if (parent.left === target) {
          if (target.right === null) {
            parent.left = target.left;
          } else {
            parent.left = target.right;
          }
        } else {
          if (target.right === null) {
            parent.right = target.left;
          } else {
            parent.right = target.right;
          }
        }
      }
    }
    return target;
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

var binarySearchTree = new BinarySearchTree();
binarySearchTree
    .insert(22)
    .insert(49)
    .insert(85)
    .insert(66)
    .insert(95)
    .insert(90)
    .insert(100)
    .insert(88)
    .insert(93)
    .insert(89)

binarySearchTree.remove(1111);
binarySearchTree.root.right.right.value // 88
binarySearchTree.root.right.right.right.left.left.value // 89
