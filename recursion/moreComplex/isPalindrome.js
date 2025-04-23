/**
 * Write a recursive function called isPalindrome which returns true
 * if the string passed to it is a palindrome (reads the same forward and backward).
 * Otherwise it returns false.
 */


function isPalindrome(str){
    if (str.length <= 1) {
        return true
    }

    const currentChar = str[0]
    const lastChar = str[str.length - 1]

    const isEqual = currentChar == lastChar
    const strWithoutFirstAndLastChar = str.slice(1, str.length - 1)
    return isEqual && isPalindrome(strWithoutFirstAndLastChar)

}

// console.log(isPalindrome('awesome')) // false
// console.log(isPalindrome('foobar')) // false
// console.log(isPalindrome('tacocat')) // true
// console.log(isPalindrome('amanaplanacanalpanama')) // true
// console.log(isPalindrome('amanaplanacanalpandemonium')) // false
