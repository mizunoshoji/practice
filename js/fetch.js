/* eslint-disable prefer-const */

// 参考ページ https://jsprimer.net/basic/async/

getUsers(['mizunoshoji', 'iliakan', 'notexistuser']).then((results) =>
  console.log(results)
);

/**
 * Githubユーザー情報を取得する非同期関数です。
 * @param {string[]} names Githubユーザー名
 * @returns {Object[]} Githubユーザー情報
 */
async function getUsers(names) {
  let jobs = [];
  for (let name of names) {
    let job = fetch(`https://api.github.com/users/${name}`).then(
      (successResponse) => {
        if (successResponse.status !== 200) {
          return null;
        } else {
          return successResponse.json();
        }
      },
      (failResponse) => {
        return null;
      }
    );
    jobs.push(job);
  }

  let results = await Promise.all(jobs);

  return results;
}
