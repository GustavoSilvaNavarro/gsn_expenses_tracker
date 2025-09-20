import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  roots: ['<rootDir>/tests/integration'],
  modulePathIgnorePatterns: ['<rootDir>/tests/unit'],
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: 'integration.test.ts',
  testTimeout: 5000,
  setupFiles: ['./jest.setup.ts'],
  setupFilesAfterEnv: ['./tests/integration/setup.ts'],
  moduleNameMapper: {
    '^@config$': '<rootDir>/src/config',
    '^@server$': '<rootDir>/src/server/index',
    '^@server/(.*)$': '<rootDir>/src/server/$1',
    '^@graphql$': '<rootDir>/src/graphql/index',
    '^@graphql/(.*)$': '<rootDir>/src/graphql/$1',
    '^@docs$': '<rootDir>/src/docs/index',
    '^@docs/(.*)$': '<rootDir>/src/docs/$1',
    '^@adapters$': '<rootDir>/src/adapters/index',
    '^@adapters/(.*)$': '<rootDir>/src/adapters/$1',
    '^@plugins/(.*)$': '<rootDir>/src/plugins/$1',
    '^@plugins$': '<rootDir>/src/plugins/index',
    '^@errors/(.*)$': '<rootDir>/src/server/errors/$1',
    '^@errors$': '<rootDir>/src/server/errors/index',
    '^@services$': '<rootDir>/src/services/index',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@interfaces$': '<rootDir>/src/interfaces/index',
    '^@interfaces/(.*)$': '<rootDir>/src/interfaces/$1',
    '^@middlewares/(.*)$': '<rootDir>/src/server/middlewares/$1',
    '^@middlewares$': '<rootDir>/src/server/middlewares/index',
    '^@tests/(.*)$': '<rootDir>/tests/$1',
    '^@mocks/(.*)$': '<rootDir>/tests/__mocks__/$1',
    '^@mocks$': '<rootDir>/tests/__mocks__/index',
  },
};

export default config;
