/**
 * Write a function called collectStrings which accepts an object
 * and returns an array of all the values in the object that have a typeof string
*/


function collectStrings(value) {
  const values = Object.values(value)
  let res = []
  for(let i=0; i < values.length; i++) {
    const currVal = values[i] 

    if(typeof currVal === 'string') {
      res.push(currVal)
    } else {
      res = res.concat(collectStrings(currVal))
    }
  }

  return res
}

const obj = {
  stuff: "foo",
  data: {
      val: {
          thing: {
              info: "bar",
              moreInfo: {
                  evenMoreInfo: {
                      weMadeIt: "baz"
                  }
              }
          }
      }
  }
}

console.log(collectStrings(obj)) // ["foo", "bar", "baz"])