/**
 * TEAM: frontend_infra
 * WATCHERS: uforic
 *
 * @flow strict
 */

/* You may be looking for the old version of jestSetup.js.
 * This has been moved to jestTestSetup.js, since it is
 * a file loaded by the argument: setupFilesAfterEnv
 * in the jest.config file.
 *
 * This file is loaded BEFORE jestTestSetup, see docs for more information:
 * https://facebook.github.io/jest/docs/en/configuration.html#setupfiles-array
 *
 * In general, try and use jestTestSetup, and keep this file to a mimimum.
 */

global.requestAnimationFrame = callback => {
  setTimeout(callback, 0);
};
