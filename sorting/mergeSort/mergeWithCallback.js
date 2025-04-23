function defaultCb(a, b) {
  return a - b;
}

/**
 * merge accepts two sorted arrays and must merge them
 * and return new sorted array
 */
function mergeWithCallback(arr1, arr2, cb) {
  const result = []

  if (typeof cb !== "function") {
    cb = defaultCb;
  }

  let i = 0
  let j = 0

  while(i < arr1.length && j < arr2.length) {
    const res = cb(arr1[i], arr2[j])
    if(res < 0) {
      result.push(arr1[i])
      i++
    } else {
      result.push(arr2[j])
      j++
    }
  }

  // push rest of arr1 if exist
  while(i < arr1.length) {
   result.push(arr1[i]) 
   i++
  }

  // push rest of arr2 if exist
  while(j < arr2.length) {
    result.push(arr2[j]) 
    j++
  }
 
  return result
}


var arr1 = [1,3,4,5];
var arr2 = [2,4,6,8];
console.log(mergeWithCallback(arr1,arr2)) // [1,2,3,4,4,5,6,8]
 
 
// var arr3 = [-2,-1,0,4,5,6];
// var arr4 = [-3,-2,-1,2,3,5,7,8];
// console.log(mergeWithCallback(arr3,arr4)); // [-3,-2,-2,-1,-1,0,2,3,4,5,5,6,7,8]
 
// var arr5 = [3,4,5]
// var arr6 = [1,2]
// console.log(mergeWithCallback(arr5,arr6)) // [1,2,3,4,5]
 
// var names = ["Bob", "Ethel", "Christine"]
// var otherNames = ["M", "Colt", "Allison", "SuperLongNameOMG"]
// function stringLengthComparator(str1, str2) {
//   return str1.length - str2.length;
// }
// console.log(mergeWithCallback(names, otherNames, stringLengthComparator)); // ["M", "Bob", "Colt", "Ethel", "Allison", "Christine", "SuperLongNameOMG"]

// // Reverse. Тому що масиви мають бути відсортовані відповідно до callback
// var names = ["Christine", "Ethel", "Bob"]
// var otherNames = ["SuperLongNameOMG", "Allison","Colt","M"]
// function stringLengthComparator(str1, str2) {
//   return str2.length - str1.length;
// }
// console.log(mergeWithCallback(names, otherNames, stringLengthComparator)); // ['SuperLongNameOMG', 'Christine', 'Allison', 'Ethel', 'Colt', 'Bob', 'M']