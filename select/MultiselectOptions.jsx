/**
 * TEAM: frontend_infra
 * @flow
 */
import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import {InFilterContext} from "../filter/BaseFilter";
import CheckboxList, {type Option} from "../CheckboxList";
import TextInput from "../TextInput";
import colors from "../colors";
import {border} from "../styles/index";
import {whitespaceSizeConstants} from "../styles/whitespace";

type FilterMode =
  | {|+type: "none"|}
  | {|+type: "filter", +placeholder?: string|};

type Props<T> = {
  /** The currently selected list of values */
  +values: $ReadOnlyArray<T>,
  /** Called whenever the selected items changes */
  +onChange: (values: $ReadOnlyArray<T>) => void,
  /** The list of options to pick from */
  +options: $ReadOnlyArray<Option<T>>,
  /** Displays a select all button as the first item of the list */
  +displaySelectAllButton: boolean,
  /**
   * If `filterSearchMode` is set to `filter`, a text input will be included
   * that will filter down on the visible options
   */
  +filterSearchMode: FilterMode,
};

const defaultSearchPlaceholder = "Search location";

/** determines if an option matches the search text */
function filterOptions(
  options: $ReadOnlyArray<Option<any>>,
  searchText: string
) {
  return options.filter(option =>
    option.label.toLowerCase().includes(searchText.toLowerCase())
  );
}

function separateFilteredValues<T>(
  values: $ReadOnlyArray<T>,
  filteredOptions: $ReadOnlyArray<Option<T>>
): [$ReadOnlyArray<T>, $ReadOnlyArray<T>] {
  const filteredValues = new Set(values);
  const remainingValues = new Set();
  filteredOptions.forEach(option => {
    if (filteredValues.has(option.value)) {
      filteredValues.delete(option.value);
      remainingValues.add(option.value);
    }
  });
  return [Array.from(filteredValues), Array.from(remainingValues)];
}

/**
 * @short Select multiple values from a list of options.
 * @category Data Entry
 * @brandStatus V2
 * @status Stable
 */
function MultiselectOptions<T>({
  values,
  onChange,
  options,
  displaySelectAllButton,
  filterSearchMode,
}: Props<T>) {
  // DropdownList will drop its border styling if it's in a filter
  const inFilter = React.useContext(InFilterContext);

  const [searchText, setSearchText] = React.useState("");
  const placeholder = filterSearchMode.placeholder || defaultSearchPlaceholder;

  const displayOptions = filterOptions(options, searchText);
  const [filteredValues, remainingValues] = separateFilteredValues(
    values,
    displayOptions
  );
  const onChangeWithFilteredValues = newValues => {
    onChange([...filteredValues, ...newValues]);
  };

  const searchBar =
    filterSearchMode.type !== "none" ? (
      <div className={css(styles.searchBox)}>
        <TextInput
          value={searchText}
          onChange={setSearchText}
          placeholder={placeholder}
          prefix={{iconName: "search"}}
        />
      </div>
    ) : null;

  const searchBarMsg =
    displayOptions.length === 0 ? (
      <div className={css(styles.filterMsg)}>No options available</div>
    ) : null;

  const optionsDisplay =
    displayOptions.length !== 0 ? (
      <div className={css(styles.checkboxList)}>
        <CheckboxList
          showSelectAllOption={displaySelectAllButton}
          values={remainingValues}
          onChange={onChangeWithFilteredValues}
          options={displayOptions}
        />
      </div>
    ) : null;

  return (
    <div
      className={css(styles.listContainer, !inFilter && styles.listDecoration)}
    >
      {searchBar}
      {searchBarMsg}
      {optionsDisplay}
    </div>
  );
}

MultiselectOptions.defaultProps = {
  filterSearchMode: {type: "none"},
};

export default MultiselectOptions;

const MIN_WIDTH = "160px";
const MAX_DROPDOWN_HEIGHT = "256px";
const MAX_DROPDOWN_WIDTH = "256px";

export const styles = StyleSheet.create({
  selectAllCheckbox: {
    paddingBottom: whitespaceSizeConstants.s,
    paddingLeft: whitespaceSizeConstants.m,
    paddingRight: whitespaceSizeConstants.m,
    marginBottom: whitespaceSizeConstants.s,
    ...border.b.s,
    borderColor: colors.grey20,
  },
  searchBox: {
    margin: whitespaceSizeConstants.s,
  },
  checkboxList: {
    paddingLeft: whitespaceSizeConstants.m,
    paddingRight: whitespaceSizeConstants.m,
  },
  listContainer: {
    minWidth: MIN_WIDTH,
    backgroundColor: colors.white,
    paddingTop: whitespaceSizeConstants.s,
    paddingBottom: whitespaceSizeConstants.s,
    maxHeight: MAX_DROPDOWN_HEIGHT,
    maxWidth: MAX_DROPDOWN_WIDTH,
    overflowY: "auto",
  },
  listDecoration: {
    ...border.a.s,
    marginTop: whitespaceSizeConstants.s,
    borderRadius: 3,
    boxShadow: "2px 2px 2px rgba(0,0,0,0.06)",
  },
  filterMsg: {
    paddingLeft: whitespaceSizeConstants.m,
  },
});
