
// Fibonacci sequence 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610
function fibonacci(n) {
  if(n === 0) return 0
  if(n === 1) return 1

  return fibonacci(n-1) + fibonacci(n-2)
}

// console.log(fibonacci(6)); // 8

// console.time("FIB")
// console.log(fibonacci(40)); // 102334155 - takes 2 sec
// console.timeEnd("FIB")

// console.time("FIB")
// console.log(fibonacci(42)); // 267914296 - takes 5.6 sec
// console.timeEnd("FIB")

// console.time("FIB")
// console.log(fibonacci(45)); // 1134903170 - takes 22.7 sec
// console.timeEnd("FIB")


/**
 * BIG O
 * 
 * O(2^n), технічно це 1.6^n, але все одно, це жахлива складність, основна проблема,
 * що повторно виконуються обрахунки які вже були зроблені. Функція повертає fib(n-1) + fib(n-2)
 * 
 *             
 *                                                                    fib(8)                    
 *                                                   
 *                                  f(7)                                 +                                         f(6)                 
 *                                             
 *                f(6)               +            f(5)                   +                      f(5)                +             f(4)
 *                          
 *              f(5)  +   f(4)       +      f(4)   +    f(3)             +                f(4)    +   f(3)          +          f(3    +     f(2)    
 *          
 *         f(4)+f(3)  + f(3)+f(2)    +     f(3)+f(2) +  f(2)+f(1)        +            f(3)+f(2)  + f(2)+f(1)        +        f(2)+f(1) +  f(1)+f(0)
 * 
 *    f(3)+f(2) f(2)+f(1) .......
 * 
 * Можна побачити що
 * f(6) обраховано 2 рази
 * f(5) обраховано 3 рази
 * f(4) обраховано 5 рази
 * f(3) обраховано 7 рази
 *  
 * І чим більше число ми шукаємо тим більше додаткових обрахунків будемо робити
 * 
 * Цих повторних обрахунків можна уникнути роблячи перевірку через цикл
 * 
 * function fibonacciWithLoop(n) {
 *  const fib = [0,1,1]
 *  for(let i = 3; i<n;i++) {
 *   fib[i] = fib[i-1] +fib[i-2]
 *  }
 * 
 *  return fib[n-1]
 * }
 * 
 * Або через мемоізацію
 * 
 */            





