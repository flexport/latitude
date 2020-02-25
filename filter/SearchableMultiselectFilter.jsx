/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import {isEqual, noop} from "lodash";
import BaseFilter, {
  ActualPlacementContext,
  type PopupPlacement,
} from "./BaseFilter";
import MultiInput from "../MultiInput";
import DropdownList, {DEFAULT_MAX_HEIGHT} from "../select/DropdownList";
import CheckboxOption from "../select/custom_option/CheckboxOption";
import {type Size} from "../sizes";
import Text from "../Text";
import colors from "../colors";

import {UP, DOWN, ESC, ENTER} from "../constants/interactions/KeyCodes";

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
  +value: $ReadOnlyArray<T>,
  /** The list of options to be picked from */
  +options: $ReadOnlyArray<Option<T>>,
  /** Called when the selected value changes */
  +onChange: (newValue: $ReadOnlyArray<T>) => void,
  /** Called when the search text changes */
  +onSearchTextChange?: (text: string) => void,
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

/** determines if an option matches the search text */
function filterOptions(
  options: $ReadOnlyArray<Option<any>>,
  searchText: string
) {
  return options.filter(option =>
    option.label.toLowerCase().includes(searchText.toLowerCase())
  );
}

type UseDropdown = {|
  +handleInputKeyDown: (e: KeyboardEvent) => void,
  +handleInputBlur: () => void,
  +highlightedIndex: number | null,
|};

/** A hook that handles the dropdown logic of the multiselect filter */
function useDropdown<T>(
  valueSet: $ReadOnlySet<T>,
  options: $ReadOnlyArray<Option<T>>,
  onChange: (value: $ReadOnlyArray<T>) => void
): UseDropdown {
  const [highlightedIndex, setHighlightedIndex] = React.useState(null);

  const handleInputKeyDown = (e: KeyboardEvent) => {
    if (options.length === 0) {
      return;
    }

    switch (e.keyCode) {
      case UP: {
        if (highlightedIndex === 0 || highlightedIndex === null) {
          setHighlightedIndex(options.length - 1);
        } else {
          setHighlightedIndex(highlightedIndex - 1);
        }
        break;
      }
      case DOWN: {
        if (
          highlightedIndex === options.length - 1 ||
          highlightedIndex === null
        ) {
          setHighlightedIndex(0);
        } else {
          setHighlightedIndex(highlightedIndex + 1);
        }
        break;
      }
      case ESC: {
        setHighlightedIndex(null);
        break;
      }
      case ENTER: {
        if (highlightedIndex !== null) {
          const selectedValue = options[highlightedIndex].value;

          if (valueSet.has(selectedValue)) {
            const updatedValueSet = new Set(valueSet);
            updatedValueSet.delete(selectedValue);
            onChange(Array.from(updatedValueSet));
          } else {
            onChange([...valueSet, selectedValue]);
          }
        }
        break;
      }
      default: {
        setHighlightedIndex(null);
        break;
      }
    }
  };

  const handleInputBlur = () => {
    setHighlightedIndex(null);
  };

  return {
    handleInputKeyDown,
    handleInputBlur,
    highlightedIndex,
  };
}

/**
 * @short SearchableMultiselectFilter allows users to filter by multiple values from a list
 * @category Filter
 * @brandStatus V2
 * @status Stable
 * SearchableMultiselectFilter is the filter analog for MultiselectInput. The API is the
 * same as MultiselectInput, but appears in a filter UX. SearchableMultiselectFilter
 * differs from MultiselectFilter solely in UX and can be used interchangeably.
 */
function SearchableMultiselectFilter<T>({
  label,
  value,
  onChange: _onChange,
  onSearchTextChange,
  onRemove,
  shyLabel,
  options,
  size,
  disabled = false,
  dropdownPlacement,
  noPortal = false,
}: Props<T>) {
  const valueSet = new Set<T>(value);
  const selectedOptions = options.filter(option => valueSet.has(option.value));
  const [searchText, setSearchText] = React.useState("");

  const filteredOptions = filterOptions(options, searchText);

  const onChange = (values: $ReadOnlyArray<T>) => {
    handleMultiInputSearch("");
    _onChange(values);
  };

  const {handleInputKeyDown, handleInputBlur, highlightedIndex} = useDropdown(
    valueSet,
    filteredOptions,
    onChange
  );

  const handleMultiInputSearch = (newQuery: string) => {
    setSearchText(newQuery);
    if (onSearchTextChange) {
      onSearchTextChange(newQuery);
    }
  };

  const handleMultiInputChange = (newLabels: $ReadOnlyArray<string>) => {
    // can't add items via MultiInput
    if (newLabels.length > value.length) {
      return;
    }

    const labelToOptionMapping = options.reduce((acc, option) => {
      acc[option.label] = option;
      return acc;
    }, {});

    const newOptions = newLabels
      .map(label => labelToOptionMapping[label])
      .filter(Boolean);

    onChange(newOptions.map(option => option.value));
  };

  let selectedText = null;

  if (value.length > 1) {
    selectedText = String(value.length);
  } else if (value.length === 1) {
    const selectedOption = options.find(option =>
      isEqual(option.value, value[0])
    ) || {label: null};
    selectedText = selectedOption.label;
  }

  return (
    <BaseFilter
      label={label}
      size={size}
      shyLabel={shyLabel}
      selectedText={selectedText}
      onRemove={onRemove}
      disabled={disabled}
      placement={dropdownPlacement}
      noPortal={noPortal}
    >
      <div className={css(styles.filterContainer)}>
        <div className={css(styles.multiInputContainer)}>
          <MultiInput
            value={selectedOptions.map(option => option.label)}
            onChange={handleMultiInputChange}
            searchText={searchText}
            onSearch={handleMultiInputSearch}
            onKeyDown={handleInputKeyDown}
            onBlur={handleInputBlur}
            onPaste={noop}
            addValueOnBlur={false}
            autoFocus={true}
          />
        </div>

        <div className={css(styles.separator)} />

        <CheckboxDropdownList
          valueSet={valueSet}
          onChange={onChange}
          options={filteredOptions}
          highlightedIndex={highlightedIndex}
          query={searchText}
        />
      </div>
    </BaseFilter>
  );
}

type CheckboxDropdownProps<T> = {|
  +valueSet: $ReadOnlySet<T>,
  +onChange: (newValue: $ReadOnlyArray<T>) => void,
  +options: $ReadOnlyArray<Option<T>>,
  +highlightedIndex: number | null,
  +query: string,
|};

function CheckboxDropdownList<T>({
  valueSet,
  onChange,
  options,
  highlightedIndex,
  query,
}: CheckboxDropdownProps<T>) {
  const handleCheckboxChange = (selectedLabel: string) => {
    const selectedOption = options.find(
      option => option.label === selectedLabel
    );
    const valueSetClone = new Set<T>(valueSet);

    if (!selectedOption) {
      return;
    }

    if (valueSet.has(selectedOption.value)) {
      valueSetClone.delete(selectedOption.value);
      onChange(Array.from(valueSetClone));
    } else {
      valueSetClone.add(selectedOption.value);
      onChange(Array.from(valueSetClone));
    }
  };

  const highlightedOption =
    highlightedIndex !== null ? options[highlightedIndex].label : null;

  const emptyStateElement = (
    <div className={css(styles.noOptionsContainer)}>
      <Text color="grey50">No results for query &quot;{query}&quot;</Text>
    </div>
  );

  const actualPlacement = React.useContext(ActualPlacementContext);

  return (
    <DropdownList
      options={options.map(option => ({
        label: option.label,
        customView: (
          <CheckboxOption
            label={option.label}
            checked={valueSet.has(option.value)}
            onChange={() => {
              handleCheckboxChange(option.label);
            }}
          />
        ),
      }))}
      highlightedOption={highlightedOption}
      onClick={handleCheckboxChange}
      footer={options.length === 0 ? emptyStateElement : null}
      maxHeight={DEFAULT_MAX_HEIGHT}
      maintainMaximalHeight={actualPlacement?.startsWith("top")}
    />
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    display: "flex",
    flexDirection: "column",
  },
  multiInputContainer: {
    padding: "12px",
    width: "300px",
  },
  separator: {
    borderTop: `1px solid ${colors.grey20}`,
  },
  noOptionsContainer: {
    display: "flex",
    height: "40px",
    padding: "12px",
    alignItems: "center",
  },
});

export default SearchableMultiselectFilter;
