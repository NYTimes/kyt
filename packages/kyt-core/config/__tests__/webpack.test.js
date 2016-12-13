const shell = {
  test: jest.fn(),
};

const logger = {
  warn: jest.fn(),
};

jest.setMock('shelljs', shell);
jest.setMock('kyt-utils/logger', logger);

const devClientConfig = require('../webpack.dev.client');
const devServerConfig = require('../webpack.dev.server');
const prodClientConfig = require('../webpack.prod.client');
const prodServerConfig = require('../webpack.prod.server');
const baseConfig = require('../webpack.base');

describe('webpack.dev.client', () => {
  it('has babel-polyfill as first entry in entry.main array', () => {
    const config = devClientConfig({ clientURL: {} });
    expect(config.entry.main[0]).toBe('babel-polyfill');
  });
});

describe('webpack.dev.server', () => {
  it('has babel-polyfill as first entry in entry.main array', () => {
    const config = devServerConfig({ publicPath: '/' });
    expect(config.entry.main[0]).toBe('babel-polyfill');
  });
});

describe('webpack.prod.client', () => {
  it('has babel-polyfill as first entry in entry.main array', () => {
    const config = prodClientConfig({ clientURL: {} });
    expect(config.entry.main[0]).toBe('babel-polyfill');
  });
});

describe('webpack.prod.server', () => {
  it('has babel-polyfill as first entry in entry.main array', () => {
    const config = prodServerConfig({ publicPath: '/' });
    expect(config.entry.main[0]).toBe('babel-polyfill');
  });
});

describe('webpack.base', () => {
  beforeEach(() => {
    logger.warn.mockClear();
  });
  it('doesn\'t set up a babel preset if a .babelrc exists', () => {
    shell.test.mockImplementationOnce(() => true);
    const config = baseConfig({ clientURL: {}, publicPath: '/' });
    const babelLoader = config.module.rules.find(({ loader }) => loader === 'babel-loader');
    expect(babelLoader.options.presets).toBeUndefined();
    expect(logger.warn).not.toHaveBeenCalled();
  });
  it('sets up kyt-core babel preset if a .babelrc exists', () => {
    shell.test.mockImplementationOnce(() => false);
    const config = baseConfig({ clientURL: {}, publicPath: '/' });
    const babelLoader = config.module.rules.find(({ loader }) => loader === 'babel-loader');
    expect(babelLoader.options.presets.length).toBe(1);
    expect(babelLoader.options.presets[0]).toMatch(/babel-preset-kyt-core/);
    expect(logger.warn).toHaveBeenCalledWith('No user .babelrc found. Using kyt default babel preset...');
  });
});
