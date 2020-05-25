const path = require('path')
const os = require('os') // 操作系统
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 将css和js文件分离  配合loader使用
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 清除打包生成的文件
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// 控制台输出信息优化插件
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
// 使用happypack提升打包速度
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const constants = require('constants')
const config = require('./config')
const { assetsPath } = require('./utils')

const basePlugins = [

]

const devPlugins = [
  new HtmlWebpackPlugin({
    title: 'dev',
    template: path.resolve(__dirname, './tpl/index.html'),
    filename: 'index.html',
    inject: true
  }),
  // 热加载插件
  new webpack.HotModuleReplacementPlugin(),
  new FriendlyErrorsWebpackPlugin()
]

const prodPlugins = [
  new CleanWebpackPlugin({
    verbose: false,  //开启在控制台输出信息
    root: path.resolve(__dirname, `./../dist/${constants.APP_ENV}`)   // 根目录
  }),
  new webpack.WatchIgnorePlugin([/css\.d\.ts$/]),
  new HtmlWebpackPlugin({
    title: 'prod',
    filename: config.index,
    template: path.resolve(__dirname, './tpl/index.html'),
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    }
  }),
  new MiniCssExtractPlugin({
    filename: assetsPath('css/[name].[contenthash:6].css'),
    chunkFilename: assetsPath('css/[name].[id].[contenthash:6].css'),
    ignoreOrder: true
  }),
  new HappyPack({
    // 用id来标识 happypack处理哪类文件
    id: 'js',
    // 是否允许happypack输出日志
    verbose: false,
    // 共享进程池
    threadPool: happyThreadPool,
    // 如何处理 用法和loader的配置一样
    loaders: ['babel-loader?cacheDirectory=true'],
    // loaders: [{
    //   loader: 'babel-loader',
    //   cacheDirectory: true,
    //   options: {
    //     babelrc: false,   // 不启用.babelrc文件中的配置
    //       presets: [
    //         '@babel/preset-env',
    //         '@babel/preset-react',
    //         ['@babel/preset-typescript', {
    //           allExtensions: true // 支持所有文件扩展名
    //         }]
    //       ],
    //       plugins: [
    //         ['import', { libraryName: 'antd', libraryDirectory: 'lib', style: true }],
    //         ['@babel/plugin-proposal-decorators', { legacy: true }],
    //         ['@babel/plugin-proposal-class-properties', { loose: true }],
    //         '@babel/plugin-syntax-dynamic-import'
    //       ]
    //   }
    // }]
  })
]

const resultPlugins = basePlugins.concat(constants.APP_ENV === 'dev' ? devPlugins : prodPlugins)

module.exports = resultPlugins;