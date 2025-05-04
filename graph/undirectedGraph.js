
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

  removeEdge(vertex1, vertex2) {
    if(this.adjacencyList[vertex1]) {
      this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(vertex => vertex !== vertex2)
    }

    if(this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(vertex => vertex !== vertex1)
    }
  }

  removeVertex(vertex) {
    if(this.adjacencyList[vertex]) {
      for (let v of this.adjacencyList[vertex]) {
        this.adjacencyList[v] = this.adjacencyList[v].filter(vert => vert !== vertex) 
      }
      delete this.adjacencyList[vertex]
    }
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
undirectedGraph.addEdge("Paris", "Lviv") // нічого не зробить оскільки edge уже є

console.log(undirectedGraph.adjacencyList);

undirectedGraph.removeEdge("Kyiv", "London")
console.log(undirectedGraph.adjacencyList);

// REMOVE VERTEX
// const undirectedGraph = new UndirectedGraph()
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

// console.log(undirectedGraph.adjacencyList);

// undirectedGraph.removeVertex('Kyiv')
// console.log(undirectedGraph.adjacencyList);
