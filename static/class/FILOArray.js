import { v4 } from "uuid";
import { createTimestamp } from "../time";

class FILOArray {
  constructor() {
    this.stack = [];
    this.maxSize = 10;
  }

  push(item) {
    // no duplicates
    if (this.stack[this.stack.length - 1] === item) return;
    if (this.stack.length >= this.maxSize) {
      this.stack.shift(); // Remove the oldest item
    }
    this.stack.push(item);
  }

  pop() {
    return this.stack.pop();
  }

  peek() {
    return this.stack[this.stack.length - 1];
  }

  isEmpty() {
    return this.stack.length === 0;
  }

  size() {
    return this.stack.length;
  }

  clear() {
    this.stack = [];
  }
}
export default FILOArray;
