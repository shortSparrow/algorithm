

function isAnagram(str1, str2) {

    if(str1.length !== str2.length) {
        return false
    }

    const lookup = {}

    for(let character of str1) {
        lookup[character] ? lookup[character] += 1 : lookup[character] = 1
    }

    for(let character of str2) {
        if(!lookup[character]) {
            return false
        } else {
            lookup[character] -= 1
        }
    }

    return true

}

// Big O => O(n)


console.log(isAnagram('', '')) // true
console.log(isAnagram('aaz', 'zza')) // false
console.log(isAnagram('anagram', 'nagaram')) // true
console.log(isAnagram('rat', 'car')) // false
console.log(isAnagram('awesome', 'awesom')) // false
console.log(isAnagram('qwerty', 'qeywrt')) // true
console.log(isAnagram('texttwisttime', 'timetwisttext')) // true
