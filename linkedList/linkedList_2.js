
class Node {
  constructor(val) {
    this.val = val
    this.next = null
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  push(val) {
    this.length++
    const newNode = new Node(val)
    if(this.head === null) {
      this.head = newNode
      this.tail = this.head // this.tail це посилання на this.head тобто коли ми змінимо значення у this.tail це змінить значення у this.head і навпаки
      return this
    } else {
      this.tail.next = newNode // Важливо розуміти що тут працюють посилання, пам'ятаємо що на першій ітерації у нас this.tail = this.head, тож this.tail.next = this.head.next, а оскільки newNode це посилання на один і той самий об'єкт то зміна this.tail.next змінює next у останньому head.next
      this.tail = newNode
      
      return this
    }
  }

  pop() {
    if(this.head === null) {
      return this
    }

    let current = this.head
    let newTail = current

    if(this.tail === this.head) {
      this.tail = null
      this.head = null
      this.length--
      
      return current
    }

    while(current.next) {
      newTail = current
      current = current.next
    }

    this.tail = newTail
    this.tail.next = null
    this.length--

    // // handle when linkedList has 1 item and we want to pop it
    // if(this.length === 0) {
    //   this.tail = null
    //   this.head = null
    // }

    return current
  }

}

const list = new SinglyLinkedList()
list.push("Hello 1")
list.push("there 2");
list.push("general 3");
list.push("Kenobi 4");

console.log(list.pop());
console.log(list.pop());
console.log(JSON.stringify(list.pop()));
console.log(JSON.stringify(list.pop()));

// console.log(list.pop("Hello 1"));
// console.log(list.pop("there 2"));
// console.log(JSON.stringify(list.pop("general 3")));
// console.log(JSON.stringify(list.pop("Kenobi 4")));

