const path = require('path')
const { createFsFromVolume, Volume } = require('memfs')
const webpack = require('webpack')

module.exports = function compiler(fixture, options = {}) {
  const compiler = webpack({
    mode: 'production',
    context: __dirname,
    entry: `../${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.svg$/,
          use: [
            {
              loader: path.resolve(__dirname, 'stringify.js'),
            },
            {
              loader: path.resolve(__dirname, '../../src/index.js'),
              options,
            },
          ],
        },
      ],
    },
  })

  compiler.outputFileSystem = createFsFromVolume(new Volume())
  compiler.outputFileSystem.join = path.join.bind(path)

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err)
      if (stats.hasErrors()) reject(new Error(stats.toJson().errors))

      resolve(stats)
    })
  })
}
