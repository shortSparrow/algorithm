
// Fibonacci sequence 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610
function fibonacci(n, memo = []) {
  if (memo[n] !== undefined) return memo[n]
  if(n === 0) return 0
  if(n === 1) return 1

  const res = fibonacci(n-1, memo) + fibonacci(n-2, memo)
  memo[n] = res
  return  res
}

// console.log(fibonacci(6)); // 8

// console.time("FIB")
// console.log(fibonacci(40)); // 102334155 - takes 20 ms
// console.timeEnd("FIB")

// console.time("FIB")
// console.log(fibonacci(42)); // 267914296 - takes 21.6 ms
// console.timeEnd("FIB")

// console.time("FIB")
// console.log(fibonacci(45)); // 1134903170 - takes 22.9 ms
// console.timeEnd("FIB")

console.time("FIB2")
console.log(fibonacci(400)); // 1.760236806450138e+83 - takes 22 ms
console.timeEnd("FIB2")


/**
 * BIG O
 * 
 * O(n)
 * 
 * !Але треба пам'ятати що рекурсія має свої обмеження тоб на виклику fibonacci(1_000_000) буде maximum call stack error
 */

