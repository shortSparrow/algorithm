class Node {
  constructor(value, weighted) {
    this.value = value
    this.weighted = weighted
  }
}

class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(vertex1, vertex2, weighted) {
    const node1 = new Node(vertex1, weighted)
    const node2 = new Node(vertex2, weighted)

    if(this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex1].push(node2)
      this.adjacencyList[vertex2].push(node1)
    }
  }
}


const graph = new WeightedGraph()
graph.addVertex('Kyiv')
graph.addVertex('Lviv')
graph.addVertex('Kharkiv')

graph.addEdge('Kyiv', 'Lviv', 10)

console.log(graph.adjacencyList);
// [
//   Kyiv: [ Node { value: 'Lviv', weighted: 10 } ],
//   Lviv: [ Node { value: 'Kyiv', weighted: 10 } ],
//   Kharkiv: []
// ]