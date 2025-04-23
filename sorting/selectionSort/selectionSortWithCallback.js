
function defaultCb(a, b) {
  return a - b;
}

function selectionSortWithCallback(arr, cb) {
  if (arr.length === 0) {
    return arr
  }

  if (typeof cb !== "function") {
    cb = defaultCb;
  }

  let currentMinIndex = 0
  let start = 0
  let end = arr.length - 1

  let iteration = 0

  while(start != end) {
    iteration++

    for(let i=start; i<arr.length; i++) {
      const res = cb(arr[i], arr[currentMinIndex])

      if (res < 0) {
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

  console.log('Iteration: ', iteration)

  return arr
}


console.log(selectionSortWithCallback([4, 20, 12, 10, 7, 9])); // [4, 7, 9, 10, 12, 20]
// console.log(selectionSortWithCallback([0, -10, 7, 4])); // [-10, 0, 4, 7]
// console.log(selectionSortWithCallback([1, 2, 3])); // [1, 2, 3]
// console.log(selectionSortWithCallback([]));
 
// var nums = [4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2, 453, 546, 75, 67, 4342, 32];
// console.log(selectionSortWithCallback(nums)); // [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34, 35, 43, 67, 75, 232, 232, 453, 546, 4342]

// var kitties = ["LilBub", "Garfield", "Heathcliff", "Blue", "Grumpy"];
// function strComp(a, b) {
//   if (a < b) { return -1;}
//   else if (a > b) { return 1;}
//   return 0;
// }
// console.log(selectionSortWithCallback(kitties, strComp)); // ["Blue", "Garfield", "Grumpy", "Heathcliff", "LilBub"]
 

// var moarKittyData = [{
//   name: "LilBub",
//   age: 7
// }, {
//   name: "Garfield",
//   age: 40
// }, {
//   name: "Heathcliff",
//   age: 45
// }, {
//   name: "Blue",
//   age: 1
// }, {
//   name: "Grumpy",
//   age: 6
// }];
// function oldestToYoungest(a, b) {
//   return b.age - a.age;
// }
// console.log(selectionSortWithCallback(moarKittyData, oldestToYoungest)); // sorted by age in descending order