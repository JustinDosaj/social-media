const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: "node",
  testMatch: ['**/src/tests/**/*.tests.ts'],
  verbose: true,
  clearMocks: true,
  transform: {
    ...tsJestTransformCfg,
  },
};