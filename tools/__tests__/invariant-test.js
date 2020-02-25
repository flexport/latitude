/**
 * TEAM: frontend_infra
 *
 * @flow
 */
// flowlint unnecessary-invariant:off
import invariant from "../invariant";

describe("invariant.js", () => {
  let oldEnv;

  it("substitutes format string arguments", () => {
    expect(() => {
      invariant(
        false,
        "the %s %s fox %s over the %s dog",
        "quick",
        "brown",
        "jumped",
        "lazy"
      );
    }).toThrow("the quick brown fox jumped over the lazy dog");
  });

  describe("development", () => {
    beforeEach(() => {
      oldEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "development";
    });

    describe("invariant()", () => {
      it("noops when condition is true", () => {
        expect(() => invariant(true)).not.toThrow();
      });

      it("throws when condition is false", () => {
        expect(() => invariant(false, "should be true")).toThrow(
          "should be true"
        );
      });
    });

    afterEach(() => {
      process.env.NODE_ENV = oldEnv;
    });
  });

  describe("production", () => {
    beforeEach(() => {
      oldEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "production";
    });

    describe("invariant()", () => {
      it("noops when condition is true", () => {
        expect(() => invariant(true)).not.toThrow();
      });

      it("throws when condition is false", () => {
        expect(() => invariant(false, "should be true")).toThrow(
          "should be true"
        );
      });
    });

    afterEach(() => {
      process.env.NODE_ENV = oldEnv;
    });
  });
});
