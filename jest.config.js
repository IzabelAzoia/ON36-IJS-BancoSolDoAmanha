module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  rootDir: 'src',
  testMatch: ['**/*.spec.ts'],
  moduleDirectories: ['node_modules', 'src']
};