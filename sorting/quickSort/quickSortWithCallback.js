function defaultCb(a, b) {
  return a - b;
}

function pivot(arr, cb, startIndex = 0, endIndex = arr.length - 1) {
  if (typeof cb !== "function") {
    cb = defaultCb;
  }

  const pivotValue = arr[startIndex];

  let swapIdx = startIndex;

  function swap(array, idx1, idx2) {
    if (idx1 == idx2) {
      return;
    }

    const temp = array[idx1];
    array[idx1] = array[idx2];
    arr[idx2] = temp;
  }

  for (let i = startIndex + 1; i <= endIndex; i++) {
    let res = cb(arr[i], pivotValue);
    if (res < 0) {
      swapIdx++;
      swap(arr, swapIdx, i);
    }
  }

  swap(arr, swapIdx, startIndex);

  return swapIdx;
}

function quickSortWithCallback(arr, cb, left = 0, right = arr.length - 1) {
  if (left < right) {
    const pivotIndex = pivot(arr, cb, left, right);

    // left
    quickSortWithCallback(arr, cb, left, pivotIndex - 1);

    // right
    quickSortWithCallback(arr, cb, pivotIndex + 1, right);
  }

  return arr;
}

console.log(quickSortWithCallback([1, 2, 3, 4, 5, 6, 7]));

// console.log(quickSortWithCallback([4, 20, 12, 10, 7, 9])); // [4, 7, 9, 10, 12, 20]
// console.log(quickSortWithCallback([0, -10, 7, 4])); // [-10, 0, 4, 7]
// console.log(quickSortWithCallback([1, 2, 3])); // [1, 2, 3]
// console.log(quickSortWithCallback([]));

// var nums = [
//   4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2, 453, 546, 75, 67, 4342,
//   32,
// ];
// console.log(quickSortWithCallback(nums)); // [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34, 35, 43, 67, 75, 232, 232, 453, 546, 4342]

// var kitties = ["LilBub", "Garfield", "Heathcliff", "Blue", "Grumpy"];
// function strComp(a, b) {
//   if (a < b) {
//     return -1;
//   } else if (a > b) {
//     return 1;
//   }
//   return 0;
// }
// console.log(quickSortWithCallback(kitties, strComp)); // ["Blue", "Garfield", "Grumpy", "Heathcliff", "LilBub"]


// var moarKittyData = [
//   {
//     name: "LilBub",
//     age: 7,
//   },
//   {
//     name: "Garfield",
//     age: 40,
//   },
//   {
//     name: "Heathcliff",
//     age: 45,
//   },
//   {
//     name: "Blue",
//     age: 1,
//   },
//   {
//     name: "Grumpy",
//     age: 6,
//   },
// ];
// function oldestToYoungest(a, b) {
//   return b.age - a.age;
// }
// console.log(quickSortWithCallback(moarKittyData, oldestToYoungest)); // sorted by age in descending order
