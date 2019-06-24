const ESLINT_ENABLE = false;
const STYLELINT_ENABLE = false;

const path = require('path');

const StylelintPlugin = require('stylelint-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const webpack = require('webpack')

module.exports = {
  ESLINT_ENABLE, STYLELINT_ENABLE,
  stylelintPlugin: STYLELINT_ENABLE ? [
    new StylelintPlugin({
      files: ['**/*.css', '**/*.less', '**/*.html', '**/*.vue', '**/*.scss']
    })
  ] : [],
  htmlPlugin: new HtmlPlugin({
    template: path.resolve(__dirname, './index.html')
  }),
  definePlugin: new webpack.DefinePlugin({
    // 源码中所有 process.env 都会被替换为
    // '../config/dev.env'这个module export出来的东西
    'process.env': require('./config/dev.env')
  })
};
