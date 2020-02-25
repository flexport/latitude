/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 *
 * @flow strict
 */

const sizes = Object.freeze({
  xxxs: 10,
  xxs: 11,
  xs: 12,
  s: 16,
  m: 18,
  l: 22,
  xl: 25,
  xxl: 36,
});

export type IconSize = $Keys<typeof sizes>;

export default sizes;
