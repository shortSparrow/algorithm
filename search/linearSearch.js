
function linearSearch(arr, value) {
    for(let i = 0; i< arr.length; i++) {
        if(arr[i] == value) {
            return i
        }
    }

    return -1
}


console.log(linearSearch([3,5,1,5,99,0,31], 0));
console.log(linearSearch(["hel", "op", "q", "Kyiv", 'London', 'Mexico', 'UK'], "Kyiv"));

