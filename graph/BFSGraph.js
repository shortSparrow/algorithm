

class UndirectedGraph {
  constructor() {
    this.adjacencyList = {}
  }

  addVertex(vertex) {
    // перезапише вже існуючий (можна додати обробку)
    this.adjacencyList[vertex] = []
  }

  addEdge(vertex1, vertex2) {
    if(this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      // додаємо edge тільки якщо його немає
      if(this.adjacencyList[vertex1].indexOf(vertex2) === -1) {
        this.adjacencyList[vertex1].push(vertex2)
      }

      if(this.adjacencyList[vertex2].indexOf(vertex1) === -1) {
        this.adjacencyList[vertex2].push(vertex1)
      }
    }
  }


/**
 * Візуальне представлення графу
 *          
 *          
 *            0 -----------9
 *          /  \          / \
 *         1    2        /   \
 *        /|\  /        /     \
 *       / |  6--------4-------8
 *      /  3  |        |      /
 *     /    \ |        |     / 
 *    11---- 5---------7---10 
 *
 * 
 * Breads First Search реалізований таким способом щоб ми початку пройшли всі vertex (node) на одній глибині,
 * тобто:
 *  
 * Глибина  | Vertex (node)   |
 * ---------------------------|
 *    0     |  0              |
 * ---------------------------|
 *    1     | 1, 2, 9         |
 * ---------------------------|
 *    2     | 11, 3, 6, 4, 8  | 
 * ---------------------------|
 *    3     | 5, 7, 10        |
 * ---------------------------|
 * 
 * 
 *  DFS pseudo code
 *  По суті це те саме що і ітеративний BFS тільки замість stack ми використовуємо queue
 */

  BFS(vertex) {
    const result = []
    const queue = [vertex]
    const visited = {}

    visited[vertex] = true
    while(queue.length) {
      const v = queue.shift()
      result.push(v)

      for(let neighbor of this.adjacencyList[v]) {
        if(!visited[neighbor]) {
          visited[neighbor] = true
          queue.push(neighbor)
        }
      }
    }

    return result
  }

}


/**
 * Візуальне представлення графу
 *        A
 *      /   \
 *     B     C
 *     |     |
 *     D --- E
 *      \   /
 *        F
 * 
 */
const undirectedGraph = new UndirectedGraph()
const graph = {
  "A": ["B", "C"],
  "B": ["A", "D"],
  "C": ["A", "E"],
  "D": ["B", "E", "F"],
  "E": ["C", "D", "F"],
  "F": ["D", "E"],
}
undirectedGraph.adjacencyList = graph
console.log(undirectedGraph.BFS("A")); // [ 'A', 'B', 'C', 'D', 'E', 'F' ]
// console.log(undirectedGraph.BFS("D")); // [ 'D', 'B', 'E', 'F', 'A', 'C' ]






/**
 * Example 2
 * Візуальне представлення графу
 *          
 *                  
 *                    0 -----------9
 *                  /  \          / \
 *                 1    2        /   \
 *                /|\  /        /     \
 *               / |  6--------4-------8
 *              /  3  |        |      /
 *             /    \ |        |     / 
 *            11---- 5---------7---10 
 * 
 */

const undirectedGraph2 = new UndirectedGraph()
const graph2 = {
  "0": ["1", "2", "9"],
  "1": ["0", "11", "3", "6"],
  "2": ["0", "6"],
  "9": ["0", "4", "8"],
  "11": ["1", "5"],
  "3": ["1", "5"],
  "6": ["1", "2", "4", "5"],
  "4": ["9", "6", "8", "7"],
  "8": ["9", "10", "4"],
  "5": ["11", "3", "6", "7"],
  "7": ["5", "4", "10"],
  "10": ["7", "8"],
}
undirectedGraph2.adjacencyList = graph2
// console.log(undirectedGraph2.BFS("0")); // [ '0', '1', '2', '9', '11', '3', '6', '4', '8', '5', '7', '10' ]
// console.log(undirectedGraph2.BFS("6")); // [ '6', '1', '2', '4', '5', '0', '11', '3', '9', '8', '7', '10' ]

