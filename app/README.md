## 初始化
  yarn init  初始化配置package.json文件 
## 安装依赖
  1. yarn add webpack webpack-cli   
  2. yarn add react react-dom @types/react @types/react-dom typescript
  3. yarn add webpack-dev-server
  4. 使用webpack配置文件 创建webpack.config.js 
## 填坑记
  1. webpack4.0以上不兼容 extract-text-webpack-plugin3.0  需要将其升级  npm install --save-dev extract-text-webpack-plugin@4.0.0-beta.0   
  extract-text-webpack-plugin包  已经废弃

  2. 使用 uglifyjs-webpack-plugin 无法实现去除控制台的信息，导致如下报错： 
      ERROR in app.44bb0211.js from UglifyJs
      DefaultsError: `warnings` is not a supported option

  可使用terser-webpack-plugin 代替，实现生产去除 console.log

  3. mini-css-extract-plugin只支持webpack4.0以上版本，应该只在生产环境构件中使用，且在loader链中不应该有style-loader,尤其是开发模式中使用HMR时。

  4. friendly-errors-webpack-plugin 友好的错误提示插件

## 注意点
  1. HappyPack 对file-loader、url-loader 支持的不友好，所以不建议对该loader使用。
  2. cssnano是PostCSS的CSS优化和分解插件。cssnano采用格式很好的CSS，并通过许多优化，以确保最终的生产环境尽可能小。插件将配合optimize-css-assets-webpack-plugin 将你的css文件做多当面的优化，以确保最终生成的文件对生产环境来说体积时最小的