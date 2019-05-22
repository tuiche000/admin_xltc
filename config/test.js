const path=require('path');
const {stylelintPlugin}=require('../config');

module.exports={
  mode: 'development',
  output: {
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  plugins: [
    ...stylelintPlugin
  ]
};
