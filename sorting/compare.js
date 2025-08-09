const {selectionSort} = require('./selectionSort/selectionSort')
const {selectionSortBidirectional} = require('./selectionSort/selectionSortBidirectional')
const {bubbleSortingOptimized} = require('./bubbleSort/bubbleSortingOptimized')
const {insertionSort} = require('./insertionSort/insertionSort')
const {mergeSort, mergeSortV2} = require('./mergeSort/mergeSort')
const {quickSort} = require('./quickSort/quickSort')
const {quickSortRandomPivot} = require('./quickSort/quickSortRandomPivot')
const {radixSort} = require('./radixSort/radixSort')
const {heapSortV2} = require('./heapSort/heapSort')


const largeArray = Array.from({ length: 100_000 }, () => Math.floor(Math.random() * 100_000));
const largeArraySorted = Array.from({ length: 100_000 }, (_, i) => i + 1);
const largeArrayReversed = [...largeArraySorted].reverse()
const almostSortedLargeArray = Array.from({ length: 100_000 }, (_, i) => i + 1).map((val, i, arr) => i % 100 === 0 ? arr[Math.floor(Math.random() * arr.length)] : val);

// *******************************   Updated Results Table   ***************************************************************

// | Algorithm                 | largeArray | largeArraySorted | largeArrayReversed | almostSortedLargeArray |
// |---------------------------|------------|------------------|--------------------|------------------------|
// | selectionSort             | 12.5s      | 12s              | 11.2s             | 9.6s                   |
// | selectionSortBidirectional| 8s         | 10s              | 10s               | 6.8s                   |
// | bubbleSortingOptimized    | 37s        | 9ms              | 23s               | 15.4s                  |
// | insertionSort             | 10s        | 3.8ms            | 18s               | 155ms                  |
// | heapSort                  | 120ms      | 120ms            | 120ms             | 120ms                  |
// | mergeSort                 | 158ms      | 120ms            | 105ms             | 110ms                  |
// | mergeSortV2               | 121ms      | 120ms            | 115ms             | 120ms                  |
// | quickSort                 | 60ms       | error            | error             | 110ms                  |
// | quickSortRandomPivot      | 60ms       | 40ms             | 50ms              | 40ms                   |
// | radixSort                 | 85ms       | 70ms             | 95ms              | 80ms                   |
// | default js sort           | 85ms       | 7ms              | 6ms               | 10ms                   |



/**
 * QuickSort має таку ж складність як і mergeSort, але він швидший, бо вимагає більше часу на опрацювання однієї ітерації.
 * Припустимо у нас є 2 функції print1 і print2
 * 
 * function print1(){ 
 *  for(let item of arr) {
 *    console.log("Hello")
 *  }
 * }
 * 
 * function print2(){ 
 *  for(let item of arr) {
 *    sleep(1)
 *    console.log("Hello")
 *  }
 * }
 * 
 * У них однакова складність - O(n), але print2 буде кожну ітерацію циклу робити на 1 секунду довше. Теж саме і з quickSort та mergeSort
 */

console.log('START')

// *******************************   largeArray   ***************************************************************

// console.time("selectionSort")
// selectionSort(largeArray) // 12.5s
// console.timeEnd("selectionSort")

// console.time("selectionSortBidirectional")
// selectionSortBidirectional(largeArray) // 8s
// console.timeEnd("selectionSortBidirectional")

// console.time("bubbleSortingOptimized")
// bubbleSortingOptimized(largeArray) // 37s
// console.timeEnd("bubbleSortingOptimized")

// console.time("insertionSort")
// insertionSort(largeArray) // 10s
// console.timeEnd("insertionSort")

// console.time("heapSort")
// heapSortV2(largeArray) // 120ms
// console.timeEnd("heapSort")

// console.time("mergeSort")
// mergeSort(largeArray) // 158ms
// console.timeEnd("mergeSort")

// console.time("mergeSortV2")
// mergeSortV2(largeArray) // 121ms
// console.timeEnd("mergeSortV2")

// console.time("quickSort")
// quickSort(largeArray) // 60 ms
// console.timeEnd("quickSort")

// console.time("quickSortRandomPivot")
// quickSortRandomPivot(largeArray) // 60 ms
// console.timeEnd("quickSortRandomPivot")

// console.time("radixSort")
// radixSort(largeArray) // 85 ms
// console.timeEnd("radixSort")

// console.time("defaultJsSort")
// largeArray.sort((a, b) => a - b) // 85 ms
// console.timeEnd("defaultJsSort")



/**
 * Хоча bubbleSortingOptimized і selectionSort/selectionSortBidirectional мають складність O(n^2),
 * але у bubbleSortingOptimized swap відбувається постійно в той час як у selectionSort/selectionSortBidirectional
 * лише 1 раз за ітерацію, і це призводить до величезної різниці у швидкості, на 100_000 різниця між 40с і 12.5с/8с
 */


// *******************************   largeArraySorted   ***************************************************************

// console.time("selectionSort")
// selectionSort(largeArraySorted) // 12s
// console.timeEnd("selectionSort")

// console.time("selectionSortBidirectional")
// selectionSortBidirectional(largeArraySorted) // 10s
// console.timeEnd("selectionSortBidirectional")

// console.time("bubbleSortingOptimized")
// bubbleSortingOptimized(largeArraySorted) // 9ms
// console.timeEnd("bubbleSortingOptimized")

// console.time("insertionSort")
// insertionSort(largeArraySorted) // 3.8ms
// console.timeEnd("insertionSort")

// console.time("heapSort")
// heapSortV2(largeArraySorted) // 120ms
// console.timeEnd("heapSort")

// console.time("mergeSort")
// mergeSort(largeArraySorted) // 120ms
// console.timeEnd("mergeSort")

// console.time("mergeSortV2")
// mergeSortV2(largeArraySorted) // 120ms
// console.timeEnd("mergeSortV2")

// console.time("quickSort")
// quickSort(largeArraySorted) // Maximum call stack size exceeded
// console.timeEnd("quickSort")

// console.time("quickSortRandomPivot")
// quickSortRandomPivot(largeArraySorted) // 40 ms
// console.timeEnd("quickSortRandomPivot")

// console.time("radixSort")
// radixSort(largeArraySorted) // 70 ms
// console.timeEnd("radixSort")

// console.time("defaultJsSort")
// largeArraySorted.sort((a, b) => a - b) // 7 ms
// console.timeEnd("defaultJsSort")


// *******************************   largeArrayReversed   ***************************************************************

// console.time("selectionSort")
// selectionSort(largeArrayReversed) // 11.2s
// console.timeEnd("selectionSort")

// console.time("selectionSortBidirectional")
// selectionSortBidirectional(largeArrayReversed) // 10s
// console.timeEnd("selectionSortBidirectional")

// console.time("bubbleSortingOptimized")
// bubbleSortingOptimized(largeArrayReversed) // 23s
// console.timeEnd("bubbleSortingOptimized")

// console.time("insertionSort")
// insertionSort(largeArrayReversed) // 18s
// console.timeEnd("insertionSort")

// console.time("heapSort")
// heapSortV2(largeArrayReversed) // 120ms
// console.timeEnd("heapSort")

// console.time("mergeSort")
// mergeSort(largeArrayReversed) // 105ms
// console.timeEnd("mergeSort")

// console.time("mergeSortV2")
// mergeSortV2(largeArrayReversed) // 115ms
// console.timeEnd("mergeSortV2")

// console.time("quickSort")
// quickSort(largeArrayReversed) // Maximum call stack size exceeded
// console.timeEnd("quickSort")

// console.time("quickSortRandomPivot")
// quickSortRandomPivot(largeArrayReversed) // 50 ms
// console.timeEnd("quickSortRandomPivot")

// console.time("radixSort")
// radixSort(largeArrayReversed) // 95 ms
// console.timeEnd("radixSort")

// console.time("defaultJsSort")
// largeArrayReversed.sort((a, b) => a - b) // 6 ms
// console.timeEnd("defaultJsSort")

// *******************************   almostSortedLargeArray   ***************************************************************


// console.time("selectionSort")
// selectionSort(almostSortedLargeArray) // 9.6s
// console.timeEnd("selectionSort")

// console.time("selectionSortBidirectional")
// selectionSortBidirectional(almostSortedLargeArray) // 6.8s
// console.timeEnd("selectionSortBidirectional")

// console.time("bubbleSortingOptimized")
// bubbleSortingOptimized(almostSortedLargeArray) // 15.4s
// console.timeEnd("bubbleSortingOptimized")

// console.time("insertionSort")
// insertionSort(almostSortedLargeArray) // 155ms
// console.timeEnd("insertionSort")

// console.time("heapSort")
// heapSortV2(almostSortedLargeArray) // 120ms
// console.timeEnd("heapSort")

// console.time("mergeSort")
// mergeSort(almostSortedLargeArray) // 110ms
// console.timeEnd("mergeSort")

// console.time("mergeSortV2")
// mergeSortV2(almostSortedLargeArray) // 120ms
// console.timeEnd("mergeSortV2")

// console.time("quickSort")
// quickSort(almostSortedLargeArray) // 110 ms
// console.timeEnd("quickSort")

// console.time("quickSortRandomPivot")
// quickSortRandomPivot(almostSortedLargeArray) // 40 ms
// console.timeEnd("quickSortRandomPivot")

// console.time("radixSort")
// radixSort(almostSortedLargeArray) // 80 ms
// console.timeEnd("radixSort")

// console.time("defaultJsSort")
// almostSortedLargeArray.sort((a, b) => a - b) // 10 ms
// console.timeEnd("defaultJsSort")