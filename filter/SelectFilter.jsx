/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {isEqual} from "lodash";
import BaseFilter, {type PopupPlacement} from "./BaseFilter";
import DropdownList from "../select/DropdownList";
import {type Size} from "../sizes";

type Option<T> = {|
  /** the unique label associated with the option */
  +label: string,
  /** the unqiue value of the option */
  +value: T,
|};

type Props<T> = {|
  /** Description of the filter pivot, e.g. `City` */
  +label: string,
  /** The currently selected value */
  +value: T | null,
  /** The list of options to be picked from */
  +options: $ReadOnlyArray<Option<T>>,
  /** Called when the selected value changes */
  +onChange?: (T | null) => void,
  /**
   * Replaces the downOpen icon with an X button. When this button is pressed,
   * onRemove is called
   */
  +onRemove?: () => void,
  /** Whether the label hides if there are any options selected */
  +shyLabel?: boolean,
  /** Whether the user can select the empty element from the list. This calls onChange with null */
  +isNullable?: boolean,
  /** The size of the filter button */
  +size?: Size,
  /** Whether the filter is disabled */
  +disabled?: boolean,
  /** controls where the dropdown menu is anchored in relation to the multiselect input */
  +dropdownPlacement?: PopupPlacement,
  /** whether to use a Portal or React Fragment component */
  +noPortal?: boolean,
|};

/**
 * @short SelectFilter allows users to filter by a value from a list of values
 * @category Filter
 * @brandStatus V2
 * @status Stable
 * SelectFilter is the filter analog for SelectInput. The API is the same as
 * SelectInput, but appears in a filter UX.
 */
function SelectFilter<T>({
  label,
  value,
  onChange,
  onRemove,
  shyLabel,
  options,
  isNullable = true,
  size,
  disabled = false,
  dropdownPlacement,
  noPortal = false,
}: Props<T>) {
  const selectedOption =
    options.find(option => isEqual(option.value, value)) || nullOption;

  const handleClick = (label: string) => {
    const clickedOption =
      options.find(option => option.label === label) || nullOption;

    if (onChange) {
      onChange(clickedOption.value);
    }
  };

  return (
    <BaseFilter
      label={label}
      size={size}
      shyLabel={shyLabel}
      selectedText={selectedOption.isNull ? undefined : selectedOption.label}
      onRemove={onRemove}
      disabled={disabled}
      placement={dropdownPlacement}
      noPortal={noPortal}
    >
      {closePopup => (
        <DropdownList
          options={createRenderOptions(options, isNullable)}
          onClick={label => {
            handleClick(label);
            closePopup();
          }}
          isOpen={true}
          highlightedOption={
            selectedOption.isNull ? null : selectedOption.label
          }
        />
      )}
    </BaseFilter>
  );
}

/** The null option, used to clear the filter */
const nullOption = {isNull: true, label: "Clear Filter", value: null};

function createRenderOptions<T>(
  options: $ReadOnlyArray<Option<T>>,
  isNullable: boolean
): $ReadOnlyArray<{|+label: string|}> {
  let renderOptions = isNullable ? [nullOption] : [];
  renderOptions = renderOptions.concat(options);
  return renderOptions.map(option => ({label: option.label}));
}

export default SelectFilter;
