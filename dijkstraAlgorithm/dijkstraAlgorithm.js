
// Ця версія queue доволі проста, при додаванні нового item потрібно викликати sort
// а це O(n*log n)). Але ця реалізація добре підходить для демонстрації, потім її можна замінити
// на реальний приклад queue який побудований на binary heap
class PriorityQueue {
  constructor() {
    this.values = []
  }
  enqueue(value, priority) {
    this.values.push({value, priority})
    this.sort()
  }

  dequeue() {
    return this.values.shift()
  }

  sort() {
    this.values.sort((a,b) => a.priority - b.priority)
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

  addEdge(vertex1, vertex2, weight) {
    const node1 = {vertex: vertex1, weight}
    const node2 = {vertex: vertex2, weight}

    if(this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex1].push(node2)
      this.adjacencyList[vertex2].push(node1)
    }
  }


  dijkstraAlgorithm(start, finish) {
    const nodes = new PriorityQueue()
    const distances = {}
    const previous = {}
    const shortestPath = []
    let smallestVertex

    // setup initial state
    for(const vertex in this.adjacencyList) {
      if(vertex === start) {
        distances[vertex] = 0
        nodes.enqueue(vertex, 0)
      } else {
        distances[vertex] = Infinity
        nodes.enqueue(vertex, Infinity)
      }
      previous[vertex] = null
    }

    /**
      INITIAL STATE

      console.log(nodes);
      PriorityQueue {
        values: [
          { value: 'A', priority: 0 },
          { value: 'B', priority: Infinity },
          { value: 'C', priority: Infinity },
          { value: 'D', priority: Infinity },
          { value: 'E', priority: Infinity },
          { value: 'F', priority: Infinity }
        ]
      } 

      console.log(distances);
      {
        A: 0,
        B: Infinity,
        C: Infinity,
        D: Infinity,
        E: Infinity,
        F: Infinity
      }

      console.log(previous);
      { A: null, B: null, C: null, D: null, E: null, F: null }

     */

    while(nodes.values.length) {
      smallestVertex = nodes.dequeue().value

      if(smallestVertex === finish) {
        // WE ARE DONE. BUILD PATH AND RETURN ONE
        /**
         * Може здатися що якщо ми вийдемо після smallestVertex === finish то можемо пропустити
         * якийсь коротший шлях, але це не так, бо ми використовуємо queue, тобто у нас вершині (0 індекс)
         * буде найкоротший шлях до ноди
         * 
         *                4 
         *           A--------B
         *       9  /           \ 1
         *         /    1    2   \ 
         *       C --------D------E
         *         \       |       /
         *          \      |      /
         *           \    1|     /
         *         4  \    |    /
         *             \   |   / 1
         *              \  |  /
         *               \ | /
         *                 F
         * 
         * Припустимо я шукаю найкоротший шлях з А до С. Я додам до queue A-B:4, A-C:9 (найкоротша нода перша),
         * потім  A-B видалиться і піду далі до E -> B-E: 1, A-C:9. B-E видалиться і я піду до D -> E-D: 2, A-C:9.
         * E-D видалиться і піду до DC ->  D-C: 1, A-C:9.
         * І вийде що шляхом A-C = 9, а шляхом A-B-E-D-C = 8
         * 
         * А якби якась з нод A-B-E-D-C була б більша за 9 (тобто АС) то тоді очевидно що якщо їх хоч на одну більше вони будуть
         * довші бо буде 9+x (і неважливо яка вага х, головне що >= 1)
         */
        
        while(previous[smallestVertex]) {
          shortestPath.push(smallestVertex)
          smallestVertex = previous[smallestVertex]
        }

        break
      }

      if(smallestVertex || distances[smallestVertex] !== Infinity) {
        for(let neighbor of this.adjacencyList[smallestVertex]) {
          let candidate = distances[smallestVertex] + neighbor.weight

          if(candidate < distances[neighbor.vertex]) {
            // updating the smallest distance to neighbor
            distances[neighbor.vertex] = candidate
            // updating previous - how we got to neighbor
            previous[neighbor.vertex] = smallestVertex
            // enqueue in priority queue with new priority
            nodes.enqueue(neighbor.vertex, candidate)
          }
        }
      }
    }

    // shortestPath не містить початкову точку, і у нього зворотній порядок, тож виправимо це
    const result = shortestPath.concat(smallestVertex).reverse()
    console.log('shortestPath: ', result)
    return result
  }
}


/**
 *                4 
 *           A--------B
 *       2  /           \ 3
 *         /    2    3   \ 
 *       C --------D------E
 *         \       |       /
 *          \      |      /
 *           \    1|     /
 *         4  \    |    /
 *             \   |   / 1
 *              \  |  /
 *               \ | /
 *                 F
 */

const graph = new WeightedGraph()
graph.addVertex("A")
graph.addVertex("B")
graph.addVertex("C")
graph.addVertex("D")
graph.addVertex("E")
graph.addVertex("F")

graph.addEdge("A", "B", 4)
graph.addEdge("A", "C", 2)
graph.addEdge("B", "E", 3)
graph.addEdge("C", "D", 2)
graph.addEdge("C", "F", 4)
graph.addEdge("D", "E", 3)
graph.addEdge("D", "F", 1)
graph.addEdge("E", "F", 1)

graph.dijkstraAlgorithm("A", "E") // [ 'A', 'C', 'D', 'F', 'E' ]