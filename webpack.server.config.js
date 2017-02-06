// var path = require('path');
var nodeExternals = require('webpack-node-externals');
var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
let extractCSS = new ExtractTextPlugin('www/styles.css');
var __STATIC_ASSETS_CDN__ = process.env.STATIC_ASSETS_CDN || ''; //

module.exports = {
  devtool: 'source-map',
  entry: {
    bundle: './start-server'
  },
  target: 'node',
  output: {
    path: __dirname + '/build',
    publicPath: '/',
    filename: 'server-bundle.js'
  },
  resolve: {
    alias: {
      graphql: path.resolve('./node_modules/graphql'),
    },
    extensions: ['', '.js', '.jsx', '.json', '.es6', '.babel', '.node' ],
  },
  devServer: {
    stats: { chunks: false }
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      // __STATIC_ASSETS_CDN__: JSON.stringify(__STATIC_ASSETS_CDN__),
      __SERVER__: true,
      "process.browser": JSON.stringify(true)
    }),
    new webpack.IgnorePlugin(/vertx/),
    new CopyWebpackPlugin(
      [
        { from: 'src/server/www', to: 'www' },
        { from: 'Procfile'},
        { from: 'package.json'}
      ], 
      {ignore: ['.gitkeep'], copyUnmodified: true}
    ),
    extractCSS
  ],
  externals: [nodeExternals({whitelist: [/\.s?css$/]})], // in order to ignore all modules in node_modules folder
  module: {
    loaders: [
      { test: /\.node$/, loader: 'node' },
      { test: /\.json$/, loader: 'json' },
      {
        test: /\.s?css$/,
        loader:extractCSS.extract(['css', 'sass?sourceMap'])
      },
      {
        test: /\.styl$/,
        loader: extractCSS.extract(['css', 'stylus'])
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        loaders: ['url-loader?limit=1']
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=1" },
      { test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=1" },
      {

        test: /\.(jsx?|es6|babel)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          babelrc: false,
          presets: ['es2015', 'react', 'stage-0'],
          plugins: [
            ['transform-runtime', {
              'polyfill': false,
              'regenerator': true
            }]
          ]
        }
      }
    ]
  }
};
