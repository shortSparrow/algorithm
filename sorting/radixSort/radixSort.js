
function getDigit(num, i) {
  return Math.floor(Math.abs(num) / Math.pow(10, i) % 10)
}

// console.log(getDigit(34567, 1));

function digitCount(num) {
  if(num === 0) return 1

  return Math.floor(Math.log10(Math.abs(num))) + 1
}
 
// console.log(digitCount(9876));
// console.log(digitCount(100));

function mostDigits(nums) {
  let maxDigits = 0
  for (let i = 0; i < nums.length; i++) {
    maxDigits = Math.max(maxDigits, digitCount(nums[i]))
  }

  return maxDigits
}


// mostDigits([100, 1010, 1, 500]); // 4
// mostDigits([0, 100000, 400, 12, 8]); // 6

// console.log(mostDigits([1, 9, 10, 100, 99]));

function radixSort(nums) {
  const maxDigitsCount = mostDigits(nums)

  for(let i=0; i<maxDigitsCount; i++) {
    let digitBucket = Array.from({length: 10}, () => [])

    for(let j=0; j<nums.length; j++) {
      const digit = getDigit(nums[j], i)
      digitBucket[digit].push(nums[j])
    }

    nums = [].concat(...digitBucket)
  }

  return nums
}

// console.log(radix([23,345,5467,12,2345,9852]));
module.exports = {radixSort}

/*
  Big O

    Time Complexity      Time Complexity      Time Complexity      Space Complexity
        (Best)               (Average)             (Worst)
    --------------------------------------------------------------------------------
        O(nk)                  O(nk)                O(nk)               O(n+k)

    
  n - length of array
  k - number of digits (average) 

  k - це яку довжину має найдовше число, і якщо воно має довжину log n, то матимемо
  складність O(n log n), як і в алгоритмах порівняння. До прикладу n = 100 000, найбільше
  число 123 456. Отже log k => log 123 456 = 16.9
  Отже для цього випадку для merge алгоритму буде O(n*16.9)
  А для radix O(n*6)
*/