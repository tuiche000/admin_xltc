const path=require('path');
const {stylelintPlugin, htmlPlugin}=require('../config');

module.exports={
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'bundle.min.js'
  },
  plugins: [
    ...stylelintPlugin,
    htmlPlugin
  ]
};
