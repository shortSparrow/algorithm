/**
 * Write a recursive function called capitalizeFirst.
 * Given an array of strings, capitalize the first letter
 * of each string in the array.
 */

function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

function capitalizeFirst(arr) {
  let firstItem = arr.shift();
  if (firstItem === undefined) {
    return;
  }
  firstItem = capitalizeFirstLetter(firstItem)

  const val = capitalizeFirst(arr)
  const item =  val ? val : []
  return [].concat(firstItem, item);
}

// Або якщо не хочеться використовувати shift, бо це довго і мутує масив то можна так:
// function capitalizeFirst(arr) {
//   if(arr.length == 0) {
//     return []
//   }

//   const res = capitalizeFirst(arr.slice(0,-1))
//   const string = capitalizeFirstLetter(arr.slice(arr.length - 1))
//   res.push(string);
//   return res;
// }

console.log(capitalizeFirst(["car", "taco", "banana"])); // ['Car','Taco','Banana']
