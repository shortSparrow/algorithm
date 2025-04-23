/**
 * Write a recursive function called capitalizeWords.
 * Given an array of words, return a new array containing each word capitalized.
 */

function capitalizeWords(arr) {
  let firstItem = arr.shift();

  if (firstItem === undefined) {
    return [];
  }

  firstItem = firstItem.toUpperCase();

  return [].concat(firstItem, capitalizeWords(arr));
}

// Цікавий варіант якому не потрібно робити .shift() чи .reverse() в кінці, це з відповіді на Udemy
// function capitalizeWords(array) {
//   if (array.length === 1) {
//     return [array[0].toUpperCase()];
//   }
//   let res = capitalizeWords(array.slice(0, -1));
//   res.push(array.slice(array.length - 1)[0].toUpperCase());
//   return res;
// }

let words = ["i", "am", "learning", "recursion"];
console.log(capitalizeWords(words)); // ['I', 'AM', 'LEARNING', 'RECURSION']
