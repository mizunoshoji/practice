let todoId = 0;

export class TodoItemModel {
  /**
   * @param {string} title タスク名
   * @param {boolean} completed タスクの完了状態
   */
  constructor({ title, completed }) {
    this.id = todoId++;
    this.title = title;
    this.completed = completed;
  }

  /**
   * Todoのタイトルが空かどうかを判定する
   * @returns {boolean}
   */
  isEmptyTitle() {
    return this.title.length === 0;
  }
}
