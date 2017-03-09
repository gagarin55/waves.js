var webpack = require('webpack');
var path = require('path');
var env = require('yargs').argv.mode;

var libraryName = 'Waves';

var plugins = [], outputFile;

plugins.push(new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
}));

if (env === 'build') {
  plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));
  outputFile = libraryName.toLowerCase() + '.min.js';
} else {
  outputFile = libraryName.toLowerCase() + '.js';
}

var config = {
  target: 'node',
  node: { process: false },
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  },
  plugins: plugins
};

module.exports = config;
