## 第一步
  yarn init  初始化配置package.json文件
## 安装依赖
  1. yarn add webpack webpack-cli   
  2. 使用webpack配置文件 创建webpack.config.js
  webpack4.0以上不兼容 extract-text-webpack-plugin3.0  需要将其升级  npm install --save-dev extract-text-webpack-plugin@4.0.0-beta.0   
  extract-text-webpack-plugin包  已经废弃

  使用 uglifyjs-webpack-plugin 无法实现去除控制台的信息，导致如下报错： 
  ERROR in app.44bb0211.js from UglifyJs
  DefaultsError: `warnings` is not a supported option

  可使用terser-webpack-plugin 代替，实现生产去除 console.log