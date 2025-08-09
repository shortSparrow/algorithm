/**
 * Heap Sort складається з двох елементів:
 * 1. Побудова binary heap (maxBinaryHeap або minBinaryHeap, або як тут в прикладі просто binaryHeap - тобто
 *    батько більше ніж кожна з його дітей)
 * 2. Прибирання найбільшого елементу (завжди перший)
 * 3. Оновлення binaryHeap (maxHeapify)
 * 
 * Тож є масив:
 *  [9, 6, 4, 9, 0, 1, 3, 44, 54, 2, -1]
 *  
 *  Будуємо binaryHeap за допомогою maxHeapify і маємо:
 *  [54, 44, 4, 9, 2, 1, 3, 6, 9, 0, -1]
 *  Прибираємо 54
 *  Маємо [44, 4, 9, 2, 1, 3, 6, 9, 0, -1]
 * 
 *  Будуємо binaryHeap за допомогою maxHeapify і маємо:
 *  [ 44, 9, 4, 9, 2, 1, 3, 6, -1, 0]
 *  Прибираємо 44
 *  Маємо [9, 4, 9, 2, 1, 3, 6, -1, 0]
 * 
 *  Будуємо binaryHeap за допомогою maxHeapify і маємо:
 *  [9, 9, 4, 6, 2, 1, 3, 0, -1]
 *  Прибираємо 9
 *  Маємо [9, 4, 6, 2, 1, 3, 0, -1]
 *  
 *  ...
 * 
 * 
 * 
 * Тут використано приклад binaryHeap з книги Introduction to algorithm 3-rd edition
 * maxBinaryHeap можна взяти і з моєї реалізації у binaryHeap/maxBinaryHeap
 */




/**
 * Кожен вузол n/2 + 1, n/2 + 2, n/2 + 3 ... - це листок (НЕ має дітей)
 * Math.floor(arr.length / 2) - 1; - це останній елемент з дочірніми елементами
 * Таким чином ми проходимося тільки по тим елементам що мають дітей
 * 
 * 
 *                 0
 *              /     \
 *             1       2
 *            / \     / \
 *           3   4   5   6
 *          / \ / \
 *         7  8 9
 *
 *  
 * Листя: індекси 5, 6, 7, 8, 9 — їх не чіпаємо.
 * Останній вузол з дітьми: індекс 4 (має дитину 9).
 * Починаємо з індекса 4 і йдемо: 4, 3, 2, 1, 0.
 * */

function buildMaxHeap(arr) {
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    maxHeapify(arr, i, arr.length);
  }

  // Можна пройтися і по всім елементам, але в цьому немає сенсу, бо це довше
  // for(let i=arr.length; i >= 0; i--) {
  //   maxHeapify(arr, i, arr.length);
  // }
}

// це аналог bubbleUp у maxBinaryHeap
function maxHeapify(arr, i, heapSize) {
  const leftIdx = 2 * i + 1;
  const rightIdx = 2 * i + 2;

  let largestIdx = i;

  // console.log('arr.length: ', arr.length)
  // console.log('heapSize: ', heapSize)

  if (leftIdx < heapSize && arr[leftIdx] > arr[largestIdx]) {
    largestIdx = leftIdx;
  }

  if (rightIdx < heapSize && arr[rightIdx] > arr[largestIdx]) {
    largestIdx = rightIdx;
  }

  if (largestIdx != i) {
    const tempI = arr[i];
    arr[i] = arr[largestIdx];
    arr[largestIdx] = tempI;
    maxHeapify(arr, largestIdx, heapSize);
  }
}

// Простіший для розуміння приклад (але створює новий масив)
function sortHeap(arr) {
  buildMaxHeap(arr);

  const res = []

  while(arr.length > 0) {
    const largest = arr[0];             // беремо найбільший
    res.push(largest);

    arr[0] = arr[arr.length - 1];       // переносимо останній елемент у корінь
    arr.pop();                          // прибираємо останній
    maxHeapify(arr, 0, arr.length);     // відновлюємо купу
  }

  console.log("sorted arr: ", res);
}

// Приклад з книги
function sortHeapV2(arr) {
  buildMaxHeap(arr);

  for (let i = arr.length - 1; i > 0; i--) {
    // обмін arr[0] і arr[i]
    const temp = arr[0]
    arr[0] = arr[i]
    arr[i] = temp
    // зменшуємо "розмір" купи - це теж саме що прибрати останній елемент
    maxHeapify(arr, 0, i);
  }


  console.log("sorted arr: ", arr);
}

sortHeap([9, 6, 4, 9, 0, 1, 3, 44, 54, 2, -1]);



/**
 * 
 * O(n*log n)
 * buildMaxHeap - потребує O(n/2 *log n)
 * maxHeapify - його викликають n разів у основному циклі і він також
 *              викликає себе рекурсивно log n раз
 *  O(n/2 *log n) + O(n*log n) = O(n*log n)
 */