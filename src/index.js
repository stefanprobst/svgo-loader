const { getOptions } = require('loader-utils')
const Svgo = require('svgo')

module.exports = function loader(source) {
  const callback = this.async()
  const options = getOptions(this)

  const svgo = new Svgo({
    plugins: options.plugins,
  })
  svgo
    .optimize(source, { path: this.resourcePath })
    .then((result) => {
      const { data, info } = result
      callback(null, data, undefined, info)
    })
    .catch((error) => {
      callback(error)
    })
}
