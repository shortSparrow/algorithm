/**
 * Inverse binary tree - означає замінити ліві ноди на праві дзеркально, і їх нащадків так само
 * 
 * 
 * 
 *          10                    10
 *        /    \                /    \
 *       5      3              3      5
 *     /  \   /   \          /  \    /  \
 *    4    2 1     8        8    1  2    4
 *
 *
 * [10, 5, 3, 4, 2, 1, 8]
 * [10, 3, 5, 8, 1, 2, 4]
 *
 *
 *                         10                                10
 *                       /    \                            /    \
 *                     15      13                         13     15
 *                    / \     / \                        /  \    / \
 *                  14  12   20  18                     18  20  12  14
 *                  /\  /\   /\  /\                     /\  /\  /\  /\
 *                 1 2  3 4  5 6 7 8                   8 7 6 5  4 3 2 1
 *
 * [10, 15, 13, 14, 12, 20, 18, 1, 2, 3, 4, 5, 6, 7, 8]
 * [10, 13, 15, 18, 20, 12, 14, 8, 7, 6, 5, 4, 3, 2, 1]
 * 
 * 
 * 
 * 
 *  
 *                10                     10          
 *              /    \                 /    \          
 *             6     15               15     6          
 *            / \      \             /      / \           
 *           3   8     20           20     8   3          
 *          /\   /\                       /\   /\          
 *         2 1  4 22                    22  4  1 2            
 *           /\                               /\           
 *          7  9                             9  7           
 * 
 * 
 *  [ 10, 6, 15, 3, 8, 20, 2, 1, 4, 22, 7, 9 ]
 *  [ 10, 15, 6, 20, 8, 3, 22, 4, 1, 2, 9, 7 ]
 */


/**
 * Це рішення для масиву, працює коректно тільки для ідеальних бінарних дерев
 * Я можу порахувати глибину дерева через формулу
 *      Math.floor(Math.log2(tree.length)) + 1;
 * 
 * Коли глибина збільшується на 1 то кількість нод зростає на квадрат, то ж, якщо кількість
 * дітей у ноди завжди 2 то я можу сказати що для глибини 3 буде 2^0 + 2^1 + 2^2 = 7, або 2^3 - 1
 * Я можу використати логарифм для зворотної дії, я знаю що кількість нод 8, то 
 * log2(8) + 1 => 3 (я округлюю в нижню сторону якщо число не ціле) + 1
 * 
 * 
 * Чому не працює округлення в верх
 * +1 додаємо бо наприклад log2(3) = 1.58 (округлимо у верх і буде 2)
 *  А тепер для дерева з 4 нодами
 *  log2(4) = 2, але глибина то 3, тож треба ще + 1
 * 
 * Тому щоб не було зайвої ітерації робимо округлення вниз і додаємо +1
 *
 * 
 * Кількість цифр у рядку я можу дізнатися через формулу 
 *      Math.pow(2, depth);
 * Коли глибина збільшується на 1 то кількість нод зростає на квадрат, то ж якщо кількість
 * дітей у ноди завжди 2 то я можу сказати що для глибини 4 буде 2^4
 */ 
function inverseBinaryTree(tree) {
  if (Array.isArray(tree) === false) {
    return tree;
  }
  
  let prevIdx = 0;
  const rowsCount = Math.floor(Math.log2(tree.length)) + 1;
  for (let rowIdx = 0; rowIdx < rowsCount; rowIdx++) {
    const itemsInRow = Math.pow(2, rowIdx);

    let row = tree.slice(prevIdx, itemsInRow + prevIdx);
    row = row.reverse();

    for (let i = 0; i < row.length; i++) {
      tree[i + prevIdx] = row[i];
    }

    prevIdx += itemsInRow;
  }

  return tree;
}

// console.log(inverseBinaryTree([10, 5, 3, 4, 2, 1, 8])); // [10, 3, 5, 8, 1, 2, 4]
// console.log(inverseBinaryTree([4, 2, 7, 1, 3, 6, 9])); // [4,7,2,9,6,3,1]
// console.log(inverseBinaryTree([2,1,3])); // [ 2, 3, 1 ]
// console.log(inverseBinaryTree([])); // [ ]



// Це рішення для структури Node яка містить .left і .right
function inverseBinaryTreeForNodes(root) {
  const temp = root.left;
  root.left = root.right;
  root.right = temp;
  
  root.left && inverseBinaryTreeForNodes(root.left);
  root.right && inverseBinaryTreeForNodes(root.right);
  
  return root;      
};

class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

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
const node_9 = new Node(7)
const node_7 = new Node(9)

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

const rootIndependentCopy = JSON.parse(JSON.stringify(root))
const invertedRoot = inverseBinaryTreeForNodes(rootIndependentCopy)
// console.log(invertedRoot);



/**
 * А ТЕПЕР ПЕРЕВІРИМО, ПЕРЕТВОРИМО NODE СТРУКТУРУ У МАСИВ І ПЕРЕВІРИМО ЯК У МАСИВІ ВИГЛЯДАЄ root і invertedRoot,
 * а також подивимося чому inverseBinaryTree для масиву _treeToArray(root) видасть результат не такий як _treeToArray(invertedRoot)
 */

function _treeToArray(tree) {
  const data = []
  const queue = []
  let node = null

  queue.push(tree)

  while(queue.length) {
    node = queue.shift()
    data.push(node.value)

    if(node.left) queue.push(node.left)
    if(node.right) queue.push(node.right)
  }

  return data
}

// console.log(_treeToArray(root)); // [ 10, 6, 15, 3, 8, 20, 2, 1, 4, 22, 7, 9 ]
// console.log(_treeToArray(invertedRoot)) // [ 10, 15, 6, 20, 8, 3, 22, 4, 1, 2, 9, 7 ]
// console.log(inverseBinaryTree([ 10, 6, 15, 3, 8, 20, 2, 1, 4, 22, 7, 9 ])); // [ 10, 15, 6, 2, 20, 8, 3, 9, 7, 22, 4, 1]
/**
 * Як бачимо результат інверсія через inverseBinaryTree відрізняється від _treeToArray(invertedRoot), а це тому що inverseBinaryTree
 * працює наче це ідеальне бінарне дерево, тобто заповнене рівномірно. Нам потрібно або в _treeToArray вставляти null там де дітей немає,
 * або з різних дерев ми можемо отримати однакові масиви
 */
