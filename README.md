# svgo-loader

Webpack loader to optimize svg images with [svgo](https://github.com/svg/svgo).
Produces an svg string, so another loader like `file-loader` is needed to
actually emit the transformed file.

## How to use

```js
// webpack.config.js

module.exports = {
  /* ... */
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: require.resolve('file-loader'),
          },
          {
            loader: require.resolve('@stefanprobst/svgo-loader'),
            options: {
              plugins: [{ removeViewBox: false }, { removeDimensions: true }],
            },
          },
        ],
      },
    ],
  },
}
```

## Options

Use the `plugins` option to enable/disable and configure
[svgo plugins](https://github.com/svg/svgo#what-it-can-do). The expected format
is `Array<{ [pluginName: string]: boolean | Record<string, unknown>}>`.
