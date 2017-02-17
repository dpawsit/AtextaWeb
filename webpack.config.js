const webpack = require('webpack');
const path = require('path');

const SRC_DIR = path.resolve(__dirname, 'app/src');
const BUILD_DIR = path.resolve(__dirname, 'app/public/build');

module.exports = {
  entry: SRC_DIR + '/index.js',
  output : {
    path : BUILD_DIR,
    filename : 'bundle.js'
  },
  watch : true,
  module : {
    loaders : [{
      test : /\.jsx?/,
      include : SRC_DIR,
      exclude : /node_modules/,
      loader : 'babel-loader',
      query : {
        presets : ['es2015', 'react', 'stage-0']
      }
    }]
  }
}