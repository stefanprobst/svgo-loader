const { optimize } = require('svgo')

module.exports = function loader(source) {
  const callback = this.async()
  const options = this.getOptions()

  try {
    const result = optimize(source, { ...options, path: this.resourcePath })
    const { data, info } = result
    callback(null, data, undefined, info)
  } catch (error) {
    callback(error)
  }
}
