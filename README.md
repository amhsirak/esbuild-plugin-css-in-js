## esbuild-plugin-css-in-js

esbuild plugin to bundle and embed css(inline) in js

### Installation

```
npm install esbuild-plugin-css-in-js
```

### Usage

```js
const esbuild = require('esbuild');
const EmbedCSSPlugin = require('esbuild-plugin-css-in-js');

esbuild.build({
    plugins: [
        EmbedCSSPlugin()
    ]
});
```
