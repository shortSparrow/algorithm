/**
 * Find the length of the shortest path from start to finish
 */

class DirectedGraph {
  constructor() {
    this.adjacencyList = {}
  }

  addVertex(vertex) {
    // перезапише вже існуючий (можна додати обробку)
    this.adjacencyList[vertex] = []
  }

  addEdge(vertex1, vertex2) {
    if(this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      if(this.adjacencyList[vertex1].indexOf(vertex2) === -1) {
        this.adjacencyList[vertex1].push(vertex2)
      }
    }
  }


  getShortestPAthLength(vertexStart, vertexEnd) {
    const queue = [vertexStart]
    const visited = {}
    let currentVertex = vertexStart
    
    visited[currentVertex] = true
    const allWays = {}

    while(queue.length){
      const v = queue.shift()

      if(v === vertexEnd) {
        let shortestPath = [vertexEnd]
        let vertex = vertexEnd
        while(vertex != vertexStart) {
          vertex = allWays[vertex]
          shortestPath.push(vertex)
        }
        shortestPath = shortestPath.reverse()
        
        console.log('shortestPath: ', shortestPath) //  [ 'S', 'A', 'F' ]
        console.log('length of the shortest path: ', shortestPath.length - 1) //  -1 бо рахуємо тільки edges, а не вершини
        return shortestPath
      }

      for(const neighbor of this.adjacencyList[v]) {
        if(!visited[neighbor]) {
          visited[neighbor] = true
          queue.push(neighbor)
          allWays[neighbor] = v
        }
      }
    }
  }
}




/**
 *     A-------F
 *    / \      |
 *   S   D     |
 *    \ /      |
 *     B ------E
 * 
 */

// const directedGraph = new DirectedGraph()
// const graph = {
//   "S": ["A", "B"],
//   "A": ["D", "F"],
//   "B": ["D", "E"],
//   "E": ["F"],
//   "D":[],
//   "F": [],
// }
// directedGraph.adjacencyList = graph

// directedGraph.getShortestPAthLength("S", "F")



/**     
 * 
 *               Mat
 *                |  \
 *                |   \
 *                |    \
 *                |     \
 *               Cat----Bat
 *              /  |      |
 *             /   |      |
 *            /    |      |
 *           /     |      |
 *          /      |      |
 *         /       |      |
 *      Cab ----- Car ---Bar 
 * 
 * 
 * 
 * 
 */

const directedGraph = new DirectedGraph()
const graph = {
  "Cab": ["Cat", "Car"],
  "Car": ["Cat", "Bar"],
  "Cat": ["Mat", "Bat"],
  "Bar": ["Bat"],
  "Mat": ["Bat"],
  
}
directedGraph.adjacencyList = graph

directedGraph.getShortestPAthLength("Cab", "Bat")