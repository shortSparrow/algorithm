/**
 *  Stack with 2 Queues - Exercise
    Implement a stack using two queues:

    You should implement the following functions:

    - push (returns the stack)

    - pop (returns the value popped)

 */

    class Stack {
      constructor() {
        this.queue = new Queue()
        this.prevNode = null
      }
      push(val) {
          this.prev = this.queue.last
          this.queue.enqueue(val)
          
          return this
      }
      pop() {
        if(this.queue.size === 0) {
          return null
        }
        const temp = this.queue.last
        
        if(this.queue.size === 1) {
          return this.queue.dequeue()
        }

        this.prev.next = null
        this.queue.last = this.prev
        this.queue.size--

        return temp.value
      }
  }
  
  
  class Node {
      constructor(value) {
          this.value = value;
          this.next = null;
      }
  }
  
  class Queue {
      constructor() {
          this.first = null;
          this.last = null;
          this.size = 0;
      }
      enqueue(data) {
          var node = new Node(data);
  
          if (!this.first) {
              this.first = node;
              this.last = node;
          } else {
              this.last.next = node;
              this.last = node;
          }
  
          return ++this.size;
      }
  
      dequeue() {
          if (!this.first) return null;
  
          var temp = this.first;
          if (this.first == this.last) {
              this.last = null;
          }
          this.first = this.first.next;
          this.size--;
          return temp.value;
      }
  }

  const stack = new Stack()
  stack.push(1)
  stack.push(2)
  stack.push(3)
