/**
 * 
 * @param {number[]} arr1 
 * @param {number[]} arr2 
 * @returns {boolean}
 * 
 * The 'same' function should return true if arr2 contains the same values ​​as arr1, but in power 2.
 * The order doesn't matter. 
 * same([1,3,2], [4,1,9])  => true
 * same([1,1,2], [1,4,1])  => true
 * same([1,3,2, 2], [4,1,9, 5])  => false
 */


function same(arr1, arr2) {
    let frequencyCounter1 = {}
    let frequencyCounter2 = {}

    for (let value of arr1) {
        frequencyCounter1[value] = (frequencyCounter1[value] || 0) + 1
    }

    for (let value of arr2) {
        frequencyCounter2[value] = (frequencyCounter2[value] || 0) + 1
    }

    for (let key in frequencyCounter1) {
        if (!frequencyCounter2.hasOwnProperty(key * key)) {
            return false
        }

        if (frequencyCounter1[key] !== frequencyCounter2[key * key]) {
            return false
        }
    }

    return true

}

// Big O => O(n)

console.log(same([1, 3, 5], [25, 9, 1]))
console.log(same([1, 3, 5, 3], [25, 9, 9, 1]))
console.log(same([1, 3, 5, 3], [25, 9, 9, 2]))
