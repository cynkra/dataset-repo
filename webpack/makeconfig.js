'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var NotifyPlugin = require('./notifyplugin');
var path = require('path');
var webpack = require('webpack');

var loaders = {
  'css': '',
  'less': '!less-loader',
  'scss|sass': '!sass-loader',
  'styl': '!stylus-loader'
};

module.exports = function(isDevelopment) {

  function stylesLoaders() {
    return Object.keys(loaders).map(function(ext) {
      var prefix = 'css-loader!autoprefixer-loader?' +
        '{browsers:["Chrome >= 20", "Firefox >= 24", "Explorer >= 8", "Opera >= 12", "Safari >= 6"]}';
      var extLoaders = prefix + loaders[ext];
      var loader = isDevelopment
        ? 'style-loader!' + extLoaders
        : ExtractTextPlugin.extract('style-loader', extLoaders);
      return {
        loader: loader,
        test: new RegExp('\\.(' + ext + ')$')
      };
    });
  }

  var config = {
    cache: isDevelopment,
    debug: isDevelopment,
    devtool: isDevelopment ? 'cheap-module-eval-source-map' : '',
    entry: {
      app: isDevelopment ? [
        'webpack-dev-server/client?http://localhost:8888',
        // Why only-dev-server instead of dev-server:
        // https://github.com/webpack/webpack/issues/418#issuecomment-54288041
        'webpack/hot/only-dev-server',
        './src/client/main.js'
      ] : [
        './src/client/main.js'
      ]
    },
    module: {
      loaders: [{
        loader: 'url-loader?limit=100000',
        test: /\.(gif|jpg|png|woff|woff2|eot|ttf|svg)$/
      }, {
        exclude: /node_modules/,
        loaders: isDevelopment ? [
          'react-hot', 'babel-loader'
        ] : [
          'babel-loader'
        ],
        test: /\.js$/
      }].concat(stylesLoaders())
    },
    output: isDevelopment ? {
      path: path.join(__dirname, '/build/'),
      filename: '[name].js',
      publicPath: 'http://localhost:8888/build/'
    } : {
      path: 'build/',
      filename: '[name].js'
    },
    plugins: (function() {
      var plugins = [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify(isDevelopment ? 'development' : 'production'),
            IS_BROWSER: true
          }
        })
      ];
      if (isDevelopment) {
        plugins.push(
          NotifyPlugin,
          new webpack.HotModuleReplacementPlugin(),
          new webpack.NoErrorsPlugin()
        );
      } else {
        plugins.push(
          // Render styles into separate cacheable file to prevent FOUC and
          // optimize for critical rendering path.
          new ExtractTextPlugin('app.css', {
            allChunks: true
          }),
          new webpack.optimize.DedupePlugin(),
          new webpack.optimize.OccurenceOrderPlugin(),
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false
            }
          })
        );
      }
      return plugins;
    })(),
    resolve: {
      extensions: ['', '.js', '.json']
    }
  };

  return config;

};
