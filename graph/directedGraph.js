
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

  removeEdge(vertex1, vertex2) {
    if(this.adjacencyList[vertex1]) {
      this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(vertex => vertex !== vertex2)
    }
  }

  removeVertex(vertex) {
    if(this.adjacencyList[vertex]) {
      for (let v of Object.keys(this.adjacencyList)) {
        this.adjacencyList[v] = this.adjacencyList[v].filter(vert => vert !== vertex) 
      }
      delete this.adjacencyList[vertex]
    }
  }
}


const directedGraph = new DirectedGraph()
directedGraph.addVertex("Kyiv")
directedGraph.addVertex("Lviv")
directedGraph.addVertex("London")
directedGraph.addVertex("Rome")
directedGraph.addVertex("Paris")

directedGraph.addEdge("Kyiv", "London")
directedGraph.addEdge("Kyiv", "Rome")
directedGraph.addEdge("Lviv", "Paris")
directedGraph.addEdge("Paris", "Lviv")

console.log(directedGraph.adjacencyList);

directedGraph.removeEdge("Paris", "Lviv")
console.log(directedGraph.adjacencyList);

// REMOVE VERTEX
// const directedGraph = new DirectedGraph()
// directedGraph.addVertex("Kyiv")
// directedGraph.addVertex("Lviv")
// directedGraph.addVertex("London")
// directedGraph.addVertex("Rome")
// directedGraph.addVertex("Paris")
// directedGraph.addVertex("Kharkiv")

// directedGraph.addEdge("Kyiv", "London")
// directedGraph.addEdge("Kyiv", "Rome")
// directedGraph.addEdge("Kyiv", "Kharkiv")
// directedGraph.addEdge("Lviv", "Paris")
// directedGraph.addEdge("Lviv", "Kharkiv")
// directedGraph.addEdge("Kharkiv", "London")
// directedGraph.addEdge("Rome", "London")
// directedGraph.addEdge("Paris", "Rome")
// directedGraph.addEdge("Paris", "Kyiv")
// directedGraph.addEdge("Paris", "Kharkiv")
// directedGraph.addEdge("London", "Kyiv")
// directedGraph.addEdge("London", "Paris")

// console.log(directedGraph.adjacencyList);

// directedGraph.removeVertex('Kyiv')
// console.log(directedGraph.adjacencyList);

