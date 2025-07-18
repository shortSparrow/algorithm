/**
 * Задача
 * Знайти неперервний підмасив (тобто, послідовність елементів, що йдуть один за одним) у заданому
 * одновимірному числовому масиві, сума елементів якого є максимальною.
 *
 */


/**
 * Алгоритм базується на ідеї, що максимальний підмасив в заданому діапазоні A[low...high] може бути одним з трьох типів:
 *    - Повністю знаходиться в лівій половині A[low...mid].
 *    - Повністю знаходиться в правій половині A[mid+1...high].
 *    - Перетинає середину mid, тобто починається в лівій половині (low до mid) і закінчується в правій половині (mid+1 до high).
 *    
 *    Тож якщо ми розіб'ємо масив на одиничні масиви і перевіримо всі три варіанти, а потім об'єднаємо одиничні масиви у 
 *    подвійні масиви і перевіримо знову (вже тільки перетин) і так доки не об'єднаємо всі масиви в один початковий
 * 
 * 
 *                                                        ВАРІАНТ КОЛИ НАЙБІЛЬШИМ БУДЕ ОДНЕ ЧИСЛО
 *            
                                                          FIND-MAXIMUM-SUBARRAY(A, 0, 4)
                                                          [Array: [-2, 1, -3, 4, -1]]
                                                          mid = 2
                                                          (Розділення)
                                  /-----------------------------------------------------------------------\
                                  |                                                                       |
                                  |                                                                       |
                                  V                                                                       V
                        FIND-MAXIMUM-SUBARRAY(A, 0, 2)                                        FIND-MAXIMUM-SUBARRAY(A, 3, 4)
                        [Array: [-2, 1, -3]]                                                  [Array: [4, -1]]
                        mid = 1                                                               mid = 3
                        (Розділення)                                                          (Розділення)
                      /--------------------------------\                                      /-----------------\
                      |                                |                                      |                 |
                      |                                |                                      |                 |
                      V                                V                                      V                 V
              FIND-MAX-SUB(A, 0, 1)                  FIND-MAX-SUB(A, 2, 2)           FIND-MAX-SUB(A, 3, 3)   FIND-MAX-SUB(A, 4, 4)
              [Array: [-2, 1]]                       [Array: [-3]]                 [Array: [4]]            [Array: [-1]]
              mid = 0                                (БАЗОВИЙ ВИПАДОК)             (БАЗОВИЙ ВИПАДОК)       (БАЗОВИЙ ВИПАДОК)
              (Розділення)                           Повертає: (2, 2, -3)          Повертає: (3, 3, 4)     Повертає: (4, 4, -1)
                /--------------------------\
                |                          |
                V                          V
              FIND-MAX-SUB(A, 0, 0)   FIND-MAX-SUB(A, 1, 1)
              [Array: [-2]]           [Array: [1]]
              (БАЗОВИЙ ВИПАДОК)       (БАЗОВИЙ ВИПАДОК)
              Повертає: (0, 0, -2)    Повертає: (1, 1, 1)



                                                    ВАРІАНТ КОЛИ НАЙБІЛЬШИМ СУМА КІЛЬКОХ ЧИСЕЛ

                                                    FIND-MAXIMUM-SUBARRAY(A, 0, 4)
                                                    [Array: [-2, 2, -1, 4, -1]]
                                                    mid = 2
                                  /-------------------------------------------------------------------------\
                                  |                                                                         |
                                  |                                                                         |
                                  V                                                                         V
                        FIND-MAXIMUM-SUBARRAY(A, 0, 2)                                           FIND-MAXIMUM-SUBARRAY(A, 3, 4)
                        [Array: [-2, 2, -1]]                                                     [Array: [4, -1]]
                        mid = 1                                                                  mid = 3
                      /-----------------------------------\                                      /-----------------\
                      |                                   |                                      |                 |
                      |                                   |                                      |                 |
                      V                                   V                                      V                 V
              FIND-MAX-SUB(A, 0, 1)                     FIND-MAX-SUB(A, 2, 2)           FIND-MAX-SUB(A, 3, 3)   FIND-MAX-SUB(A, 4, 4)
              [Array: [-2, 2]]                          [Array: [-1]]                 [Array: [4]]            [Array: [-1]]
              mid = 0                                   (БАЗОВИЙ ВИПАДОК)             (БАЗОВИЙ ВИПАДОК)       (БАЗОВИЙ ВИПАДОК)
                /---------------------------\
                |                           |
                V                           V
              FIND-MAX-SUB(A, 0, 0)   FIND-MAX-SUB(A, 1, 1)
              [Array: [-2]]           [Array: [2]]
              (БАЗОВИЙ ВИПАДОК)       (БАЗОВИЙ ВИПАДОК)

 * 
 * Функція maximumSubarraySumDivideAndConquer(arr, low, hight) рекурсивно шукає максимальний підмасив, враховуючи ці три випадки
 * 
 * 
 * 
 * Рядки 1-2: Базовий випадок (Base Case)
 *    if high == low: Якщо діапазон low до high складається лише з одного елемента (тобто low і high вказують на той самий індекс),
 *    то цей елемент сам є максимальним підмасивом.
 * 
 * 
 * Рядок 3: Розділення (Divide)
 *    const mid = Math.floor((low + hight) / 2): Обчислюється середня точка mid масиву. Це ділить поточний масив A[low...high]
 *    на дві приблизно рівні частини: ліву (A[low...mid]) та праву (A[mid+1...high]).
 * 
 * 
 * Рядки 4-6: Завоювання (Conquer) - Рекурсивні виклики
 *    4-5: (left-low, left-high, left-sum) = maximumSubarraySumDivideAndConquer(A, low, mid): Рекурсивно викликаємо ту саму функцію
 *         для лівої половини масиву (A[low...mid]). Результатом буде максимальний підмасив, який повністю знаходиться в лівій частин
 * 
 *    6: (right-low, right-high, right-sum) = maximumSubarraySumDivideAndConquer(A, mid + 1, high): Рекурсивно викликаємо ту саму функцію
 *       для правої половини масиву (A[mid+1...high]). Результатом буде максимальний підмасив, який повністю знаходиться в правій частині.
 * 
 *    7: (cross-low, cross-high, cross-sum) = findMaxCrossingSubArray(A, low, mid, high):
 *       Викликається допоміжна функція findMaxCrossingSubArray. Ця функція знаходить максимальний підмасив, який перетинає середину mid.
 * 
 *       Як працює findMaxCrossingSubArray: Вона знаходить максимальну суму, що закінчується на mid (рухаючись від mid вліво),
 *       і максимальну суму, що починається на mid+1 (рухаючись від mid+1 вправо). Сума цих двох частин і буде максимальною сумою підмасиву,
 *       що перетинає середину
 * 
 * 
 * Рядки 7-11: Комбінування (Combine)
 *    Після отримання результатів від трьох можливих випадків (лівий, правий, що перетинає), алгоритм порівнює їх суми:
 *    if left-sum >= right-sum AND left-sum >= cross-sum: Якщо сума лівого підмасиву найбільша, повертаємо його результат.
 * 
 *    elseif right-sum >= left-sum AND right-sum >= cross-sum: Якщо сума правого підмасиву найбільша, повертаємо його результат.
 * 
 *    else return (cross-low, cross-high, cross-sum): В іншому випадку, сума підмасиву, що перетинає середину, є найбільшою, і ми повертаємо її результат.
 * 
 * 
 *  Складність такого алгоритму O(n*log n)
 * 
 * 
 * Можна сказати що рядки 4-6 поступово шукають найбільше значення у своїх половинах, скажімо у нас є [-2, 1, -3, 4, -1]
 * Розбиваємо на половини [-2,1,-3]   [4,-1]
 *                        [-2] [1,-3]   [4,-1]
 * З початку найбільше знамення у лівій половині -2, а у правій 1, на перетині (findMaxCrossingSubArray) теж 1
 * Потім найбільше 4
 * 
 * 
 *  
 * maximumSubarraySumDivideAndConquer([-2, 1, -3, 4, -1], 0, 4)
 * 
 * Зараз ми на рівні low=0, high=4
 * maximumSubarraySumDivideAndConquer(arr, low=0, mid=2)
 *    Зараз ми на рівні low=0, high=2
 *    maximumSubarraySumDivideAndConquer(arr, low=0, mid=1)
 *        Зараз ми на рівні low=0, high=1
 *        maximumSubarraySumDivideAndConquer(arr, low=0, mid=0) // спрацьовує умова hight == low; [0,0,-2] (Найбільший елемент лівої частини -2)
 *        maximumSubarraySumDivideAndConquer(arr, mid=0+1, high=1) // спрацьовує умова hight == low; [1,1,1] (Найбільший елемент правої частини 1)
 *        findMaxCrossingSubArray(arr, 0, 0, 1) // [0,1,-1] (сума елементів -2 + 1 = -1) (Найбільший масив на перетині обох частини [-2,1])
 *        return [1,1,1] (З трьох варіантів обираємо найбільший - це елемент правої частини)
 *  
 *    Зараз ми на рівні low=0, high=2
 *    maximumSubarraySumDivideAndConquer(arr, mid=1+1, hight=2) // спрацьовує умова hight == low; [2,2,-3] (Найбільший елемент лівої частини -3)
 *    findMaxCrossingSubArray(arr, 0, 1, 2); // [1,2,-2] (сума елементів 1 + -3 = -2) (Найбільший масив на перетині обох частини [1,-3])
 *    return [1,1,1]
 * 
 * 
 * Зараз ми на рівні low=0, high=4 
 * maximumSubarraySumDivideAndConquer(arr, mid=2+1, high=4)
 *    Зараз ми на рівні low=3, high=4
 *    maximumSubarraySumDivideAndConquer(arr, low=3, mid=3) // спрацьовує умова hight == low; [3,3,4] (Найбільший елемент лівої частини 4)
 *    maximumSubarraySumDivideAndConquer(arr, mid=3+1, high=4) // спрацьовує умова hight == low; [4,4,-1] (Найбільший елемент лівої частини -1)
 *    findMaxCrossingSubArray(arr, 3, 3, 4) // [3,4,3] (сума елементів 4 + -1 = 3) (Найбільший масив на перетині обох частини [-3,4])
 *    return [3,3,4]
 * 
 *  Зараз ми на рівні low=0, high=4 
 *  findMaxCrossingSubArray(arr, 0, 2, 4) // [1,3,2] (сума елементів 1+-3 + 4 = 2) (Найбільший масив на перетині обох частини [1,-3, 4])
 *  return [3,3,4]
 * 
 */





/**
 * Має знайти найбільшу суму для двох варіантів
 * 
 * Варіант 1: Для елементів масиву з low до mid
 * Варіант 2: Для елементів масиву з mid+1 до high
 * 
 * Алгоритм шукає найбільшу суму починаючи від середини і до початку (maxLeft) і також з середини + 1 до кінця (maxRight)
 * потім ці найбільші суми додадуться і ми отримуємо максимальну суму при перетині
 */
function findMaxCrossingSubArray(arr, low, mid, max) {
  let leftSum = -Infinity;
  let sum1 = 0;
  let maxLeft = null;

  for (let i = mid; i >= low; i--) {
    sum1 += arr[i];
    if (sum1 > leftSum) {
      leftSum = sum1;
      maxLeft = i;
    }
  }

  let rightSum = -Infinity;
  let sum2 = 0;
  let maxRight = null;

  for (let i = mid + 1; i <= max; i++) {
    sum2 += arr[i];
    if (sum2 > rightSum) {
      rightSum = sum2;
      maxRight = i;
    }
  }

  console.log(maxLeft, maxRight, leftSum + rightSum)
  return [maxLeft, maxRight, leftSum + rightSum];
}

function maximumSubarraySumDivideAndConquer(arr, low, hight) {
  if (hight == low) {
    return [low, hight, arr[low]];
  } else {
    const mid = Math.floor((low + hight) / 2);
    const [leftLow, leftHigh, leftSum] = maximumSubarraySumDivideAndConquer(arr, low, mid);
    const [rightLow, rightHigh, rightSum] = maximumSubarraySumDivideAndConquer(arr, mid + 1, hight);
    const [crossLow, crossHigh, crossSum] = findMaxCrossingSubArray(arr, low, mid, hight);
    
    if (leftSum >= rightSum && leftSum >= crossSum) {
      return [leftLow, leftHigh, leftSum]
    } else if(rightSum >= leftSum && rightSum >= crossSum) {
      return [rightLow, rightHigh, rightSum]
    } else {
      return [crossLow, crossHigh, crossSum]
    }
  
  }
}

console.log(maximumSubarraySumDivideAndConquer([-2, 1, -3, 4, -1], 0, 4)); // [4, -1, 2, 1]
// console.log(maximumSubarraySumDivideAndConquer([-2, 1, -3, 4, -1, 2, 1, -5, 4], 0, 8)); // [4, -1, 2, 1]

// ПРИКЛАД РОЗБИТТЯ ДЛЯ МАСИВУ [-2, 1, -3, 4, -1, 2, 1, -5, 4]
// maximumSubarraySumDivideAndConquer(arr, 0, 8)

//  Зара ми на рівні low=0, high=8
//  maximumSubarraySumDivideAndConquer(arr, low=0, mid=4)
//     Зара ми на рівні low=0, high=4
//     maximumSubarraySumDivideAndConquer(arr, low=0, mid=2)
//         Зара ми на рівні low=0, high=2
//         maximumSubarraySumDivideAndConquer(arr, low=0, mid=1)
//             Зара ми на рівні low=0, high=1
//             maximumSubarraySumDivideAndConquer(arr, low=0, mid=0) // спрацьовує умова hight == low; [0,0,-2]
//             maximumSubarraySumDivideAndConquer(arr, mid=0+1, high=1) // спрацьовує умова hight == low; [1,1,1]
//             findMaxCrossingSubArray(arr, 0, 0, 1) // [-2, 1, 1]
//             return [1,1,1]
//
//         Зара ми на рівні low=0, high=2
//         maximumSubarraySumDivideAndConquer(arr, mid=1+1, high=2) // спрацьовує умова hight == low; [2,2,-3]
//         findMaxCrossingSubArray(arr, 0, 1, 2) // [1,2,-2]
//         return [1,1,1]
//
//     Зараз ми на рівні low=0, high=4
//     maximumSubarraySumDivideAndConquer(arr, mid=2 + 1, high=4)
//        Зараз ми на рівні low=3, high=4
//        maximumSubarraySumDivideAndConquer(arr, low=3, mid=3) // спрацьовує умова hight == low; [3,3,4]
//        maximumSubarraySumDivideAndConquer(arr, mid=3+1, high=4) // спрацьовує умова hight == low; [4,4,-1]
//        findMaxCrossingSubArray(arr, 3, 3, 4) // [3,4,3]
//        return [3,3,4]
//     findMaxCrossingSubArray(arr, 0, 2, 4); // [1,3,2]
//     return [3,3,4]
//
//  Зара ми на рівні low=0, high=8
//  maximumSubarraySumDivideAndConquer(arr, mid=4+1, high=8)
//     Зара ми на рівні low=5, high=8
//     maximumSubarraySumDivideAndConquer(arr, low=5, high=6)
//         Зара ми на рівні low=5, high=6
//         maximumSubarraySumDivideAndConquer(arr, 5, 5) // спрацьовує умова hight == low; [5,5,2]
//         maximumSubarraySumDivideAndConquer(arr, 5 + 1, 6) // спрацьовує умова hight == low; [6,6,1]
//         findMaxCrossingSubArray(arr, 5, 5, 6) // [5,6,3]
//         return [5,6,3]
//     maximumSubarraySumDivideAndConquer(arr, mid=5+1, high=8)
//         Зара ми на рівні low=7, high=8
//         maximumSubarraySumDivideAndConquer(arr, 7, 7) // спрацьовує умова hight == low; [7,7,-5]
//         maximumSubarraySumDivideAndConquer(arr, 7 + 1, 8) // спрацьовує умова hight == low; [8,8,4]
//         findMaxCrossingSubArray(arr, 7, 7, 8) // [7,8,-1]
//         return [8,8,4]
//     findMaxCrossingSubArray(arr, 5, 6, 8) // [5,8,2]  
//     return [8,8,4]
//  findMaxCrossingSubArray(arr, 0, 4, 8) // [3,6,6]
//  return [3,6,6]
