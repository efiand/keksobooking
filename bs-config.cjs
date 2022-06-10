const { ESLint } = require("eslint");

const JS_FILES = 'public/js/**/*.js';

module.exports = {
  server: 'public',
  ui: false,
  files: [
    {
      match: 'public/**/*.{html,css}',
    },
    {
      match: JS_FILES,
      async fn() {
        try {
          const eslint = new ESLint();
          const results = await eslint.lintFiles(JS_FILES);
          const formatter = await eslint.loadFormatter('stylish');

          if (results.filter(({ messages }) => messages.length).length) {
            console.log(formatter.format(results));
          } else {
            this.reload();
          }
        } catch (err) {
          process.exitCode = 1;
          console.error(err);
        }
      },
    },
  ],
};
