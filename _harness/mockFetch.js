/**
 * TEAM: frontend_infra
 * WATCHERS: zgotsch
 *
 * @flow strict
 */

export default function mockFetch() {
  throw new Error(
    "Tried to call fetch() during a test. You probably shouldn't do " +
      " this if you are trying to access the Flexport API. Instead, use " +
      "flexportApiFetch or apiRequest, which provide more helpful mocks. " +
      "If it is not possible to use those, use fetch-mock, which provides " +
      "powerful mocking functionality."
  );
}
