const Todo = require('./todo');
const TodoList = require('./todolist');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let todoArray;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');
    
    todoArray = [todo1, todo2, todo3];
    
    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });
  
  test("add", () => {
    expect(() => list.add(1)).toThrow(TypeError);
    expect(() => list.add('hi')).toThrow(TypeError);
  })

  test("size", () => {
    expect(list.size()).toBe(todoArray.length);
  });
  
  test("first", () => {
    expect(list.first()).toBe(todo1);
  });
  
  test("last", () => {
    expect(list.last()).toBe(todo3);
  });
  
  test("itemAt", () => {
    expect(list.itemAt(0)).toBe(todo1);
    expect(list.itemAt(1)).toBe(todo2);
    expect(list.itemAt(2)).toBe(todo3);
  });
  
  test("_validateIndex", () => {
    expect(() => list.itemAt(listArray.length)).toThrow(ReferenceError);
  });

  test("isDoneAt", () => {
    expect(() => list.isDoneAt(listArray.length)).toThrow(ReferenceError);
    expect(list.isDoneAt(0)).toBe(false);
    list.markDoneAt(0)
    expect(list.isDoneAt(0)).toBe(true);
  }); 
  
  test("markDoneAt", () => {
    expect(() => list.markDoneAt(listArray.length)).toThrow(ReferenceError);
    expect(list.isDoneAt(0)).toBe(false);
    list.markDoneAt(0)
    expect(list.isDoneAt(0)).toBe(true);
  }); 
  
  test("markUndoneAt", () => {
    expect(() => list.markDoneAt(listArray.length)).toThrow(ReferenceError);
    list.markDoneAt(0)
    expect(list.isDoneAt(0)).toBe(true);
    list.markUndoneAt(0)
    expect(list.isDoneAt(0)).toBe(false);
  });
  
  test("isDone", () => {
    expect(list.isDone()).toBe(false);
    list.markAllDone();
    expect(list.isDone()).toBe(true);
  });
  
  test("shift", () => {
    expect(list.shift()).toBe(todo1);
    expect(list.size()).toBe(todoArray.length - 1);
  });
  
  test("pop", () => {
    expect(list.pop()).toBe(todo3);
    expect(list.size()).toBe(todoArray.length - 1);
  });
  
  test("removeAt", () => {
    expect(() => list.removeAt(listArray.length)).toThrow(ReferenceError);
    expect(list.removeAt(1)).toEqual(todo2);
    expect(list.size()).toBe(todoArray.length - 1);
  }); 
  
  test("toString", () => {
    let undoneString = "---- Today's Todos ----\n[ ] Buy milk\n[ ] Clean room\n[ ] Go to the gym";
    expect(list.toString()).toBe(undoneString);
    list.markAllDone();
    let doneString = "---- Today's Todos ----\n[X] Buy milk\n[X] Clean room\n[X] Go to the gym";
    expect(list.toString()).toBe(doneString);
  });
  
  test("forEach", () => {
    let newTodos = [];
    expect(list.forEach(elem => newTodos.push(elem))).toBe(undefined);
    expect(newTodos).toEqual(todoArray);
  });
  
  test("filter", () => {
    let callback = elem => elem instanceof Todo;
    let arrayFilter = list.todos.filter(callback);
    let listFilter = list.filter(callback);
    expect(listFilter.todos).toEqual(arrayFilter);
    expect(listFilter.getListTitle()).toEqual("Results");
  });
  
  test("getListTitle", () => {
    expect(list.getListTitle()).toEqual(list.title);
  });
  
  test("findByTitle", () => {
    expect(list.findByTitle("Buy Milk")).toBe(todo1);
    expect(list.findByTitle("Not In List")).toBe(undefined);
  });
  
  test("allDone", () => {
    let newList = new TodoList("Results");
    expect(list.allDone()).toEqual(newList);
    
    newList.add(todo1);
    list.markDoneAt(0);
    expect(list.allDone()).toEqual(newList);
  });
  
  test("allNotDone", () => {
    let newList = new TodoList("Results");
    newList.add(todo1);
    newList.add(todo2);
    newList.add(todo3);
    expect(list.allNotDone()).toEqual(newList);
  });
  
  test("markDone", () => {
    list.markDone("Buy Milk");
    expect(list.isDoneAt(0)).toBe(true);
  });
  
  test("markAllDone", () => {
    list.markAllDone();
    list.forEach(todo => {
      expect(todo.isDone()).toBe(true);
    });
  });
  
  test("markAllUndone", () => {
    list.forEach(todo => {
      expect(todo.isDone()).toBe(false);
    });
  });
  
  test("toArray", () => {
    expect(list.toArray()).toEqual(todoArray);
  });
});