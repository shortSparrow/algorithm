/**
 * Write a recursive function called flatten which accepts
 * an array of arrays and returns a new array with all values flattened.
 */

// // My solution
// function flatten(arr) {
//   const result = [];

//   function helper(value) {
//     const lastItem = value.pop();
//     if (lastItem === undefined) {
//       return;
//     }

//     if (lastItem instanceof Array) {
//       helper(lastItem); // handle array item
//       return helper(value); // handle all items before array starts
//     } else {
//       result.push(lastItem);
//       return helper(value);
//     }
//   }

//   helper(arr);

//   return result.reverse();
// }

/**
 * Example
 * [1, 2, 3, [4, 5]]
 * 1. takes [4,5], this is array so 15th line handle it, run helper([4,5]). 17th line wait before helper([4,5]) completes
 * 2. 4 this is instanceof Number so 19th line handle it, run helper([5])
 * 3. 5 this is instanceof Number so 19th line handle it, run helper([])
 * 4. array is empty so line 11th handle it and return undefined
 * 5. 17th line continue work, and run helper([1,2,3])
 * 6. 1 this is instanceof Number so 19th line handle it, run helper([2,3])
 * 7. 2 this is instanceof Number so 19th line handle it, run helper([3])
 * 8. 3 this is instanceof Number so 19th line handle it, run helper([])
 * 9. array is empty so line 11th handle it and return undefined
 * 10. Recursion completed, return result (27th line)
 */

// Better solution from Udemy
function flatten(oldArr) {
  var newArr = [];
  for (var i = 0; i < oldArr.length; i++) {
    if (Array.isArray(oldArr[i])) {
      newArr = newArr.concat(flatten(oldArr[i]));
    } else {
      newArr.push(oldArr[i]);
    }
  }
  return newArr;
}

console.log(flatten([1, 2, 3, [4, 5]])); // [1, 2, 3, 4, 5]
// console.log(flatten([1, [2, [3, 4], [[5]]]])); // [1, 2, 3, 4, 5]
// console.log(flatten([[1], [2], [3]])); // [1,2,3]
// console.log(flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]])); // [1,2,3]

// console.log(flatten(
//     [
//         [
//             [
//                 [1],
//                 [
//                     [
//                         [2]
//                     ]
//                 ],
//                 [
//                     [
//                         [
//                             [
//                                 [
//                                     [
//                                         [3]
//                                     ]
//                                 ]
//                             ]
//                         ]
//                     ]
//                 ]
//             ]
//         ]
//     ]
// ));
