
// Те саме що і моє рішення просто написано дещо інакше, має менше операцій пересування,
// бо currentItem пересуває лише 1 раз, а я в своєму рішенні пересуваю його при кожній ітерації,
// але тут є звертання до j поза циклом що мені дуже не подобається (там немає let, тож це фактично var)
//
// function insertionSort(arr) {
//   if(arr.length === 0) {
//     return arr
//   }

//   for(let i = 1; i < arr.length; i++) {
//     const currentItem = arr[i]

//     for(j=i-1; j >= 0 && arr[j] > currentItem; j--) {
//       arr[j+1] = arr[j]
//     }
//     arr[j+1] = currentItem
//   }

//   return arr
// }


function insertionSort(arr) {
  if (arr.length === 0) {
    return arr;
  }

  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j > 0; j--) {

      const item = arr[j];
      if (arr[j - 1] > item) {
        arr[j] = arr[j - 1];
        arr[j - 1] = item;
      } else {
        break;
      }
    }
  }

  return arr;
}

/**
 * BIG O
 * n^2 for most cases 
 * n if data almost sorted
 * 
 * best possible data = [2,3,4,5,6,1] -> only 10 cycle iterations (5 to go up to 1, and 5 to move 1 to 0 index)
 * worst possible data = [6,5,4,3,2,1] -> 20 cycle iterations
 * 
 * [2,3,4,5,6,1]
 * [1,2,3,4,5,6] -> 10 iterations
 * 
 * 
 * [6,5,4,3,2,1]
 * [5,6,4,3,2,1] -> 1 iterations
 * [4,5,6,3,2,1] -> 2 iterations
 * [3,4,5,6,2,1] -> 3 iterations
 * [2,3,4,5,6,1] -> 4 iterations
 * [1,2,3,4,5,6] -> 5 iterations
 * 
 * 
 */

// const arr = [3, 44, 38, 5, 47, 15];
// insertionSort(arr);
// console.log(arr);

module.exports = {insertionSort}

