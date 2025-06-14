/**
 * Задача 0/1 Knapsack
 * Маємо масив предметів де вказана їх цінність і вага. Кожен предмет можна взяти або 0 разів (не брати взагалі), або 1 раз (взяти повністю).
 * Потрібно знайти комбінацію яку можна засунути в рюкзак і яка дасть найбільшу цінність і не перевищить місткість рюкзака
 */

/**
 * Це рішення поверне всю історію заповнену таблицю dp. Це більш простий механізм для розуміння ніж backtracking, але такий підхід
 * забирає набагато більше пам'яті O(N^2 * W) і до того ж є надмірним. Можна спробувати не модифікувати dp, а лишити його лише для value,
 * як у попередніх рішеннях, а інформацію про поточний рядок з продуктами тримати в окремому масиві, але все одно через копіювання масивів
 * space complexity буде гірше ніж у backtracking. Тож краще використовувати саме backtracking, а цей приклад лише для наочності.
 * !Варто пам'ятати що тут ми не перебираємо УСІ варіанти, бо перебір усіх варіантів це O 2^n, тут ми лише заповнюємо таблицю N*M (к-сть товарів * мак вагу)
 */
function knapsackDPWithFullHistory(stuff, max_weight) {
  const dp = new Array(stuff.length + 1)
    .fill(0)
    .map(() => new Array(max_weight + 1).fill({goods: [], sum_value: 0}));

  for (let i = 1; i <= stuff.length; i++) {
    const current_item = stuff[i - 1];
    for (let j = 0; j <= max_weight; j++) {
      dp[i][j] = dp[i - 1][j];

      // j - це поточна вага
      if (j >= current_item.weight) {
        const new_sum_value = current_item.value + dp[i - 1][j - current_item.weight].sum_value;
        const new_goods = [...dp[i - 1][j - current_item.weight].goods, current_item]
        if(new_sum_value > dp[i][j].sum_value) {
          dp[i][j] = {goods: new_goods, sum_value: new_sum_value}
        }
      }
    }
  }

  return JSON.stringify(dp);
}

console.log(
  knapsackDPWithFullHistory(
    [
      { name: "A", value: 100, weight: 6 },
      { name: "B", value: 90, weight: 5 },
      { name: "C", value: 90, weight: 5 },
    ],
    10
  )
);
