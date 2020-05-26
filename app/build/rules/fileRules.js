const {assetsPath, resolve} = require('../utils')

function handleFileLoader(assetsPrefix) {
  return {
    loader: 'file-loader',
    options: {
      limit: 10000,
      name: assetsPath(`[name].[hash:6].[ext]`),
      outputPath: assetsPath(`${assetsPrefix}/`)
    }
  }
}

module.exports = [
  {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    use: [handleFileLoader('img')]
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    use: [handleFileLoader('fonts')]
  }
]
