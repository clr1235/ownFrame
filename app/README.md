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


  使用@babel/preset-typescript取代awesome-typescript-loader和ts-loader  https://www.cnblogs.com/vvjiang/archive/2019/12/18/12057811.html

## 爬坑记
  1.由于loader配置 有问题 导致如下报错：
  ERROR in ./index.tsx 7:2
  Module parse failed: Unexpected token (7:2)
  You may need an appropriate loader to handle this file type, currently no loader
  s are configured to process this file. See https://webpack.js.org/concepts#loade
  rs
  |
  | ReactDOM.render(
  >   <Hello compiler="typeScript" framework="react" />,
  |   document.getElementById('root')
  | )
  @ multi ./index.tsx app[0]

  最后坑了好长时间，发现是配置中的include或者exclude之后的值，必须是绝对路径或者正则才行。
2. webpack配置问题：HappyPack: plugin for the loader ‘1’ could not be found？
  用了 happypack 之后，不能在 rules 里面的相关 loader 中配置 options，相反只能在 happypack 插件中配置 options！

3. @babel/preset-typescript 预设了allExtensions: true 导致了以下的报错
  ERROR in ./index.tsx
  Module build failed (from ./node_modules/babel-loader/lib/index.js):
  SyntaxError: E:\person\ownFrame\app\index.tsx: Unexpected token, expected "," (7:11)

4. 配置 performance选项可解决 打包时控制台输出的warning asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).
  