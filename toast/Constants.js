/**
 * TEAM: shipment_data
 *
 * @flow strict
 */
import keyMirror from "keymirror";

export const ActionTypes = keyMirror({
  // shows a toast from record options
  SHOW: null,
  REMOVE: null,
});

export const EventTypes = keyMirror({
  // common event type for all mutation
  CHANGED: null,
});
