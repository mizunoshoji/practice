# Node.js で CLI アプリ

## 作業中のメモ

- node コマンドで JS を実行する
- 標準出力に結果を出力する
- `console.log(process.argv);`を実行するとどうなる？
  - `process.argv`は文字列型の配列を返す。
    - node コマンドの絶対パス。Node.js プロセスを開始した実行可能ファイル(executable)の絶対パス。
    - 実行された JavaScript ファイルの絶対パス
    - 追加のコマンドライン引数。node コマンドでファイルを実行するときにコマンドライン引数を渡していればそれが表示される。
- コマンドライン引数を処理しやすいようにパースする。まず変換対象のファイルのパスを取得したい。
- commander というライブラリを使用する。
- 前提確認
  - npm init
  - CommonJS モジュール / ECMAScript モジュール
- Node.js の fs モジュール
- fs モジュールでファイルを非同期または同期で読み込む処理、エラーハンドリング含めて。
- commander を使用してコマンドラインで渡されたオプションを扱う
- marked のオプションで出力結果の HTML を制御する
- Nullish coalescing 演算子(??) ES2020 --> これどういう局面で使える？
- テスティングフレームワークとして Mocha を導入する。
- `npm test`でテストを実行できるようにする。
- Node.js の標準モジュールの１つである assert モジュールを利用する
- test/にユニットテストを書いた js ファイルを配置する
- test/fixtures に期待値となるファイルを配置する
- assert モジュールで結果と期待値を厳密等価で比較する
- ESLint が macha の関数をエラーにしてしまうので ESLint の設定で mocha を使用していることを明示する。
- ユニットテストで HMTL の結果をテストしたいとき、Prettier が勝手に整形して期待値と差異が出てしまう時があるので ignore で対処する。

## 使用したライブラリ

- commnder
  - https://www.npmjs.com/package/commander
- marked
  - https://www.npmjs.com/package/marked
  - https://marked.js.org/
- Mocha
  - https://mochajs.org/

## 参考にしたサイト

https://jsprimer.net/use-case/nodecli/
