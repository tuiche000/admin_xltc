const path = require('path');
const { stylelintPlugin, htmlPlugin } = require('../config');
const TerserPlugin = require('terser-webpack-plugin');
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
      'process.env': require('./prod.env')
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      (compiler) => {
        const TerserPlugin = require('terser-webpack-plugin');
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
        }).apply(compiler);
      }
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2
        }
      }
    }
  },
};
