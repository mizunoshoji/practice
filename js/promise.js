/**
 * 非同期処理を行いPromiseを返すサンプル関数。
 * Promiseコンストラクター
 * Promiseインスタンスを作成しexecutorと呼ばれる関数を渡す。
 * resolveメソッドで成功した場合、rejectメソッドで失敗した場合の通知を行う。
 */
function asyncProcess(path) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (path.startsWith('success/')) {
        resolve({
          body: `${path}へのリクエストに対するレスポンスの内容です。`,
        });
      } else {
        reject(new Error('非同期処理の例外が発生しました。'));
      }
    }, 1000);
  });
}

// thenでresolveで呼ばれるコールバック、catchでrejectで呼ばれるコールバックを登録
asyncProcess('success/')
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });

// catchはthenメソッドのonRejectedと同じ意味のシンタックスシュガー。catchはthenメソッドのエイリアスとも言える。
asyncProcess('failure/')
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });

// 構文；p.then(onFulfilled[, onRejected]);
// thenの引数に成功コールバック、失敗コールバックを登録する構文もある。
asyncProcess('failure/').then(
  (value) => {
    console.log(value);
  },
  (reason) => {
    console.log(reason);
  }
);

// 成功時の処理のみ
function delay(timeoutMs) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${timeoutMs}ミリ秒後に解決されました`);
    }, timeoutMs);
  });
}

delay(2000).then((response) => {
  console.log(response);
});

// 失敗時の処理のみ
function errorPromise(message) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(message));
    }, 2000);
  });
}

// then(undefinde, onRejectedCallBack)と意味は同じだがcatchを使うのが推奨。
errorPromise('失敗したときだけエラーをキャッチします。').catch((error) => {
  console.log(error.message);
});

// 暗黙のtry...catch文。Promiseコンストラクタ内で例外が発生したら自動的にPromiseは拒否状態になり例外が投げれれる。
// https://ja.javascript.info/promise-error-handling が詳しいエラーハンドリングを説明している。
new Promise((resolve, reject) => {
  // throw new Error('例外');
}).catch((error) => {
  console.log(error);
});

// Promiseの状態遷移 基本1回状態変化したら後は変化しない性質(settled)
const promise1 = asyncProcess('success/');
console.log(promise1); // fulfilled状態のPromise
const promise2 = asyncProcess('failure/');
promise2.catch((error) => {
  console.log(promise2); // rejected状態のPromise
  console.log(error);
});

/**
 * 1 解決状態のPromiseを作成する
 * 2 特定の値で解決されるPromiseを作成する
 * 3 解決済みのPromiseにthenで(常に非同期で実行される)コールバックを登録する。
 * 4 拒否状態のPromiseを作成する
 * 5 拒否状態のPromiseに非同期コールバックを関数を登録する
 */
const fulfilledPromise = Promise.resolve();

console.log(fulfilledPromise);

console.log(Promise.resolve(10));

fulfilledPromise.then(() => {
  console.log(
    '解決済みのPromiseにコールバック処理を登録。これは常に非同期で実行される。'
  );
});
console.log('解決済みPromiseに追加した非同期処理の直後の同期処理');

// const rejectedPromise = Promise.reject(new Error('拒否状態Promiseのエラー'));
// console.log(rejectedPromise);

/**
 * Promiseチェーン
 */

// thenはpromiseを返すので続けてthenメソッドを実行できる。
Promise.resolve()
  .then(() => {
    console.log('promiesチェーンの1回目の成功コールバック');
  })
  .then(() => {
    console.log('promiesチェーンの2回目の成功コールバック');
  });

// 1回目でrejected Promiseを返すのでcatchに処理が移る。
Promise.resolve()
  .then(() => {
    console.log('promiesチェーンの1回目の成功コールバック');
    throw new Error('thenメソッド内の例外発生');
  })
  .then(() => {
    console.log('promiesチェーンの2回目の成功コールバック');
  })
  .catch((error) => {
    console.log(error.message);
  })
  .then(() => {
    console.log(
      'catchメソッド実行後はfulfilled Promiseを返すのでこのコードは実行される。'
    );
    return 1;
  })
  .then((value) => {
    console.log(`直前のthenメソッドで返された${value}を受け取って出力する。`);
  });

/*
 * 成功失敗に関わらず最後に行いたい処理をfinally()で実行する。
 * https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally
 */

// 複数の非同期処理の逐次処理 thenメソッドで実行したい順番でつないでいく
const results = [];
asyncProcess('success/data_1')
  .then((response) => {
    results.push(response.body);
    return asyncProcess('success/data_2'); // Promiseを返して次のthenで処理する
  })
  .then((response) => {
    results.push(response.body);
    return asyncProcess('success/data_3');
  })
  .then((response) => {
    results.push(response.body);
  })
  .then(() => {
    console.log(results);
  });

// 複数の非同期処理の並列処理。promise.all()を使う。逐次処理より早い。１つreject状態だと全体もreject状態になる。
let jobs = [];
jobs = Promise.all([
  asyncProcess('success/data_1'),
  asyncProcess('success/data_2'),
  asyncProcess('success/data_3'),
]);

// 分割代入でPromiseの配列を個々のの変数に分解して代入する
jobs.then(([response1, response2, response3]) => {
  console.log(response1.body);
  console.log(response2.body);
  console.log(response3.body);
});

// 複数の非同期処理の並列処理 promise.race()
// 複数の非同期処理の内で1番早く成功または失敗したPromiseが返される。レースさせるイメージ。
// 以下のような関数を使って非同期処理のタイムアウト処理を実装できる。
function timeout(timeoutMs) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(`Timeout: ${timeoutMs}ミリ秒経過`));
    }, timeoutMs);
  });
}
