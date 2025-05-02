/**
 * Hash table використовує конструкцію key:value
 */

const WEIRD_PRIME = 31;
const FIRST_ALPHABET_CHAR_CODE_IN_ENG = 96;

// Для колізій використовуємо підхід Separate Chaining
class HashTable {
  constructor(size) {
    this.keyMap = new Array(size);
  }

  _hash(key) {
    let total = 0;
    const maxLength = this.keyMap.length;

    for (let char of key) {
      const charCode = char.charCodeAt(0);
      let position = charCode - FIRST_ALPHABET_CHAR_CODE_IN_ENG; // для того щоб а повертало 1, а z - 26
      total = (total * WEIRD_PRIME + position) % maxLength;
    }

    return total;
  }

  set(key, value) {
    const hashedKey = this._hash(key);
    if (this.keyMap[hashedKey] === undefined) {
      this.keyMap[hashedKey] = [[key, value]];
    } else {
      const valueForThisHash = this.keyMap[hashedKey];

      // if already exist value replace it
      for (let i = 0; i < valueForThisHash.length; i++) {
        if (valueForThisHash[i][0] === key) {
          valueForThisHash[i][1] = value;
          break;
        }

        if (i === valueForThisHash.length - 1) {
          this.keyMap[hashedKey].push([key, value]);
        }
      }
    }
  }

  get(key) {
    const hashedKey = this._hash(key);
    const potentialValue = this.keyMap[hashedKey];

    if (potentialValue === undefined) {
      return undefined;
    }

    // potentialValue is array of arrays
    for (let item of potentialValue) {
      if (item[0] === key) {
        return item[1];
      }
    }

    return undefined;
  }

  keys() {
    const keys = [];
    for (let item of this.keyMap) {
      if (item === undefined) continue;
      for (let subItem of item) {
        keys.push(subItem[0]);
      }
    }

    return keys;
  }

  values() {
    const keys = [];
    for (let item of this.keyMap) {
      if (item === undefined) continue;
      for (let subItem of item) {
        if (!keys.includes(subItem[1])) {
          keys.push(subItem[1]);
        }
      }
    }

    return keys;
  }
}

const hashTable = new HashTable(4);

hashTable.set("hello world", [1, 2]);
hashTable.set("dogs", "are cool");
hashTable.set("cats", "are fine"); // the same hash
hashTable.set("i love", "pizza"); // the same hash
hashTable.set("i love", "OO"); // replace previous value
hashTable.set("new value", "OO");

console.log(JSON.stringify(hashTable.keyMap)); // [[ ["hello world",[1,2]] ], [ ["cats","are fine"],["i love","OO"],["new value","OO"] ], null, [ ["dogs","are cool"]] ]

// console.log(hashTable.get('hello world'))
// console.log(hashTable.get('cats'))
// console.log(hashTable.get('i love'))

// console.log(hashTable.keys())
// console.log(hashTable.values());



/**
 * 
 * BIG O
 * 
 * Average cases
 * Insert O(1)
 * Deletion O(1)
 * Access O(1)
 * 
 * 
 * Worst case
 * коли у нас погана функція хешування, або розмір масива в якому зберігаємо дуже малий і для
 * всіх лементів хеш функція поверне 0 індекс то тоді складність буде O(n) бо всі дані будуть
 * збережені в одній комірці і я буду по ним проходитися циклом, але це швидше виключення ніж
 * реальний випадок
 */