const { insertionSort } = require("../insertionSort/insertionSort");

/**
 * 
 * Звичайний quickSort з random pivot працює за O(n * lon n) у всіх випадках, але
 * оскільки він як і mergeSort використовую розділення масивів то на маленьких масивах
 * його складність (сталі множники) перевищує insertionSort, саме тому так само як із
 * mergeSort для маленьких масивів краще використати insertionSort
 * 
 * hybridQuicksort відрізняється від classicQuicksort лише двома рядками, він перестає запускати
 * quickSort якщо довжина масиву більша за K (його значення визначається експериментально, це залежить від CPU,
 * архітектури процесора і т.п.), і тоді один раз для всього загального масиву запускається insertionSort
 * 
 * 
 * Тут представлено дві версії:
 *    класичну - classicQuicksort
 *    гібридний - hybridQuicksort
 * І їх порівняння на майже відсортованому масиві, бо саме на такому insertionSort буде найбільш ефективним
 */

function getRandomIndex(startIndex, endIndex) {
  return Math.floor(Math.random() * (endIndex - startIndex + 1) + startIndex);
}

// Функція для обміну елементів
function swap(array, idx1, idx2) {
  const temp = array[idx1];
  array[idx1] = array[idx2];
  array[idx2] = temp;
}

function pivot(arr, startIndex = 0, endIndex = arr.length - 1) {
  const randomIndex = getRandomIndex(startIndex, endIndex);
  swap(arr, startIndex, randomIndex);
  const pivotValue = arr[startIndex];

  let swapIdx = startIndex;

  for (let i = startIndex + 1; i <= endIndex; i++) {
    if (arr[i] < pivotValue) {
      swapIdx++;
      swap(arr, swapIdx, i);
    }
  }

  swap(arr, swapIdx, startIndex);

  return swapIdx;
}

// Звичайний Quicksort для порівняння
function classicQuicksort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const pivotIndex = pivot(arr, left, right);
    classicQuicksort(arr, left, pivotIndex - 1);
    classicQuicksort(arr, pivotIndex + 1, right);
  }
}


const K = 32;

// Модифікований Quicksort, який зупиняється на малих підмасивах
function modifiedQuicksort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    if (right - left > K) {
      const pivotIndex = pivot(arr, left, right);
      modifiedQuicksort(arr, left, pivotIndex - 1);
      modifiedQuicksort(arr, pivotIndex + 1, right);
    }
  }
}

// Головна гібридна функція
function hybridQuicksort(arr) {
  modifiedQuicksort(arr, 0, arr.length - 1);
  insertionSort(arr, 0, arr.length - 1);
  return arr;
}





// Створення "майже відсортованого" масиву
const N = 10_000_000;
const almostSortedLargeArray1 = Array.from({ length: N }, (_, i) => i + 1);
const almostSortedLargeArray2 = Array.from({ length: N }, (_, i) => i + 1);
const unsortedCount = Math.floor(N * 0.01);

for (let i = 0; i < unsortedCount; i++) {
  const index1 = Math.floor(Math.random() * N);
  const index2 = Math.floor(Math.random() * N);
  swap(almostSortedLargeArray1, index1, index2);
  swap(almostSortedLargeArray2, index1, index2);
}

console.log(`Тестування на масиві з ${N} елементів, де 1% не відсортований.`);

console.time("Гібридний Quicksort");
hybridQuicksort(almostSortedLargeArray2); // K=100 992.1 ms     K=64 976 ms      K=32  1s
console.timeEnd("Гібридний Quicksort");

console.time("Звичайний Quicksort");
classicQuicksort(almostSortedLargeArray1); // K=100 1.197 s     K=64 1.350 s     K=32 1.5s
console.timeEnd("Звичайний Quicksort");

