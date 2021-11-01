/** @jest-environment node */

const compiler = require('./utils/compiler.js')

const fixture = 'fixtures/test.svg'

describe('Apply svgo optimizations to image', () => {
  it('Should remove viewBox attribute', async () => {
    const stats = await compiler(fixture)
    const output = stats.compilation.modules[0]._source._value

    expect(output).toMatchInlineSnapshot(
      `"export default '<svg width=\\"100\\" height=\\"100\\"><circle r=\\"50\\" cx=\\"50\\" fill=\\"#ff1493\\"/></svg>'"`,
    )
  })

  it('Should remove width and height attributes with custom plugin config', async () => {
    const stats = await compiler(fixture, {
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
    })
    const output = stats.compilation.modules[0]._source._value

    expect(output).toMatchInlineSnapshot(
      `"export default '<svg viewBox=\\"0 0 100 100\\"><circle r=\\"50\\" cx=\\"50\\" fill=\\"#ff1493\\"/></svg>'"`,
    )
  })
})
