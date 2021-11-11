/* eslint-disable prefer-const */

getUsers(['mizunoshoji', 'iliakan', 'notexistuser']).then((result) =>
  console.log(result)
);

/**
 * Githubユーザー情報を取得する非同期関数です。
 * @param {string[]} names Githubユーザー名
 * @returns {Object[]} Githubユーザー情報
 */
async function getUsers(names) {
  let users = [];
  try {
    for (let name of names) {
      let response = await fetch(`https://api.github.com/users/${name}`);
      if (response.ok) {
        let user = await response.json();
        users.push(user);
      } else {
        users.push(null);
        let httpStatusCode = response.status;
        console.log(
          `HTTP ERROR : ${httpStatusCode} ${name}の取得リクエストは失敗しました。`
        );
      }
    }

    return users;
  } catch (error) {
    alert(error);
  }
}
