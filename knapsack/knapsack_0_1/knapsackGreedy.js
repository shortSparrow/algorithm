/**
 * Задача 0/1 Knapsack
 * Маємо масив предметів де вказана їх цінність і вага. Кожен предмет можна взяти або 0 разів (не брати взагалі), або 1 раз (взяти повністю).
 * Потрібно знайти комбінацію яку можна засунути в рюкзак і яка дасть найбільшу цінність і не перевищить місткість рюкзака
 */

function knapsackGreedyAlgorithm(stuff, max_weight) {
  const result = [];
  let left_weight = max_weight;

  // sort from small to big value
  const sorted_stuff = stuff.sort((a, b) => a.value - b.value);

  for (let i = sorted_stuff.length - 1; i >= 0; i--) {
    if (left_weight <= 0) break;

    const item = sorted_stuff[i];
    if (left_weight - item.weight > 0) {
      result.push(item);
      left_weight -= item.weight;
    }
  }

  return result;
}

// console.log(
//   knapsackGreedyAlgorithm(
//     [
//       { item: "A", value: 30, weight: 6 },
//       { item: "B", value: 14, weight: 3 },
//       { item: "C", value: 16, weight: 4 },
//       { item: "D", value: 9, weight: 2 },
//     ],
//     10
//   )
// );

// Показує не оптимальність greedy algorithm
// console.log(
//   knapsackGreedyAlgorithm(
//     [
//       { item: "A", value: 100, weight: 6 },
//       { item: "B", value: 90, weight: 5 },
//       { item: "C", value: 90, weight: 5 },
//     ],
//     10
//   )
// );
