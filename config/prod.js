const path = require('path');
const { stylelintPlugin, htmlPlugin } = require('../config');
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  output: {
    filename: '[name]-[hash].js',
  },
  plugins: [
    ...stylelintPlugin,
    htmlPlugin,
    new webpack.DefinePlugin({
      // 源码中所有 process.env 都会被替换为
      // '../config/dev.env'这个module export出来的东西
      'process.env': require('./dev.env')
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2
        }
      }
    }
  }
};
