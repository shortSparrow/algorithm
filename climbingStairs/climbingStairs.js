
/**
 * Задача
 * 
 * Скількома різними способами можна піднятися на сходинку з n сходинок, 
 * якщо за один крок можна піднятися на 1 або 2 (або k) сходинки?
 * 
 * Задача дуже схожа на fibonacci
 */

// function climbingStairs(n) {
//   if(n === 0) {
//     return 1
//   }

//   if(n < 0) {
//     return 0 // failed way
//   }
  
//   return climbingStairs(n - 1) + climbingStairs(n - 2)
// }

// console.log(climbingStairs(50));


// Рішення за допомогою Dynamic Programming (memoization)
function climbingStairsDP(n, memo = []) {
  if(memo[n]) {
    return memo[n]
  }

  if(n === 0) {
    return 1
  }

  if(n < 0) {
    return 0 // "неуспішний" шлях
  }
  

  const res = climbingStairsDP(n - 1, memo) + climbingStairsDP(n - 2, memo)
  memo[n] = res
  return res
}

// console.log(climbingStairsDP(5));
console.log(climbingStairsDP(50));

/**
 * Наочна візуалізація як працює алгоритм і де саме відбувається повторна калькуляція
 * n = 5
 * 
 *                            0
 *                       /          \  
 *                   1                 2
 *                /    \            /      \
 *              1       2          1        2
 *            /  \     / \        / \      / \
 *           1    2   1   2      1   2    1   X 
 *          /\   /\  /\         /\         
 *         1 2  1 X  1 X       1  X     
 *        /\
 *       1  X
 */


