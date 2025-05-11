/**
 * 
 * Dijkstra's algorithm
 * 
 * Dijkstra's algorithm чудово підходить для weighted positive graphs, але він Не працює з negative weighted.
 * Dijkstra's algorithm також працює і з unweighed, але для цього можна використати і простий Breadth-First Search 
 * він дасть той самий результат
 * Для negative weighted графів треба використовувати Bellman-Ford algorithm
 * 
 * Алгоритм працює так:
 *  1. Обираємо ноду з найменшою сумарною вагою (вага її і всього шляху ноду які до неї ведуть)
 *  2. Беремо її дітей (neighbors) і рахуємо весь шлях до них (вагу всіх нод які привели до цього neighbor)
 *  3. Якщо значення для цього neighbor ще не було задано (воно infinity) то задаємо його, якщо вже було то перевіряємо чи
 *     нове значення менше за поточне, якщо менше то ставимо нове значення
 *  4. Продовжуємо кроки 1-3 доки не дійдемо до ноди до якої шукаємо шлях
 * 
 * 
 * Може здатися, що деякі шляхи не будуть перевірені, але це не так. Бо суть алгоритму доходити до кожної ноди найкоротшим шляхом, і
 * на основі цієї ноди шукати наступні найкоротші шляхи но наступної ноди
 * 
 *     1
 *  A --- B
 *  |\6  / 4 
 * 2|  C
 *  |  / \ 
 *  | /5  \ 3
 *  |/      D
 *  E      
 * 
 * Припустимо я хочу знайти найкоротший шлях з А до D
 * 1. Я обираю А бо до цієї ноди найкоротший шлях (0)
 * 2. Я іду з А до B і це для мене поки найкоротший шях до B (сумарно дорівнює 1), потім я іду до С і це для мене поки 
 *    найкоротший шях до С (сумарно дорівнює 6), потім я іду до E і це для мене поки найкоротший шях до E (сумарно дорівнює 2)
 * 3. Тепер я маю обрати ноду з найкоротшим шляхом, для мене це B (бо не неї шлях від А = 1)
 * 4. Беру neighbors у B - це лише C і наразі шлях до C з А дорівнює 6, але новий шлях з А через B до C коротший і дорівнює 5, отже
 *    записую його. (Тут важливо зрозуміти що я викидаю старий шлях і забуваю про нього бо я вже визначив що є більш швидкий шлях
 *    до цієї ноди, відповідно шлях з А до С більше ніколи не буде враховуватися в подальших обрахунках, коли я буду йти від С і шукати
 *    наступній найближчі ноди я буду рахувати що до С ми прийшли через шлях A->B->C)
 * 5. Тепер я маю обрати ноду з найкоротшим шляхом, для мене це E (бо не неї шлях від А = 2)
 * 6. Беру neighbors у B, і наразі шлях до C з А дорівнює 5 (шлях A->B->C), мій шлях A->E->C буде дорівнювати 7, отже попередній
 *    шлях швидший тож я забуваю про цей шлях і лишаю старий
 * 7. Тепер я маю обрати ноду з найкоротшим шляхом, для мене це С (бо не неї шлях від А = 5)
 * 8. Беру neighbors у С, і наразі шлях до D ще не був встановлений тож встановлює шлях A->B->C->D і сумарно це буде 8
 * 
 * 
 * Варто зауважити що Dijkstra's algorithm не працює з негативними weight, в низу я детальніше описує приклад і чому він не працює
 *        
 */




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
    const result = shortestPath.concat(start).reverse()
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

// const graph = new WeightedGraph()
// graph.addVertex("A")
// graph.addVertex("B")
// graph.addVertex("C")
// graph.addVertex("D")
// graph.addVertex("E")
// graph.addVertex("F")

// graph.addEdge("A", "B", 4)
// graph.addEdge("A", "C", 2)
// graph.addEdge("B", "E", 3)
// graph.addEdge("C", "D", 2)
// graph.addEdge("C", "F", 4)
// graph.addEdge("D", "E", 3)
// graph.addEdge("D", "F", 1)
// graph.addEdge("E", "F", 1)

// graph.dijkstraAlgorithm("A", "E") // [ 'A', 'C', 'D', 'F', 'E' ]


/**
 * Negative weighted
 * 
 * ! Graph який ламає dijkstra's algorithm
 * 
 * 
 * Припустимо я хочу отримати барабани і у мене є книга (Book) яку я можу обміняти на м'яч (Ball) і доплатити 5 грн,
 * або на постер (Poster) і доплатити 0 грн. Але також якщо я обміняю м'яч (Ball) на постер (Poster) то МЕНІ ЗАПЛАТЯТЬ цілих 7 грн, і в кінці
 * якщо я поміняю постер на барабани (Drums) то повинен буду доплатити 35 грн
 *        
 *       Ball
 *     5 / |
 *      /  | 
 *  Book   | -7
 *      \  |
 *    0  \ |         35
 *      Poster ------------- Drums
 * 
 * Тож який шлях призведе до того що я отримаю Drums і заплачу найменше, очевидно що:
 * Book-Ball-Poster-Drums, бо міняю Book на Ball і плачу 5 грн, потім міняю Ball на Poster і отримую 7 грн, тож
 * сумарно я отримав Poster і заробив 2 грн, і тепер міняю Poster на Drums, тож маю заплатити 35 грн, але оскільки я
 * заробив 2 грн то сумарно я втратив 33 грн
 * 
 * А Dijkstra's algorithm зациклиться і ніколи не завершиться, бо
 *  1. Починаю з Book і додаю два його neighbor до priorityQueue, а саме Ball (5) і Poster (0)
 *  2. Беру ноду з priorityQueue з найменшою вагою - Book-Poster (0)
 *  3. У Poster додаю два neighbor до priorityQueue, а саме Ball (-7) і Drums (35)
 *  4. Беру ноду з priorityQueue з найменшою вагою - Poster-Ball (-7). До Ball вже було прокладено шлях
 *     Book-Ball з сумарною вагою 5, а новий шлях Book-Poster-Ball буде мати вагу -7. Тож до Ball тепер
 *     ідемо тільки таким шляхом
 *  5. У Ball проходжуся по двом neighbors, а саме Book і Poster. І оскільки ми прийшли до Book з Poster, 
 *     то загальна вага з Ball до Book буде -7 + 5 = 2, і вона менша ніж попередня вага з Book до Ball, а саме 5,
 *     тож оновлюємо нове значення для Book (2).
 *     
 *     Ідемо до другого neighbor - Poster, його сумарна вага була -7, а оскільки шлях з Ball до Poster теж -7,
 *     то маємо -7 + -7 = -14, що є меншою вагаю ніж була для шляху Book-Poster, тож тепер міняємо його на
 *     Book-Poster-Ball-Poster.
 *     
 *     Ну і далі так само цикл продовжиться до нескінченності. Тож як бачимо тут є 2 проблеми:
 *      1. Те, що у нас є цикл через те що graph не є направленим (directed) 
 *      2. Негативна вага підтримує цикл нескінченно
 * 
 *  Цікаво що без негативної ваги результат буде правильний, або якщо лишити негативну вагу і замість undirected graph
 *  використати directed graph то результат теж буде правильний, бо цикл утворюється лише коли є undirected graph і негативна вага
 *  
 *  Для роботи з графами де є негативна вага використовується алгоритм Bellman-Ford
 */

const graph = new WeightedGraph()
graph.addVertex("Book")
graph.addVertex("Ball")
graph.addVertex("Poster")
graph.addVertex("Drums")

graph.addEdge("Book", "Ball", 5)
graph.addEdge("Book", "Poster", 0)
graph.addEdge("Ball", "Poster", -7)
graph.addEdge("Poster", "Drums", 35)

graph.dijkstraAlgorithm("Book",  "Drums")
