/**
 * TEAM: frontend_infra
 *
 * @flow strict
 */

import stringOrFalse from "../stringOrFalse";

describe("stringOrFalse", () => {
  it("should return false in these cases", () => {
    expect(stringOrFalse(null)).toBe(false);
    expect(stringOrFalse(undefined)).toBe(false);
    expect(stringOrFalse("")).toBe(false);
  });
  it("should return the original string otherwise", () => {
    expect(stringOrFalse("test")).toBe("test");
  });
});
