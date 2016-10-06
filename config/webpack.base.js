
// All webpack configurations are merged into this
// base. See more about (smart) merging here:
// https://github.com/survivejs/webpack-merge

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const url = require('url');
const babel = require('./babel');
const { buildPath, userNodeModulesPath } = require('../utils/paths')();

module.exports = options => ({
  node: {
    __dirname: true,
    __filename: true,
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['.js', '.json'],
    modules: [userNodeModulesPath, path.resolve(__dirname, '../node_modules')],
  },

  resolveLoader: {
    modules: [userNodeModulesPath, path.resolve(__dirname, '../node_modules')],
  },

  plugins: [
    new webpack.DefinePlugin({
      // Hardcode NODE_ENV at build time so libraries like React get optimized
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || options.environment),
      KYT: {
        SERVER_PORT: JSON.stringify((options.serverURL && options.serverURL.port) || ''),
        SERVER_URL: JSON.stringify((options.serverURL && url.format(options.serverURL)) || ''),
        CLIENT_PORT: JSON.stringify((options.clientURL && options.clientURL.port) || ''),
        CLIENT_URL: JSON.stringify((options.clientURL && url.format(options.clientURL)) || ''),
        PUBLIC_PATH: JSON.stringify(options.publicPath || ''),
        PUBLIC_DIR: JSON.stringify(options.publicDir || ''),
        ASSETS_MANIFEST:
            JSON.stringify(path.join(buildPath || '', options.clientAssetsFile || '')),
      },
    }),
  ],

  postcss: [autoprefixer({ browsers: ['last 2 versions'] })],

  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]',
      },
      {
        test: /\.(jpg|jpeg|png|gif|eot|svg|ttf|woff|woff2)$/,
        loader: 'url-loader',
        query: {
          limit: 20000,
        },
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: [
          /node_modules/,
          buildPath,
        ],
        query: babel(options),
      },
    ],
  },
});
