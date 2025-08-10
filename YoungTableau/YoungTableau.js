/**
 *
 * Таблиця Юнга
 * Це спеціальний двовимірний масив у якому значення відсортовані так, що
 * рядок починається з найменшого елемента (лівий край), і збільшується у напрямку правого краю,
 * і одночасно те саме відбувається зі стовпцями (збільшуються від верху до низу)
 *
 *  Ось приклад:
 *
 *    1   5   10   12
 *    2   6   11   ∞
 *    3   9   ∞    ∞
 *    4   ∞   ∞    ∞
 *
 *
 * Діаграма Юнга — це візуальне представлення розбиття числа. У ній кожен наступний рядок не довший за попередній,
 * і заповнення відбувається з верхнього лівого кута.
 * 
 */

class YoungTableau {
  constructor(m, n) {
    this.m = m;
    this.n = n;
    this.table = new Array(m).fill(null).map(() => new Array(n).fill(Infinity));
    // this.table = Array.from({ length: m }, () => Array(n).fill(Infinity));

    // size - це кількість вставлених елементів (саме елементів, не Infinity)
    this.size = 0;
  }

  // робить bubleUp для останнього елемента, тобто він вспливає на своє місце
  /**
   *
   * Поточний елемент: Почніть з елемента, який ви щойно вставили (this.table[row][col]).
   * Порівняння з сусідами: На кожному кроці порівнюйте поточний елемент з його сусідами:
   *  Елемент зверху (this.table[row-1][col]).
   *  Елемент зліва (this.table[row][col-1]).
   * Вибір більшого сусіда: З двох цих сусідів (зверху та зліва) виберіть більший. Якщо один із них не існує
   * (наприклад, ви на першому рядку), вважайте його нескінченно малим.
   *
   * Умова обміну: Якщо поточний елемент менший, ніж цей більший сусід, то поміняйте їх місцями.
   *
   * Рекурсію можна замінити циклом while, але я залишу так, ьо так наочніше
   */
  minHeapfy(row, col) {
    const val = this.table[row][col];
    const top = row > 0 ? this.table[row - 1][col] : -Infinity;
    const left = col > 0 ? this.table[row][col - 1] : -Infinity;

    if (val >= Math.max(top, left)) {
      return;
    }

    let maxRow = null;
    let maxCol = null;

    // Визначаємо, який з батьків є більшим (включаючи випадок рівності)
    if (top > left) {
      maxRow = row - 1;
      maxCol = col;
    } else {
      // Випадок, коли left > top або left == top
      maxRow = row;
      maxCol = col - 1;
    }

    // Якщо val < Math.max(top, left), то val точно буде меншим, ніж this.table[maxRow][maxCol]
    // Тож перевірка if (val < this.table[maxRow][maxCol]) не потрібна
    const temp = this.table[maxRow][maxCol];
    this.table[maxRow][maxCol] = val;
    this.table[row][col] = temp;
    this.minHeapfy(maxRow, maxCol);
  }

  /**
   * Вставляємо нове значення у першу вільну комірку - вона знаходиться у правому нижньому куті
   *
   * Щоб дізнатися, на якому рядку ви зараз, вам потрібно порахувати, скільки повних рядків ви вже заповнили.
   * Кількість повних рядків можна дізнатися, поділивши загальну кількість заповнених елементів (size)
   * на довжину рядка (тобто ширину таблиці, n).
   * Math.floor(size / n)
   *
   * Щоб дізнатися, на якому стовпці ви зараз, вам потрібно порахувати, скільки елементів ви вже заповнили в поточному,
   * неповному рядку. Це можна дізнатися, взявши остачу від ділення загальної кількості елементів (size) на довжину рядка (n).
   * Це логічно, бо якби рядок був би заповнений повністю то остача від ділення була б 0, а якщо остача не 0 то це власне
   * скільки і не вистачає до заповнення рядка
   * size % n
   *
   * */
  insert(value) {
    const row = Math.floor(this.size / this.n);
    const col = this.size % this.n;

    this.table[row][col] = value;
    this.minHeapfy(row, col);
    this.size++;
  }

  extractMin() {
    // Повертаємо null, якщо таблиця порожня
    if (this.size === 0) {
      return null;
    }

    const min = this.table[0][0];
    this.size--;

    const row = Math.floor(this.size / this.n);
    const col = this.size % this.n;
    this.table[0][0] = this.table[row][col];
    this.table[row][col] = Infinity;
    this.__maxHeapfy(0, 0);

    return min;
  }

  __maxHeapfy(row = 0, col = 0) {
    // Встановлюємо значення за замовчуванням для виходу за межі таблиці
    const bottom = row + 1 < this.m ? this.table[row + 1][col] : Infinity;
    const right = col + 1 < this.n ? this.table[row][col + 1] : Infinity;
    const val = this.table[row][col];

    if (val <= Math.min(bottom, right)) {
      return;
    }

    let minRow = null;
    let minCol = null;

    // Визначаємо, який з нащадків є меншим (включаючи випадок рівності)
    if (bottom < right) {
      minRow = row + 1;
      minCol = col;
    } else {
      // Випадок, коли right < bottom або right == bottom
      minRow = row;
      minCol = col + 1;
    }

    // Якщо val > Math.min(bottom, right), то val точно буде більшим, ніж this.table[minRow][minCol]
    // ТОму перевірка if (val > this.table[minRow][minCol]) не потрібна
    const temp = this.table[minRow][minCol];
    this.table[minRow][minCol] = val;
    this.table[row][col] = temp;
    this.__maxHeapfy(minRow, minCol);
  }

  /**
   * Можна зробити звичайний перебір який працює за O(m*n)
   * але можна використати властивість таблиці Юнга і зробити пошук за O(m+n)
   */
  find(target) {
    let row = 0;
    let col = this.n - 1;

    while (row < this.m && col >= 0) {
      const currentValue = this.table[row][col];

      if (currentValue === target) {
        return true;
      }

      if (currentValue > target) {
        // Якщо поточний елемент більший за target, то переходимо до наступного елемента в цьому ж рядку
        col--;
      } else {
        // Якщо поточний елемент менший за target, то переходимо до наступного рядка. (Якщо він більший за target - то
        // всі елементи в цьому рядку будуть більшими за target, тож ігноруємо їх
        row++;
      }
    }

    return false;
  }
}

const youngTableau = new YoungTableau(4, 4);

youngTableau.insert(4);
youngTableau.insert(9);
youngTableau.insert(3);
youngTableau.insert(11);
youngTableau.insert(2);
youngTableau.insert(6);
youngTableau.insert(12);
youngTableau.insert(10);
youngTableau.insert(1);
youngTableau.insert(5);

console.log("youngTableau.table: ", youngTableau.table);
youngTableau.extractMin();
console.log("youngTableau.table: ", youngTableau.table);

console.log("Does tableau has 1: ", youngTableau.find(1));

/**
 * Складність:
 * 
 * Insert має O(m+n)
 * Бо у найгіршому випадку, елемент може пройти вздовж усього рядка, а потім вздовж усього стовпця.
 * Загальна кількість таких кроків буде пропорційна сумі кількості рядків (m) та стовпців (n)
 *
 * extractMin має O(m+n)
 * Найменший елемент завжди у лівому верхньому куті, дістаємо його і на його місце вставляємо останній елемент,
 * а потім робимо зворотню операцію до bubbleUp (minHeapfy), а саме bubbleDown (maxHeapfy), тобто опускаємо щойно
 * оновлений перший елемент вниз доки він не знайде своє місце
 *
 * find має O(m+n)
 * Бо нам не треба перевіряти всі комірки, оскільки якщо поточний елемент (починаємо з правого верхнього кута) буде більший
 * за значення яке ми шукаємо то всі нижні елементи у цій колонці випадають, адже вони будуть більші ніж поточний елемент,
 * бо вони розташовані у порядку зростання
 * 
 */
