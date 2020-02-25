/**
 * TEAM: frontend_infra
 * WATCHERS: zgotsch
 *
 * @flow strict
 */

export default class MockXMLHttpRequest {
  constructor() {
    throw new Error(
      "Tried to send an XHR during a test. This probably happened because " +
        "you are using XHRs directly. Instead, use " +
        "flexportApiFetch or apiRequest, which provide more helpful mocks. " +
        "If it is not possible to use those, mock XHR yourself on global. " +
        "Don't forget to unmock it at the end of your tests!"
    );
  }
}
