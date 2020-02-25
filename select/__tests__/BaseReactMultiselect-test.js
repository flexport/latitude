/**
 * TEAM: frontend_infra
 * WATCHERS: uforic
 * @flow
 */

import {isEqual} from "lodash";
import {_test} from "../BaseReactMultiselect";
import invariant from "../../tools/invariant";

function deprecatedChangeFn<T>(
  keyName: string,
  onChange: any => void,
  valueFn: T => string,
  labelKey?: string
): (values: $ReadOnlyArray<T>) => void {
  return (values: $ReadOnlyArray<T>) => {
    onChange({
      [keyName]: values.map(
        deprecatedConvertToOldReturnType(valueFn, labelKey)
      ),
    });
  };
}

function deprecatedConvertToOldReturnType<T>(
  valueFn: T => string,
  labelKey?: string
): (value: T) => {value: string, full: T} {
  return (value: T) => {
    invariant(
      value != null && typeof value === "object",
      // $FlowUpgradeFixMe(0.94.0 -> 0.95.1)
      `can't convert a value that isn't an object ${JSON.stringify(value)}`
    );
    return {
      value: valueFn(value),
      full: value,
      label: labelKey != null ? value[labelKey] : undefined,
    };
  };
}

describe("AlgoliaMultiInput", () => {
  describe("depcrecatedChangeFn", () => {
    it("correctly returns transformed array", () => {
      const changeFn = jest.fn();
      const depdChangeFn = deprecatedChangeFn("testKey", changeFn, obj =>
        obj.id.toString()
      );
      depdChangeFn([{id: 5}]);
      expect(changeFn.mock.calls.length).toEqual(1);
      expect(
        isEqual(changeFn.mock.calls[0][0], {
          testKey: [{value: "5", full: {id: 5}, label: undefined}],
        })
      ).toBeTruthy();
    });
    it("correctly deals with empty array", () => {
      const changeFn = jest.fn();
      const depdChangeFn = deprecatedChangeFn(
        "testKey",
        changeFn,
        obj => obj.id
      );
      depdChangeFn([]);
      expect(changeFn.mock.calls.length).toEqual(1);
      expect(
        isEqual(changeFn.mock.calls[0][0], {
          testKey: [],
        })
      ).toBeTruthy();
    });
  });
  describe("getValuesForReactSelect", () => {
    it("deals with single case", () => {
      expect(
        _test.getValuesForReactSelect([{id: 5}], obj => obj.id.toString(), true)
      ).toEqual("5");
    });
    it("deals with single null", () => {
      expect(_test.getValuesForReactSelect([], obj => obj.id, true)).toEqual(
        null
      );
    });
    it("deals with multi case", () => {
      expect(
        _test.getValuesForReactSelect(
          [{id: 5}],
          obj => obj.id.toString(),
          false
        )
      ).toEqual(["5"]);
    });
  });
});
