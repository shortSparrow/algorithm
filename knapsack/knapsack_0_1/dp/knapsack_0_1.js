/**
 * Задача 0/1 Knapsack
 * Маємо масив предметів де вказана їх цінність і вага. Кожен предмет можна взяти або 0 разів (не брати взагалі), або 1 раз (взяти повністю).
 * Потрібно знайти комбінацію яку можна засунути в рюкзак і яка дасть найбільшу цінність і не перевищить місткість рюкзака
 */

/**
 * Це є повним алгоритмом Dynamic Programming для 0/1 Knapsack.
 * Ми не будемо двічі брати один і той самий товар, бо кожен товар відповідає одному рядку,
 * а ми кожну ітерацію спускаємося на 1 рядок вниз
 */
function knapsackDP(stuff, max_weight) {
  const dp = new Array(stuff.length + 1)
    .fill(0)
    .map(() => new Array(max_weight + 1).fill(0));

  for (let i = 1; i <= stuff.length; i++) {
    const current_item = stuff[i - 1];
    for (let j = 0; j <= max_weight; j++) {
      // Випадок 1: Ми НЕ беремо поточний предмет
      // Цінність буде такою ж, як і при розгляді попередніх (i-1) предметів з тією ж вагою j.
      dp[i][j] = dp[i - 1][j];

      // Випадок 2: Ми МОЖЕМО взяти поточний предмет (якщо він поміщається в поточну вагу j)
      // j - це поточна вага
      // j - current_item.weight - залишок доступної ваги після того я поклали товар
      // dp[i-1][j - current_item.weight] - шукаємо елемент з вагою яка лишилася (це максимальне значення value для цієї ваги на поточний момент)
      if (j >= current_item.weight) {
        const new_value = current_item.value + dp[i - 1][j - current_item.weight];
        dp[i][j] = Math.max(dp[i][j], new_value);
      }
    }
  }

  // Ми маємо у dp максимальну суму яку можемо набрати з товарів, тепер треба дізнатися які саме товари це будуть.
  // Для цього використаємо зворотній шлях (backtracking)
  const max_value = dp[dp.length - 1][max_weight];
  const selectedItems = [];
  let currentWeight = max_weight;
  let currentIndex = dp.length - 1; // Починаємо з останнього предмета і повної ваги

  // Рухаємося назад по DP-таблиці
  while (currentIndex > 0 && currentWeight > 0) {
    /**
     * Якщо поточна цінність (dp[currentIndex][currentWeight]) відрізняється від цінності без поточного
     * предмета - (dp[currentIndex - 1][currentWeight]), це означає, що поточний предмет був взятий.
     * 
     * [currentIndex - 1] - це ми звертаємося на попередній рядок, і дивимося на комірку [currentWeight], 
     * тобто так ми дізнаємося значення нашої комірки але 1 рядок назад (на попередньому продукті)
     */
    if (dp[currentIndex][currentWeight] !== dp[currentIndex - 1][currentWeight]) {
      const item = stuff[currentIndex - 1];

      selectedItems.push(item.name);
      currentWeight -= item.weight; // Зменшуємо вагу на вагу взятого предмета
    }
    currentIndex--; // Переходимо до розгляду попереднього предмета
  }

  return {
    maxValue: max_value,
    selectedItems: selectedItems.reverse(), // Повертаємо в прямому порядку
  };
}

// console.log(
//   knapsackDP(
//     [
//       { name: "A", value: 100, weight: 6 },
//       { name: "B", value: 90, weight: 5 },
//       { name: "C", value: 90, weight: 5 },
//     ],
//     10
//   )
// );


// console.log(
//   knapsackDP(
//     [
//       { name: "A", value: 100, weight: 6 },
//       { name: "C", value: 90, weight: 5 },
//     ],
//     10
//   )
// );

// console.log(
//   knapsackDP(
//     [
//       { name: "A", value: 30, weight: 6 },
//       { name: "B", value: 14, weight: 3 },
//       { name: "C", value: 16, weight: 4 },
//       { name: "D", value: 9, weight: 2 },
//     ],
//     10
//   )
// );

/**
 * Приклад knapsack для подорожі
 * Уявімо ви хочете відвідати Лондон і у вас є лише 2 дні,
 * тож ви хочете знайти баланс між кількістю місць і часом який у вас є на відвідини
 * і рейтингом цих місць
 */
// console.log(
//   knapsackDP(
//     [
//       { name: "Westminster Abby", value: 7, weight: 1 },
//       { name: "Globe THeater", value: 6, weight: 1 },
//       { name: "National Gallery", value: 9, weight: 2 },
//       { name: "British Museum", value: 9, weight: 4 },
//       { name: "St. Paul's Cathedral", value: 8, weight: 1  },
//     ],
//     4
//   )
// );



