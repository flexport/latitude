/**
 * TEAM: frontend_infra
 */

/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable flowtype/require-parameter-type */
/* globals jasmine */
/* eslint-disable no-console */

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as Aphrodite from "aphrodite";

import mockFetch from "./mockFetch";
import MockXHR from "./MockXHR";

const util = require("util");

global.__TEST_ENV__ = true;

global.XMLHttpRequest = MockXHR;
global.fetch = mockFetch;

Aphrodite.StyleSheetTestUtils.suppressStyleInjection(); // https://github.com/Khan/aphrodite/issues/62#issuecomment-387914926
Enzyme.configure({adapter: new Adapter()});

const consoleError = console.error;

const allowedWarnings = [
  "Shallow renderer has been moved to react-test-renderer/shallow. Update references to remove this warning.",
  "isMounted is deprecated. Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks.",
  "`key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop.",
];

/**
 * React 16's error behavior prints out JavaScript error objects
 * to console.error. We should ignore these, because tests where we
 * are purposefully throwing an error we'd like to catch it.
 *
 * For actual errors, they are also logged via the normal JavaScript
 * mechanism, so they will still throw an error that we can fail the test on.
 * @param {*} args
 */
function isReactErrorMessage(...args) {
  if (
    args &&
    args.length >= 1 &&
    typeof args[0] === "object" &&
    args[0].message != null &&
    typeof args[0].message === "string" &&
    args[0].message.includes("Consider adding an error boundary")
  ) {
    return true;
  }
  return false;
}

function logToError(...args) {
  if (isReactErrorMessage(...args)) {
    return;
  }
  if (
    args &&
    args.length >= 1 &&
    typeof args[0] === "string" &&
    allowedWarnings.some(allowedWarning => args[0].includes(allowedWarning))
  ) {
    return;
  }
  throw new Error(
    util.format.apply(this, args).replace(/^Error: (?:Warning: )?/, "")
  );
}

jasmine.getEnv().beforeEach(() => {
  console.error = logToError;
});

jasmine.getEnv().afterEach(() => {
  console.error = consoleError;
});

console.debug = () => {};
console.warn = () => {};

global.key = () => {};

// window is not defined when debugging tests
if (typeof window !== "undefined") {
  window.BOOTSTRAP_DATA = {
    session: {
      session: {},
      env: "test",
      appVersions: [{v: "test"}],
      token: "auth_store_test_token",
    },
  };
}
