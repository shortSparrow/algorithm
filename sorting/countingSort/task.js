/**
 * Задача
 *
 * Опишіть алгоритм, який, отримуючи n цілих чисел у діапазоні від 0 до k, попередньо опрацьовує
 * входові дані, а тоді відповідає за час О(1) на будь-який запит стосовно того, скільки з цих n
 * чисел потрапило в діапазон [а .. b]. Алгоритм повинен використовувати час O(n + k) на попереднє опрацювання.
 *
 */

class CalculateCountInRange {
  countArray = [];
  infoArray = [];
  maxValue = null;

  constructor(inputArr) {
    this.maxValue = Math.max(...inputArr);
    this.countArray = new Array(this.maxValue + 1).fill(0);

    this._prepare(inputArr);
  }

  _prepare(inputArr) {

    /**
     * Створюємо масив де індекс вказує на число яке опрацьовуємо, а значення
     * це скільки таке число зустрічається у вхідному масиві
     * 
     * Вхідний масив [0,0,2,2,3,3,3,5]
     *  0,1,2,3,4,5
     * [2,0,2,3,0,1] (2-нулі, 0-одиниць, 3-трійки, 0-четвірок, 1-п'ятірка)
     */


    for (let i = 0; i < inputArr.length; i++) {
      this.countArray[inputArr[i]] += 1;
    }
    
    /**
     * Створюємо масив infoArray, який бере за основу countArray і модифікує його так,
     * щоб кожен індекс містив інформацію скільки чисел перед ним і з ним включно
     * 
     * Маємо вхідний масив [0, 0, 2, 2, 3, 3, 3, 5]
     * countArray = [2, 0, 2, 3, 0, 1]
     * 
     * infoArray =  [2, 2, 4, 7, 7, 8] 
     * (перед нулем (індекс 0) включно всього 2 числа)
     * (перед одиницею (індекс 1) включно всього 2 числа - бо одиниць немає)
     * (перед двійкою (індекс 2) включно всього 4 числа)
     * (перед трійкою (індекс 3) включно всього 7 чисел)
     * (перед четвіркою (індекс 4) включно всього 7 чисел - бо четвірок немає)
     * (перед п'ятіркою (індекс 5) включно всього 8 чисел)
     * 
     */
    this.infoArray[0] = this.countArray[0]
    for (let i = 1; i < this.countArray.length; i++) {
      this.infoArray[i] = this.countArray[i] + this.infoArray[i - 1]
    }
  }

  getCount(range) {
    let [start, end] = range

    if(end > this.maxValue) {
      end = this.maxValue
    }

    if(start < 0) {
      start = 0
    }

    /**
     * this.infoArray[end] - this.infoArray[start] дасть інформацію скільки чисел міститься
     * між edt і start (не включаючи start)
     * 
     * (this.infoArray[start] - valueBeforeStart) - дасть інформацію скільки міститься чисел для start 
     */
    const valueBeforeStart = this.infoArray[start - 1] ?? 0
    
    return (this.infoArray[start] - valueBeforeStart) + (this.infoArray[end] - this.infoArray[start])

  }
}

// calculateCountInRange = new CalculateCountInRange([2, 5, 3, 0, 2, 3, 0, 3]);
calculateCountInRange = new CalculateCountInRange([0, 0, 2, 2, 3, 3, 3, 5]);

console.log(calculateCountInRange.getCount([0, 2])); // 4 елементи
console.log(calculateCountInRange.getCount([1, 2])); // 2 елементи
console.log(calculateCountInRange.getCount([2, 3])); // 5 елементів
console.log(calculateCountInRange.getCount([0, 3])); // 7 елементів
console.log(calculateCountInRange.getCount([0, 5])); // 8 елементів
console.log(calculateCountInRange.getCount([0, 25])); // 8 елементів
console.log(calculateCountInRange.getCount([-1, 2])); // 4 елементи
