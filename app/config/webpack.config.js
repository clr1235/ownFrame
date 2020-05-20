const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const autoprefixer = require('autoprefixer');



// __dirname表示当前文件所在目录，__filename表示正在执行脚本的文件名



module.exports = {
  entry: path.resolve(__dirname, '../index.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "[name].[hash].bundle.js",
    // chunkFilename: "[name].[chunkhash].js" // 此选项决定了非入口chunk文件的名称
  },
  resolve: { // 解析
    extensions: ['.js', '.jsx', '.json']  // 自动解析确定的扩展
  },
  mode: "development",
  devServer: {
    /**
     * contentBase告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要。
     * devServer.publicPath 将用于确定应该从哪里提供 bundle，并且此选项优先。
     * 默认情况下，将使用当前工作目录作为提供内容的目录，你也可以修改为其他目录。
     * 注意：推荐使用绝对路径。
    */
    contentBase: path.resolve(__dirname, "../dist"),
    // 假设服务器运行在 http://localhost:8080 并且 output.filename 被设置为 bundle.js。默认 publicPath 是 "/"，所以你的包(bundle)可以通过 http://localhost:8080/bundle.js 访问。
    // publicPath: "/dist/", // 表示包可以通过http://localhost:8080/dist/bundle.js访问
    historyApiFallback: true,
    inline: true,
    hot: true,
    open: true
  },
  module: {
    // 创建模块时，请求的规则数组。这些规则能够修改模块的创建方式。这些规则能够对模块(module)应用loader，或者修改解析器(parser)
    rules: [{
      // 该配置指明使用babel解析js和jsx文件
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: [{
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: [
            "@babel/transform-runtime",
            [
              "@babel/plugin-proposal-decorators",
              { "legacy": true }
            ]
          ]
        }
      }]
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      use: [
        {loader: "style-loader",},
        {
          loader: "css-loader"
        },
        {
          loader: "postcss-loader",
          options: {
            plugins: () => [autoprefixer()]
          }
        },
        {
          loader: "less-loader",
          options: {
            javascriptEnabled: true
          }
        }
      ]
    }, {
      test: /\.less$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "style-loader"
        },
        {
          loader: "css-loader"
        },
        {
          loader: "postcss-loader",
          options: {
            plugins: () => [autoprefixer()]
          }
        },
        {
          loader: "less-loader",
          options: {
            javascriptEnabled: true
          }
        }
      ]
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "style-loader"
        },
        {
          loader: "css-loader"
        },
        {
          loader: "postcss-loader",
          options: {
            plugins: () => [autoprefixer()]
          }
        },
        {
          loader: "sass-loader"
        }
      ]
    }, {
      test: /\.(png|svg|jpg|gif)$/,
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
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: true
        }
      }]
    }]
  },
  plugins: [
    // new CleanWebpackPlugin({
    //   verbose: false,  //开启在控制台输出信息
    //   root: path.resolve(__dirname, '../dist')   // 根目录
    // }),
    
    new HtmlWebpackPlugin({
      title: 'development',
      template: path.resolve(__dirname, './index.html'),
      filename: 'index.html',
    }),
    // 热加载插件
    new webpack.HotModuleReplacementPlugin(),

    // new webpack.DefinePlugin({
    //   "process.env.NODE_ENV": JSON.stringify("development")
    // })

  ]
}