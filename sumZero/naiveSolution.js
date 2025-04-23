// Write a function called sumZero which accepts a sorted array of integers.
// This function should find the first pair where sum is 0. Return an array that 
// includes both values that sum to zero or undefined if pair does not exist

// sumZero([-3,-2,-1,0,1,2,3]) // [-3,3]
// sumZero([-2,0,1,3]) // undefined
// sumZero([1,2,3]) // undefined

function sumZero(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i+1; j < arr.length; j++) {
            if (arr[i] + arr[j] === 0) {
                return [arr[i], arr[j]]
            }
        }
    }

    return undefined
}

console.log(sumZero([-3, -2, -1, 0, 1, 2, 3]))// [-3,3]
console.log(sumZero([-2, 0, 1, 3])) // undefined
console.log(sumZero([1, 2, 3])) // undefined

// Time complexity O(N^2)
// Space complexity O(1)

