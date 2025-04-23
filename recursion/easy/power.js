function power(number, n) {
    if (n == 0) {
        return 1
    }

    if (n == 1) {
        return number
    }
    return number * power(number, n - 1)
}

console.log(power(3,0)); // 0
console.log(power(3,1)); // 3
console.log(power(3,2)); // 9
console.log(power(3,3)); // 27
