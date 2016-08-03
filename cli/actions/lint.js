
const CLIEngine = require('eslint').CLIEngine;
const logger = require('../logger');
const temp = require('temp');
const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const merge = require('ramda').merge;
const baseConfig = require('../../eslint.json');

const getConfig = (configPath) => {
  const configFile = path.join(process.cwd(), configPath);

  if (fs.existsSync(configFile)) {
    // eslint-disable-next-line
    const customConfig = require(configFile);
    return merge(baseConfig, customConfig);
  }

  return baseConfig;
};

module.exports = (program) => {
  const args = program.args[0];
  if(args.verbose) {
    process.env.debug = true;
  }

  // http://eslint.org/docs/developer-guide/nodejs-api
  const eslintCLI = {
    envs: ['browser', 'mocha'],
    extensions: ['.js', '.jsx'],
    useEslintrc: false,
  };

  // Get the default dir or the dir specified by the user/-d.
  const lint = () => {
    const files = args.dir ? args.dir.split(',') : ['src/'];
    const cli = new CLIEngine(eslintCLI);
    const report = cli.executeOnFiles(files);
    const formatter = cli.getFormatter();
    logger.log(formatter(report.results));
  };

  // In order to support merging a local configFile/eslint.json,
  // we need to save the result of the merge to a temp file
  // and point to that. Otherwise, we just use our config.
  if (args.configFile) {
    const config = getConfig(args.configFile);
    temp.open('temp-eslintrc-', (error, info) => {
      if (!error) {
        fs.write(info.fd, JSON.stringify(config));
        fs.close(info.fd, logger.error);
        eslintCLI.configFile = info.path;
        lint();
        temp.cleanupSync();
      }
    });
  } else {
    eslintCLI.configFile = 'node_modules/kyt/eslint.json';
    lint();
  }
};
