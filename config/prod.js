const path = require('path');
const { stylelintPlugin, htmlPlugin, cleanWebpackPlugin } = require('../config');
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  output: {
    filename: '[name]-[hash].js',
    path: path.resolve(__dirname, '../lt')
  },
  plugins: [
    ...stylelintPlugin,
    htmlPlugin,
    cleanWebpackPlugin,
    new webpack.DefinePlugin({
      // 源码中所有 process.env 都会被替换为
      // '../config/dev.env'这个module export出来的东西
      'process.env': require('./prd.env')
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
