/**
 * TEAM: frontend_infra
 * @flow strict
 *
 * This file encodes the widths of letters in the SF UI font set.
 *
 * In order to compute the width that rendered text will take up,
 * you either need to render the React component, then measure,
 * then take action on the width; OR, using the helper below,
 * you can find out the width using the below width constants.
 *
 * The map isn't complete - if you need to add additional characters,
 * simply render a "<span>" with a letter in it, and using the Chrome inspector
 * hover over it's HTML DOM element, and you'll see the width of the span.
 */

export const sfUi14px = {
  // Lowercase
  a: 7.71,
  b: 8.59,
  c: 7.83,
  d: 8.59,
  e: 8,
  f: 5.06,
  g: 8.52,
  h: 8.31,
  i: 3.44,
  j: 3.44,
  k: 7.6,
  l: 3.52,
  m: 12.17,
  n: 8.17,
  o: 8.27,
  p: 8.52,
  q: 8.52,
  r: 5.33,
  s: 7.32,
  t: 5.09,
  u: 8.17,
  v: 7.44,
  w: 10.84,
  x: 7.34,
  y: 7.6,
  z: 7.54,

  // Uppercase
  A: 11.15,
  B: 10.67,
  C: 10.67,
  D: 11.55,
  E: 9.77,
  F: 8.89,
  G: 11.55,
  H: 11.55,
  I: 5.33,
  J: 6.22,
  K: 11.55,
  L: 9.77,
  M: 14.22,
  N: 11.55,
  O: 11.55,
  P: 8.89,
  Q: 11.55,
  R: 10.67,
  S: 8.89,
  T: 9.77,
  U: 11.55,
  V: 11.55,
  W: 15.09,
  X: 11.55,
  Y: 11.55,
  Z: 9.77,

  // With Accents
  č: 7.67,

  // Numbers
  "2": 8.0,

  // Symbols
  $: 9.08,
  ".": 4.15,
  // TODO(uforic): this isn't exact, and should be calculated later
  " ": 4.15,
  "%": 4.15,
  "@": 14.73,
  "/": 4.5,
  "²": 5.39,
  "€": 8.92,
  "¥": 8.92,
  "£": 8.92,
  إ: 3.5,
  د: 6.98,
  "৳": 8.34,
  Л: 9.72,
  в: 7.52,
  "₪": 8.92,
  "₹": 8.92,
  "₩": 8.92,
  م: 7.05,
  "₱": 8.92,
  "₨": 8.92,
  ł: 3.38,
  Д: 10.23,
  и: 8.31,
  н: 8.2,
  б: 8.31,
  "﷼": 13.64,
  "฿": 8.92,
  "₺": 8.92,
  "₴": 8.92,
  "₫": 8.92,
  "(": 5.33,
  ")": 5.33,
};

export function getWidthOfText(text: string) {
  let size = 0;
  for (let i = 0; i < text.length; i += 1) {
    // if you need to add support for different fonts,
    // make this fn take a second parameter
    const width = sfUi14px[text.charAt(i)];
    if (width == null) {
      // eslint-disable-next-line no-console
      console.error(
        `trying to compute width of character '${text.charAt(
          i
        )}' but not in font map provided.`
      );
    }
    if (width != null) {
      size += width;
    }
  }
  return size;
}
