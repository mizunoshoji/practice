const program = require('commander');
const fs = require('fs');
const md2html = require('./md2html');

program.option('--gfm', 'GFMを有効にする');
program.parse(process.argv);
const filePath = program.args[0];

const options = program.opts();

const cliOptions = {
  gfm: options.gfm ?? false,
};

fs.readFile(filePath, { encoding: 'utf8' }, (err, file) => {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }
  const html = md2html(file, cliOptions);
  console.log(html);
});

// console.log('コマンドラインで付与されたオプションを取得している', options);
// console.log('パース前: ', process.argv);
// console.log('パース後: ', program.args);
// console.log(program.args[0]);
