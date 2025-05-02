
const FIRST_ALPHABET_CHAR_CODE_IN_ENG = 96

function hash(value, maxLength){
  let total = 0

  for(let char of value) {
    const charCode = char.charCodeAt(0)
    let position = charCode - FIRST_ALPHABET_CHAR_CODE_IN_ENG // для того щоб а повертало 1, а z - 26
    /**
     * value % maxLength для того щоб не перейти за межі maxLength. Якщо у мене maxLength = 10, а value = 13 то тоді результат буде 13 % 10 = 3. 
     * Це колізія, бо і 3 % 10 = 3 і 13 % 10 = 3, але для нашого прикладу це прийнятно. 
     * 
     * (total + position) % maxLength -> total тут для того щоб отримати hash для всього рядка, а не тільки для однієї літери
     */
    total = (total + position) % maxLength 
  }

  return total
}


console.log(hash("Hello", 10));
console.log(hash("Hello", 10));
console.log(hash("Hell", 10));
// console.log(hash("a", 10));


function hashV2(value, maxLength){
  let total = 0

  for(let char of value.slice(0, 100)) {
    const charCode = char.charCodeAt(0)
    let position = charCode - FIRST_ALPHABET_CHAR_CODE_IN_ENG // для того щоб а повертало 1, а z - 26
    total = (total + position) % maxLength 
  }

  return total
}


/**
 * Так чи інакше для будь-якої hash функції буде існувати колізія (collision), існує багато способів
 * як це менеджити, але тут ми розглянемо лише 2 з них:\
 *  1. Separate Chaining
 *  2. Linear Probing
 * 
 * 
 * Separate Chaining
 * Використовуючи цей метод ми зберігаємо дані використовуючи інші структури даних (array, linked list, ....)
 *  
 *  Припустимо маємо однаковий hash для двох різних значень
 *  green -> 1
 *  red -> 3
 *  blue -> 3
 *  
 *  збережемо їх у масив -> ["red", "blue"] на індекс 3
 * 
 * [ , "green", , ["red", blue]]
 *  0    1     2        3
 * 
 * 
 * Linear Probing
 * Коли відбувається колізія ми шукаємо наступний вільний слот і записуємо дані у нього
 * 
 *  green -> 1
 *  red -> 3
 *  blue -> 3
 *  pink -> 3
 *  orange -> 3
 * 
 *  Вставляємо red на індекс 3
 *  Хочемо поставити blue на індекс 3, але він зайнятий, а наступний вільний 4, тож ставимо на нього
 *  Хочемо поставити pink на індекс 3, але він зайнятий, а наступний вільний 5, тож ставимо на нього
 *  Хочемо поставити orange на індекс 3, але він зайнятий, і всі індекси до кінця зайняті, тож поставимо на 0 індекс
 * 
 * 
 * ["orange" , "green", , "red", "blue", "pink"]
 *      0        1     2    3       4       5
 * 
 * 
 * 
 * ЯК ДІСТАТИ ДАНІ
 * 
 * ["orange", "green", , "red", "blue", "pink"]
 *     0        1     2    3       4       5
 * Припустимо я хочу дістати "pink", я знаю що його hash = 3
 * Отже я йду на індекс 3 і бачу що значення red, а не pink, тоді я іду до наступної позиції і дивлюся чи значення дорівнює pink,
 * і так я дійду аж до індексу 5, це і є значення яке я шукав
 *  
 * 
 * 
 * 
 * 
 */