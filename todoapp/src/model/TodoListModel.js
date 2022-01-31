import { EventEmitter } from '../EventEmitter';

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
  getTotalConut() {
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
    this.addEventListener('change');
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
    this.items.push(todoItem);
    this.emitChange();
  }
}
