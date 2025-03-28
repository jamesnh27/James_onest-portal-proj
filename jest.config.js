// this file is mainly to ensure Jest works with TypeScript and React framework
const nextJest = require('next/jest');

// Provide the path to your Next.js app
const createJestConfig = nextJest({
  dir: './', // Path to your Next.js app
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
};

// Return the custom Jest config
module.exports = createJestConfig(customJestConfig);