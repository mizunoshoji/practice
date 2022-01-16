console.log('index.js is loaded');

// eslint-disable-next-line no-unused-vars
function fetchUserInfo(userId) {
  fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
    .then((response) => {
      console.log('HTTPステータスコード:', response.status);
      if (!response.status) {
        console.log('HTTPエラー', response);
      } else {
        return response.json().then((userInfo) => {
          const view = escapeHTML`
          <h4>${userInfo.name} (@${userInfo.login})</h4>
          <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
          <dl>
              <dt>Location</dt>
              <dd>${userInfo.location}</dd>
              <dt>Repositories</dt>
              <dd>${userInfo.public_repos}</dd>
          </dl>
          `;
          const result = document.getElementById('result');
          result.innerHTML = view;
        });
      }
    })
    .catch((error) => {
      console.log('ネットワークエラー', error);
    });
}

// 特殊文字のエスケープ処理
function escapeSpecialChars(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// HTMLテンプレート文字列のエスケープ処理
function escapeHTML(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i - 1];
    if (typeof value === 'string') {
      return result + escapeSpecialChars(value) + str;
    } else {
      return result + String(value) + str;
    }
  });
}
