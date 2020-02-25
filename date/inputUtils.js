/**
 * TEAM: frontend_infra
 * WATCHERS: uforic
 * @flow strict
 */

export const ARROW_DOWN_KEY = 40;
export const ARROW_UP_KEY = 38;
export const ESCAPE_KEY = 27;
export const ENTER_KEY = 13;
export const TAB_KEY = 9;

const blurKeyCodes = [ESCAPE_KEY, TAB_KEY];
export function isKeyCodeCauseBlur(keyCode: number) {
  return blurKeyCodes.includes(keyCode);
}
