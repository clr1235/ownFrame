const constants = require('./constants')
const config = require('./config')
// 压缩js
const TerserPlugin = require('terser-webpack-plugin')
// 压缩css
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const cssnano = require("cssnano");

module.exports = constants.APP_ENV === 'dev' ? {} : {
  //打包压缩js/css文件
  minimizer: [
    new TerserPlugin({
      sourceMap: Boolean(config.sourceMap),
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
      cssProcessorOptions: {
        reduceIdents: false,
        autoprefixer: false
      },
      canPrint: false,
    })
  ],
   // 提取公共模块 包括第三方库和自定义工具库
  splitChunks: {
    chunks: "all",  // async表示抽取异步模块，all表示对所有模块生效，initial表示对同步模块生效
    // 缓存组
    cacheGroups: {
      default: false,
      buildup: {
        chunks: 'all',
        test: /[\\/]node_modules[\\/]/
      },
      commons: {
        name: 'commons',
        chunks: 'initial',
        minChunks: 2,
        reuseExistingChunk: true
      },
      vendors: {  // 抽离第三方库
        name: 'vendors',
        // test: /[\\/]node_modules[\\/]/,
        test: /[\\/]node_modules[\\/](react|react-dom|lodash|moment|immutable|mobx|mobx-react|axios)[\\/]/,
        priority: -10, // 权重，数值越大权重越高
        // 表示是否使用已有的 chunk，true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的，即几个 chunk 复用被拆分出去的一个 module
        reuseExistingChunk: false
      },
      utilCommon: { // 抽离自定义工具库
        name: "utilCommon",
        minSize: 0,     // 将引用模块分离成新代码文件的最小体积
        minChunks: 2,   // 表示将引用模块如不同文件引用了多少次，才能分离生成新chunk
        priority: -20
      }
    }
  },
  runtimeChunk: {
    name: 'manifest'
  }
}