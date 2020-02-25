/**
 * TEAM: frontend_infra
 * @flow strict
 */

import keyMirror from "keymirror";

export const ActionTypes = keyMirror({
  // shows a modal from record options
  SHOW: null,
  HIDE: null,
});

export const EventTypes = keyMirror({
  // common event type for all mutation
  CHANGED: null,
});
