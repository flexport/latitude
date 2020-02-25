/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {isEqual} from "lodash";
import BaseFilter, {type PopupPlacement} from "./BaseFilter";
import MultiselectOptions from "../select/MultiselectOptions";
import {type Size} from "../sizes";

export type ValueObj<T> =
  | {|+type: "allSelected"|}
  | {|+type: "specificValues", +specificValues: $ReadOnlyArray<T>|};

export type FilterMode =
  | {|+type: "none"|}
  | {|+type: "filter", +placeholder?: string|};

export type Option<T> = {|
  /** the unique label associated with the option */
  +label: string,
  /** the unqiue value of the option */
  +value: T,
  /** Whether the option can be toggled */
  +disabled?: boolean,
|};

type Props<T> = {|
  /** Description of the filter pivot, e.g. `City` */
  +label: string,
  /** The currently selected value */
  +value: ValueObj<T>,
  /** The list of options to be picked from */
  +options: $ReadOnlyArray<Option<T>>,
  /** creates a select all checkbox above the options that allows you to select all */
  +displaySelectAllButton?: boolean,
  /**
   * If `filterSearchMode` is set to `filter`, a text input will be included
   * that will filter down on the visible options
   */
  +filterSearchMode?: FilterMode,
  /** Called when the selected value changes */
  +onChange: (newValue: ValueObj<T>) => void,
  /**
   * Replaces the downOpen icon with an X button. When this button is pressed,
   * onRemove is called
   */
  +onRemove?: () => void,
  /** Whether the label hides if there are any options selected */
  +shyLabel?: boolean,
  /** The size of the filter button */
  +size?: Size,
  /** Whether the filter is disabled */
  +disabled?: boolean,
  /** controls where the dropdown menu is anchored in relation to the multiselect input */
  +dropdownPlacement?: PopupPlacement,
  /** whether to use a Portal or React Fragment component */
  +noPortal?: boolean,
|};

/*
 * getValueArrayFromFilterValue returns the corresponding array value based on
 * the given filter value. Due to the 2 conditions to convert filter value to
 * array, this helper function provides an interface for simple and more
 * legible conversion
 */
export function getValueArrayFromFilterValue<K>(
  filterValue: ValueObj<K> | null
): $ReadOnlyArray<K> {
  return filterValue && filterValue.type === "specificValues"
    ? filterValue.specificValues
    : [];
}

/*
 * getFilterValueFromArray returns the corresponding filter value based on the
 * length of the array input. Because MultiselectFilter takes a complex object,
 * this helper function is provided to help users derive the complex object
 * from their values array and options
 */
export function getFilterValueFromArray<K, T>(
  valueToCheck: $ReadOnlyArray<K> | null | void,
  options: $ReadOnlyArray<Option<T>>
): ValueObj<K> {
  if (
    (valueToCheck &&
      (valueToCheck.length === 0 || valueToCheck.length === options.length)) ||
    !valueToCheck
  ) {
    return ALL_SELECTED_VALUE_STATE;
  }
  const castedValueToCheck: $ReadOnlyArray<K> = valueToCheck;
  const result = {
    type: "specificValues",
    specificValues: castedValueToCheck,
  };
  return result;
}

export const ALL_SELECTED_VALUE_STATE = {type: "allSelected"};

function allSelected<T>(value: ValueObj<T>): boolean {
  return isEqual(value, ALL_SELECTED_VALUE_STATE);
}

/**
 * @short MultiselectFilter allows users to filter by multiple values from a list
 * @category Filter
 * @brandStatus V2
 * @status Stable
 * MultiselectFilter is the filter analog for MultiselectInput. The API is the
 * same as MultiselectInput, but appears in a filter UX.
 */
function MultiselectFilter<T>({
  label,
  value,
  options,
  displaySelectAllButton = false,
  filterSearchMode = {type: "none"},
  onChange,
  onRemove,
  shyLabel,
  size,
  disabled,
  dropdownPlacement,
  noPortal = false,
}: Props<T>) {
  // "All options selected" and "no options selected" are equivalent as far as
  // the parent component is concerned: they both resolve to a value of
  // `{type: "allSelected"}`. Even though they mean the same thing, we want to
  // render them differently: all boxes checked, or no boxes checked. To
  // accomplish this, we use component state.
  const [noneSelected, setNoneSelected] = React.useState<boolean>(
    allSelected(value)
  );

  const handleChange = (newValues: $ReadOnlyArray<T>) => {
    if (newValues.length === options.length) {
      setNoneSelected(false);
      onChange(ALL_SELECTED_VALUE_STATE);
    } else if (newValues.length === 0) {
      setNoneSelected(true);
      onChange(ALL_SELECTED_VALUE_STATE);
    } else {
      setNoneSelected(false);
      onChange({type: "specificValues", specificValues: newValues});
    }
  };

  const handleRemove = () => {
    setNoneSelected(true);
    if (onRemove) onRemove();
  };

  let selectedValues: $ReadOnlyArray<T>;
  if (allSelected(value)) {
    selectedValues = noneSelected ? [] : options.map(o => o.value);
  } else {
    selectedValues = value.specificValues || [];
  }

  let selectedText = null;
  if (selectedValues.length > 1) {
    selectedText = String(selectedValues.length);
  } else if (selectedValues.length === 1) {
    const selectedOption = options.find(option =>
      isEqual(option.value, selectedValues[0])
    ) || {label: null};
    selectedText = selectedOption.label;
  }

  return (
    <BaseFilter
      label={label}
      size={size}
      shyLabel={shyLabel}
      selectedText={selectedText}
      onRemove={onRemove ? handleRemove : undefined}
      disabled={disabled}
      placement={dropdownPlacement}
      noPortal={noPortal}
    >
      <MultiselectOptions
        values={selectedValues}
        options={options}
        onChange={handleChange}
        displaySelectAllButton={displaySelectAllButton}
        filterSearchMode={filterSearchMode}
      />
    </BaseFilter>
  );
}

export default MultiselectFilter;
