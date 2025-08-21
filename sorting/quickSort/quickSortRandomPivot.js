/**
 * Тут представлений варіант quickSort з random pivot
 * Однак - є потенційно ще кращий варіант, оскільки random все ж може обрати
 * поганий (надто маленький або великий) індекс то медіанний спосіб позбавлений
 * цих вад
 * 
 * median-of-three pivot
 * Варто зауважити що окрім random pivot існує кращий спосіб отримання pivot - median-of-three pivot selection
 * Медіана трьох - це беремо три елементи
 *  arr[left] — перший елемент
 *  arr[mid] — середній елемент
 *  arr[right] — останній елемент
 * 
 * І знаходимо медіану
 * Медіана з трьох — це елемент, який не є найбільшим і не є найменшим з цих трьох. 
 * Тобто він стоїть посередині за величиною.
 * 
 */

function medianOfThree(arr, left, right) {
  const mid = (left + right) >> 1; // швидке ділення на 2

  // Тут ми гарантуємо, що мінімальний з перших двох (left, mid) стоїть на позиції left.
  if (arr[left] > arr[mid]) swap(arr, left, mid);

  // Тут ми гарантуємо, що arr[left] мінімальний серед усіх трьох (left, mid, right).
  if (arr[left] > arr[right]) swap(arr, left, right);
  
  // Тут ми гарантуємо, що arr[right] — максимальний серед усіх трьох, а arr[mid] автоматично стає медіанним (середнім за величиною).
  if (arr[mid] > arr[right]) swap(arr, mid, right);

  return mid;
}

function getRandomIndex(startIndex, endIndex) {
  return Math.floor(Math.random() * (endIndex - startIndex + 1) + startIndex);
}

function pivot(arr, startIndex = 0, endIndex = arr.length - 1) {
  const randomIndex = getRandomIndex(startIndex, endIndex);
  // const randomIndex = medianOfThree(arr, startIndex, endIndex);

  swap(arr, startIndex, randomIndex);
  const pivotValue = arr[startIndex];

  let swapIdx = startIndex;

  function swap(array, idx1, idx2) {
    if (idx1 == idx2) {
      return;
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

function quickSortRandomPivot(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const pivotIndex = pivot(arr, left, right);

    // left
    quickSortRandomPivot(arr, left, pivotIndex - 1);

    // right
    quickSortRandomPivot(arr, pivotIndex + 1, right);
  }

  return arr;
}

// console.log(quickSortRandomPivot([4,6,9,1,2,5,3]));
// console.log(quickSortRandomPivot([1,2,3,4,5,6,7]));
// console.log(quickSortRandomPivot([6,5]));

module.exports = { quickSortRandomPivot };

/**
 * Теж саме що і просто QuickSort, але тепер pivotValue береться не з 0 індексу а з випадкового місця,
 * це дозволяє перевіряти великі відсортовані списки і уникати помилки перевантаження рекурсії
 */


const N = 10_000_000;
const almostSortedLargeArray = Array.from({ length: N }, (_, i) => i + 1);

// random pivot:          1.3-1.6 s   
// median-of-three pivot: 1.0-1.4 s
console.time("Quicksort");
quickSortRandomPivot(almostSortedLargeArray); 
console.timeEnd("Quicksort");


/**
 * Якщо матимемо масив лише з 0 і 1 - 111111.....00000....
 * Або лише з 0, чи 1 чи будь якої іншої однієї цифри
 * то наш quickSort зламається через Maximum call stack size exceeded
 * 
 * Щоб цього уникнути можна використати:
 * 3-смугове розбиття (Dijkstra's 3-way partition)
 * Розбиває масив на 3 частини: < pivot, = pivot, > pivot.
 */
// const N = 5_000_0;
// const arr0 = Array.from({ length: N }, (_, i) => 0);
// const arr1 = Array.from({ length: N }, (_, i) => 1);

// console.time("Quicksort");
// quickSortRandomPivot([...arr1, ...arr0]); 
// console.timeEnd("Quicksort");
