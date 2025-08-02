/**
 * Задача
 * Знайти неперервний підмасив (тобто, послідовність елементів, що йдуть один за одним) у заданому
 * одновимірному числовому масиві, сума елементів якого є максимальною.
 *
 */

/**
 * Наївний підхід BIG O(n^3), може здатися що складність n^2 через 2 вкладені цикли, але
 * копіювання масиву [...potentialResult[potentialResult.length - 1].arr, array[j]]; який може
 * бути довжиною n додає ще один n
 * 
 * ! алгоритм дійсно генерує всі неперервні підмасиви, але не ВСІ підмасиви
 * для [1,2,3] ніколи не буде згенеровано варіанту [1,3], це ок для цієї задачі, але варто бути уважним
*/  

function maximumSubarraySum(array) {
  const potentialResult = [];
  let maxSum = -Infinity;
  let maxSumIndex = 0;

  for (let i = 0; i < array.length; i++) {
    for (let j = i; j < array.length; j++) {
      if (j === i) {
        potentialResult.push({ sum: array[j], arr: [array[j]] });
      } else {
        const sum = array[j] + potentialResult[potentialResult.length - 1].sum;

        const arr = [...potentialResult[potentialResult.length - 1].arr, array[j]];
        const newSubArray = { sum: sum, arr: arr };
        potentialResult.push(newSubArray);

        if (maxSum < sum) {
          maxSum = sum;
          maxSumIndex = potentialResult.length - 1
        }

      }
    }
  }

  console.log("potentialResult ", potentialResult);
  console.log("maxSum: ", maxSum);
  console.log("maxSumIndex ", maxSumIndex);
  return potentialResult[maxSumIndex];
}

// Те саме що і maximumSubarraySum, та сама складність просто більш компактно
function maximumSubarraySumV2(array) {
  let left = 0;
  let right = 0;
  let sum = -Infinity;

  for (let i = 0; i < array.length; i++) {
    let currentSum = 0;
    for (let j = i; j < array.length; j++) {
      currentSum += array[j];
      if (currentSum > sum) {
        sum = currentSum;
          left = i;
          right = j;
      }
    }
  }

  console.log("left ", left);
  console.log("right: ", right);
  console.log("sum ", sum);
  return [left, right, sum];
}

console.log(maximumSubarraySumV2([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // [4, -1, 2, 1]


// console.log(maximumSubarraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // [4, -1, 2, 1]



// Dynamic Programming або GreedyAlgorithm мають тут BIG O(N)
// Алгоритм Кадане (Kadane's Algorithm) є чудовим прикладом динамічного програмування, де ми робимо рішення на кожному кроці, ґрунтуючись на попередніх рішеннях.

function maximumSubarraySumKadane(nums) {
  if (!nums || nums.length === 0) {
    return 0;
  }

  let currentMax = nums[0];
  let globalMax = nums[0];

  for (let i = 1; i < nums.length; i++) {
    const num = nums[i];
    currentMax = Math.max(num, currentMax + num);
    globalMax = Math.max(globalMax, currentMax);
  }

  return globalMax;
}

console.log(maximumSubarraySumKadane([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // [4, -1, 2, 1]

/**
 * 
 * Алгоритм Кадане не перебирає всі можливі підмасиви в тому сенсі, в якому це робить наївне рішення на початку файлу
 * (тобто, явно не генерує кожен [4], потім [4, -1], потім [4, -1, 2] і так далі для кожної стартової точки).
 * Натомість, він використовує динамічне програмування і принцип оптимальної підструктури.
 * 
 * 
 * 1. Основний принцип: максимальний підмасив, що закінчується на i
 *      Алгоритм Кадане фокусується на питанні: "Яка максимальна сума підмасиву, який закінчується саме на поточному елементі nums[i]?
 *      Це ключова підзадача. Якщо ми можемо вирішити цю підзадачу для кожного i, тоді глобальна максимальна сума буде просто найбільшою
 *      з усіх цих "максимумів, що закінчуються на i".
 * 
 * 
 * 2. Два варіанти для currentMax (максимум, що закінчується на i):
 *    Коли ми знаходимося на елементі nums[i], є тільки два логічні варіанти для підмасиву, що закінчується на nums[i]:
 *        Варіант 1: nums[i] починає новий підмасив. Це відбувається, якщо додавання nums[i] до попереднього currentMax зробить суму меншою,
 *                   ніж саме nums[i]. Тобто, попередній підмасив став "тягарем" (його сума опустилася нижче нуля або стала настільки малою,
 *                   що краще почати все з чистого аркуша).
 *            
 *                   Приклад: ... [5, -10, 2] -> коли ми на 2, currentMax для 5,-10 був -5. max(2, -5+2) дасть 2. Починаємо новий підмасив з 2.
 * 
 * 
 * 
 *        Варіант 2: nums[i] продовжує попередній підмасив. Це відбувається, якщо додавання nums[i] до попереднього currentMax
 *                   дає більшу суму, ніж просто nums[i].
 * 
 *                   Приклад: ... [2, 3] -> коли ми на 3, currentMax для 2 був 2. max(3, 2+3) дасть 5. Продовжуємо [2,3].
 * 
 * 
 * 
 *        Формула: currentMax = Math.max(nums[i], currentMax + nums[i])
 *        Ця формула автоматично обирає кращий з двох варіантів. Вона каже: "Максимальний підмасив, що закінчується на nums[i],
 *        або є просто nums[i] (якщо попередній шлях був поганим), або є попередній currentMax плюс nums[i] (якщо попередній шлях був добрим)".
 * 
 * 
 *        globalMax відстежує найкраще з усіх currentMax
 * 
 * 
 */
