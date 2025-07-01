/**
 * ЯК ПРАЦЮЮТЬ БІТОВІ ОПЕРАТОРИ
 * У JS біти зазвичай представлені у Unit32Array, для прикладу
 * тут я використовую Unit8Array, але варто розуміти що у
 * браузері цифра 5 буде мати вигляд 00000000000000000000000000000101
 *
 *
 * left shift (<<)
 * Зміщає біти вліво і повертає number або BigInt, який є числовим
 * представленням отриманих бітів після зміщення. Зміщені біти зникають,
 * а нові (нулі) додаються до лівого краю
 * a = 5 // 00000101
 * b = 2 // 00000001
 * a << b // 00010100 => 2^4 + 2^2 = 20
 * Як бачимо число 5 змістилося на 2 біти вліво і цим самим утворило 20
 *
 * Цікавий факт, якщо зміщати число 1 то отримаємо теж саме що піднесення 2 до степеня
 * a = 1 // 00000001
 * b = 3 // 00000011
 * a << b // 00001000 => 2^3 =8
 *
 * 1 << 5 => 00100000 => 2^5 = 32
 *
 *
 *
 *
 * right shift (>>)
 * Зміщає біти вправо і повертає number або BigInt, який є числовим
 * представленням отриманих бітів після зміщення. Зміщені біти зникають,
 * а нові (копії останнього лівого біта) додаються до лівого краю
 * a = 5 // 00000101
 * b = 2 // 00000001
 * a >> b // 00000001 => 2^0 = 1
 *
 * c = -5; // 11111011
 * c >> 2 // 11111110 => у десятковій системі це -2
 *
 *
 *
 *
 * unsigned right shift (>>>)
 * Зміщає біти вправо і повертає number або BigInt, який є числовим
 * представленням отриманих бітів після зміщення. Зміщені біти зникають,
 * а нові (нулі) додаються до лівого краю
 * a = 5 // 00000101
 * b = 2 // 00000001
 * a >> b // 00000001 => 2^0 = 1
 *
 * c = -5; // 11111011
 * c >> 2 // 00111110 => 2^5 + 2^4 + 2^3 + 2^2 + 2^1 = 62
 * Тут важливо зазначити що у JS за замовченням бітові оператори працюють з Unit32Array, тож у браузері
 * це буде виглядати так. В попередніх прикладах відповідь була однакова, а тут буде відрізнятися,
 * тому я на цьому ще раз наголошую
 * b = 2; //  00000000000000000000000000000010
 * c = -5; //  11111111111111111111111111111011
 * a >>> b // 00111111111111111111111111111110 => 1073741822
 *
 *
 *
 *
 * right shift assignment (>>=)
 * Зробить right shift (>>=), а потім отримане значення присвоїть лівому операнду
 * a = 5 // 00000101
 * b = 2 // 00000001
 * a >>= b // 00000001 => 2^0 = 1
 * Тепер a = 1
 *
 *
 *
 *
 * bitwise AND (&)
 * повертає number або BigInt яке є числовим приставленням комірки у якої для обох операндів стоять 1
 * a = 5 // 00000101
 * b = 2 // 00000001
 * a & b // 00000001 => 2^0 = 1 (Бо 1 співпадає тільки для 2^0)
 *
 * c = 4 // 00000100
 * a & c // 00000100 => 2^2 = 4 (Бо 1 співпадає тільки для 2^2)
 *
 * d = 5 // 00000101
 * a & d // 00000101 => 2^2 + 2^0 = 5 (Бо 1 співпадає для 2^2 і 2^0)
 *
 *
 *
 */

class HyperLogLogAdvanced {
  /**
   * @param {number} precision - Точність алгоритму. Визначає кількість регістрів.
   * Рекомендовані значення: від 4 до 16. Чим вище точність, тим більше пам'яті потрібно, але тим менша похибка.
   */
  constructor(precision = 10) {
    if (precision < 4 || precision > 16) {
      throw new Error("Precision must be between 4 and 16.");
    }
    this.precision = precision;
    this.numRegisters = 2 ** precision; // 2^precision, те саме можна зроби і через left shift 1 << precision
    this.registers = new Uint8Array(this.numRegisters).fill(0); // Ініціалізуємо регістри нулями
    this.alpha = this._getAlpha(this.numRegisters);
  }

  /**
   * Асинхронна хеш-функція SHA-256 за допомогою Web Crypto API.
   * Генерує 32-бітний хеш з перших 4 байтів SHA-256 виходу.
   * @param {string} str - Вхідний рядок для хешування.
   * @returns {Promise<number>} - Promise, який розрішується 32-бітним хеш-значенням.
   */
  async _hashSHA256(str) {
    const textEncoder = new TextEncoder();
    const data = textEncoder.encode(str);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = new Uint32Array(hashBuffer); // Перетворюємо на масив 32-бітних чисел

    // Беремо перший 32-бітний блок хешу.
    // Це достатньо для рівномірного розподілу в контексті HLL.
    return hashArray[0];
  }

  /**
   * Обчислює кількість початкових нульових бітів (leading zero bits) у хеші.
   * @param {number} hash - Хеш-значення.
   * @returns {number} - Кількість початкових нульових бітів.
   */
  _countLeadingZeros(hash) {
    return Math.clz32(hash); 
  }

  /**
   * Додає елемент до HyperLogLog. Ця функція асинхронна!
   * @param {any} element - Елемент, який потрібно додати. Буде перетворено на рядок.
   */
  async add(element) {
    const elementStr = String(element);
    const hash = await this._hashSHA256(elementStr); // hash - це елемент Uint32Array

    // Визначаємо індекс регістра (перші 'precision' бітів хешу)
    const registerIndex = hash >>> (32 - this.precision);

    // Обчислюємо ранг (кількість початкових нульових бітів у решті хешу + 1)
    // Ми беремо останні (32 - precision) бітів хешу
    const remainingHash = hash << this.precision; // Зсуваємо, щоб відкинути біти, які пішли на індекс
    const rank = this._countLeadingZeros(remainingHash) + 1;

    // Оновлюємо регістр, якщо новий ранг більший
    this.registers[registerIndex] = Math.max(
      this.registers[registerIndex],
      rank
    );
  }

  /**
   * Обчислює константу alpha, необхідну для формули оцінки.
   * @param {number} m - Кількість регістрів.
   * @returns {number} - Значення alpha.
   */
  _getAlpha(m) {
    switch (m) {
      case 16:
        return 0.673;
      case 32:
        return 0.697;
      case 64:
        return 0.709;
      default:
        // Для m >= 128 (коли precision >= 7)
        return 0.7213 / (1 + 1.079 / m);
    }
  }

  /**
   * Оцінює кардинальність (кількість унікальних елементів).
   * @returns {number} - Оцінка кардинальності.
   */
  count() {
    let sumReciprocals = 0;
    let zeroRegisters = 0;

    // Рахуємо гармонійне середнє і нулі у регістрах
    for (let i = 0; i < this.numRegisters; i++) {
      sumReciprocals += Math.pow(2, -this.registers[i]);
      if (this.registers[i] === 0) {
        zeroRegisters++;
      }
    }

    const estimate =
      (this.alpha * this.numRegisters * this.numRegisters) / sumReciprocals;

    // Застосовуємо корекцію для малих значень (small range correction)
    if (estimate <= 2.5 * this.numRegisters && zeroRegisters !== 0) {
      // Лінійна регресія для малих значень
      return this.numRegisters * Math.log(this.numRegisters / zeroRegisters);
    }

    // Застосовуємо корекцію для великих значень (large range correction)
    // Ми використовуємо 32-бітний хеш, тому 2^32
    if (estimate > (1 / 30) * Math.pow(2, 32)) {
      return -Math.pow(2, 32) * Math.log(1 - estimate / Math.pow(2, 32));
    }

    return estimate;
  }
}

const hyperLogLog = new HyperLogLogAdvanced(10);
async function run() {
//   await hyperLogLog.add("A");
//   await hyperLogLog.add("A");
//   await hyperLogLog.add("b");
//   await hyperLogLog.add("c");
//   await hyperLogLog.add("d");
//   await hyperLogLog.add("e");
//   await hyperLogLog.add("A");

  for(let i=0; i<=100_000; i++) {
    // if(i%2 == 0) {
    //   await hyperLogLog.add(i)
    // } else {
    //   await hyperLogLog.add(i - 1)
    // }
     await hyperLogLog.add(i)
  }
  console.log(hyperLogLog.count());
}

run();
