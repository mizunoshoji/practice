// 参考ページ https://jsprimer.net/basic/async/

// 同期処理で例外をキャッチする例
try {
  throw new Error('同期処理のエラー。最も基本的な例外処理。');
} catch (e) {
  console.log(e.message);
}

// 非同期処理内の例外処理ができない例
try {
  setTimeout(() => {
    // throw new Error(
    //   '非同期処理のエラー。これはキャッチできない。tryブロックの外で実行されるので。'
    // );
  }, 1000);
} catch (e) {
  console.log(e.message);
}

// 非同期処理内で例外処理できるが、外では例外をキャッチできない例
setTimeout(() => {
  try {
    throw new Error(
      '非同期処理のエラー。これは非同期処理の中でキャッチできるが、非同期処理の外からはわからない。'
    );
  } catch (e) {
    console.log(e.message);
  }
}, 2000);

// エラーファーストコールバックで非同期処理の成功を伝える例。
dummyFetch('success/', (error, response) => {
  if (error) {
    console.log(
      '非同期処理で例外が発生しました。callback関数の引数にエラーオブジェクトを渡たされています。'
    );
    console.log(error.message);
  } else {
    console.log('非同期処理が成功しました。');
    console.log(response);
  }
});

// エラーファーストコールバックで非同期処理の例外をキャッチする例
dummyFetch('failure/', (error, response) => {
  if (error) {
    console.log(
      '非同期処理で例外が発生しました。callback関数の引数にエラーオブジェクトを渡たされています。'
    );
    console.log(error.message);
  } else {
    console.log('非同期処理が成功しました。');
    console.log(response);
  }
});

asyncTowCallBack(
  'failure/',
  (response) => {
    console.log(response);
  },
  (error) => {
    console.log(error.message);
  }
);

/**
 * 非同期処理の結果を返すダミーダミー関数です。
 * @param path
 * @param callback エラーファーストコールバック。第一引数にエラーオブジェクト、第二引数以降にデータを受け取る関数です。
 */
function dummyFetch(path, callback) {
  setTimeout(() => {
    if (path.startsWith('success/')) {
      callback(null, { body: 'レスポンスの本文です。' });
    } else {
      callback(new Error('データの取得に失敗しました。'));
    }
  }, 3000);
}

/**
 * 非同期処理の成功・失敗それぞれのコールバックを受け取るサンプル関数。
 * @param {*} path
 * @param {*} successCallback 成功した場合のコールバック関数
 * @param {*} failureCallBack 失敗した場合のコールバック関数
 */
function asyncTowCallBack(path, successCallback, failureCallBack) {
  setTimeout(() => {
    if (path.startsWith('success/')) {
      const response = { body: 'レスポンスの本文です。' };
      successCallback(response);
    } else {
      failureCallBack(new Error('データの取得に失敗しました。'));
    }
  }, 4000);
}
