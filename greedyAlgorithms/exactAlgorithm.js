/**
 * exactAlgorithm для set cover problem
 *
 * Цей алгоритм всі можливі підмножини і обере ту яка має найменше станцій і
 * при цьому покриває всі штати.
 *
 * Складність O(n) = 2^n
 *
 */


function _coversUniverse(universe, subsetCoverageArrays) {
  const coveredElements = new Set();
  for (const coverage of subsetCoverageArrays) {
    for (const element of coverage) {
      coveredElements.add(element);
    }
  }

  for (const element of universe) {
    if (!coveredElements.has(element)) {
      return false;
    }
  }

  return true;
}

function exactAlgorithm(universe, stations) {
  let minCoverSize = Infinity;
  const bestCovers = [];

  let allSubsets = [[]];

  for (const station of stations) {
    const currentNumSubsets = allSubsets.length;
    for (let k = 0; k < currentNumSubsets; k++) {
      const existingSubset = allSubsets[k];
      const newSubset = [...existingSubset, station];
      allSubsets.push(newSubset);
    }
  }
  /**
   * Цікаве рішення щоб в allSubsets помістити всі підмножини
   * При 1-ій ітерації станції S1 будемо мати в allSubsets [], [{S1}]
   * При 1-ій ітерації станції S2 будемо мати в allSubsets [], [{S1}], [{S2}]
   * При 2-ій ітерації станції S2 будемо мати в allSubsets [], [{S1}], [{S2}], [{S1}, {S2}]]
   * При 1-ій ітерації станції S3 будемо мати в allSubsets [], [{S1}], [{S2}], [{S1}, {S2}], [{S3}]]
   * При 2-ій ітерації станції S3 будемо мати в allSubsets [], [{S1}], [{S2}], [{S1}, {S2}], [{S3}], [{S1}, {S3}]]
   * При 3-ій ітерації станції S3 будемо мати в allSubsets [], [{S1}], [{S2}], [{S1}, {S2}], [{S3}], [{S1}, {S3}], [{S2}, {S3}]]
   * При 4-ій ітерації станції S3 будемо мати в allSubsets [], [{S1}], [{S2}], [{S1}, {S2}], [{S3}], [{S1], {S3}], [{S2}, {S3}], [{S1}, {S2}, {S3}]]
   * ....
   *
   */

  // Проходжуся по кожній підмножині ([{S1}] або [{S2} ,{S3}]) і перевіряю чи вона буде покривати всі штати (universe)
  for (const subset of allSubsets) {
    if (subset.length === 0) continue;

    const subsetCoverageArrays = subset.map((station) => station.coverage);
    const subsetNames = subset.map((station) => station.name);
    const subsetSize = subset.length;

    if (_coversUniverse(universe, subsetCoverageArrays)) {
      if (subsetSize < minCoverSize) {
        minCoverSize = subsetSize;
        bestCovers.length = 0;
        bestCovers.push(subsetNames);
      } else if (subsetSize === minCoverSize) {
        // Якщо це покриття такого ж розміру, як поточний мінімум - додаємо його до списку найкращих.
        // Тобто найкращих результатів може бути декілька, вони всі мають однакову кількість станції, просто це різні станції
        bestCovers.push(subsetNames);
      }
    }
  }

  return {
    minSize: minCoverSize,
    solutions: bestCovers,
  };
}


const universe = ['A', 'B', 'C', 'D', 'E'];
const allStations = [
    { name: 'Станція 1 (S1)', coverage: ['A', 'B'] },
    { name: 'Станція 2 (S2)', coverage: ['C', 'D'] },
    { name: 'Станція 3 (S3)', coverage: ['A', 'E'] },
    { name: 'Станція 4 (S4)', coverage: ['B', 'C'] },
    { name: 'Станція 5 (S5)', coverage: ['D', 'E'] }
];
const result = exactAlgorithm(universe, allStations);
console.log(result);
// {
//   minSize: 3,
//   solutions: [
//     [ 'Станція 1 (S1)', 'Станція 2 (S2)', 'Станція 3 (S3)' ],
//     [ 'Станція 2 (S2)', 'Станція 3 (S3)', 'Станція 4 (S4)' ],
//     [ 'Станція 1 (S1)', 'Станція 2 (S2)', 'Станція 5 (S5)' ],
//     [ 'Станція 1 (S1)', 'Станція 4 (S4)', 'Станція 5 (S5)' ],
//     [ 'Станція 3 (S3)', 'Станція 4 (S4)', 'Станція 5 (S5)' ]
//   ]
// }


// Для порівняння з greedyAlgorithm, тут такий самий набір даних
// allStations = [
//   { name: "Станція-Пастка", coverage: ["s1", "s2", "s3"] },
//   { name: "Станція А", coverage: ["s1", "s4"] },
//   { name: "Станція B", coverage: ["s2", "s5"] },
//   { name: "Станція C", coverage: ["s3", "s6"] },
// ];
// universe = ["s1", "s2", "s3", "s4", "s5", "s6"];
// const result = exactAlgorithm(universe, allStations);
// console.log(result);
/**
 * Як бачимо тут результат кращий, бо в результаті покриємо все за 3 станції на відміну від 
 * greedyAlgorithm, де покриємо все за 4 станції ('Станція-Пастка', 'Станція A', 'Станція B', 'Станція C')
 * 
 * {
 *    minSize: 3,
 *    solutions: [ [ 'Станція А', 'Станція B', 'Станція C' ] ]
 *  }
 */