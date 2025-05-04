

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
  DFS pseudo code

  DFS_Recursive(vertex) {
    if vertex is empty
      return null or undefined
    add vertex to result list
    mark vertex as visited
    for each neighbor in vertex's neighbors:
      if neighbor is not visited:
        recursively call DFS on neighbor
  }

  Як я розумію такий підхід працює бо в undirected graph "все ноди пов'язані", тобто я можу з будь якої ноди прийти до будь-якої іншої у графі,
  але так не працює у directed graph, тож цікаво як там відбувається прохід по всім нодам?
 */

  DFS_Recursive(vertex) {
    const result = []
    const visitedVertex = {} // {A: true, B: true}
    const these = this
    
    function traversal(vertex) {
      if(!vertex) {
        return null
      }
      result.push(vertex)
      
      visitedVertex[vertex] = true // mark as visited

      for (let neighbor of these.adjacencyList[vertex]) {
        if(!visitedVertex[neighbor]) {
          return traversal(neighbor)
        }
      }
    }

    traversal(vertex)

    return result
  }

  /**
    Ітеративний підхід
    
    Pseudo code
    DFS_Iterative(vertex) {
      let S be a stack
      S.push(start)
      while(S is not empty)
        vertex = S.pop()
        if vertex is not labeled as discovered:
          visit vertex (add to result list)
          label vertex as discovered
          for each of vertex's neighbors, N do
            S.push(N)
    }

   */

  DFSV_Iterative(vertex) {
    const result = []
    const stack = [vertex]
    const visited = {}

    while(stack.length) {
      const v = stack.pop()
      if(!visited[v]) {
        result.push(v)
      }
      visited[v] = true

      for(let edge of this.adjacencyList[v]) {
        if(!visited[edge]) {
          stack.push(edge)
        }
      }
    }

    return result
  }

  DFSV_Iterative_UdemySolution(vertex) {
    // теж саме просто рішення з Udemy
    const result = []
    const stack = [vertex]
    const visited = {}
    let currentVertex

    visited[vertex] = true
    while(stack.length) {
      currentVertex = stack.pop()
      result.push(currentVertex)

      for(let edge of this.adjacencyList[currentVertex]) {
        if(!visited[edge]) {
          visited[currentVertex] = true
          stack.push(edge)
        }
      }
    }

    return result
    
  }

}


const undirectedGraph = new UndirectedGraph()
undirectedGraph.addVertex("Kyiv")
undirectedGraph.addVertex("Lviv")
undirectedGraph.addVertex("London")
undirectedGraph.addVertex("Rome")
undirectedGraph.addVertex("Paris")

undirectedGraph.addEdge("Kyiv", "London")
undirectedGraph.addEdge("Kyiv", "Rome")
undirectedGraph.addEdge("Lviv", "Paris")

// console.log(undirectedGraph.DFS_Recursive("Kyiv")); // [ 'Kyiv', 'London', 'Lviv']
/**
 * Зараз мій граф не цільний, у мене Львів і Париж як окремий граф
 * 
 *      Kyiv
 *    /     \
 *  London   Rome
 * 
 *  Lviv --- Paris
 * 
 * 
 * Тому додам Edge між London і Lviv
 */


undirectedGraph.addEdge("London", "Lviv")

/**
 * Тепер маю повноцінний граф
 * 
 *      Kyiv
 *    /     \
 *  London   Rome
 *   | 
 *  Lviv --- Paris
 */

console.log(undirectedGraph.adjacencyList);
console.log(undirectedGraph.DFS_Recursive("Kyiv")); // [ 'Kyiv', 'London', 'Lviv', 'Paris', 'Rome' ]
console.log(undirectedGraph.DFS_Recursive("Paris")); // [ 'Paris', 'Lviv', 'London', 'Kyiv', 'Rome' ]
console.log(undirectedGraph.DFSV_Iterative("Paris")); // [ 'Paris', 'Lviv', 'London', 'Kyiv', 'Rome' ]




// Example 2
const undirectedGraph2 = new UndirectedGraph()
const graph = {
  "A": ["B", "C"],
  "B": ["A", "D"],
  "C": ["A", "E"],
  "D": ["B", "E", "F"],
  "E": ["C", "D", "F"],
  "F": ["D", "E"],
}
undirectedGraph2.adjacencyList = graph

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

// console.log(undirectedGraph2.adjacencyList);
// console.log(undirectedGraph2.DFS_Recursive("A")); // [ 'A', 'B', 'D', 'E', 'C', 'F' ]
// console.log(undirectedGraph2.DFS_Recursive("D")); // [ 'D', 'B', 'A', 'C', 'E', 'F' ]
// console.log(undirectedGraph2.DFSV_Iterative("D")); // [ 'D', 'F', 'E', 'C', 'A', 'B' ]