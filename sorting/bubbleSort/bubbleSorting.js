
function bubbleSorting(arr) {
  if (arr.length === 0) {
    return;
  }
  
  let end = arr.length - 1

  while(end != 0) {
    for (let i = 0; i < end; i++) {
      const a = arr[i]
      const b = arr[i + 1]
  
      if (a > b) {
        arr[i] = b
        arr[i+1] = a
      }
  
      // last item
      if ((end -1) == i) {
        end--
      }
    }
  }
}

const arr = [29, 10, 14, 37, 14]
bubbleSorting(arr)
console.log(arr);

/**
 * BIG O complexity
 * n^2 для повністю не відсортованого масиву і n для майже відсортованого якщо запустимо bubbleSortingOptimized
 * (тобто по факту там буде 10n чи може 100n якщо буде 100 перестановок, але ми це опускаємо і робимо 
 * округлення яке відповідає загальному тренду складності)
 * 
 * [4,5,6,1,2,3] - хоч це і майже відсортований масив, але для bubbleSort саме така розтановка погана, ми будемо робити так:
 * [4,5,6,1,2,3]
 * [4,5,1,2,3,6]
 * [4,1,2,3,5,6]
 * [1,2,3,4,5,6]
 * 
 * 
 */
