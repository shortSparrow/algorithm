// Write a function called sumZero which accepts a sorted array of integers.
// This function should find the first pair where sum is 0. Return an array that 
// includes both values that sum to zero or undefined if pair does not exist

// sumZero([-3,-2,-1,0,1,2,3]) // [-3,3]
// sumZero([-2,0,1,3]) // undefined
// sumZero([1,2,3]) // undefined

function sumZero(arr) {
    let leftIndex = 0
    let rightIndex = arr.length - 1

    while (leftIndex < rightIndex) {
        const sum = arr[leftIndex] + arr[rightIndex]
        if (sum === 0) {
            isContinue = false
            return [arr[leftIndex], + arr[rightIndex]]
        }

        if (sum < 0) {
            leftIndex += 1
        }

        if (sum > 0) {
            rightIndex -= 1
        }
    }

    return undefined
}

console.log(sumZero([-5, -3, -2, -1, 0, 1, 2, 4, 4]))// [-2,2]
console.log(sumZero([-3, -2, -1, 0, 1, 2, 3]))// [-3,3]
console.log(sumZero([-2, 0, 1, 3])) // undefined
console.log(sumZero([1, 2, 3])) // undefined

// Time complexity O(N)
// Space complexity O(1)

