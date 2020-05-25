const constants = require('./../constants')
const { resolve } = require('./../utils')

const cacheLoader = {
  // 在一些性能开销较大的 loader 之前添加此 loader，以将结果缓存到磁盘里
  // 请注意，保存和读取这些缓存文件会有一些时间开销，所以请只对性能开销较大的 loader 使用此 loader。
  loader: 'cache-loader',
  options: {
    // provide a cache directory where cache items should be stored
    cacheDirectory: resolve('.cache-loader')
  }
}

module.exports = {
    cacheLoader
}
