/**
 * Це рішення є більш простим для розуміння, бо не містить бітових операторів, як hyperLogLogAdvance,
 * але це рішення лише для демонстрації, бо тут ми робимо такі дивні речі як перетворюємо біти
 * у рядок 0 і 1 щоб було легше їх читати і розуміти що відбувається
 * 
 */


// Функія для пошуку гармонійного середнього.
// Тут використовується не звичайне гармонійне середнє, тобто формула n/( 1/x1 + 1/x2 + ... ) 
// не підійде, потрібно використати (сума 2^-Mj)
function _harmonicMean(registers) {
  let sum = 0;
  for (let i = 0; i < registers.length; i++) {
    // У формулі використовується 2 у степені (-значення_регістра)
    sum += Math.pow(2, -registers[i]);
  }

  return sum;
}

function _countStringBits(str) {
  // 001110001 -> 113
  return parseInt(str, 2)
}

function _countZerosAtStart(str) {
  let counter = 0;
  for (num of str) {
    if (num === "0") {
      counter++;
    } else {
      break;
    }
  }

  return counter;
}

async function getHashAsBinaryString(str) {
  // 1. Кодуємо рядок в байти (UTF-8)
  // data - Unit8Array(1)
  const data = new TextEncoder().encode(str);

  // 2. Обчислюємо хеш за допомогою Web Crypto API. Повертає ArrayBuffer.
  // hashBuffer - ArrayBuffer(32) - це Unit32Array який повністю заповнений
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  // 3. Створюємо "вид" на ці байти, щоб їх було зручно читати
  // hashArray - [3505035861, 2044028034, 1896429917, 2869288332,...] це числові представлення бітів у десятковій системі
  // Наприклад 65 = 01000001 => 2^0 + 2^6 = 65
  // Наприклад 3505035861 => 11010000111010101001101001010101 => 2^31 + 2^30 + ... 2^0 = 3505035861
  const hashArray = new Uint32Array(hashBuffer);

  // 4. Кожен байт (число від 0 до 255) перетворюємо в рядок з 32 біт
  // .padStart(32, '0') додає нулі на початку, якщо бінарне число коротше 32 символів
  const binaryString = hashArray[0].toString(2).padStart(32, '0');

  return binaryString;
}

class HyperLogLogNaive {
  // precision це те, скільки бітів ми використаємо для регістрів
  constructor(precision = 10) {
    this.precision = precision;
    this.registers = new Uint8Array(Math.pow(2, precision)).fill(0); // 2^precision байтів заповнені 0
  }

  async add(value) {
    const hash = await getHashAsBinaryString(value);

    // Я беру перші this.precision елементів (нехай буде 10), тож у мене буде 2^10 = 1024 кошиків(регістрів)
    // решта лишається для перевірки кількості 0 на початку
    const firstNItems = hash.slice(0, this.precision);
    const register = _countStringBits(firstNItems);
    const rest = hash.slice(this.precision)
    const zerosCount = _countZerosAtStart(rest);
    this.registers[register] = Math.max(this.registers[register], zerosCount);
  }

  count() {
    const NUM_REGISTERS = this.registers.length;
    const alpha_m = 0.7213 / (1 + 1.079 / NUM_REGISTERS); // Як визначити спеціальну константу

    // Загальна формула HLL: alpha_m * m^2 / (сума 2^-Mj)
    const estimatedCardinality =
      (alpha_m * NUM_REGISTERS * NUM_REGISTERS) / _harmonicMean(this.registers);

    let zeroRegisters = 0;
    for (let i = 0; i < NUM_REGISTERS; i++) {
      if (this.registers[i] === 0) {
        zeroRegisters++;
      }
    }

    // --- Корекція для малих значень ---
    if (estimatedCardinality < 2.5 * NUM_REGISTERS && zeroRegisters > 0) {
      return NUM_REGISTERS * Math.log(NUM_REGISTERS / zeroRegisters);
    }

    // --- Корекція для великих значень ---
    if (estimatedCardinality > (1 / 30) * Math.pow(2, 32)) {
      return -Math.pow(2, 32) * Math.log(1 - estimatedCardinality / Math.pow(2, 32))
    }

    return estimatedCardinality;
  }
}

const hyperLogLog = new HyperLogLogNaive();
async function run() {
  // await hyperLogLog.add("A");
  // await hyperLogLog.add("A");
  // await hyperLogLog.add("b");
  // await hyperLogLog.add("c");
  // await hyperLogLog.add("d");
  // await hyperLogLog.add("e");
  // await hyperLogLog.add("A");

  for(let i=0; i<=10_000; i++) {
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
