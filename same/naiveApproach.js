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
    if(arr1.length !== arr2.length) {
        return false
    }

    for(let i=0; i<arr1.length; i++) {
        const squaredValueIndex = arr2.indexOf(arr1[i] * arr1[i])
        if(squaredValueIndex === -1) {
            return false
        }

        arr2.splice(squaredValueIndex, 1) // Remove for handle duplicates, look at second example

    }
    return true
}

// Big O => O(n^2)

console.log(same([1,3,5], [25,9,1]))
console.log(same([1,3,5,3], [25,9,9,1]))
console.log(same([1,3,5,3], [25,9,9,2]))
