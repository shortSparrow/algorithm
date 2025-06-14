/**
 * Задача 0/1 Knapsack
 * Маємо масив предметів де вказана їх цінність і вага. Кожен предмет можна взяти або 0 разів (не брати взагалі), або 1 раз (взяти повністю).
 * Потрібно знайти комбінацію яку можна засунути в рюкзак і яка дасть найбільшу цінність і не перевищить місткість рюкзака
 */


// Тут показаний простий варіант перебору всіх можливих комбінація для масиву чисел. Я Адаптував це підхід у knapsackNaiveWay трохи нижче
// function allPossibleCombinations(stuff) {
//   const allCombinations = [];

//   function helper(start_index = 0, sub_array = []) {
//     for (let i = start_index; i < stuff.length; i++) {
//       const new_sub_array = [...sub_array, stuff[i]]
//       allCombinations.push(new_sub_array);
//       helper(i+1, new_sub_array);
//     }
//   }

//   helper(0, []);

//   return allCombinations;
// }

// console.log(knapsackNaiveWay([1,2,3]));




// Задача перебрати всі можливі варіанти - складність O(n*2^n) - перебір всіх варіантів це 2^n, і для кожної комбінації
// я копію масив довжиною до n. Складність по пам'яті теж O(n*2^n) оскільки я зберігаю всі варіанти і для кожної з них
// роблю копію масиву довжиною до n, але це лише для наочності, це зовсім не обов'язково і можна додати умови щоб додавалося
// та послідовність яка має більшу sum_value, а попередню видаляти
function knapsackNaiveWay(stuff, max_weight) {
  const allCombinations = [];
  let max_sum_value = -Infinity;
  let max_sum_index = null;

  function helper(start_index = 0, sub_item = []) {
    for (let i = start_index; i < stuff.length; i++) {
      const sum_value = stuff[i].value + sub_item.sum_value;
      const sum_weight = stuff[i].weight + sub_item.sum_weight;

      const new_sub_item = {
        arr: [...sub_item.arr, stuff[i]],
        sum_value,
        sum_weight,
      };
      allCombinations.push(new_sub_item);
      if (sum_value > max_sum_value && sum_weight <= max_weight) {
        max_sum_value = sum_value;
        max_sum_index = allCombinations.length - 1;
      }
      helper(i + 1, new_sub_item);
    }
  }

  helper(0, { arr: [], sum_value: 0, sum_weight: 0 });

  console.log(JSON.stringify(allCombinations));

  return allCombinations[max_sum_index];
}


// console.log(
//   knapsackNaiveWay(
//     [
//       { item: "A", value: 100, weight: 6 },
//       { item: "B", value: 90, weight: 5 },
//       { item: "C", value: 90, weight: 5 },
//     ],
//     10
//   )
// );


/**
 * Як працює алгоритм
 * Маємо [1,2,3]
 * 
 *  1 ->
 *      [1] [1,2] [1,3]
 *          [1,2] ->
 *                  [1,2,3]
 *                  [1,2,3] -> кінець
 *          [1,3] -> кінець
 *  2 ->
 *      [2] [2,3]
 *          [2,3] -> кінець
 * 3 ->
 *      [3]
 *      [3] -> кінець
 * 
 */




// Той самий naive way, але зроблений Gemini. Складність так само O(n*2^n).
// Просторова складність O(n) - (глибина рекурсивного стеку + зберігання одного найкращого масиву)
function knapsackNaiveWayGemini(stuff, max_weight) {
  let maxOverallValue = 0;
  let bestCombination = [];

  function explore(index, currentItems, currentWeight, currentValue) {
    if (index === stuff.length) { // Базовий випадок: всі предмети розглянуті
      if (currentWeight <= max_weight && currentValue > maxOverallValue) {
        maxOverallValue = currentValue;
        bestCombination = [...currentItems];
      }
      return;
    }

    // Варіант А: НЕ БЕРЕМО поточний предмет (stuff[index])
    explore(index + 1, currentItems, currentWeight, currentValue);

    // Варіант Б: БЕРЕМО поточний предмет (stuff[index])
    const itemToTake = stuff[index];
    if (currentWeight + itemToTake.weight <= max_weight) {
      currentItems.push(itemToTake); // Додаємо предмет
      explore(
        index + 1,
        currentItems,
        currentWeight + itemToTake.weight,
        currentValue + itemToTake.value
      );
      currentItems.pop(); // Бектрекінг: видаляємо предмет
    }
  }

  explore(0, [], 0, 0); // Починаємо рекурсію
  return { sum_value: maxOverallValue, arr: bestCombination };
}


// console.log(
//   knapsackNaiveWayGemini(
//     [
//       { item: "A", value: 100, weight: 6 },
//       { item: "B", value: 90, weight: 5 },
//       { item: "C", value: 90, weight: 5 },
//     ],
//     10
//   )
// );
