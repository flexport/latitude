/**
 * TEAM: frontend_infra
 * @flow strict
 */

/**
 * Latitude uses the `size` enum to standardize the heights of latitude
 * data entry components.
 */
const sizes = Object.freeze({
  s: 24,
  m: 30,
  l: 40,
});

export type Size = $Keys<typeof sizes>;

export default sizes;
