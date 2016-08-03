
const fs = require('fs');
const chalk = require('chalk');
const logger = require('../logger');
const path = require('path');
const shell = require('shelljs');
const webpack = require('webpack');
const clientWebpackConfig = require('./../../config/webpack.prod.client');
const serverWebpackConfig = require('./../../config/webpack.prod.server');
const baseConfig = require('./../../config/webpack.base');
const merge = require('webpack-merge');

module.exports = (program) => {
  // Comment the following if you want
  // to see the verbose command ouput.
  // shell.config.silent = true;
  const args = program.args[0];
  const serverPort = args.port ? args.port : 3000;
  const basePath = path.resolve(__dirname, '../../../../');
  if(args.verbose) {
    process.env.debug = true;
  }

  const clientOptions = {
    serverPort,
    clientPort: undefined,
    environment: 'production',
    configPath: args.config,
    publicPath: '/assets/',
    assetsPath: path.join(basePath, 'build/client'),
    basePath,
  };

  const serverOptions = merge(clientOptions, {
    assetsPath: path.join(basePath, 'build/server'),
  });

  let clientCompiler = null;
  let serverCompiler = null;

  const clientConfig = merge.smart(baseConfig(clientOptions), clientWebpackConfig(clientOptions));
  const serverConfig = merge.smart(baseConfig(serverOptions), serverWebpackConfig(serverOptions));

  logger.start('Starting production build...');

  // Clean the build directory.
  if (shell.exec(`rm -rf ${basePath}/build`).code === 0) {
    logger.task('Cleaned ./build');
  }

  const buildServer = () => {
    try {
      logger.debug('Server webpack configuration:', serverConfig);
      serverCompiler = webpack(serverConfig);
      logger.task('Server webpack configuration compiled');
    } catch (error) {
      logger.error('Server webpack configuration is invalid\n', error)
      process.exit();
    }

    serverCompiler.plugin('done', (stats) => {
      if (stats.hasErrors()) {
        logger.error('Server build failed\n', stats);
      } else {
        logger.task('Server build successful');
        logger.end('Done building');
      }
    });

    serverCompiler.run(() => undefined);
  };

  try {
    logger.debug('Client webpack configuration:', clientConfig);
    clientCompiler = webpack(clientConfig);
    logger.task('Client webpack configuration compiled');
  } catch (error) {
    logger.error('Client webpack configuration is invalid\n', error)
    process.exit();
  }

  clientCompiler.plugin('done', (stats) => {
    if (stats.hasErrors()) {
      logger.error('Client build failed\n', stats.toString());
    } else {
      logger.task('Client build successful');
      buildServer();
    }
  });

  clientCompiler.run(() => undefined);
};
