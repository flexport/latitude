/**
 * TEAM: frontend_infra
 * @flow strict
 */

/* eslint-disable import/prefer-default-export */

const sizes = Object.freeze({
  s: 40,
  m: 56,
  l: 56,
});

export default sizes;
export type Size = $Keys<typeof sizes>;
