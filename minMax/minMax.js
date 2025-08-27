/**
 * Уявимо що нам треба знайти мінімум у масиві arr, це можна зробити за O(n)
 * Так само якщо нам треба знайти максимум у масиві.
 * Це логічно, адже в обох випадках нам треба перевірити кожен елемент у масиві
 *
 * Тож якщо нам треба знайти одночасно і max і min то це можна зробити за O(2n)
 * Але насправді якщо шукати min і max одночасно то це можна зробити за O(3 n/2)
 * Замість того щоб спочатку опрацьовувати спочатку кожен елемент на min, а потім кожен
 * елемент на max? можна опрацьовувати їх парами.
 * Ми порівнюємо a і b, і якщо a < b то ми порівняємо з поточним min тільки 'a',
 * а 'b' не будемо бо в цьому немає сенсу, адже і так знаємо що 'a' менше за 'b',
 * а 'b' порівняємо з поточним max, а 'a' не будемо бо і так знаємо що 'b' більше
 *
 */

function findMinAndMax(arr) {
  let min = Infinity;
  let max = -Infinity;

  for (let i = 0; i < arr.length; i += 2) {
    let tempMin = null;
    let tempMax = null;
    let current = arr[i];
    let next = arr[i + 1];

    if (next !== undefined) {
      if (current > next) {
        tempMin = next;
        tempMax = current;
      } else {
        tempMin = current;
        tempMax = next;
      }
    } else {
      tempMin = current;
      tempMax = current;
    }

    if (tempMin < min) {
      min = tempMin;
    }

    if (tempMax > max) {
      max = tempMax;
    }
  }

  return [min, max];
}

console.log(findMinAndMax([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]));
