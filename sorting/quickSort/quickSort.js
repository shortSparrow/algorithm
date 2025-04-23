// обрати pivot ми можемо будь який, але для простоти розуміння обираємо той що на індексі 0
// function pivot(arr, startIndex=0, endIndex= arr.length - 1) {
//   let currentIndex = startIndex + 1
//   const pivotValue = arr[startIndex]

//   let firstIndexBigger = 1

//   while(i <= endIndex) {

//     if(arr[currentIndex] < pivotValue) {
//       const biggerValue = arr[firstIndexBigger]
//       arr[firstIndexBigger] = arr[currentIndex]
//       arr[currentIndex] = biggerValue
//       firstIndexBigger++
//     }

//     currentIndex++
//   }

//   lastSortedValue = arr[firstIndexBigger - 1]
//   arr[startIndex] = lastSortedValue
//   arr[firstIndexBigger - 1] = pivotValue
//   console.log('arr: ', arr)

//   return firstIndexBigger
// }

// Теж саме що і у прикладі вище тільки більш мінімалістично виглядає
function pivot(arr, startIndex = 0, endIndex = arr.length - 1) {
  const pivotValue = arr[startIndex];

  let swapIdx = startIndex;

  function swap(array, idx1, idx2) {
    if(idx1 == idx2) {
      return
    }

    const temp = array[idx1];
    array[idx1] = array[idx2];
    arr[idx2] = temp;
  }

  for (let i = startIndex + 1; i <= endIndex; i++) {
    if (arr[i] < pivotValue) {
      swapIdx++;
      swap(arr, swapIdx, i);
    }
  }

  swap(arr, swapIdx, startIndex);

  return swapIdx;
}

function quickSort(arr, left = 0, right = arr.length - 1) {
  if(left < right) {
    const pivotIndex = pivot(arr, left, right);

    // left
    quickSort(arr, left, pivotIndex - 1);
  
    // right
    quickSort(arr, pivotIndex + 1, right);
  }

  return arr
}

// console.log(quickSort([4,6,9,1,2,5,3]));
// console.log(quickSort([1,2,3,4,5,6,7]));
// console.log(pivot([6,5]));

module.exports = {quickSort}


/**
 * [4,6,9,1,2,5,3]
 * [3,1,2,4,9,5,6]
 *        4 - on right place
 *  (left)     (right)
 * [3,1,2]    [9,5,6]
 * [2,1,3]    [6,5,9]
 *      3          9
 * [2,1]      [6,5]
 * [1,2]      [5,6]
 *    2          6
 * [1]         [5]
 *  1           5
 */



/*
  Big O

    Time Complexity      Time Complexity      Time Complexity      Space Complexity
        (Best)               (Average)             (Worst)
    --------------------------------------------------------------------------------
       O(n log n)           O(n log n)             O(n2)              O(log n)

    
  Worst case - це коли масив відсортований, якщо ми визначаємо pivot як найлівіший елемент
  (мова про pivotValue у функції pivot). Якщо будемо брати його випадково або завжди у центрі,
  тоді такої проблеми не буде, але теоретично все ще буде імовірність що масив буде відсортований
  таким чином що для нас це буде найгірший випадок
*/



/**
 * ЧОМУ ПОСЛІДОВНИЙ СПИСОК ВИКЛИЧЕ ПОМИЛКУ Maximum call stack size exceeded
 * 
  console.log(quickSort(
      Array.from({ length: 100_00 }, (_, i) => i + 1)
    ));
  Для відсортованого і зворотньо відсортованого буде помилка  Maximum call stack size exceeded
  Бо рекурсія для найкращого випадку коли кожна рекурсія ділить масив на двоє

  32
    (1) - дія
  31
    (1) - дія
  30 
    (1) - дія
  ...
  3
    (1) - дія
  2
    (1) - дія
  1
  
  callstack містить аж 32 функції


  А якщо дані розподілені рандомно то а callstack може залетіти наприклад
  5 функцій, потім вони очистяться (бо відбулося сортування) і в callstack 
  залетять нові, а в прикладі вище в callstack залетять n функцій (якщо n 
  це довжина масиву)


  Чому середню глибину рекурсії рахують через log2 n, і для 32 це буде log2 32 = 5
  У середньому, при випадковому виборі опорного елемента, кожне розбиття ділить масив на дві частини, розміри яких є досить близькими до половини від розміру попереднього підмасиву.  Якщо на кожному кроці розмір підмасиву зменшується приблизно вдвічі, то кількість рівнів рекурсії, необхідних для досягнення підмасивів розміром 1, становить близько log2(n).

  Рівень 0: 1 виклик quickSort → (для 32 елементів)
  Рівень 1: 2 виклики quickSort → (для першого підмасиву з 16 елементів)
  Рівень 2: 4 виклики quickSort → (для першого підмасиву з 8 елементів)
  Рівень 3: 8 викликів quickSort → (для першого підмасиву з 4 елементів)
  Рівень 4: 16 викликів quickSort → (для першого підмасиву з 2 елементів)
  
  Тобто загальна кількість виклику quickSort може бути однаковою (не обов'язково), але головне що в цьому випадку після 5 рекурсії рекурсія
  посне схлопуватися, вона з рівня 4 повернеться на рівень 3 де знову опуститься на рівень 4 але вже для другого підмасиву з 4 елементів,
  тобто вкладеність рекурсії не буде більше за 5. Але це в середньому (або найкращому), так що глибина рекурсії
  може бути в найгіршому випадку (для поточної реалізації, коли pivot береться з 0 індексу) n що призведе до помилки (для великих n)

 */




