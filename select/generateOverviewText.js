/**
 * TEAM: frontend_infra
 * WATCHERS: uforic
 * @flow
 */
import type {Option, MultiselectKey} from "./MultiselectInput";
import {commonT as t} from "../config/I18n";

type SelectorTextGeneratorOptions = {|
  +allSelectedText?: string,
  +noneSelectedText?: string,
  +numberOfOptionsToDisplay?: number,
  +someSelectedUnits?: string,
|};

const textGeneratorOptionDefaults = {
  allSelectedText: t("All selected"),
  noneSelectedText: t("None selected"),
  numberOfOptionsToDisplay: 2,
};

export default function generateOverviewText<K>(
  options: $ReadOnlyArray<Option<K>>,
  values: $ReadOnlyArray<MultiselectKey>,
  toKeyFn: K => MultiselectKey,
  userGeneratorOptions: ?SelectorTextGeneratorOptions
) {
  const generatorOptions = userGeneratorOptions || {};

  const numberOfOptionsToDisplay =
    generatorOptions.numberOfOptionsToDisplay != null
      ? generatorOptions.numberOfOptionsToDisplay
      : textGeneratorOptionDefaults.numberOfOptionsToDisplay;

  if (values.length === options.length) {
    if (generatorOptions.allSelectedText) {
      return generatorOptions.allSelectedText;
    }
    return generatorOptions.someSelectedUnits
      ? `All ${generatorOptions.someSelectedUnits}`
      : textGeneratorOptionDefaults.allSelectedText;
  }
  if (values.length === 0) {
    if (generatorOptions.noneSelectedText) {
      return generatorOptions.noneSelectedText;
    }
    return generatorOptions.someSelectedUnits
      ? `No ${generatorOptions.someSelectedUnits}`
      : textGeneratorOptionDefaults.noneSelectedText;
  }
  if (values.length <= numberOfOptionsToDisplay) {
    const selectedOptions = options.filter(option =>
      values.includes(toKeyFn(option.value))
    );
    const selectedNames = selectedOptions.map(
      selectedOption => selectedOption.label
    );
    return selectedNames.join(", ");
  }
  const someSelectedUnits = generatorOptions.someSelectedUnits
    ? ` ${generatorOptions.someSelectedUnits}`
    : " selected";
  return values.length + someSelectedUnits;
}

export const _test = {textGeneratorOptionDefaults};
