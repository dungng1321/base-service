module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@core/(.*)$': '<rootDir>/core/$1',
    '^@constant/(.*)$': '<rootDir>/constant/$1',
    '^@utils/(.*)$': '<rootDir>/utils/$1',
    '^@entities/(.*)$': '<rootDir>/entities/$1',
    '^@helpers/(.*)$': '<rootDir>/helpers/$1',
    '^@repositories/(.*)$': '<rootDir>/repositories/$1',
    '^@config/(.*)$': '<rootDir>/config/$1',
    '^@i18n/(.*)$': '<rootDir>/i18n/$1',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
