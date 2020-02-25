/**
 * TEAM: frontend_infra
 * WATCHERS: uforic
 * @flow
 */
import generateOverviewText, {_test} from "../generateOverviewText";

import type {Option} from "../MultiselectInput";

function convertStringsToOptions(strs: Array<string>) {
  return strs.map<Option<string>>(str => ({
    label: str,
    value: str,
  }));
}

// eslint-disable-next-line import/prefer-default-export
export const options = convertStringsToOptions([
  "foo",
  "bar",
  "baz",
  "waz",
  "zoo",
]);

const simpleOptions = options;

const noValues = [];
const oneValue = ["foo"];
const twoValues = ["foo", "bar"];
const allValues = ["foo", "bar", "baz", "waz", "zoo"];

describe("generate overview text", () => {
  it("defaults with no option correctly", () => {
    expect(
      generateOverviewText(simpleOptions, noValues, value => value)
    ).toEqual(_test.textGeneratorOptionDefaults.noneSelectedText);
  });
  it("defaults with all option correctly", () => {
    expect(
      generateOverviewText(simpleOptions, allValues, value => value)
    ).toEqual(_test.textGeneratorOptionDefaults.allSelectedText);
  });
  it("shows some units", () => {
    const someSelectedUnits = "things";
    expect(
      generateOverviewText(simpleOptions, twoValues, value => value, {
        someSelectedUnits,
        numberOfOptionsToDisplay: 1,
      })
    ).toEqual(`${twoValues.length} ${someSelectedUnits}`);
  });
  it("shows one unit on the display", () => {
    expect(
      generateOverviewText(simpleOptions, oneValue, value => value, {
        numberOfOptionsToDisplay: 1,
      })
    ).toEqual(`${oneValue[0]}`);
  });
});
