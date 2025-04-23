/**
 * Write a recursive function called reverse which accepts
 * a string and returns a new string in reverse.
 */

// // More readable solution
// function reverse(str){
//     let newStr = ''

//     function helper(str) {
//         const lastChar =  str[str.length - 1]

//         if(lastChar == undefined) {
//             return
//         }

//         newStr += lastChar
//         return helper(str.slice(0,str.length - 1))

//     }

//     helper(str)

//     return newStr
// }

// Pure recursion solution
function reverse(str) {
  const lastChar = str[str.length - 1];

  if (lastChar == undefined) {
    return '';
  }

  return lastChar + reverse(str.slice(0, str.length - 1));
}

console.log(reverse("awesome")); // 'emosewa'
// console.log(reverse('rithmschool')) // 'loohcsmhtir'
