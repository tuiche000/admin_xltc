const path = require('path');
const { stylelintPlugin, htmlPlugin } = require('../config');
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  output: {
    filename: '[name]-[hash].js',
    path:  __dirname + '/build'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '../'),
    compress: true,
    port: 3000,
    open: true,
    disableHostCheck: true,
    proxy: {
      '/api': 'http://checking.fothing.com/',
    }
  },
  plugins: [
    ...stylelintPlugin,
    htmlPlugin,
    new webpack.DefinePlugin({
      // 源码中所有 process.env 都会被替换为
      // '../config/dev.env'这个module export出来的东西
      'process.env': require('./dev.env')
    })
  ]
};
