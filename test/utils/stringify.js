module.exports = function loader(content) {
  return `export default '${content}'`
}
