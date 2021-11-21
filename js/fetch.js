/* eslint-disable prefer-const */

/* 参考ページ
 * https://jsprimer.net/basic/async/
 * https://docs.microsoft.com/ja-jp/learn/modules/use-apis-discover-museum-art/
 */

getUsers(['mizunoshoji', 'iliakan', 'notexistuser']).then((results) =>
  console.log(results)
);

// メトロポリタン美術館のアイテムのデータを取得する。
let objectIdMet = '56142'; // このオブジェクトIDを得たとする
getObjectMet(objectIdMet).then(
  (response) => {
    response.json().then((result) => {
      console.log(result);
      const url = result.primaryImage;
      showImages(url);
    });
  },
  (error) => {
    console.log(error);
  }
);

// クーパーヒューイットAPIへのリクエストURL
const url =
  'https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.search.collection&access_token=07ac72c0ca5f2a25a40bfc3abc4730a9&query=clock%20radio&has_images=true&page=1&per_page=100';

getCollections(url).then((results) => {
  showImagesCooper(results);
});

// ローカルjson-serverに対するリクエスト用
// const json = {
//   id: 5,
//   item: 'The Fiancés',
//   artist: 'Pierre Auguste Renoir',
//   collection: 'Wallraf–Richartz Museum, Cologne, Germany',
//   date: '1868',
// };
// postData(json);

// const objectIdLocal = 5;
// getData(objectIdLocal);
// deleteData(objectIdLocal);

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

/**
 * APIにリクエストしてデータを取得する。
 * @param {string} url
 */
async function getCollections(url) {
  try {
    let response = await fetch(url);
    let results = await response.json();
    return results;
  } catch (error) {
    console.log(error);
  }
}

async function showImagesCooper(results) {
  const h2 = document.createElement('h2');
  h2.textContent =
    'クーパーヒューイット美術館APIからデータを取得して画像を表示する例';
  document.body.append(h2);

  for (let i = 0; i < 3; i++) {
    const imgUrl = results.objects[i].images[0].b.url;
    console.log(imgUrl);
    showImages(imgUrl);
  }
}

async function showImages(imgUrl) {
  let imageData = await fetch(imgUrl);
  let imgBlob = await imageData.blob();
  let img = document.createElement('img');
  document.body.append(img);
  img.src = URL.createObjectURL(imgBlob);
  URL.revokeObjectURL(imgBlob);
}

async function getObjectMet(id) {
  try {
    const results = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
    );
    return results;
  } catch (error) {
    console.log(error);
  }
}

// json-server localhost:3000 でアクセスできるREST APIに対するリクエスト
// postでjsonをAPIに送信して書き込む
// function postData(json) {
//   fetch('http://localhost:3000/objects/', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8',
//     },
//     body: JSON.stringify(json),
//   });
// }

// // GETでデータを取得する
// function getData(id) {
//   fetch(`http://localhost:3000/objects/${id}`, {
//     method: 'GET',
//   });
// }

// // DELETEでデータを削除する
// function deleteData(id) {
//   fetch(`http://localhost:3000/objects/${id}`, {
//     method: 'DELETE',
//   });
// }
