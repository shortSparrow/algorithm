
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


const undirectedGraph = new DirectedGraph()
undirectedGraph.addVertex("Kyiv")
undirectedGraph.addVertex("Lviv")
undirectedGraph.addVertex("London")
undirectedGraph.addVertex("Rome")
undirectedGraph.addVertex("Paris")

undirectedGraph.addEdge("Kyiv", "London")
undirectedGraph.addEdge("Kyiv", "Rome")
undirectedGraph.addEdge("Lviv", "Paris")
undirectedGraph.addEdge("Paris", "Lviv")

console.log(undirectedGraph.adjacencyList);

undirectedGraph.removeEdge("Paris", "Lviv")
console.log(undirectedGraph.adjacencyList);

// REMOVE VERTEX
// const undirectedGraph = new DirectedGraph()
// undirectedGraph.addVertex("Kyiv")
// undirectedGraph.addVertex("Lviv")
// undirectedGraph.addVertex("London")
// undirectedGraph.addVertex("Rome")
// undirectedGraph.addVertex("Paris")
// undirectedGraph.addVertex("Kharkiv")

// undirectedGraph.addEdge("Kyiv", "London")
// undirectedGraph.addEdge("Kyiv", "Rome")
// undirectedGraph.addEdge("Kyiv", "Kharkiv")
// undirectedGraph.addEdge("Lviv", "Paris")
// undirectedGraph.addEdge("Lviv", "Kharkiv")
// undirectedGraph.addEdge("Kharkiv", "London")
// undirectedGraph.addEdge("Rome", "London")
// undirectedGraph.addEdge("Paris", "Rome")
// undirectedGraph.addEdge("Paris", "Kyiv")
// undirectedGraph.addEdge("Paris", "Kharkiv")
// undirectedGraph.addEdge("London", "Kyiv")
// undirectedGraph.addEdge("London", "Paris")

// console.log(undirectedGraph.adjacencyList);

// undirectedGraph.removeVertex('Kyiv')
// console.log(undirectedGraph.adjacencyList);

