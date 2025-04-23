
function sameFrequency(num1, num2){
    _num1Str = num1.toString()
    _num2Str = num2.toString()

    num1Freq = {}

    if (_num1Str.length != _num2Str.length){
        return false
    }

    for (item of _num1Str){
        num1Freq[item] = num1Freq[item] ? num1Freq[item] + 1 : 1
    }

    for (item of _num2Str){
        if (!num1Freq[item] || num1Freq[item] < 1){
            return false
        }

        num1Freq[item] -= 1
    }

    return true

}


// console.log(sameFrequency(182,281)) // true
// console.log(sameFrequency(34,14)) // false
// console.log(sameFrequency(3589578, 5879385)) // true
// console.log(sameFrequency(22,222)) // false




function areThereDuplicates(...args){
    args = args.sort()

    let index = 0
    while(true){
        if(args[index] == args[index + 1]) {
            return true
        }
        if(index == args.length - 1) {
            return false
        }
        index++
    }
}

// console.log(areThereDuplicates(1, 2, 3)) // false
// console.log(areThereDuplicates(1, 2, 2)) // true 
// console.log(areThereDuplicates('a', 'b', 'c', 'a')); // true



function constructNote(){
    
}


//   constructNote('aa', 'abc') // false
//   constructNote('abc', 'dcba') // true
//   constructNote('aabbcc', 'bcabcaddff') // true


function findAllDuplicates(arr){
    arr = arr.sort()
    let res = []

    for(let i = 0; i < arr.length - 1; i++){
        if(arr[i] == arr[i+1]){
            res.push(arr[i])
            i++
        }
    }

    return res
}

// console.log(findAllDuplicates([4,3,2,7,8,2,3,1])) // array with 2 and 3
// console.log(findAllDuplicates([4, 3, 2, 1, 0])) // []
// console.log(findAllDuplicates([4, 3, 2, 1, 0, 1, 2, 3])) // array with 3, 2, and 1



// Multiple Pointers - averagePair
// Write a function called averagePair. Given a sorted array of integers and a target average, determine if there is a pair of values in the array where the average of the pair equals the target average. There may be more than one pair that matches the average target.

function averagePair(arr, average){
    let leftIndex = 0;
    let rightIndex = arr.length + 1;
    
    while(rightIndex > leftIndex) {
        let secondMatch = average*2 - arr[leftIndex]

        if (rightIndex == secondMatch) {
            return true
        }

        leftIndex++
    }

    return false
}

console.log(averagePair([1,2,3],2.5)) // true
console.log(averagePair([1,3,3,5,6,7,10,12,19],8)) // true
console.log(averagePair([-1,0,3,4,5,6], 4.1)) // false
console.log(averagePair([],4)) // false