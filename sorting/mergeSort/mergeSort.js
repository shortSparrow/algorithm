
/**
 * merge accepts two sorted arrays and must merge them
 * and return new sorted array
 */
function merge(arr1, arr2) {
  const result = []

  let i = 0
  let j = 0

  while(i < arr1.length && j < arr2.length) {
    if(arr1[i] < arr2[j]) {
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

// merge([1, 20, 50], [2, 14, 99, 100])
// merge([50], [1,2,3,4,5])


// My solution
function mergeSort(arr) {
  const middleIndex = Math.floor(arr.length/2)
  let halfArr1 = arr.slice(0, middleIndex)
  let halfArr2 = arr.slice(middleIndex, arr.length)


  if(halfArr1.length > 2) {
    halfArr1 = mergeSort(halfArr1)
  }

  if(halfArr2.length > 2) {
    halfArr2 = mergeSort(halfArr2)
  }

  // sort halfArr
  if(halfArr1[0] > halfArr1[1] && halfArr1.length > 1) {
    const temp = halfArr1[0]
    halfArr1[0] = halfArr1[1]
    halfArr1[1] = temp
  }

  if(halfArr2[0] > halfArr2[1] && halfArr2.length > 1) {
    const temp = halfArr2[0]
    halfArr1[0] = halfArr2[1]
    halfArr2[1] = temp
  }

  return merge(halfArr1, halfArr2)
}

// Solution From Udemy (це рішення простіше для читання, воно розбиває масиви аж до length == 1 
// і потім їх вже запихує у merge)
function mergeSortV2(arr) {
  if(arr.length <= 1) {
    return arr
  }

  const middleIndex = Math.floor(arr.length/2)
  let halfArr1 = mergeSortV2(arr.slice(0, middleIndex))
  let halfArr2 = mergeSortV2(arr.slice(middleIndex, arr.length))

  return merge(halfArr1, halfArr2)
}

// console.log(mergeSortV2([5,3,1,4,2]));

module.exports = {mergeSortV2, mergeSort}

/*
  Big O

    Time Complexity      Time Complexity      Time Complexity      Space Complexity
        (Best)               (Average)             (Worst)
    --------------------------------------------------------------------------------
       O(n log n)           O(n log n)           O(n log n)              O(n)
*/