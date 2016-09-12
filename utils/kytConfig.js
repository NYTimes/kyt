
// Merges base and user kyt config

const path = require('path');
const shell = require('shelljs');
const mergeAll = require('ramda').mergeAll;
const { userRootPath, userKytConfigPath } = require('./paths')();
const url = require('url');

module.exports = optionalConfig => {
  let config;
  const logger = console;

  // base config options
  const baseConfig = {
    productionPublicPath: '/assets/',
    serverURL: 'http://localhost:3000',
    clientURL: 'http://localhost:3001',
    prototypeURL: 'http://localhost:3002',
    debug: false,
    reactHotLoader: false,
  };

  const kytConfigPath = optionalConfig
    ? path.join(userRootPath, optionalConfig)
    : userKytConfigPath;

  // Find user config
  if (shell.test('-f', kytConfigPath)) {
    try {
      logger.info(`Using kyt config at ${kytConfigPath}`);
      config = require(kytConfigPath); // eslint-disable-line global-require
    } catch (error) {
      logger.error('Error loading your kyt.config.js:', error);
      process.exit();
    }
  }

  config = mergeAll([{}, baseConfig, config]);

  // Create default modify function
  if (typeof config.modifyWebpackConfig !== 'function') {
    config.modifyWebpackConfig = webpackConfig => webpackConfig;
  }

  const validateURL = (name, userURL) => {
    // Check to see if the url has the
    // required protocol, hostname and port.
    if (!userURL.protocol || !userURL.hostname || !userURL.port) {
      logger.error(`❌  Error: ${name} is an invalid url - ${userURL.href}`);
    }
  };

  // Convert the URL strings into objects
  // to make them easier to work with.
  config.serverURL = url.parse(config.serverURL);
  validateURL('serverURL', config.serverURL);
  config.clientURL = url.parse(config.clientURL);
  validateURL('clientURL', config.clientURL);
  config.prototypeURL = url.parse(config.prototypeURL);
  validateURL('prototypeURL', config.prototypeURL);

  return Object.freeze(config);
};
