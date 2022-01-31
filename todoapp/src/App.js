import { TodoListModel } from './model/TodoListModel.js';
import { TodoItemModel } from './model/TodoItemModel.js';
import { element, render } from './view/html-util.js';

export class App {
  constructor() {
    // TodoListの初期化
    this.todoListModel = new TodoListModel();
  }

  mount() {
    const formElement = document.querySelector('#js-form');
    const inputElement = document.querySelector('#js-form-input');
    const containerElement = document.querySelector('#js-todo-list');
    const todoItemCountElement = document.querySelector('#js-todo-count');

    // TodoListModelの状態が更新されたら表示を更新する処理(イベントリスナー)の定義
    this.todoListModel.onChange(() => {
      const todoListElement = element`<ul />`;
      const todoItems = this.todoListModel.getTodoItems();
      todoItems.forEach((item) => {
        const todoItemElement = item.completed
          ? element`<li><input type="checkbox" class="checkbox" checked><s>${item.title}<s/><button class="delete">x</button></li>`
          : element`<li><input type="checkbox" class="checkbox" >${item.title}<button class="delete">x</button></li>`;
        const inputCheckboxElement = todoItemElement.querySelector('.checkbox');
        inputCheckboxElement.addEventListener('change', () => {
          this.todoListModel.updateTodo({
            id: item.id,
            completed: !item.completed,
          });
        });
        const deleteButtonElement = todoItemElement.querySelector('.delete');
        deleteButtonElement.addEventListener('click', () => {
          this.todoListModel.deleteTodo({
            id: item.id,
          });
        });
        todoListElement.appendChild(todoItemElement);
      });
      render(todoListElement, containerElement);
      todoItemCountElement.textContent = `Todoアイテム数:${this.todoListModel.getTotalConut()}`;
    });
    // formでsubmitしたらTodoItemModelをTodoListModelに追加
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this.todoListModel.addTodo(
        new TodoItemModel({
          title: inputElement.value,
          completed: false,
        })
      );
      inputElement.value = '';
    });
  }
}
