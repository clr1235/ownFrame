const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const {resolve, assetsPath} = require('./utils')
const config = require('./config')
const constants = require('./constants')
const styleRules = require('./rules/styleRules')
const jsRules = require('./rules/jsRules')
const fileRules = require('./rules/fileRules')
const plugins = require('./plugins')
const optimization = require('./optimization')
const alias = require('./alias')

// __dirname表示当前文件所在目录，__filename表示正在执行脚本的文件名

// webpack 配置项
const conf = {
  // 模式
  mode: process.env.NODE_ENV,
  // 入口
  entry: {
    app: [path.resolve(__dirname, '../index.tsx')]
  },
  // 输出
  output: {
    path: config.assetsRoot,
    // 此选项决定了输出bundle的名称。并且将写入到output.path选项指定的目录下。
    filename: constants.APP_ENV === 'dev' ? '[name].js' : assetsPath('js/[name].[chunkhash:6].js'),
    // 此选项决定了非入口chunk文件的名称
    chunkFilename: constants.APP_ENV === 'dev' ? '[name].js' : assetsPath('js/[name].[id].[chunkhash:6].js'),
    // 对于按需加载(on-demand-load)或加载外部资源(external resources)（如图片、文件等）来说，output.publicPath 是很重要的选项。如果指定了一个错误的值，则在加载这些资源时会收到 404 错误。
    publicPath: config.assetsPublicPath
  },
  // 解析
  resolve: { 
    // 自动解析确定的扩展
    extensions: constants.FILE_EXTENSIONS,  
    // 应该使用的额外的解析插件列表
    plugins: [
      new TsconfigPathsPlugin({
        configFile: resolve('tsconfig.webpack.json'),
        extensions: constants.FILE_EXTENSIONS
      })
    ],
    // 创建 import 或 require 的别名，来确保模块引入变得更简单
    alias,
  },
  // 模块
  module: {
    // 创建模块时，请求的规则数组。这些规则能够修改模块的创建方式。这些规则能够对模块(module)应用loader，或者修改解析器(parser)
    rules: [
      ...styleRules,
      ...jsRules,
      ...fileRules
    ]
  },
  // 插件
  plugins,
  // 压缩
  optimization,
  devtool: config.sourceMap,
  stats: "errors-only",
  performance: {
    hints:'warning',
	  //入口起点的最大体积
	  maxEntrypointSize: 50000000,
	  //生成文件的最大体积
	  maxAssetSize: 30000000,
	  //只给出 js 文件的性能提示
	  assetFilter: function(assetFilename) {
	    return assetFilename.endsWith('.js');
	  }
  }
}

if(process.env.NODE_ENV === 'development'){
  // 开发环境配置
  conf.devServer = {
    /**
     * contentBase告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要。
     * devServer.publicPath 将用于确定应该从哪里提供 bundle，并且此选项优先。
     * 默认情况下，将使用当前工作目录作为提供内容的目录，你也可以修改为其他目录。
     * 注意：推荐使用绝对路径。
    */
    historyApiFallback: true,
    inline: true,
    hot: true,
    open: false,
    stats: {
      // 控制开发环境的控制台打印信息
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
      timings: false,
      errors: true,
      env: false,
      version: false,
      hash: false
    }
    
  }
}

module.exports = conf;