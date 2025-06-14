/**
 * Задача
 * Маємо набір монет [1, 2, 3] і число 5. Масив монет завжди відсортований,
 * треба вказати кількість можливих комбінацій для отримання числа 5.
 * Варто зауважити що 1+2 це теж саме що 2+1
 * Вирішити використовуючи dynamic programming (Тут використано memoization - ми "запам'ятовуємо" скількома
 * способами були створені числа по яким вже був обрахунок)
 */

function allPossibleCombinationDP(coins, amount) {
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1;

  for (let i = 0; i < coins.length; i++) {
    const coin = coins[i];
    for (let j = coin; j <= amount; j++) {
      dp[j] += dp[j - coin];
    }
  }

  console.log(dp[amount]);
  
  return dp[amount];
}

const denominations = [1,2,3]
allPossibleCombinationDP(denominations, 5)


// const denominations = [1, 5, 10, 25]
// allPossibleCombinationDP(denominations, 1) // 1
// allPossibleCombinationDP(denominations, 2) // 1
// allPossibleCombinationDP(denominations, 5) // 2
// allPossibleCombinationDP(denominations, 10) // 4
// allPossibleCombinationDP(denominations, 25) // 13
// allPossibleCombinationDP(denominations, 45) // 39
// allPossibleCombinationDP(denominations, 100) // 242
// allPossibleCombinationDP(denominations, 145) // 622
// allPossibleCombinationDP(denominations, 1451) // 425663
// allPossibleCombinationDP(denominations, 14511) // 409222339



/**
 * 
 * Приклад 
 *     coins = [1,2,3]
 *     amount = 5
 * 
 * Завдання
 *    Мета: Знайти кількість унікальних способів розміняти задану суму (amount) з набору номіналів монет (coins).
 *    Приклад: coins = [1, 2, 3], amount = 5.
 * 
 * Основна ідея
 *    Використовуємо таблицю динамічного програмування dp для зберігання проміжних результатів.
 *    dp[i] зберігає кількість способів отримати суму i.
 *    Гарантуємо, що комбінації типу 1+2 та 2+1 рахуються як один спосіб, обробляючи монети послідовно.
 * 
 *  Алгоритм покроково
 *    1. Ініціалізація таблиці dp:
 *        Створити масив dp довжиною amount + 1. Це дозволяє мати індекси від 0 до amount
 *        Для amount = 5, dp матиме 6 елементів (індекси 0, 1, 2, 3, 4, 5). Це нам потрібно бо як я розумію
 *        нам треба мати послідовний список до amount щоб мати всі можливі залишки j - coin (див. далі що це)
 *              0 1 2 3 4 5 - indexes 
 *        dp = [0,0,0,0,0,0]
 *    
 *        Встановити dp[0] = 1. Це означає, що є один спосіб отримати суму 0 (не використовуючи жодної монети).
 *        dp = [1,0,0,0,0,0]
 *    
 *     2. Заповнення таблиці dp:
 *        Виконується два вкладених цикли:
 *        Зовнішній цикл: Ітеруємося по кожному номіналу монети (coin) у масиві coins.
 *        Внутрішній цикл: Для кожного coin, ітеруємося по всіх можливих сумах j від coin до amount.
 *          Оновлення dp[j]:
 *              dp[j] = dp[j] + dp[j - coin]
 *              dp[j] (ліва частина): Це кількість способів отримати суму j після врахування поточної монети coin.
 *              dp[j] (права частина): Це кількість способів отримати суму j, яка була обчислена до розгляду поточної
 *                     монети coin (тобто, використовуючи лише попередні монети).
 *              j - coin: Це залишок суми, який потрібно розміняти, якщо ми вирішимо використати поточну монету coin.
 *              dp[j - coin]: Це кількість способів розміняти саме цей залишок суми (j - coin), яку ми вже обчислили
 *                            на попередніх кроках (для менших сум) або з попередніми монетами. Ми додаємо ці способи
 *                            до dp[j], тому що кожна комбінація для j - coin плюс одна монета coin дає новий спосіб для j
 * 
 * 
 * -----------------------------------------------------------------------------------
 * 
 * проходимося циклом по coins
 * index = 0 => coin = 1
 * 
 *            0 1 2 3 4 5 - indexes 
 *      dp = [1,0,0,0,0,0]
 *     
 *      coin = 1
 *      dp[j] + dp[j-coin] - загальна формула
 *      dp[1] + dp[1-1] = dp[1] + dp[0] => 0 + 1 = 1 (1 спосіб отримати coin 1)
 *      dp[1] = 1 
 * 
 *            0 1 2 3 4 5 - indexes 
 *      dp = [1,1,0,0,0,0]
 * 
 * 
 * 
 *      coin = 2
 *      dp[2] + dp[2-1] = dp[2] + dp[1] => 0 + 1 = 1 (1 спосіб отримати coin 2)
 *      dp[2] = 1    
 * 
 *            0 1 2 3 4 5 - indexes 
 *      dp = [1,1,1,0,0,0]
 * 
 * 
 * 
 *      coin = 3
 *      dp[3] + dp[3-1] = dp[3] + dp[2] => 0 + 1 = 1 (1 спосіб отримати coin 3)
 *      dp[3] = 1    
 * 
 *            0 1 2 3 4 5 - indexes 
 *      dp = [1,1,1,1,0,0]
 * 
 * 
 *      coin = 4 (Це фактично не coin, бо у списку coins його немає)
 *      dp[4] + dp[4-1] = dp[4] + dp[3] => 0 + 1 = 1 (1 спосіб отримати coin 4)
 *      dp[4] = 1    
 * 
 *            0 1 2 3 4 5 - indexes 
 *      dp = [1,1,1,1,1,0]
 * 
 * 
 * 
 *      coin = 5 (Це фактично не coin, бо у списку coins його немає)
 *      dp[5] + dp[5-1] = dp[5] + dp[4] => 0 + 1 = 1 (1 спосіб отримати coin 5)
 *      dp[5] = 1    
 * 
 *            0 1 2 3 4 5 - indexes 
 *      dp = [1,1,1,1,1,1]
 * 
 * 
 * 
 * index = 1 => coin = 2
 * 
 *      coin = 2
 *      dp[2] + dp[2-2] = dp[2] + dp[0] => 1 + 1 = 2 (2 способи отримати coin 2)
 *      dp[2] = 2    
 * 
 *            0 1 2 3 4 5 - indexes 
 *      dp = [1,1,2,1,1,1] 
 * 
 * 
 * 
 *      coin = 3
 *      dp[3] + dp[3-2] = dp[3] + dp[1] => 1 + 1 = 2 (2 способи отримати coin 3)
 *      dp[3] = 2    
 * 
 *            0 1 2 3 4 5 - indexes 
 *      dp = [1,1,2,2,1,1] 
 * 
 * 
 * 
 *      coin = 4 (Це фактично не coin, бо у списку coins його немає)
 *      dp[4] + dp[4-2] = dp[4] + dp[2] => 1 + 2 = 3 (3 способи отримати coin 4)
 *      dp[4] = 3    
 * 
 *            0 1 2 3 4 5 - indexes 
 *      dp = [1,1,2,2,3,1]  
 * 
 * 
 * 
 *      coin = 5 (Це фактично не coin, бо у списку coins його немає)
 *      dp[5] + dp[5-2] = dp[5] + dp[3] => 1 + 2 = 3 (3 способи отримати coin 5)
 *      dp[5] = 3    
 * 
 *            0 1 2 3 4 5 - indexes 
 *      dp = [1,1,2,2,3,3]  
 * 
 * 
 * 
 * 
 * index = 2 => coin = 3
 * 
 *      coin = 3
 *      dp[3] + dp[3-3] = dp[3] + dp[0] => 2 + 1 = 3 (3 способи отримати coin 3)
 *      dp[3] = 3    
 * 
 *           0 1 2 3 4 5 - indexes 
 *     dp = [1,1,2,3,3,3] 
 * 
 * 
 * 
 *      coin = 4 (Це фактично не coin, бо у списку coins його немає)
 *      dp[4] + dp[4-3] = dp[4] + dp[1] => 3 + 1 = 4 (4 способи отримати coin 4)
 *      dp[4] = 4    
 * 
 *            0 1 2 3 4 5 - indexes 
 *      dp = [1,1,2,3,4,3]
 * 
 * 
 * 
 *      coin = 5 (Це фактично не coin, бо у списку coins його немає)
 *      dp[5] + dp[5-3] = dp[5] + dp[2] => 3 + 2 = 5 (5 способи отримати coin 5)
 *      dp[5] = 5    
 * 
 *            0 1 2 3 4 5 - indexes 
 *      dp = [1,1,2,3,4,5]
 * 
 * 
 */




// Рішення для дробових чисел

function allPossibleCombinationDPScaled(coins, amount) {
  // Крок 1: Визначити множник для перетворення в цілі числа.
  // Шукаємо максимальну кількість знаків після коми.
  let maxDecimalPlaces = 0;
  [...coins, amount].forEach(num => {
    const decimalPart = num.toString().split('.')[1];
    if (decimalPart) {
      maxDecimalPlaces = Math.max(maxDecimalPlaces, decimalPart.length);
    }
  });
  const multiplier = Math.pow(10, maxDecimalPlaces);

  // Крок 2: Масштабуємо монети та суму
  const scaledCoins = coins.map(coin => Math.round(coin * multiplier));
  const scaledAmount = Math.round(amount * multiplier);

  // Крок 3: Застосовуємо алгоритм DP для цілих чисел
  const dp = new Array(scaledAmount + 1).fill(0);
  dp[0] = 1;

  for (let i = 0; i < scaledCoins.length; i++) {
    const coin = scaledCoins[i];
    for (let j = coin; j <= scaledAmount; j++) {
      dp[j] += dp[j - coin];
    }
  }

  return dp[scaledAmount];
}

// const denominations = [0.1,0.25, 0.5, 0.75]
// console.log(allPossibleCombinationDPScaled(denominations, 1));
