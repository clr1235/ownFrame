const path = require('path')

const { resolve } = require('./../utils')
const constants = require('../constants')
const config = require('../config')
const { cacheLoader } = require('./loaders')

module.exports = constants.APP_ENV === 'dev' ? [
  {
    test: /\.(j|t)sx?$/,
    // include: [resolve('src')],  // 放开会报错 Module parse failed: Unexpected token (7:4)
// You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file.
    exclude: /node_modules/,
    use: [
      cacheLoader,
      {
        loader: 'babel-loader',
        // options: {
        //   babelrc: false,   // 不启用.babelrc文件中的配置
        //   presets: [
        //     '@babel/preset-env',
        //     '@babel/preset-react',
        //     ['@babel/preset-typescript', {
        //       // allExtensions: true // 支持所有文件扩展名，开启会导致解析文件报错 
        //     }]
        //   ],
        //   plugins: [
        //     ['import', { libraryName: 'antd', libraryDirectory: 'lib', style: true }],
        //     ['@babel/plugin-proposal-decorators', { legacy: true }],
        //     ['@babel/plugin-proposal-class-properties', { loose: true }],
        //     '@babel/plugin-syntax-dynamic-import'
        //   ]
        // }
      }
    ]
  }
] : [
  {
    test: /\.(j|t)sx?$/,
    exclude: /node_modules/,
    use: [cacheLoader, "happypack/loader?id=js"]
  }
]