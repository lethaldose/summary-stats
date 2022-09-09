/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  verbose: true,
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
      'ts-jest': {
          useESM: true,
          isolatedModules: true,
      }
  },
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  moduleDirectories: ["node_modules"],
  setupFiles: ['./jest.setup.js'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  }
};
