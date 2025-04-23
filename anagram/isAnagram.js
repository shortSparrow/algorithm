

function isAnagram(str1, str2) {

    if(str1.length !== str2.length) {
        return false
    }

    const frequencyCounter1 = {}
    const frequencyCounter2 = {}

    for(let character of str1) {
        frequencyCounter1[character] = !frequencyCounter1[character] ? 1 : frequencyCounter1[character] + 1
    }

    for(let character of str2) {
        frequencyCounter2[character] = !frequencyCounter2[character] ? 1 : frequencyCounter2[character] + 1
    }

  
    for(let key in frequencyCounter1) {
        if(frequencyCounter1[key] !== frequencyCounter2[key]) {
            return false
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
