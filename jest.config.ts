import type { Config } from 'jest';
import { defaults } from 'jest-config';

const config: Config = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.app.json',
      useESM: true,
      isolatedModules: true
    }],
  },
  moduleNameMapper: {
    '@helpers/(.*)': '<rootDir>/src/financial-dashboard/models/helpers/$1',
    '@enums/(.*)': '<rootDir>/src/financial-dashboard/models/enums/$1',
    '@models/(.*)': '<rootDir>/src/financial-dashboard/models/$1',
    '@interfaces/(.*)': '<rootDir>/src/financial-dashboard/models/interfaces/$1',
    '@services/(.*)': '<rootDir>/src/financial-dashboard/services/$1',
		'@constants/(.*)': '<rootDir>/src/financial-dashboard/models/constants/$1',
    '@components/(.*)': '<rootDir>/src/financial-dashboard/views/components/$1',
    '@views/(.*)': '<rootDir>/src/financial-dashboard/views/$1',
    '@viewmodels/(.*)': '<rootDir>/src/financial-dashboard/viewmodels/$1',
    '@utils/(.*)': '<rootDir>/src/financial-dashboard/utils/$1',
  },
  testPathIgnorePatterns: ['/node_modules/'],
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	transformIgnorePatterns: [
    '/node_modules/(?!(@testing-library|@babel)/)',
  ],
};

export default config;