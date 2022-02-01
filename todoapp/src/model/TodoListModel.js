import { EventEmitter } from '../EventEmitter.js';

export class TodoListModel extends EventEmitter {
  /**
   * @param {TodoItemModel[]} [items] 初期アイテム一覧、デフォルトは空配列
   */
  constructor(items = []) {
    super();
    this.items = items;
  }

  /**
   * アイテムの合計数を返す
   * @returns {number}
   */
  getTotalCount() {
    return this.items.length;
  }

  /**
   * アイテム一覧の配列を返す
   * @returns {TodoItemModel[]}
   */
  getTodoItems() {
    return this.items;
  }

  /**
   * イベント登録 TodoListの状態が変更されたら呼び出されるイベントリスナーを登録する
   * @param {Function} listener
   */
  onChange(listener) {
    this.addEventListener('change', listener);
  }

  /**
   * イベント呼出 TodoListの状態が変更されたら登録されたイベントリスナーを呼び出す
   *
   */
  emitChange() {
    this.emit('change');
  }

  /**
   * TodoListModelにTodoアイテムを追加する
   * @param {TodoItemModel} todoItem
   */
  addTodo(todoItem) {
    if (todoItem.isEmptyTitle()) {
      return;
    }
    this.items.push(todoItem);
    this.emitChange();
  }

  /**
   * 指定されたidのTodoアイテムの完了状態を更新する
   * @param {{id:number, completed:boolean}}
   */
  updateTodo({ id, completed }) {
    const todoItem = this.items.find((todo) => todo.id === id);
    if (!todoItem) {
      // eslint-disable-next-line no-useless-return
      return;
    }
    todoItem.completed = completed;
    this.emitChange();
  }

  /**
   * 指定されたidのTodoアイテムを削除する
   * @param {{id:number}}
   */
  deleteTodo({ id }) {
    this.items = this.items.filter((todo) => {
      return todo.id !== id;
    });
    this.emitChange();
  }
}
