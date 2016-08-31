
// Compiles the {server, client} configurations
// For use by the client and server compilers.

const merge = require('webpack-merge');
const logger = require('../cli/logger');
const clone = require('ramda').clone;
const { clientBuildPath, publicBuildPath } = require('./paths')();
// base configs
const baseConfig = require('../config/webpack.base');
// dev configs
const devClientConfig = require('../config/webpack.dev.client');
const devServerConfig = require('../config/webpack.dev.server');
// prod configs
const prodClientConfig = require('../config/webpack.prod.client');
const prodServerConfig = require('../config/webpack.prod.server');

module.exports = (environment = 'development') => {
  const { clientPort, serverPort, reactHotLoader } = global.config;

  let clientConfig = devClientConfig;
  let serverConfig = devServerConfig;

  let clientOptions = {
    type: 'client',
    serverPort,
    clientPort,
    environment,
    publicPath: `http://localhost:${clientPort}/assets/`,
    publicDir: clientBuildPath,
    clientAssetsFile: 'publicAssets.json',
    reactHotLoader,
  };

  // These are the only differences between dev & prod
  if (environment === 'production') {
    clientConfig = prodClientConfig;
    serverConfig = prodServerConfig;
    clientOptions = merge(clientOptions, {
      clientPort: undefined,
      publicPath: global.config.productionPublicPath,
      // In production, we use the relative path
      // from build/client/*.js or build/server/*.js.
      publicDir: '../public',
      // Absolute path to the public directory.
      publicBuildPath,
    });
  }

  const serverOptions = merge(clientOptions, { type: 'server' });

  // Merge options with static webpack configs
  clientConfig = merge.smart(baseConfig(clientOptions), clientConfig(clientOptions));
  serverConfig = merge.smart(baseConfig(serverOptions), serverConfig(serverOptions));

  // Modify via userland config
  try {
    clientConfig = global.config.modifyWebpackConfig(clone(clientConfig), clientOptions);
    serverConfig = global.config.modifyWebpackConfig(clone(serverConfig), serverOptions);
  } catch (error) {
    logger.error('Error in your kyt.config.js modifyWebpackConfig():', error);
    process.exit(1);
  }

  return {
    clientConfig,
    serverConfig,
    clientPort, // TODO: Should these really be here?
    serverPort,
    reactHotLoader,
  };
};
