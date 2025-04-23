function isObject(val) {
  return typeof val === "object" && val !== null && !Array.isArray(val);
}

function isArray(value) {
  return Array.isArray(value);
}

function isString(value) {
  return typeof value === "string";
}

function handleArray(value) {
  const res = [];

  for (let i = 0; i < value.length; i++) {
    const curVal = value[i];
    if (isObject(curVal)) {
      res.push(handleObject(curVal))
    } else if (isArray(curVal)) {
      res.push( handleArray(curVal));
    } else {
      res.push(curVal);
    }
  }

  return res;
}

function handleObject(value) {
  const res = {};

  for (key in value) {
    const curVal = value[key];
    if (isObject(curVal)) {
      res[key] = handleObject(curVal);
    } else if (isArray(curVal)) {
      res[key] = handleArray(curVal);
    } else {
      res[key] = curVal;
    }
  }

  return res;
}

function independentCopy(value) {
  let res;

  if (isObject(value)) {
    res = handleObject(value);
  } else if (isArray(value)) {
    res = handleArray(value);
  } else {
    res = value;
  }

  return res;
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
  
//   console.log(
//     JSON.stringify(
//         independentCopy(obj),
//       function (k, v) {
//         return v === undefined ? 'undefined' : v;
//       },
//       4
//     )
//   );

const copy = independentCopy(obj)
console.log(copy === obj);
console.log(copy.test === obj.test);
console.log(copy.test[3] === obj.test[3]);
console.log(copy.test[3][1][0][0] === obj.test[3][1][0][0]);

