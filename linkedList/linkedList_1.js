
class Node {
  constructor(val) {
    this.val = val
    this.next = null
  }
}

// const first = new Node("First")
// first.next = new Node("Second")
// first.next.next = new Node("Third")

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
}

const list = new SinglyLinkedList()
console.log(list.push("Hello 1"));
console.log(list.push("there 2"));
console.log(list.push("general 3"));
