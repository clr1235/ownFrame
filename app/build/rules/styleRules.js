const path = require('path')
// 将css抽离成单独的文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const config = require('../config')
// const {resolve} = require('../utils')


const cssLoader = modules => ({
  loader: 'css-loader',
  options: {
    // 是否开启css modules配置
    modules: modules ? (
      {
        mode: 'local',
        localIdentName: '[local]--[hash:base64:8]'
      }
    ) : false
  }
}) 

const sassLoader = {
  loader: 'sass-loader',
}

const lessLoader = {
  loader: 'less-loader', // 升级到6.0.0版本以后 将javascriptEnabled挪到了lessOtions属性下
  options: {
    lessOptions: {
      javascriptEnabled: true,
    }
  }
}

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: () => [autoprefixer()]
  }
}

const baseLoaders = modules => ([
  config.extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
  cssLoader(modules),
  postcssLoader
])

module.exports = [
  {
    test: /\.css$/,
    // include: [resolve('node_modules')],
    use: baseLoaders(false)
  },
  {
    test: /\.scss$/,
    // include: resolve('src'),
    exclude: /node_modules/,
    use: [...baseLoaders(true), sassLoader]
  },
  {
    // 处理antd库
    test: /\.less$/,
    use: [...baseLoaders(false), lessLoader]
  }
]