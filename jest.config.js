/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {}
  },

  collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/*.config.js'],
  coverageDirectory: '<rootDir>/coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/public',
    '<rootDir>/dist',
    '<rootDir>/build',
    '<rootDir>/coverage'
  ],
  coverageReporters: ['text', 'html'],
  projects: ['<rootDir>/src/backend', '<rootDir>/src/frontend'],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!@hyperplay/patcher)'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  rootDir: '.'
}