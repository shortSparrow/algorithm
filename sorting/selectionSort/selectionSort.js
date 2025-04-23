
/**
 * 
 * Це оригінальний selectionSort, він і повинен таким бут. Мій selectionSortBidirectional це просто моє доопрацювання,
 * але це не є офіційним алгоритмом
 */

function selectionSort(arr) {
  if (arr.length === 0) {
    return arr
  }

  let currentMinIndex = 0
  let start = 0
  let end = arr.length - 1

  while(start != end) {

    for(let i=start; i<arr.length; i++) {
      if (arr[i] < arr[currentMinIndex]) {
        currentMinIndex = i
      }
    }
    
    if(start !== currentMinIndex) {
      const startTemp = arr[start]
      arr[start] = arr[currentMinIndex]
      arr[currentMinIndex] = startTemp
    }

    start++
    currentMinIndex = start
  }

  return arr
}
/**
 * BIG O
 * n^2
 */


// const arr = [19, 44, 38, 5, 47, 15]
// selectionSort(arr)
// console.log(arr);


module.exports ={selectionSort}


