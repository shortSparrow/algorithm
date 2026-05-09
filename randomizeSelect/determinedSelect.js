/**
 * Вибір за лінійний час очікування
 * Уявімо, що у вас є велика коробка з іграшками різних розмірів.
 * Ваше завдання — знайти іграшку, яка, наприклад, є третьою за величиною.
 * Це і є задача вибору: знайти i-й найменший елемент у масиві.
 *
 * По суті це покращений варіант randomizedSelect, адже тепер select не
 * залежить від випадкового значення, вона детермінована. І тепер
 * час вибору n-го елементу завжди O(n), навіть у найгіршому випадку
 *
 *
 *
 *
 * Детермінована функція select
 *
 * Алгоритм SELECT визначає і-й найменший з n > 1 різних елементів входового
 * масиву, виконуючи такі кроки. (Якщо n = 1, то SELECT просто повертає входове
 * значення як і-те найменше.)
 *
 * 1. Розділити n елементів вхідного масиву на [n/5] груп по 5 елементів кожна і
 * щонайбільше одну групу, утворену n mod 5 елементами, що залишилися.
 *
 * 2. Знайти медіану кожної з [n/5] груп, спочатку впорядкувавши елементи кожної
 * групи (яких є не більше ніж 5) сортуванням вставлянням, а потім вибравши
 * медіану з упорядкованого списку елементів групи.
 *
 * 3. Використати SELECT рекурсивно для знаходження медіани х з [n/5] медіан,
 * знайдених на кроці 2. (Якщо число медіан парне, то за ранішою домовленістю
 * х це нижня медіана.)
 *
 * 4. Розбити вхідний масив довкола медіани медіан х з використанням зміненого
 * варіанту PARTITION. Нехай k на одиницю більше за число елементів у нижній
 * частині розбиття, тоді x - k-й найменший елемент і у верхній частині розбиття
 * є n - k елементів.
 *
 * 5. Якщо і=k, то повернути х. Інакше, використати SELECT рекурсивно для
 * знаходження і-го найменшого елемента в нижній частині при і<k, або (i-k)-го
 * найменшого елемента у верхній частині при і > k.
 *
 * 
 * 
 * Така реалізація гарантує що у partition дані будуть розбиватися найкращим
 * чином і ми ніколи не отримаємо складності O(n^2).  
 * Розумний вибір опорного елемента, який гарантує, що розбиття завжди буде хорошим.
 * Він вибирає "медіану медіан" як опорний елемент.
 * 
 */

/**
 * Детермінований алгоритм SELECT, який гарантує O(n) у найгіршому випадку.
 */
function determinedSelect(arr, left, right, i) {
  if (left === right) {
    return arr[left];
  }

  // 1. Розділити n елементів на групи по 5.
  const medians = [];
  for (let j = left; j <= right; j += 5) {
    const end = Math.min(j + 4, right);
    // 2. Знайти медіану кожної групи по 5.
    const median = findMedianOfFive(arr, j, end);
    medians.push(median);
  }

  // 3. Рекурсивно знайти медіану медіан. Це наш pivot.
  let pivot;
  if (medians.length <= 5) {
    pivot = findMedianOfFive(medians, 0, medians.length - 1);
  } else {
    pivot = determinedSelect(
      medians,
      0,
      medians.length - 1,
      Math.floor(medians.length / 2)
    );
  }

  // Знайти індекс цього pivot в оригінальному масиві
  let pivotIndex;
  for (let k = left; k <= right; k++) {
    if (arr[k] === pivot) {
      pivotIndex = k;
      break;
    }
  }

  // 4. Розбити масив навколо pivot.
  const q = partition(arr, left, right, pivotIndex);
  const k = q - left + 1;

  // 5. Рекурсивний виклик або повернення результату.
  if (i === k) {
    return arr[q];
  } else if (i < k) {
    return determinedSelect(arr, left, q - 1, i);
  } else {
    return determinedSelect(arr, q + 1, right, i - k);
  }
}

/**
 * Функція для пошуку медіани в групі, розмір якої не більше 5.
 * Використовує просте сортування.
 */
function findMedianOfFive(arr, left, right) {
  const subArr = [];
  for (let i = left; i <= right; i++) {
    subArr.push(arr[i]);
  }
  subArr.sort((a, b) => a - b); // Тут стандартне сортування, але можна і напряму використати insertionSort
  return subArr[Math.floor(subArr.length / 2)];
}

/**
 * Функція, що виконує partition, але з фіксованим опорним елементом.
 * Вона переміщує опорний елемент в кінець, а потім робить розбиття.
 * 
 * Ця реалізація дуже схоже на реалізацію з randomizedSelect.js, там
 * можна подивитися детальніше на логіку роботи
 */
function partition(arr, left, right, pivotIndex) {
  const pivotValue = arr[pivotIndex];
  swap(arr, pivotIndex, right);
  let storeIndex = left;
  for (let i = left; i < right; i++) {
    if (arr[i] < pivotValue) {
      swap(arr, i, storeIndex);
      storeIndex++;
    }
  }
  swap(arr, right, storeIndex);
  return storeIndex;
}

/**
 * Функція для обміну елементів у масиві.
 */
function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// const arr = [1, -1, 1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
// console.log(determinedSelect(arr, 0, arr.length - 1, 3)); // Шукаю 3-тє найменше число - 1

// const arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
// console.log(determinedSelect(arr2, 0, arr2.length - 1, 3)); // Шукаю 3-тє найменше число - 3
