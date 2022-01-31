import { element } from './html-util.js';
import { TodoItemView } from './TodoItemView.js';

export class TodoListView {
  /**
   * TodoItemModelの配列を受け取りTodoリストのHTML要素を返す
   * @param {TodoItemModel[]} todoItems TodoItemModelの配列
   * @param {function({id:string, completed:boolean})} onUpdateTodo チェックボックスのchangeイベントリスナー関数
   * @param {function({id:string})} onDeleteTodo 削除ボタンのclickイベントリスナー関数
   * @returns {Element} TodoItemModelの配列に対応した対応したリストのHTML
   */
  createElement(todoItems, { onUpdateTodo, onDeleteTodo }) {
    const todoListElement = element`<ul />`;
    todoItems.forEach((todoItem) => {
      const todoItemView = new TodoItemView();
      const todoItemElement = todoItemView.createElement(todoItem, {
        onUpdateTodo,
        onDeleteTodo,
      });
      todoListElement.appendChild(todoItemElement);
    });
    return todoListElement;
  }
}
