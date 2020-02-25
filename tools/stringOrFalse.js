/**
 * TEAM: frontend_infra
 *
 * @flow strict
 */

/**
 * This is used to satisfy flow strict checks. In places
 * where you used to do:
 * const strVariable: ?string;
 * if (strVariable) {}
 * flow strict will object, because you are checking both
 * for null AND empty string. This is called a sketchy null
 * check.
 *
 * Use string or false on that string instead, and you'll
 * get an explicity false value.
 */
const stringOrFalse = (val: ?string): string | false => {
  if (val == null || val === "") {
    return false;
  }
  return val;
};

export default stringOrFalse;
