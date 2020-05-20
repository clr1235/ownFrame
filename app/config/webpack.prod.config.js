const pkg = require('../package.json')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');
// 将css抽离成单独的文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 解决由其它配置引起的ReferenceError: resolve is not defined报错
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../index.js'),
    vender: Object.keys(pkg.dependencies)
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: "[name].[chunkhash:8].js",
    //对于按需加载(on-demand-load)或加载外部资源(external resources)（如图片、文件等）来说，output.publicPath 是很重要的选项。
    publicPath: "/"
  },
  resolve: { // 解析
    extensions: ['.js', '.jsx', '.json']  // 自动解析确定的扩展
  },
  mode: "production",
  module: {
    // 创建模块时，请求的规则数组。这些规则能够修改模块的创建方式。这些规则能够对模块(module)应用loader，或者修改解析器(parser)
    rules: [{
      // 该配置指明使用babel解析js和jsx文件
      test: /\.(js|jsx)$/,
      include: [path.resolve(__dirname, '../app')],
      exclude: /node_modules/,
      use: [{
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: [
            "@babel/transform-runtime",
            ["@babel/plugin-proposal-decorators", {"legacy": true}],
            ["@babel/plugin-proposal-class-properties", { "loose" : true }]
          ]
        }
      }]
    }, {
      test: /\.less$/,
      include: [path.resolve(__dirname, '../app')],
      exclude: /node_modules/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: process.env.NODE_ENV === 'development',
          },
        },
        'style-loader',
        'css-loader',
        'postcss-loader',
        'less-loader'
      ]
    }, {
      test: /\.(sa|sc|c)ss$/,
      include: [path.resolve(__dirname, '../app')],
      exclude: /node_modules/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: process.env.NODE_ENV === 'development',
          },
        },
        'style-loader',
        'css-loader',
        'postcss-loader',
        'sass-loader'
      ]
    }, {
      test: /\.(png|svg|jpg|gif)$/,
      include: [path.resolve(__dirname, '../app')],
      exclude: /node_modules/,
      use: [{
        loader: "file-loader",
        options: {
          name(file) {
            if(process.env.NODE_ENV === 'development'){
              return '[path][name].[ext]'
            }
            return '[hash].[ext]'
          }
        }
      }]
    }, {
      test:/\.(png|woff|woff2|svg|ttf|eot)($|\?)/i,
      include: [path.resolve(__dirname, '../app')],
      exclude: /node_modules/,
      use: [{
        loader: 'file-loader',
        options: {
          name(file) {
            if(process.env.NODE_ENV === 'development'){
              return '[path][name].[ext]'
            }
            return '[hash].[ext]'
          },
          outputPath(file){
            if(process.env.NODE_ENV === 'development'){
              return '../dist'
            }
            return '../public'
          }
        }
      }]
    }, {
      test: /\.html$/,
      loader: 'html-loader',
      include: [path.resolve(__dirname, '../app')],
      exclude: /node_modules/,
      options: {
        attrs: false,
        minimize: true,
        removeComments: true,
        collapseWhitespace: true
      }
    }]
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: false,  //开启在控制台输出信息
      root: path.resolve(__dirname, '../dist')   // 根目录
    }),
    new HtmlWebpackPlugin({
      title: 'production',
      template: path.resolve(__dirname, './index.html'),
      filename: 'index.html',
    }),
    // 将css和js文件分离  配合loader
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash:8].css',
      chunkFilename: '[chunkhash:8].css'
    }),
    
    // 提取公共代码

  ],

}