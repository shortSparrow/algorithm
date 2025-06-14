/**
 * Задача Unbound Knapsack
 * Дуже схожа задача на 0/1 Knapsack, з лише однією відмінністю. Кожен товар можна взяти необмежену кількість разів
 *
 * Маємо масив предметів де вказана їх цінність і вага. Кожен предмет можна взяти скільки завгодно разів (або не брати взагалі).
 * Потрібно знайти комбінацію яку можна засунути в рюкзак і яка дасть найбільшу цінність і не перевищить місткість рюкзака
 */

/**
 * Це є повним алгоритмом Dynamic Programming для Unbound Knapsack.
 * Ми можемо скільки завгодно раз один і той самий товар, бо хоч кожен товар і відповідає одному рядку,
 * але ми спочатку ставимо попереднє значення комірки в поточну dp[i][j] = dp[i - 1][j], а потім звертаємося 
 * до поточної комірки dp[i][j - current_item.weight]. У 0/1 Knapsack ми зверталися так dp[i - 1][j - current_item.weight]
 */
function knapsackUnboundDP(stuff, max_weight) {
  const dp = new Array(stuff.length + 1)
    .fill(0)
    .map(() => new Array(max_weight + 1).fill(0));

  for (let i = 1; i <= stuff.length; i++) {
    const current_item = stuff[i - 1];
    for (let j = 0; j <= max_weight; j++) {
      dp[i][j] = dp[i - 1][j];

      if (j >= current_item.weight) {
        const new_value = current_item.value + dp[i][j - current_item.weight];
        dp[i][j] = Math.max(dp[i][j], new_value);
      }
    }
  }

  const max_value = dp[dp.length - 1][max_weight];
  const selectedItems = [];
  let currentWeight = max_weight;
  let currentIndex = dp.length - 1;

  while (currentIndex > 0 && currentWeight > 0) {
    if (dp[currentIndex][currentWeight] !== dp[currentIndex - 1][currentWeight]) {
      const item = stuff[currentIndex - 1];

      /**
       * Ми взяли цей предмет і продовжуємо віднімати його вагу та додавати його, поки
       * його подальше включення не перестає покращувати результат (або поки не стане 0).
       * Це випадок, коли current_item.value + dp[currentIndex][currentWeight - item.weight]
       * було кращим, ніж dp[currentIndex - 1][currentWeight]
       * 
       * dp[currentIndex][currentWeight] - максимальна цінність для поточної ваги
       * item.value - value поточного товару
       * currentWeight - item.weight - залишок weight після віднімання поточного товару 
       * dp[currentIndex][currentWeight - item.weight] - максимальна цінність яку можна отримати для цієї ваги
       */

      while (
        currentWeight >= item.weight &&
        dp[currentIndex][currentWeight] ===
          item.value + dp[currentIndex][currentWeight - item.weight]
      ) {
        selectedItems.push(item.name);
        currentWeight -= item.weight;
      }
    }
    currentIndex--;
  }

  return {
    maxValue: max_value,
    selectedItems: selectedItems.reverse(),
  };
}

// console.log(
//   knapsackUnboundDP(
//     [
//       { name: "A", value: 100, weight: 6 },
//       { name: "B", value: 90, weight: 5 },
//       { name: "C", value: 90, weight: 5 },
//     ],
//     12
//   )
// );

// console.log(
//   knapsackUnboundDP(
//     [
//       { name: "A", value: 30, weight: 6 },
//       { name: "B", value: 14, weight: 3 },
//       { name: "C", value: 16, weight: 4 },
//       { name: "D", value: 9, weight: 2 },
//     ],
//     10
//   )
// );

// console.log(
//   knapsackUnboundDP(
//     [
//       { name: "A", value: 30, weight: 6 },
//       { name: "B", value: 14, weight: 3 },
//       { name: "C", value: 16, weight: 4 },
//       { name: "D", value: 10, weight: 2 },
//     ],
//     10
//   )
// );

// Те саме рішення, але з одномірним масивом
function knapsackUnboundDP_OneDimensionArray(_stuff, max_weight) {
  const stuff = _stuff.sort((a,b) => a.weight - b.weight) // Не є необхідним для визначення value, але є необхідним для backtracing
  const dp = new Array(max_weight + 1).fill(0);

  for (let i = 0; i < stuff.length; i++) {
    const current_item = stuff[i];
    // Перебираємо вагу від ваги поточного предмета до максимальної
    for (let j = current_item.weight; j <= max_weight; j++) {
      const new_value = current_item.value + dp[j - current_item.weight];
      dp[j] = Math.max(dp[j], new_value);
    }
  }

  // --- Відновлення обраних предметів (Backtracking) ---
  const selectedItems = [];
  let currentWeight = max_weight; // Починаємо з цільової максимальної ваги

  // Рухаємося назад, доки є залишок ваги
  while (currentWeight > 0) {
    let itemFoundThisIteration = false;

      /**
       * Перебираємо ВСІ предмети, щоб знайти той, який міг бути доданий.
       * Зазвичай краще перебирати у зворотному порядку, або в порядку, який відповідає тому, як вони були оброблені або відсортовані
       * (наприклад, якщо сортували за вагою, то починати з найважчих). Тут ми використовуємо відсортований stuff, тому 
       * зворотний порядок (від найбільшої ваги до найменшої) може бути корисним для того, щоб алгоритм "жадібно" обирав
       * спочатку важчі предмети, якщо вони призвели до оптимального рішення
       */
      for (let i = stuff.length - 1; i >= 0; i--) {
        const item = stuff[i];

        // Перевіряємо, чи поточний предмет міг бути взятий
        // І чи його взяття призвело б до поточного значення dp[currentWeight]
        if (
          currentWeight >= item.weight &&
          dp[currentWeight] === (item.value + dp[currentWeight - item.weight])
        ) {
          
          selectedItems.push(item.name); // Додаємо цей предмет до списку
          currentWeight -= item.weight;   // Зменшуємо поточну вагу
          itemFoundThisIteration = true;  // Вказуємо, що ми знайшли предмет
          break; // Важливо: виходимо з внутрішнього циклу, бо ми вже "взяли" предмет,
                // і тепер потрібно шукати наступний для ЗАЛИШКОВОЇ ваги.
                // Якщо ми не вийдемо, і буде інший предмет, який також дає ту саму цінність,
                // ми можемо додати його теж, що не завжди правильно.
        }
      }

      /**
       * Якщо ми пройшли всі предмети і не знайшли жодного, який міг би бути доданий для поточного currentWeight,
       * це означає, що  ми досягли стану, який не може бути розкладений далі (або є помилка, або currentWeight
       * стала 0, що є умовою виходу з while).
       */

    if (!itemFoundThisIteration && currentWeight > 0) {
      /**
       * Це може статися, якщо dp[currentWeight] не є досяжним (наприклад, якщо max_weight є 7,
       * а мінімальна вага предмету 3, то dp[1], dp[2] будуть 0) або якщо є якісь аномалії.
       * Для повністю досяжних dp значень ця гілка не повинна спрацьовувати до currentWeight=0.
       * 
       * Для двомірного масиву це не проблема бо там ми миємо currentIndex-- і як тільки він
       * стане 0, то ми виходимо з зовнішнього циклу
       */
        break;
    }
  }
  const max_value = dp[max_weight];
  return {
    maxValue: max_value,
    selectedItems: selectedItems.reverse(), // Повертаємо у прямому порядку
  };
}

// Цей метод відновлення шляху для одномірного масиву є досить поширеним. Він не завжди дасть абсолютно унікальний набір елементів, якщо є кілька комбінацій з однаковою maxValue, але він поверне один з них
// console.log(
//   knapsackUnboundDP_OneDimensionArray(
//     [
//       { name: "A", value: 30, weight: 6 },
//       { name: "B", value: 14, weight: 3 },
//       { name: "C", value: 16, weight: 4 },
//       { name: "D", value: 9, weight: 2 },
//     ],
//     10
//   )
// );

console.log(
  knapsackUnboundDP_OneDimensionArray(
    [
      { name: "A", value: 30, weight: 7 },
      { name: "B", value: 14, weight: 4 },
      { name: "C", value: 16, weight: 8 },
      { name: "D", value: 9, weight: 6 },
    ],
    10
  )
);
