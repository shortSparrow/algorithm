/**
 * Write a recursive function called nestedEvenSum.
 * Return the sum of all even numbers in an object which may contain nested objects.
 */


function isObject(value){
  return typeof value === 'object' && !Array.isArray(value) && value !== null
}

function nestedEvenSum (obj) {
  const arrValues = Object.values(obj)
  let sum = 0

  for(let i = 0; i<arrValues.length; i++) {
    if(typeof arrValues[i] === 'number' && arrValues[i] % 2 === 0) {
      sum += arrValues[i]
    }

    if(isObject(arrValues[i])) {
      sum += nestedEvenSum(arrValues[i])
    }
  }

  return sum
}
  
  
  var obj1 = {
    outer: 2,
    obj: {
      inner: 2,
      otherObj: {
        superInner: 2,
        notANumber: true,
        alsoNotANumber: "yup"
      }
    }
  }
  
  var obj2 = {
    a: 2,
    b: {b: 2, bb: {b: 3, bb: {b: 2}}},
    c: {c: {c: 2}, cc: 'ball', ccc: 5},
    d: 1,
    e: {e: {e: 2}, ee: 'car'}
  };
  
  // console.log(nestedEvenSum(obj1)); // 6
  console.log(nestedEvenSum(obj2)); // 10