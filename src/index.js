const { getOptions } = require('loader-utils')
const Svgo = require('svgo')

const defaultPlugins = [
  { cleanupAttrs: true },
  { inlineStyles: true },
  { removeDoctype: true },
  { removeXMLProcInst: true },
  { removeComments: true },
  { removeMetadata: true },
  { removeTitle: true },
  { removeDesc: true },
  { removeUselessDefs: true },
  { removeXMLNS: false },
  { removeEditorsNSData: true },
  { removeEmptyAttrs: true },
  { removeHiddenElems: true },
  { removeEmptyText: true },
  { removeEmptyContainers: true },
  { removeViewBox: true },
  { cleanupEnableBackground: true },
  { minifyStyles: true },
  { convertStyleToAttrs: true },
  { convertColors: true },
  { convertPathData: true },
  { convertTransform: true },
  { removeUnknownsAndDefaults: true },
  { removeNonInheritableGroupAttrs: true },
  { removeUselessStrokeAndFill: true },
  { removeUnusedNS: true },
  { prefixIds: false },
  { cleanupIDs: true },
  { cleanupNumericValues: true },
  { cleanupListOfValues: false },
  { moveElemsAttrsToGroup: true },
  { moveGroupAttrsToElems: true },
  { collapseGroups: true },
  { removeRasterImages: false },
  { mergePaths: true },
  { convertShapeToPath: true },
  { convertEllipseToCircle: true },
  { sortAttrs: false },
  { sortDefsChildren: true },
  { removeDimensions: false },
  { removeAttrs: false },
  { removeAttributesBySelector: false },
  { removeElementsByAttr: false },
  { addClassesToSVGElement: false },
  { addAttributesToSVGElement: false },
  { removeOffCanvasPaths: false },
  { removeStyleElement: false },
  { removeScriptElement: false },
  { reusePaths: false },
]

module.exports = function loader(source) {
  const callback = this.async()
  const options = getOptions(this)

  const svgo = new Svgo({
    plugins: [...defaultPlugins, ...(options.plugins || [])],
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
