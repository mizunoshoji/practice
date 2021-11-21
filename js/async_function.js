/* eslint-disable prefer-const */

// 参考ページ https://jsprimer.net/basic/async/

// asyncキーワードで非同期関数を定義でき、これは解決されたpromiseを返す関数である。値はPromiseインスタンスにラップされる。
// ケース1: 値を返すと、その値をもつfulfilled Promiseが返される。
async function doasyncA() {
  return 'この値で解決されました。';

  // 明示的に解決されたPromiseを返すことを示す記法
  // return Promise.resolve('この値で解決されました。');
}

console.log(doasyncA());
doasyncA().then((value) => {
  console.log(value);
});

// ケース2: Promiseを返すと、それがそのまま返される
async function doasyncB() {
  return Promise.resolve('解決された値');

  // catchできない？rejectとcatchの関係がうまくいかない...
  // return Promise.reject('エラーメッセージ');
}
console.log(doasyncB());

// ケース3: 例外が発生したら、エラーを持つrejectedなpromiseが返される。

// 非同期関数の表現いろいろ
// 関数宣言
async function funcA() {}
// 関数式
const funcB = async function () {};
// 関数式 arrow関数
const funcC = async () => {};
// // メソッドの短縮記法のAsync Function版 ?
const obj = { async method() {} };

// await式はどんな場合に何を返すか？
// awaitの右辺のPromiseが解決されるとawait式は値を返す。
// then(callback)を書かなくていいことがポイント。
async function doasyncC() {
  const value = await Promise.resolve('解決された値');
  console.log('このステップは上の非同期処理が完了しないと実行されない。');
  console.log(value);
}
doasyncC();
console.log(
  `非同期関数doasyncCの完了をawaitしているわけではないのでこのステップは同期的に実行されます。
  await式を書いたasync functionの外では、同期的に処理が進む、という挙動をわかっておくこと。`
);

// Promiseはreject状態なのでawaitはその場でエラーをスローする。
// 通常の非同期処理のように次のステップの実行が行われないので、tryブロック内で例外を自動的にキャッチできる。
// then(callback).catch(callback)のように書かなくていいことがポイント。try...catch構文で非同期処理のエラーも扱えるようになる。
async function doasyncD() {
  try {
    const value = await Promise.reject(new Error('エラーメッセージ'));
  } catch (error) {
    console.log(error.message);
  }
}
doasyncD();

// async/await構文で逐次的な非同期処理を書く。

function dummyFetch(path) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (path.startsWith('success/')) {
        resolve({ body: `${path}のデータ` });
      } else {
        reject(new Error('データ取得失敗しました。'));
      }
    }, 1000 * Math.random());
  });
}

// then(callback)で非同期処理を順次呼び出すようなややこしい記法をしなくてすむことがポイント。
// 同期処理かのように非同期処理の逐次処理を書けるようになっている。
async function fetchResource() {
  let results = [];
  const responseA = await dummyFetch('success/a'); // データを取得
  results.push(responseA.body); // データを配列に格納
  const responseB = await dummyFetch('success/b');
  results.push(responseB.body);
  return results;
}

fetchResource().then((results) => {
  console.log(results);
});

/**
 * 複数の非同期処理をループ内で順番に実行する。直列、逐次処理。
 * async/await構文 と for文 の組み合わせ
 * awaitで各処理の実行完了を待つので同期処理のようになり時間がかかる。
 */

/**
 * 複数の非同期処理を互いに完了を待たずに並列して実行する。
 * async/await構文 と PromiseAll() の組み合わせ
 * 実行順序に意味がないなら逐次実行より実行時間が短くなる。
 */
