"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Todo = require("./todo");

0;

var TodoList = /*#__PURE__*/function () {
  function TodoList(title) {
    _classCallCheck(this, TodoList);

    this.title = title;
    this.todos = [];
  }

  _createClass(TodoList, [{
    key: "add",
    value: function add(todo) {
      if (todo instanceof Todo) {
        this.todos.push(todo);
      } else {
        throw new TypeError("can only add Todo Object");
      }
    }
  }, {
    key: "size",
    value: function size() {
      return this.todos.length;
    }
  }, {
    key: "first",
    value: function first() {
      return this.todos[0];
    }
  }, {
    key: "last",
    value: function last() {
      return this.todos[this.todos.length - 1];
    }
  }, {
    key: "itemAt",
    value: function itemAt(index) {
      this._validateIndex(index);

      return this.todos[index];
    }
  }, {
    key: "_validateIndex",
    value: function _validateIndex(index) {
      if (!(index in this.todos)) {
        throw new ReferenceError("Invalid Index: ".concat(index));
      }
    }
  }, {
    key: "isDoneAt",
    value: function isDoneAt(index) {
      this._validateIndex(index);

      return this.itemAt(index).isDone();
    }
  }, {
    key: "markDoneAt",
    value: function markDoneAt(index) {
      this._validateIndex(index);

      this.todos[index].markDone();
    }
  }, {
    key: "markUndoneAt",
    value: function markUndoneAt(index) {
      this._validateIndex(index);

      this.todos[index].markUndone();
    }
  }, {
    key: "isDone",
    value: function isDone() {
      return this.todos.every(function (todo) {
        return todo.isDone();
      });
    }
  }, {
    key: "shift",
    value: function shift() {
      return this.todos.shift();
    }
  }, {
    key: "pop",
    value: function pop() {
      return this.todos.pop();
    }
  }, {
    key: "removeAt",
    value: function removeAt(index) {
      this._validateIndex(index);

      return this.todos.splice(index, 1)[0];
    }
  }, {
    key: "toString",
    value: function toString() {
      var stringArr = ["---- ".concat(this.title, " ----")];
      this.todos.forEach(function (todo) {
        return stringArr.push(todo.toString());
      });
      return stringArr.join('\n');
    }
  }, {
    key: "forEach",
    value: function forEach(callback) {
      this.todos.forEach(callback);
    }
  }, {
    key: "filter",
    value: function filter(callback) {
      var list = new TodoList("Results");
      this.forEach(function (todo) {
        if (callback(todo)) {
          list.add(todo);
        }
      });
      return list;
    }
  }, {
    key: "getListTitle",
    value: function getListTitle() {
      return this.title;
    }
  }, {
    key: "findByTitle",
    value: function findByTitle(title) {
      return this.filter(function (todo) {
        return todo.getTitle().toLowerCase() === title.toLowerCase();
      }).first();
    }
  }, {
    key: "allDone",
    value: function allDone() {
      return this.filter(function (todo) {
        return todo.isDone();
      });
    }
  }, {
    key: "allNotDone",
    value: function allNotDone() {
      return this.filter(function (todo) {
        return !todo.isDone();
      });
    }
  }, {
    key: "markDone",
    value: function markDone(title) {
      this.findByTitle(title).markDone();
    }
  }, {
    key: "markAllDone",
    value: function markAllDone() {
      this.forEach(function (todo) {
        return todo.markDone();
      });
    }
  }, {
    key: "markAllUndone",
    value: function markAllUndone() {
      this.forEach(function (todo) {
        return todo.markUndone();
      });
    }
  }, {
    key: "toArray",
    value: function toArray() {
      var arr = [];
      this.forEach(function (todo) {
        return arr.push(todo);
      });
      return arr;
    }
  }]);

  return TodoList;
}();

module.exports = TodoList;