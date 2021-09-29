const Todo = require("./todo");0

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  add(todo) {
    if (todo instanceof Todo) {
      this.todos.push(todo);
    } else {
      throw new TypeError("can only add Todo Object");
    }
  }
  
  size() {
    return this.todos.length;
  }
  
  first() {
    return this.todos[0];
  }
  
  last() {
    return this.todos[this.todos.length - 1];
  }
  
  itemAt(index) {
    this._validateIndex(index);
    return this.todos[index];
  }
  
  _validateIndex(index) {
    if (!(index in this.todos)) {
      throw new ReferenceError(`Invalid Index: ${index}`);
    }
  }
  
  isDoneAt(index) {
    this._validateIndex(index);
    return this.itemAt(index).isDone();
  }
  
  markDoneAt(index) {
    this._validateIndex(index);
    this.todos[index].markDone();
  }
  
  markUndoneAt(index) {
    this._validateIndex(index);
    this.todos[index].markUndone();
  }
  
  isDone() {
    return this.todos.every(todo => todo.isDone());
  }
  
  shift() {
    return this.todos.shift();
  }

  pop() {
    return this.todos.pop();
  }
  
  removeAt(index) {
    this._validateIndex(index);
    return this.todos.splice(index, 1)[0];
  }
  
  toString() {
    let stringArr = [`---- ${this.title} ----`];
    this.todos.forEach(todo => stringArr.push(todo.toString()));
    return stringArr.join('\n');
  }
  
  forEach(callback) {
    this.todos.forEach(callback);
  }

  filter(callback) {
    let list = new TodoList("Results");
    this.forEach(todo => {
      if (callback(todo)) {
        list.add(todo);
      }
    });
    
    return list;
  }
  
  getListTitle() {
    return this.title;
  }
  
  findByTitle(title) {
    return this.filter(todo => {
      return todo.getTitle().toLowerCase() === title.toLowerCase();
    }).first();
  }

  allDone() {
    return this.filter(todo => todo.isDone());
  }
  
  allNotDone() {
    return this.filter(todo => !todo.isDone());
  }
  
  markDone(title) {
    this.findByTitle(title).markDone();
  }
  
  markAllDone() {
    this.forEach(todo => todo.markDone());
  }
  
  markAllUndone() {
    this.forEach(todo => todo.markUndone());
  }
  
  toArray() {
    let arr = [];
    
    this.forEach(todo => arr.push(todo));
    
    return arr;
  }
}

module.exports = TodoList;
