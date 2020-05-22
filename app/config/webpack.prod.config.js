// const pkg = require('../package.json')
const path = require('path')
const os = require('os') // 操作系统
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');
// 压缩js
const TerserPlugin = require('terser-webpack-plugin');
// 将css抽离成单独的文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const cssnano = require("cssnano");
// 使用happypack提升打包速度
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
// 使用ts
const { CheckerPlugin } = require('awesome-typescript-loader')


module.exports = {
  entry: {
    app: path.resolve(__dirname, '../index.js')
  },
  output: {
    path: path.resolve(__dirname, '../public/js'),
    filename: "[name].[chunkhash:6].js",
    //对于按需加载(on-demand-load)或加载外部资源(external resources)（如图片、文件等）来说，output.publicPath 是很重要的选项。
    publicPath: "/"
  },
  resolve: { // 解析
    extensions: ['.js', '.jsx', '.tsx', '.ts', '.json']  // 自动解析确定的扩展
  },
  mode: "production",
  module: {
    // 创建模块时，请求的规则数组。这些规则能够修改模块的创建方式。这些规则能够对模块(module)应用loader，或者修改解析器(parser)
    rules: [{
      // 该配置指明使用babel解析js和jsx文件
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: [{
        // loader: 'babel-loader',
        // 把对.js 的文件处理交给id为js的HappyPack 的实例执行
        loader: "happypack/loader?id=js"
      }, {
        loader: "source-map-loader"
      }]
    }, {
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: [{
        loader: "happypack/loader?id=ts"
      }]
    }, {
      test: /antd.*\.less$/,
      exclude: /node_modules/,
      use: [
        {
          loader: process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          options: {
            hmr: process.env.NODE_ENV === 'development',
          },
        },
        {
          loader: 'css-loader',
          options: {
            modules: true, // 启用css modules
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [autoprefixer()]
          }
        },
        {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true
          }
        }
      ]
    }, {
      test: /\.(sa|sc|c)ss$/,
      exclude: /node_modules/,
      use: [
        {
          loader: process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          options: {
            hmr: process.env.NODE_ENV === 'development',
          },
        },
        {
          loader: 'css-loader',
          options: {
            modules: true // 启用css modules
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [autoprefixer()]
          }
        },
        'sass-loader'
      ]
    }, {
      test: /\.(png|svg|jpg|gif)$/,
      exclude: /node_modules/,
      use: [{
        loader: "file-loader",
        options: {
          name(file) {
            if(process.env.NODE_ENV === 'development'){
              return '[path][name].[ext]'
            }
            return '../img/[name].[hash:6].[ext]'
          }
        }
      }]
    }, {
      test:/\.(woff|woff2|svg|ttf|eot)($|\?)/i,
      exclude: /node_modules/,
      use: [{
        loader: 'file-loader',
        options: {
          name(file) {
            if(process.env.NODE_ENV === 'development'){
              return '[path][name].[ext]'
            }
            return '../img/[name].[hash:6].[ext]'
          }
        }
      }]
    // }, {
    //   // 此loader配置暂时有点问题 先注释
    //   test: /\.html$/,
    //   loader: 'html-loader',
    //   include: [path.resolve(__dirname, '../app')],
    //   exclude: /node_modules/,
    //   options: {
    //     attrs: false,
    //     minimize: true,
    //     removeComments: true,
    //     collapseWhitespace: true
    //   }
    }]
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: false,  //开启在控制台输出信息
      root: path.resolve(__dirname, '../public')   // 根目录
    }),
    new HtmlWebpackPlugin({
      title: 'production',
      template: path.resolve(__dirname, './index.html'),
      filename: 'index.html',
      // 生成的html文件中引入的js文件名，与entry入口和splitChunks分离等配置的js文件名相同
      chunks: ["app", "styles", "vendors", "commons", "utilCommon"]
    }),
    new webpack.DefinePlugin({
      // 定义 NODE_ENV 环境变量为 production
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    // 将css和js文件分离  配合loader
    new MiniCssExtractPlugin({
      filename: '../styles/[name].[contenthash:6].css',
      chunkFilename: '../styles/[name].[contenthash:6].chunk.css'
    }),
    new CheckerPlugin(),
    new HappyPack({
      // 用id来标识 happypack处理哪类文件
      id: 'js',
      // 是否允许happypack输出日志
      verbose: false,
      // 共享进程池
      threadPool: happyThreadPool,
      // 如何处理 用法和loader的配置一样
      loaders: ['babel-loader?cacheDirectory=true']
    }),
    new HappyPack({
      id: 'ts',
      verbose: false,
      threadPool: happyThreadPool,
      loaders: ['awesome-typescript-loader?cacheDirectory=true']
    }),
    
  ],
  optimization: {
    //打包压缩js/css文件
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        terserOptions: {
          ecma: undefined,
          warnings: false,
          parse: {},
          compress: {
            // 删除所有的 `console` 语句，可以兼容ie浏览器
            drop_console: true,
            pure_funcs: ['console.log'] // 移除console
          },
          output: {
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false,
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessor: cssnano,
        canPrint: false,
      })
    ],
     // 提取公共模块 包括第三方库和自定义工具库
    splitChunks: {
      chunks: "all",  // async表示抽取异步模块，all表示对所有模块生效，initial表示对同步模块生效
      cacheGroups: {
        styles: {
          name: 'app',
          test: /\.(css|less|scss)/,
          chunks: 'all',
          enforce: true,
          // 表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。
          reuseExistingChunk: true
        },
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
          reuseExistingChunk: true
        },
        vendors: {  // 抽离第三方库
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true
        },
        utilCommon: { // 抽离自定义工具库
          name: "common",
          minSize: 0,     // 将引用模块分离成新代码文件的最小体积
          minChunks: 2,   // 表示将引用模块如不同文件引用了多少次，才能分离生成新chunk
          priority: -20
        }
      }
    },
    runtimeChunk: true

  },
  //添加 stats 配置过滤打包时出现的一些统计信息。
  stats: {
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  },
  //添加 performance 配置关闭性能提示
  performance: {
    hints: false
  }
}