module.exports = {
  notify: true,
  verbose: true,
  testRegex: 'test/.*\\.test\\.js$',
  collectCoverage: true,
  collectCoverageFrom: ['lib/**/*.js'],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
};
