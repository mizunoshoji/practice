// CommonJSモジュール
// マークダウン文字列とmarkedのオプションを受け取りHTML文字列を返す関数をエクスポート
const marked = require('marked');

module.exports = (markdown, cliOptions) => {
  return marked.parse(markdown, {
    gfm: cliOptions.gfm,
  });
};
