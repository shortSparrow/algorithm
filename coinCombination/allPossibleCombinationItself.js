
/**
 * Задача
 * Така сама задача що і allPossibleCombination, але тут треба вивести не просто кількість комбінацій, а самі
 * всі можливі комбінації
 * 
 */

function allPossibleCombinationItself(coins, amount) {
  const dp = new Array(amount + 1)

  for (let k = 0; k <= amount; k++) {
    dp[k] = [];
  }

  // Базовий випадок: для суми 0 є одна комбінація - порожній масив.
  dp[0].push([]);
  // dp:  [ [ [] ], [], [], [], [], [] ]

  for (let i = 0; i < coins.length; i++) {
    const coin = coins[i];

    for (let j = coin; j <= amount; j++) {
      // Якщо для суми (j - coin) існують комбінації,
      // то ми можемо використати їх для формування комбінацій для суми j.
      if (dp[j - coin].length > 0) {
        // Для кожної комбінації, що призводить до (j - coin):
        for (const combination of dp[j - coin]) {
          // Створюємо НОВУ комбінацію, додаючи поточну монету.
          // Важливо: використовуємо оператор розширення (...) для створення нової копії масиву,
          // щоб не змінити існуючі комбінації в dp[j - coin].
          const newCombination = [...combination, coin];
          
          // Додаємо нову комбінацію до списку для суми j.
          dp[j].push(newCombination);
        }
      }
    }
  }

  return dp[amount];
}

// Приклади використання:
const denominations = [1, 5, 10, 25];

// console.log(`Amount 1:`, allPossibleCombinationItself(denominations, 1)); // [[1]]
// console.log(`Amount 2:`, allPossibleCombinationItself(denominations, 2)); // [[1, 1]]
// console.log(`Amount 5:`, allPossibleCombinationItself(denominations, 5)); // [[1, 1, 1, 1, 1], [5]]
console.log(`Amount 10:`, allPossibleCombinationItself(denominations, 10));
/*
[
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 5],
  [5, 5],
  [10]
]
*/

