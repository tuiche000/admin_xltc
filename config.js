const ESLINT_ENABLE = false;
const STYLELINT_ENABLE = false;

const path = require('path');

const StylelintPlugin = require('stylelint-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  ESLINT_ENABLE, STYLELINT_ENABLE,
  stylelintPlugin: STYLELINT_ENABLE ? [
    new StylelintPlugin({
      files: ['**/*.css', '**/*.less', '**/*.html', '**/*.vue', '**/*.scss']
    })
  ] : [],
  htmlPlugin: new HtmlPlugin({
    template: path.resolve(__dirname, './index.html')
  })
};
