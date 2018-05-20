// only build plugin module
require('webpack');
require('weex-loader');

const path = require('path');
const fs = require('fs');

const root = process.cwd();
console.log(`chendong${  root}`);
module.exports = {
  entry: {
    plugins: [path.join(root, 'plugins/plugin_bundle.js')],
  },
  output: {
    path: path.join(root, 'web'),
    filename: 'plugin.js',
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.js(\?[^?]+)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015',
      },
      {
        test: /\.we(\?[^?]+)?$/,
        loader: 'weex-loader',
      },
      {
        test: /\.vue(\?[^?]+)?$/,
        loader: 'vue',
      },
    ],
  },

  /* plugins: [
    new webpack.optimize.UglifyJsPlugin( {
      minimize : true,
      sourceMap : true,
      mangle: true,
      compress: {
        warnings: false
      }
    } )
  ] */

};
