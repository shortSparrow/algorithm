/**
 * Write a function called binarySearch which accepts a sorted array
 * and a value and returns the index at which the value exists.
 * Otherwise, return -1.
 */

function getMiddleIndex(from, to) {
  return Math.floor((from + to) / 2);
}

// function binarySearch(arr, value) {
//   let start = 0;
//   let end = arr.length - 1;
//   let middleIndex = getMiddleIndex(start, end);

//   while (end >= start) {
//     if (arr[middleIndex] === value) {
//       return middleIndex;
//     }

//     if (arr[middleIndex] > value) {
//       end = middleIndex - 1; // -1 тому що middleIndex вже було перевірено, немає сенсу додавати його до проміжку
//     } else {
//       start = middleIndex + 1; // +1 тому що middleIndex вже було перевірено, немає сенсу додавати його до проміжку
//     }
//   }

//   return -1
// }


// Те саме що і верху, але як на мене більш читабельний варіант
function binarySearch(arr, value) {
  let start = 0;
  let end = arr.length - 1;
  let middleIndex = getMiddleIndex(start, end);

  while (end >= start && arr[middleIndex] !== value) {
    if (arr[middleIndex] > value) {
      end = middleIndex - 1; // -1 тому що middleIndex вже було перевірено, немає сенсу додавати його до проміжку
    } else {
      start = middleIndex + 1; // +1 тому що middleIndex вже було перевірено, немає сенсу додавати його до проміжку
    }

    middleIndex = getMiddleIndex(start, end);
  }

  return arr[middleIndex] === value ?  middleIndex : -1
}

/**
 * BIG O
 * O(log n) - worst case
 * O(1) - best case
 */

// console.log(binarySearch([1, 2, 3, 4, 5,6,7,8,9,10], 4)); // 3
// console.log(binarySearch([1, 2, 3, 4, 5], 3)); // 2
// console.log(binarySearch([1, 2, 3, 4, 5], 5)); // 4
// console.log(binarySearch([1, 2, 3, 4, 5], -1)); // -1
// console.log(
//   binarySearch([5, 6, 10, 13, 14, 18, 30, 34, 35, 37, 40, 44, 64, 79, 84, 86, 95, 96, 98, 99], 10)
// ); // 2
// console.log(
//   binarySearch([5, 6, 10, 13, 14, 18, 30, 34, 35, 37, 40, 44, 64, 79, 84, 86, 95, 96, 98, 99], 95)
// ); // 16
// console.log(
//   binarySearch([5, 6, 10, 13, 14, 18, 30, 34, 35, 37, 40, 44, 64, 79, 84, 86, 95, 96, 98, 99], 100)
// ); // -1
