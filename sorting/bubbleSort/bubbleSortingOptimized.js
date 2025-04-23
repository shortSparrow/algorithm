
/**
 * Оптимізація для майже відсортованого масиву.
 * [1,2,3,4,5,9,6]
 * Просто bubbleSorting перемістить 9 в кінець за першу ітерацію 
 * і буде проходитися в пусту що 5 ітерацій, хоча дані вже відсортовані
 * 
 */
function bubbleSortingOptimized(arr) {
  if (arr.length === 0) {
    return;
  }
  
  let end = arr.length - 1

  while(end != 0) {
    let hasSwap = false

    for (let i = 0; i < end; i++) {
      const a = arr[i]
      const b = arr[i + 1]
  
      if (a > b) {
        arr[i] = b
        arr[i+1] = a
        hasSwap = true
      }
  
      // last item for this iteration
      if ((end -1) == i) {
        end--
        if(hasSwap === false) {
          // during this iteration was no swap - this means array is sorted, we can stop loop and don't check the rest of array
          end = 0
        }
      }
    }
  }
}

/**
 *  arr = [29, 10, 14, 37, 14]
 *  
 *  Iterations:
 *  [10, 14, 29, 14, 37]
 *  [10, 14, 14, 29, 37]
 *  [10, 14, 14, 29, 37] - not swap - last iteration
 * 
 * bubbleSortingOptimized has 3 iteration , but bubbleSorting has 5
 * 
 * For example for [1,2,3,4,5,9,6] bubbleSortingOptimized make only 2 iterations
 */

// const arr = [29, 10, 14, 37, 14]
// bubbleSortingOptimized(arr)
// console.log(arr);


/**
 * BIG O complexity
 * n^2 для повністю не відсортованого масиву і n для майже відсортованого якщо запустимо bubbleSortingOptimized
 * (тобто по факту там буде 10n чи може 100n якщо буде 100 перестановок, але ми це опускаємо і робимо 
 * округлення яке відповідає загальному тренду складності)
 */

module.exports = {bubbleSortingOptimized}