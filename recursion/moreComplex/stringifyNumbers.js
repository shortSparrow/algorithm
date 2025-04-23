/**
 * Write a function called stringifyNumbers which takes in an object
 * and finds all of the values which are strings and converts them to numbers.
 * Recursion would be a great way to solve this!
 *
 * The exercise intends for you to create a new object with the strings
 * converted to numbers, and not modify the original. Keep the original object unchanged.
 */

/*
let obj = {
    num: 1,
    test: [],
    data: {
        val: 4,
        info: {
            isRight: true,
            random: 66
        }
    }
}
/*

stringifyNumbers(obj)

/*
{
    num: "1",
    test: [],
    data: {
        val: "4",
        info: {
            isRight: true,
            random: "66"
        }
    }
}
*/

function isObject(val) {
  return typeof val === "object" && val !== null && !Array.isArray(val);
}

function isArray(value) {
  return Array.isArray(value);
}

function isString(value) {
  return typeof value === "string";
}

function isDigitString(value) {
  if (typeof value !== "string") {
    return false;
  }

  return value
    .split("")
    .every((item) => typeof Number(item) === "number" && !isNaN(Number(item)));
}

function handleObject(value) {
  const objEntries = Object.entries(value);
  const resObj = {};

  for (let i = 0; i < objEntries.length; i++) {
    const key = objEntries[i][0];
    const curVal = objEntries[i][1];

    if (isObject(curVal) || isArray(curVal)) {
      resObj[key] = stringifyNumbers(curVal);
    } else if (isString(curVal) && isDigitString(curVal)) {
      resObj[key] = Number(curVal);
    } else {
      resObj[key] = curVal;
    }
  }

  return resObj;
}

function handleArray(value) {
  const resArr = [];

  for (let i = 0; i < value.length; i++) {
    const curVal = value[i];
    if (isObject(curVal) || isArray(curVal)) {
      resArr.push(stringifyNumbers(curVal));
    } else if (isString(curVal) && isDigitString(curVal)) {
      resArr.push(Number(curVal));
    } else {
      resArr.push(handlePrimitive(curVal));
    }
  }

  return resArr;
}

function handlePrimitive(value){
  return value
}

function stringifyNumbers(value) {
  let response;
  if (isObject(value)) {
    response = handleObject(value);
  } else if (isArray(value)) {
    response = handleArray(value);
  } else {
    response = [handlePrimitive(value)]
  }

  return response;
}

const obj = {
  num: 1,
  test: [
    "3",
    1,
    undefined,
    ["3", [[["5", 4, true]]]],
    { a: 2, b: { c: [[{ a: "22" }]] } },
  ],
  data: {
    val: 4,
    info: {
      isRight: true,
      random: 66,
      x: ["4", { f: undefined, b: false, c: "1", d: 8 }],
    },
  },
};

console.log(
  JSON.stringify(
    stringifyNumbers(obj),
    function (k, v) {
      return v === undefined ? 'undefined' : v;
    },
    4
  )
);
