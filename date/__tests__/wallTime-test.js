/**
 * TEAM: frontend_infra
 * WATCHERS: uforic
 * @flow
 */

import moment from "moment-timezone";
import {isEqual} from "lodash";
import {
  _test,
  displayTime,
  EOD_OCLOCK,
  momentToWallTime,
  isWallTime,
  wallTime,
  ZERO_OCLOCK,
  compareWallTime,
  parseInputText,
} from "../wallTime";

// none of our tests depend on a specific time zone or time
// unmock moment, since we will just be parsing one date
jest.unmock("moment");
jest.unmock("moment-timezone");

const {
  leftPadWithZero,
  arePartsValidTime,
  parseMilInputText,
  parseAmPmInputText,
  possibleWallTimeToParts,
} = _test;

describe("WallTimeType", () => {
  describe("compareWallTime", () => {
    it("correctly compares dates", () => {
      expect(compareWallTime(ZERO_OCLOCK, EOD_OCLOCK) < 0).toBeTruthy();
      expect(compareWallTime(EOD_OCLOCK, ZERO_OCLOCK) > 0).toBeTruthy();
      expect(compareWallTime(EOD_OCLOCK, EOD_OCLOCK) === 0).toBeTruthy();
    });
  });
  describe("displayTime", () => {
    it("displays milltime", () => {
      expect(displayTime(ZERO_OCLOCK, {military: true})).toBe("00:00");
      expect(displayTime(EOD_OCLOCK, {military: true})).toBe("23:59");
    });
    it("displays amPmTime", () => {
      expect(displayTime(ZERO_OCLOCK)).toBe("12:00am");
      expect(displayTime(EOD_OCLOCK)).toBe("11:59pm");
      const trickTime = wallTime("12:59:59.999");
      expect(displayTime(trickTime)).toBe("12:59pm");
    });
    it("breaks if not walltime", () => {
      // $ExpectError - this shouldn't work
      expect(() => displayTime("not walltime", true)).toThrow();
    });
  });
  describe("isWallTime", () => {
    it("accepts", () => {
      expect(isWallTime(ZERO_OCLOCK)).toBeTruthy();
      expect(isWallTime(EOD_OCLOCK)).toBeTruthy();
    });
    it("rejects", () => {
      expect(isWallTime("not")).toBeFalsy();
      expect(isWallTime("23:59:60.999")).toBeFalsy();
    });
  });
  describe("wallTime", () => {
    it("accepts", () => {
      const dTime = displayTime(ZERO_OCLOCK, {
        military: true,
        resolution: "millis",
      });
      expect(wallTime(dTime)).toBeTruthy();
    });
    it("throws", () => {
      expect(() => wallTime("not")).toThrow();
    });
  });
  describe("momentToWallTime", () => {
    it("gets the time from a moment", () => {
      const isoTime = "2018-01-01T00:00:00.000Z";
      expect(momentToWallTime(moment(isoTime), "UTC")).toBe("00:00:00.000");
      expect(momentToWallTime(moment(isoTime), "America/Los_Angeles")).toBe(
        "16:00:00.000"
      );
    });
    it("breaks if not walltime", () => {
      expect(() =>
        momentToWallTime(moment("isn't valid"), "America/Los_Angeles")
      ).toThrow();
    });
  });
  describe("possibleWallTimeToParts", () => {
    it("converts a walltime", () => {
      expect(
        isEqual(possibleWallTimeToParts(wallTime("06:50:40.000")), {
          hour: 6,
          minute: 50,
          second: 40,
          millis: 0,
        })
      ).toBeTruthy();
    });
    it("breaks if not walltime", () => {
      // $ExpectError
      expect(() => possibleWallTimeToParts("not walltime")).toThrow();
    });
  });
  describe("parseInputText", () => {
    it("handles amPm time", () => {
      expect(parseInputText("0:0am")).toBeTruthy();
      expect(parseInputText("06:00am")).toBe("06:00:00.000");
      expect(parseMilInputText("00:00")).toBeTruthy();
      expect(parseMilInputText("23:59")).toBeTruthy();
    });
    it("handles malformed text", () => {
      expect(parseInputText("not")).toBeFalsy();
    });
  });
  describe("parseAmPmInputText", () => {
    it("handles amPm time", () => {
      expect(parseAmPmInputText("0:0am")).toBeTruthy();
      expect(parseAmPmInputText("06:00am")).toBe("06:00:00.000");
      expect(parseAmPmInputText("00:00am")).toBe("00:00:00.000");
      expect(parseAmPmInputText("12:59pm")).toBe("12:59:00.000");
      expect(parseAmPmInputText("12:59am")).toBe("00:59:00.000");
    });
    it("handles malformed text", () => {
      expect(parseAmPmInputText("")).toBeFalsy();
      expect(parseAmPmInputText("0000")).toBeFalsy();
      expect(parseAmPmInputText("1:02a")).toBeFalsy();
      expect(parseAmPmInputText("1:02")).toBeFalsy();
      expect(parseAmPmInputText("23:59am")).toBeFalsy();
    });
    it("rejects invalid time", () => {
      expect(parseAmPmInputText("24:01")).toBeFalsy();
    });
  });
  describe("parseMilInputText", () => {
    it("handles mill time", () => {
      expect(parseMilInputText("0:0")).toBeTruthy();
      expect(parseMilInputText("00:00")).toBeTruthy();
      expect(parseMilInputText("23:59")).toBeTruthy();
    });
    it("handles malformed text", () => {
      expect(parseMilInputText("")).toBeFalsy();
      expect(parseMilInputText("0000")).toBeFalsy();
      expect(parseMilInputText("23:59:00.000")).toBeFalsy();
    });
    it("rejects invalid time", () => {
      expect(parseMilInputText("24:01")).toBeFalsy();
    });
  });
  describe("arePartsValidTime", () => {
    const validTime = [0, 0, 0, 0];
    it("handles a good case", () => {
      expect(arePartsValidTime(...validTime)).toBeTruthy();
    });
    it("catches wrong hour", () => {
      const badHour = [...validTime];
      badHour[0] = -1;
      expect(arePartsValidTime(...badHour)).toBeFalsy();
      badHour[0] = 24;
      expect(arePartsValidTime(...badHour)).toBeFalsy();
      badHour[0] = NaN;
      expect(arePartsValidTime(...badHour)).toBeFalsy();
    });
    it("catches wrong minute", () => {
      const badMinute = [...validTime];
      badMinute[0] = -1;
      expect(arePartsValidTime(...badMinute)).toBeFalsy();
      badMinute[0] = 60;
      expect(arePartsValidTime(...badMinute)).toBeFalsy();
    });
    it("catches wrong second", () => {
      const badSecond = [...validTime];
      badSecond[0] = -1;
      expect(arePartsValidTime(...badSecond)).toBeFalsy();
      badSecond[0] = 60;
      expect(arePartsValidTime(...badSecond)).toBeFalsy();
    });
    it("catches wrong millis", () => {
      const badMillis = [...validTime];
      badMillis[0] = -1;
      expect(arePartsValidTime(...badMillis)).toBeFalsy();
      badMillis[0] = 1000;
      expect(arePartsValidTime(...badMillis)).toBeFalsy();
    });
  });
  describe("leftPad", () => {
    it("pads a one digit number", () => {
      expect(leftPadWithZero(0, 1)).toBe("0");
      expect(leftPadWithZero(0, 2)).toBe("00");
    });
    it("pads a > 1 digit number", () => {
      expect(leftPadWithZero(12, 2)).toBe("12");
      expect(leftPadWithZero(12, 3)).toBe("012");
    });
    it("errors when a number is given that is already greater than size", () => {
      expect(() => leftPadWithZero(12, 1)).toThrow();
    });
  });
});
