
/**
 * 
 * Я маю тут два алгоритми selectionSort і selectionSortBidirectional, вони по суті однакові, хіба що
 * selectionSort лише переміщає мінімальні числа на початок, а selectionSortBidirectional за одну ітерацію
 * переміщає мінімальні числа на початок, а максимальні в кінець, тож має в 2 рази менше операцій по масиву,
 * але переміщення теж операція тому не знаю чи буде він швидший
 */

function selectionSortBidirectional(arr) {
  if (arr.length === 0) {
    return arr
  }

  let currentMinIndex = 0
  let currentMaxIndex = 0
  let start = 0
  let end = arr.length - 1

  let iteration = 0
  while(start < end) {
    iteration++

    for(let i=start; i<end + 1; i++) {
      if (arr[i] < arr[currentMinIndex]) {
        currentMinIndex = i
      }
      if (arr[i] > arr[currentMaxIndex]) {
        currentMaxIndex = i
      }
    }
    
    if(start !== currentMinIndex) {
      const startTemp = arr[start]
      arr[start] = arr[currentMinIndex]
      arr[currentMinIndex] = startTemp
      
      // ця умова необхідна бо може статися так що start (те з чого ми почали виявиться найбільшим числом і тоді коли ми поміняємо start і мінімальне число то currentMaxIndex вже посилатиметься на мінімальне число)
      if(start === currentMaxIndex) {
        currentMaxIndex = currentMinIndex
      }
    }

    if(end !== currentMaxIndex) {
      const endTemp = arr[end]
      arr[end] = arr[currentMaxIndex]
      arr[currentMaxIndex] = endTemp
    }

    start++
    end--
    currentMinIndex = start
    currentMaxIndex = end
  }

    console.log('iteration: ', iteration)

  return arr
}
/**
 * BIG O
 * n^2/2 -> n^2
 */

// const arr = [19, 44, 38, 5, 47, 15]
// selectionSortBidirectional(arr)
// console.log(arr);

module.exports ={selectionSortBidirectional}



// COMPARE 2 algorithm
// const randomIntegers = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000) + 1);

// const arr1 = [...randomIntegers]
// selectionSortBidirectional(arr1)
// console.log(arr1);

// const arr2 = [...randomIntegers]
// selectionSort(arr2)
// console.log(arr2);