/**
 * Задача
 * Маємо набір монет [1, 2, 3, 4, 5] і число 11. Масив монет завжди відсортований,
 * треба вказати найменшу кількість монет необхідну для отримання числа 11
 * Реалізувати використовуючи greedy algorithm
 */

/**
 * Мій алгоритм, який НЕ є правильним greedy algorithm, бо є код
 * 
 *  if(_coins.length > 0 && diff !== 0) {
*     _coins.length = _coins.length - 1
 *    diff = amount
 *    coins_list.length = 0
 *  }
 * 
 * який по суті є відкатом, якщо не знайшли рішення то починаємо з початку, у greedy algorithm
 * не може бути відката
 * 
 * */ 
// function shortestCoinCombination(coins, amount) {
//   const _coins = [...coins]
//   let diff = amount
//   const coins_list = []

//   while(diff > 0) {

//     let i=_coins.length - 1
//     while(i >= 0) {
//       const lastCoin = _coins[i]
//       if(lastCoin == 0) {
//         break
//       }
//       const d = diff - lastCoin
//       if(d >= 0) {
//         diff = d
//         coins_list.push(lastCoin)
//       } else {
//         i--
//       }
//     }

//     if(_coins.length > 0 && diff !== 0) {
//       _coins.length = _coins.length - 1
//       diff = amount
//       coins_list.length = 0
//     }
    
//     if(_coins.length == 0 && diff !== 0) {
//       coins_list.length = 0
//     }
//   }

//   return coins_list
// }



// рішення Gemini (справжній greedy algorithm без відката)
function shortestCoinCombination(coins, amount) {
  const result = []; // Масив для зберігання використаних монет
  let remainingAmount = amount; // Залишок суми, який потрібно набрати

  for (let i = coins.length - 1; i >= 0; i--) {
    const coin = coins[i]; // Поточна монета, починаючи з найбільшої

    // Поки залишок суми більший або дорівнює поточній монеті,
    // додаємо цю монету до результату і зменшуємо залишок.
    while (remainingAmount >= coin) {
      result.push(coin);
      remainingAmount -= coin;
    }

    // Якщо залишок став нулем, ми знайшли рішення і можемо вийти.
    // Це оптимізація, щоб не перебирати зайві монети.
    if (remainingAmount === 0) {
      break;
    }
  }

  // Якщо після проходження всіх монет залишок все ще не нуль,
  // це означає, що суму неможливо набрати за допомогою даних монет.
  // (Хоча для цієї задачі припускається, що монета 1 завжди є).
  if (remainingAmount > 0) {
    // Якщо завдання вимагає повертати пустий масив, коли суму неможливо набрати:
    return [];
  }
  
  // Результат вже відсортований за спаданням, оскільки ми додавали монети,
  // починаючи з найбільших.
  return result;
}



// Приклади з умови задачі:
console.log(shortestCoinCombination([1, 2, 3, 4, 5], 11));     // Очікується: [5, 5, 1]
// console.log(shortestCoinCombination([5, 10, 15, 20, 25], 85)); // Очікується: [25, 25, 25, 10]
// console.log(shortestCoinCombination([1, 5, 6, 9], 11));       // Очікується: [9, 1, 1]


// Випадок коли рішення gemini не працює, бо у нього "правильний" greedy algorithm, навідміну від мого
// console.log(shortestCoinCombination([2, 3, 4, 6], 7));     // Очікується: [ 4, 3 ]
