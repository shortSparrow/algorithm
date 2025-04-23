
function getRandomIndex(startIndex,endIndex,) {
  return Math.floor(Math.random() * (endIndex - startIndex + 1) + startIndex)
}

function pivot(arr, startIndex = 0, endIndex = arr.length - 1) {
  const randomIndex = getRandomIndex(startIndex, endIndex);
  swap(arr, startIndex, randomIndex)
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

function quickSortRandomPivot(arr, left = 0, right = arr.length - 1) {
  if(left < right) {
    const pivotIndex = pivot(arr, left, right);

    // left
    quickSortRandomPivot(arr, left, pivotIndex - 1);
  
    // right
    quickSortRandomPivot(arr, pivotIndex + 1, right);
  }

  return arr
}

// console.log(quickSortRandomPivot([4,6,9,1,2,5,3]));
// console.log(quickSortRandomPivot([1,2,3,4,5,6,7]));
// console.log(quickSortRandomPivot([6,5]));


module.exports = {quickSortRandomPivot}

/**
 * Теж саме що і просто QuickSort, але тепер pivotValue береться не з 0 індексу а з випадкового місця,
 * це дозволяє перевіряти великі відсортовані списки і уникати помилки перевантаження рекурсії
 */
