class Node {
  constructor(val) {
    this.val = val
    this.next = null
    this.prev = null
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }


  push(value) {
    const newNode = new Node(value)
    if(this.length === 0) {
      this.head = newNode
      this.tail = this.head
      this.length++

      return this
    }

    this.tail.next = newNode
    newNode.prev = this.tail
    this.tail = newNode
    this.length++

    return this
  }

  pop() {
    if(this.length === 0) {
      return undefined
    }

    const tempTail = {...this.tail}
    tempTail.prev = null // Якщо цього не зробити то pop() поверне Node з посиланням на всі попередні елементи

    if(this.length === 1) {
      this.head = null
      this.tail = null
      this.length--
      return tempTail
    }

    const prev = this.tail.prev
    prev.next = null
    this.tail = prev
    this.length--

    return tempTail
  }

  shift() {
    if(this.length === 0) {
      return
    }
    if(this.length === 1) {
      this.head = null
      this.tail = null
      this.length--

      return this
    }

    this.head = this.head.next
    this.head.prev = null 
    this.length--
    
    return this
  }

  unshift(value) {
    if(this.length === 0) {
      return this.push(value)
    }
    const newNode = new Node(value)
    this.head.prev = newNode
    newNode.next = this.head
    this.head = newNode
    this.length++

    return newNode
  }

  get(index) {
    if(index < 0 || index >= this.length) {
      return undefined
    }

    let current = null
    if(index <= this.length/2) {
      // starts from left
      let counter = 0
      current = this.head
      while(counter != index) {
        current = current.next
        counter++
      }
    } else {
      // starts from right
      let counter = this.length - 1
      current = this.tail
      while(counter != index) {
        current = current.prev
        counter--
      }
    }

    return current
  }

  set(index, value) {
    if(index < 0 || index > this.length) {
      return false
    }

    const current = this.get(index)
    if(current) {
      current.val = value
    }

    return true
  }

  insert(index, value) {
    if(index < 0 || index > this.length) {
      return undefined
    }

    if(index === 0) {
      return this.unshift(value)
    }

    if(index === this.length) {
      return this.push(value)
    }

    const newNode = new Node(value)
    const beforeNode = this.get(index - 1)
    const afterNode = beforeNode.next

    beforeNode.next = newNode
    newNode.prev = beforeNode
    newNode.next = afterNode
    afterNode.prev = newNode


    this.length++

    return newNode
  }

  remove(index) {
    if(index < 0 || index >= this.length) {
      return undefined
    }

    if(index === 0) {
      return this.shift()
    }

    if(index === this.length - 1) {
      return this.pop()
    }

    const beforeNode = this.get(index - 1)
    const node = beforeNode.next
    const afterNode = node.next
    beforeNode.next = afterNode
    afterNode.prev = beforeNode
    this.length--

    node.next = null
    node.prev = null
    return node
  }

  reverse() {
    let node = this.head
    this.head = this.tail
    this.tail = node
    let next;
    let prev = null;
    for(let i = 0; i < this.length; i++) {
      next = node.next
      node.next = prev 
      node.prev = next 
      prev = node
      node = next
    }
    
   return this
  }
}

/**
 * BIG O
 * Insertion - O(1)
 * Remove: 
 *          best case (remove from start/remove from end) - O(1) 
 *          worst case (remove from middle) - O(n/2) -> O(n)
 * Searching - O(n/2) -> O(n)
 * Access - O(n/2) -> O(n)
 */

const list = new DoublyLinkedList()
list.push(" 1")
list.push(" 2")
list.push(" 3")
list.push("4")

list.reverse()
console.log(list)

/**
 * Витрата пам'яті, очевидно що DoublyLinkedList займатиме більше пам'яті ніж SinglyLinkedList, але на скільки?
 * 
 * DoublyLinkedList має такі поля: val, next, prev
 * val: Те саме значення, що й у SinglyLinkedList.
 * next: Посилання на наступний вузол (4 або 8 байтів або інша к-сть байт).
 * prev: Додаткове посилання на попередній вузол (ще 4 або 8 байтів або інша к-сть байт).
 * Таким чином, кожен вузол DoublyLinkedList додатково зберігає одне посилання порівняно з вузлом SinglyLinkedList.
 * 
 * Припустимо, що розмір одного посилання становить 8 байтів (це типово для 64-бітних систем)
 * Розглянемо варіант з коли SinglyLinkedList/DoublyLinkedList - має чотири елементи ("1", "2", "3", "4")
 * 
 * Розмір для SinglyLinkedList з чотирма елементами
 *  next: 8 байтів
 * 4*8 = 32 байти на посилання
 * 
 * Розмір для DoublyLinkedList з чотирма елементами
 *   next: 8 байтів
 *   prev: 8 байтів
 * 4*(8+8) = 64 байти на посилання
 * 
 */