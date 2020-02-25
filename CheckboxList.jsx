/**
 * TEAM: frontend_infra
 * @flow strict
 */

import * as React from "react";
import {difference} from "lodash";
import Checkbox from "./Checkbox";
import Group from "./Group";
import invariant from "./tools/invariant";
import {StyleSheet, css} from "./styles";
import latitudeColors from "./colors";
// silly import path to work around what seems like a flow bug
import {whitespaceSizeConstants} from "./tabs/../styles/whitespace";
import {commonT} from "./config/I18n";

export type Option<T> = {|
  +value: T,
  +label: string,
  +disabled?: boolean,
|};

export type Props<T> = {|
  /** values specify which checkboxes are in the `checked` state. */
  +values: $ReadOnlyArray<T>,
  /**
   * onChange is called with the array of the values of every checkbox that
   * is currently checked.
   */
  +onChange: (values: $ReadOnlyArray<T>) => void,
  /**
   * The options the checkbox should display. The order options are provided
   * determines the order in which they appear in the Checkbox list.
   */
  +options: $ReadOnlyArray<Option<T>>,
  /**
   * Determines whether the checkboxes will run inline (horizontally), or
   * vertically.
   */
  +isInline?: boolean,
  /** The gap in pixels between Checkboxes. */
  +gap?: number,
  /** Whether the checkbox list is invalid */
  +isInvalid?: boolean,
  /** Whether the checkbox list has a select all checkbox at the top of the list */
  +showSelectAllOption?: boolean,
|};

type ItemsSelectedState = "all" | "none" | "some";

function itemsSelectedState<T>(
  values: $ReadOnlyArray<T>,
  options: $ReadOnlyArray<Option<T>>
): ItemsSelectedState {
  const optionValues = options
    .filter(option => !option.disabled)
    .map(option => option.value);
  const diff = difference(optionValues, values);
  if (diff.length === 0) {
    return "all";
  } else if (diff.length === optionValues.length) {
    return "none";
  }
  return "some";
}

function getAllSelectedValues<T>(
  values: $ReadOnlyArray<T>,
  options: $ReadOnlyArray<Option<T>>
): $ReadOnlyArray<T> {
  const nonDisabledOptions = options.filter(option => !option.disabled);
  return [
    ...getDisabledSelectedValues(values, options),
    ...nonDisabledOptions.map(option => option.value),
  ];
}

function getDisabledSelectedValues<T>(
  values: $ReadOnlyArray<T>,
  options: $ReadOnlyArray<Option<T>>
): $ReadOnlyArray<T> {
  const valuesSet = new Set(values);
  const disabledSelectedOptions = options
    .filter(option => option.disabled)
    .filter(option => valuesSet.has(option.value));
  return [...disabledSelectedOptions.map(option => option.value)];
}

/**
 * @short CheckboxList manages the states of multiple checkboxes via an array of options and values
 * @brandStatus V2
 * @status Stable
 * @category Data Entry
 */
export default function CheckboxList<T>({
  options,
  values,
  onChange,
  isInline = false,
  gap = 4,
  isInvalid = false,
  showSelectAllOption = false,
}: Props<T>) {
  invariant(
    !(isInline && showSelectAllOption),
    "Don't use the showSelectAllOption prop on inline checkbox lists"
  );
  const handleCheckboxChange = (option: Option<T>, checked: boolean) => {
    const newValues = values.slice();

    const selectedIndex = newValues.indexOf(option.value);
    if (selectedIndex >= 0) {
      newValues.splice(selectedIndex, 1);
    }

    if (checked) {
      newValues.push(option.value);
    }

    onChange(newValues);
  };

  const handleSelectAll = selectAll =>
    selectAll
      ? onChange(getAllSelectedValues(values, options))
      : onChange(getDisabledSelectedValues(values, options));

  const itemsSelected = itemsSelectedState(values, options);

  const selectAllCheckbox = showSelectAllOption ? (
    <Checkbox
      onChange={handleSelectAll}
      label={
        itemsSelected === "all" ? commonT("Select none") : commonT("Select all")
      }
      indeterminate={itemsSelected === "some"}
      checked={itemsSelected === "all"}
    />
  ) : null;

  return (
    <Group flexDirection={isInline ? "row" : "column"} gap={gap}>
      {selectAllCheckbox}
      {showSelectAllOption ? <div className={css(style.hr)} /> : null}
      {options.map(option => (
        <Checkbox
          onChange={handleCheckboxChange.bind(this, option)}
          key={option.label}
          label={option.label}
          checked={values.some(value => value === option.value)}
          disabled={option.disabled}
          isInvalid={!!isInvalid}
        />
      ))}
    </Group>
  );
}

const style = StyleSheet.create({
  hr: {
    width: "100%",
    borderTop: `1px solid ${latitudeColors.grey30}`,
    marginTop: whitespaceSizeConstants.s,
    marginBottom: whitespaceSizeConstants.s,
  },
});
