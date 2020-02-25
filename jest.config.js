/**
 * TEAM: frontend_infra
 * @noflow
 */

/* eslint-disable flowtype/require-valid-file-annotation */

const parallelism = require("ci-parallel-vars");
const chunkd = require("chunkd");

const config = {
  timers: "fake",
  setupFilesAfterEnv: ["<rootDir>/_harness/jestTestSetup.js"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  unmockedModulePathPatterns: ["<rootDir>/node_modules"],
  testPathIgnorePatterns: ["node_modules/", "mobile/drive/"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.(css|less)$": "<rootDir>/_harness/mockStyle.js",
  },
  transformIgnorePatterns: ["node_modules/(?!(flexport-shared)/)"],
  testRegex: "/__tests__/.*-test\\.jsx?$",
  testMatch: undefined,
  moduleFileExtensions: ["js", "jsx", "json"],
  modulePaths: ["<rootDir>"],
  moduleDirectories: [".", "node_modules"],
  moduleNameMapper: {
    "(\\.(css|less)$|^reset-css$)": "<rootDir>/_harness/mockStyle.js",
  },
  coverageDirectory: "./coverage/",
  coveragePathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/babel.config.js",
  ],
  testEnvironmentOptions: {
    url: "https://app.flexport.com/",
  },
  testEnvironment: "jest-environment-jsdom-global",
  setupFiles: ["<rootDir>/_harness/jestSetup.js"],
  globals: {
    USE_UNWRAPPED_FRAGMENT_CONTAINERS: true,
    AVOID_PORTAL_RENDER: true,
  },
};

const jestTests = process.env.JEST_TESTS;
if (jestTests) {
  // When a list of tests is provided, run a subset of that list according to
  // ci-parallel-vars
  let tests = JSON.parse(jestTests).sort((a, b) => b.localeCompare(a));
  if (parallelism) {
    tests = chunkd(tests, parallelism.index, parallelism.total);
  }
  config.testMatch = tests;
  delete config.testRegex;
}

module.exports = config;
