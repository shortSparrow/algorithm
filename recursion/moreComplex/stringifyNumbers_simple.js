/**
 * Write a function called stringifyNumbers_simple which takes in an object
 * and finds all of the values which are numbers and converts them to strings.
 * Recursion would be a great way to solve this!
 *
 * The exercise intends for you to create a new object with the numbers
 * converted to strings, and not modify the original. Keep the original object unchanged.
 */


// Відмінність stringifyNumbers_simple від stringifyNumbers в тому що stringifyNumbers_simple опрацьовує тільки ключі об'єктів які є числами, якщо це масив з числами він ігнорується і не модифікується
function stringifyNumbers_simple(obj) {
  var newObj = {};
  for (var key in obj) {
    if (typeof obj[key] === "number") {
      newObj[key] = obj[key].toString();
    } else if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      newObj[key] = stringifyNumbers_simple(obj[key]);
    } else {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}

const obj = {
  num: "1",
  test: [],
  data: {
    val: "4",
    info: {
      isRight: true,
      random: "66",
    },
  },
};

console.log(JSON.stringify(stringifyNumbers_simple(obj), null, 4));
