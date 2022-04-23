const readFile = require('fs-extra').readFileSync;
const path = require('path');
const sha256 = require('sha256');

const EmbedCSSPlugin = (options = {}) => {
  return {
    name: 'esbuild-plugin-css-in-js',
    setup(build) {
      build.onLoad({ filter: /\.(css)$/ }, async (args) => {
        const sourcePath = path.resolve(args.resolveDir, args.path);
        const sourceJS = await generateCSS(sourcePath);
        return {
          contents: sourceJS,
          loader: 'js',
        };
      });
    },
  };
};

async function generateCSS(sourcePath) {
  const styleID = sha256(sourcePath);
  const sourceCSS = await readFile(sourcePath);

  return `(function(){
        if (!document.getElementById('${styleID}')) {
            var e = document.createElement('style');
            e.id = '${styleID}';
            e.textContent = \`${sourceCSS}\`;
            document.head.appendChild(e);
        }
    })();`;
}

module.exports = EmbedCSSPlugin;
