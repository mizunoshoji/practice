const program = require('commander');
const fs = require('fs');
const marked = require('marked');

program.option('--gfm', 'GFMを有効にする');
program.parse(process.argv);

const options = program.opts();

const cliOptions = {
  gfm: options.gfm ?? false,
};

const filePath = program.args[0];

fs.readFile(filePath, { encoding: 'utf8' }, (err, file) => {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }
  const html = marked.parse(file, {
    gfm: cliOptions.gfm,
  });
  console.log(html);
});

// console.log('コマンドラインで付与されたオプションを取得している', options);
// console.log('パース前: ', process.argv);
// console.log('パース後: ', program.args);
// console.log(program.args[0]);
