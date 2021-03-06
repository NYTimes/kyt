const jestConfig = {
  verbose: true,
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  moduleNameMapper: {
    '^[./a-zA-Z0-9!&$_-]+\\.(css|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|ico|md)$':
      require.resolve('./stub'),
  },
  setupFiles: ['raf/polyfill'],
  testMatch: ['**/*.test.[jt]s?(x)'],
  testEnvironment: 'jsdom',
  collectCoverageFrom: ['**/*.[jt]s?(x)'],
  coverageDirectory: '<rootDir>/coverage',
  errorOnDeprecated: true,
  cacheDirectory: '<rootDir>/.caches/jest',
  haste: {
    computeSha1: true,
    throwOnModuleCollision: false,
  },
};

if (process.env.CI) {
  jestConfig.coverageReporters = ['lcov', 'text-summary'];
  jestConfig.reporters = [[require.resolve('jest-silent-reporter'), { useDots: true }]];
}

module.exports = jestConfig;
