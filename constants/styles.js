/**
 * TEAM: ocean_fcl
 * @flow strict
 */

/**
 * Sometimes it's necessary to use inline styles to get something pixel perfect.
 * When doing this, you often end up with "magic numbers" in your code. Magic
 * numbers are bad because they obscure the source of the values. Named
 * constants are better because they're traceable.
 *
 * This file is a central location for such named constants. Centralizing these
 * values is worthwhile because it means modifications are less likely to cause
 * different parts of the UI to drift out of sync.
 */

// Bootstrap
export const BOOTSTRAP_COL_PADDING = 15;

// OOCSS
export const PADDING_MEDIUM = 12;
export const SPACING_SIZES = {
  xl: 36,
  l: 20,
  m: 12,
  s: 6,
  xs: 3,
  none: 0,
};

// other stuff
export const THIN_SCROLLBAR_WIDTH = 5;
