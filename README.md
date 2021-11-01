# svgo-loader

Webpack loader to optimize svg images with [svgo](https://github.com/svg/svgo). Produces an svg
string, so another loader like `file-loader` is needed to actually emit the transformed file.

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
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      removeViewBox: false,
                    },
                  },
                },
                { name: 'removeDimensions' },
              ],
            },
          },
        ],
      },
    ],
  },
}
```

## Options

Use the [`plugins` option](https://github.com/svg/svgo#configuration) to enable/disable and
configure [svgo plugins](https://github.com/svg/svgo#built-in-plugins). Note that providing a
`plugins` option overrides the default plugin preset. Use `preset-default` to include it.
