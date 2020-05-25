const {resolve} = require('../utils')

module.exports = [
  {
    test: /\.(j|t)sx?$/,
    include: [resolve('src')],
    exclude: /node_modules/,
    use: [
      {
        // loader: 'babel-loader',
        // 把对.js 的文件处理交给id为js的HappyPack 的实例执行
        loader: "happypack/loader?id=js",
        options: {
          babelrc: false,   // 不启用.babelrc文件中的配置
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
            ['@babel/preset-typescript', {
              allExtensions: true // 支持所有文件扩展名
            }]
          ],
          plugins: [
            ['import', { libraryName: 'antd', libraryDirectory: 'lib', style: true }],
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            '@babel/plugin-syntax-dynamic-import'
          ]
        }
      }
    ]
  }
]