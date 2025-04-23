
function defaultCb(a, b) {
  return a - b;
}

function merge(arr1, arr2, cb) {
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

function mergeSortWithCallback(arr, cb) {
  if(arr.length <= 1) {
    return arr
  }

  const middleIndex = Math.floor(arr.length/2)
  let halfArr1 = mergeSortWithCallback(arr.slice(0, middleIndex), cb)
  let halfArr2 = mergeSortWithCallback(arr.slice(middleIndex, arr.length), cb)

  return merge(halfArr1, halfArr2, cb)
}

var names = ["Bob", "Ethel", "Christine","M", "Colt", "Allison", "SuperLongNameOMG"]
 
function stringLengthComparator(str1, str2) {
  return str2.length - str1.length;
}
 
console.log(mergeSortWithCallback(names, stringLengthComparator));