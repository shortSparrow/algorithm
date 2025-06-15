
/**
 * Задача longest Common Substring
 * Дано два рядки символів str1, str2, Потрібно знайти найдовший рядок,
 * який є підрядком (contiguous substring) обох str1 і str2
 * 
 * Приклад
 * Якщо S1 ="ABCDE"
 * Підрядки S1 : "A", "B", "C", "D", "E", "AB", "BC", "CD", "DE", "ABC", "BCD", "CDE", "ABCD", "BCDE", "ABCDE".
 * Але "ACE" не є підрядком, тому що 'A', 'C', 'E' не йдуть підряд.
 * 
 * Тобто у слів "математика" і "кінематика" найдовший спільним підрядком буде "ематика", а для
 * "математика" і "галактика" - "тика"
 * 
 */

function longestCommonSubstring(original_word, compared_word) {
  const dp = new Array(original_word.length + 1)
  .fill(0)
  .map(() => new Array(compared_word.length + 1).fill(0))

  // потрібне тільки для наочності, це не є частиною алгоритму
  const letters = []
  letters.length = Math.max(original_word.length, compared_word.length)

  for(let i=1; i < dp.length; i++) {
    const current_char = original_word[i-1]
    for(j=1; j< dp[i].length; j++) {
      if(current_char == compared_word[j-1]) {
        dp[i][j] = dp[i-1][j-1] + 1
        letters[j-1] = current_char
      }
    }
  }


  console.log(dp)
  console.log(letters)
}


longestCommonSubstring("fish", "fosh")
// longestCommonSubstring("hish", "fish")
// longestCommonSubstring("hish", "vista")

// longestCommonSubstring("fosh", "fish")
// longestCommonSubstring("fosh", "fort")


/**
 * Маємо original_word fish і hish 
 * Спочатку заповнюємо всю матрицю нулями і також в алгоритму додаю рядок і колонку з нулями,
 * але тут для простоти не додаю їх (вони потрібні щоб у першого рядка можна було піти на 1 рядок назад,
 * і так само у кожного першого символу нового рядка можна було піти на 1 крок вліво).
 * 
 * 
 *        f  o  s  h
 *    f   1  0  0  0      
 *    i   0  0  0  0  
 *    s   0  0  1  0
 *    h   0  0  0  2
 *    
 * У f є співпадіння по літерам тож ставимо 1 + значення з комірки на 1 комірку вверх і
 * 1 вліво (по діагоналі вліво вверх) - це 0 (бо її немає).
 * Далі у s є співпадіння, тож так само ставимо 1 + значення з комірки по діагоналі вліво і вверх - це 0,
 * тож сумарно маємо 1.
 * Далі у h є співапдіння, тож ставимо 1 + значення з комірки по діагоналі вліво і вверх - це 1,
 * тож сумарно маємо 2
 * 
 * Тож для fosh і fish найбільший substring - це 2 символи (sh)
 * 
 * 
 */