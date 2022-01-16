console.log('index.js is loaded');

// eslint-disable-next-line no-unused-vars
function main() {
  fetchUserInfo('js-primer-example').catch((error) => {
    console.error(`非同期処理でエラーが発生: ${error}`);
  });
}

// eslint-disable-next-line no-unused-vars
function fetchUserInfo(userId) {
  return fetch(
    `https://api.github.com/users/${encodeURIComponent(userId)}`
  ).then((response) => {
    if (!response.status) {
      return Promise.reject(
        new Error(`${response.status}: ${response.statusText}`)
      );
    } else {
      return response.json().then((userInfo) => {
        const view = createView(userInfo);
        displayView(view);
      });
    }
  });
}

function createView(userInfo) {
  return escapeHTML`
  <h4>${userInfo.name} (@${userInfo.login})</h4>
  <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
  <dl>
      <dt>Location</dt>
      <dd>${userInfo.location}</dd>
      <dt>Repositories</dt>
      <dd>${userInfo.public_repos}</dd>
  </dl>
  `;
}

function displayView(view) {
  const result = document.getElementById('result');
  result.innerHTML = view;
}

function escapeSpecialChars(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

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
