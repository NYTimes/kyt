
// Merges base and user kyt config

const path = require('path');
const shell = require('shelljs');
const baseConfig = require('./kyt.base.config');
const merge = require('ramda').merge;
const userConfigPath = path.join(process.cwd(), './kyt.config.js');

let config;

// Add base config option for productionPublicPath
baseConfig.productionPublicPath =  '/assets/';

// Find user config
if (shell.test('-f', userConfigPath)) {
  try {
    config = require(userConfigPath); // eslint-disable-line global-require
  } catch (error) {
    console.error('❌ Error loading your kyt.config.js:', error);
    process.exit();
  }
}

config = merge(baseConfig, config);
// add userRootPath to Config
config.userRootPath = process.cwd();

// Create default modify function
if (typeof config.modifyWebpackConfig !== 'function') {
  config.modifyWebpackConfig = (webpackConfig) => webpackConfig;
}

module.exports = config;
