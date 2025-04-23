/**
 * Implement a function called bubbleSortingOptimizedWithCallbackingOptimizedWithCallback. Given an array,
 * bubbleSortingOptimizedWithCallbackingOptimizedWithCallback will sort the values in the array. The function takes 2 parameters: 
 * an array and an optional comparator function.

  function bubbleSortingOptimizedWithCallbackingOptimizedWithCallback(arr, comparator) {
    if (typeof comparator !== 'function') {
      // provide a default
    }
  }
  The comparator function is a callback that will take two values from the array to be compared. 
  The function returns a negative value if the first value is less than the second, a positive value if the first value is greater than the second, and 0 if both values are equal.
 */

function defaultCb(a, b) {
  return a - b;
}

function bubbleSortingOptimizedWithCallback(arr, cb) {
  if (typeof cb !== "function") {
    cb = defaultCb;
  }

  if (arr.length === 0) {
    return;
  }

  let end = arr.length - 1;

  while (end != 0) {
    let hasSwap = false;

    for (let i = 0; i < end; i++) {
      const a = arr[i];
      const b = arr[i + 1];

      const res = cb(a, b);

      if (res > 0) {
        arr[i] = b;
        arr[i + 1] = a;
        hasSwap = true;
      } else {
        arr[i] = a;
        arr[i + 1] = b;
        hasSwap = true;
      } 

      // last item for this iteration
      if (end - 1 == i) {
        end--;
        if (hasSwap === false) {
          end = 0;
        }
      }
    }
  }

  console.log("Sorted: ", arr);
}

// bubbleSortingOptimizedWithCallback([4, 20, 12, 10, 7, 9]); // [4, 7, 9, 10, 12, 20]
// bubbleSortingOptimizedWithCallback([0, -10, 7, 4]); // [-10, 0, 4, 7]
// bubbleSortingOptimizedWithCallback([1, 2, 3]); // [1, 2, 3]
// bubbleSortingOptimizedWithCallback([]);

// var nums = [4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2, 453, 546, 75, 67, 4342, 32];
// bubbleSortingOptimizedWithCallback(nums); // [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34, 35, 43, 67, 75, 232, 232, 453, 546, 4342]

// var kitties = ["LilBub", "Garfield", "Heathcliff", "Blue", "Grumpy"];
// function strComp(a, b) {
//   if (a < b) { return -1;}
//   else if (a > b) { return 1;}
//   return 0;
// }
// bubbleSortingOptimizedWithCallback(kitties, strComp); // ["Blue", "Garfield", "Grumpy", "Heathcliff", "LilBub"]

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
// bubbleSortingOptimizedWithCallback(moarKittyData, oldestToYoungest); // sorted by age in descending order


