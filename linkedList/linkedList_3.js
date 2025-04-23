
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


    return current
  }

  shift() {
    if(this.head === null) {
      return
    }

    if(this.tail === this.head) {
      this.tail = null
    }

    this.head = this.head.next
    this.length--


    return this
  }

  unshift(value) {
    const newNode = new Node(value)

    if(this.head === null) {
      this.head = newNode
      this.tail = this.head
      this.length++

      return this
    }

    newNode.next = this.head
    this.head = newNode
    this.length++

    return this
  }
}

const list = new SinglyLinkedList()
// list.push("Hello 1")
// list.push("there 2");
// list.push("general 3");
// list.push("Kenobi 4");

console.log(list.unshift("Zero"));
console.log(list.unshift("2"));
console.log(list.unshift("3"));


