/**
 * Created by Jackie.Wu on 2018/7/16.
 */
const path = require('path');
module.exports = {
  // 打包出来的js代码执行在哪个环境
  target: 'node',
  entry: {
    app: path.join(__dirname, '../server/start/index.js')
  },
  output: {
    // 服务端没有浏览器缓存 hash没必要，同时要自己手动引入js
    filename: '[name].js',
    path: path.join(__dirname, '../dist'),
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: [path.join(__dirname, '../node_modules')]
      }
    ]
  }
}
