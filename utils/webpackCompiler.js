const webpack = require('webpack');
const logger = require('../cli/logger');

module.exports = (webpackConfig, cb) => {
  let webpackCompiler;
  const type = webpackConfig.target === 'web' ? 'Client' : 'Server';

  // Compile the webpack config
  try {
    logger.debug(`${type} webpack configuration:`, webpackConfig);
    webpackCompiler = webpack(webpackConfig);
    logger.task(`${type} webpack configuration compiled`);
  } catch (error) {
    logger.error(`${type} webpack config is invalid\n`, error);
    process.exit();
  }

  // Handle errors in webpack build
  webpackCompiler.plugin('done', stats => {
    if (stats.hasErrors()) {
      logger.error(`${type} build failed\n`, stats.toString());
      logger.info('See webpack error above');
      return null;
    }

    if (stats.hasWarnings()) {
      logger.warn(`${type} build warnings`, stats.toString());
    }

    logger.task(`${type} build successful`);

    // Call the callback on successful build
    if (cb) {
      cb(stats);
    }
  });

  webpackCompiler.plugin('exit', data => {
    console.log('exitingg', data);
  });

  // Return the compiler
  return webpackCompiler;
};
