/**
 * TEAM: frontend_infra
 * @flow strict
 */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import useDropdown from "./tools/useDropdown";
import TextInput from "./TextInput";
import DropdownList from "./select/DropdownList";
import PopupWithClickAway from "./popup/PopupWithClickAway";
import {zIndices} from "./tools/zIndices";

type Option = string;

type TextInputProps = React.ElementConfig<typeof TextInput>;

type Props = {|
  /** all TextInput props will be passed into the TextInput */
  ...TextInputProps,
  +suggestions: $ReadOnlyArray<Option>,
  /**
   * positively filters an suggestion according to the callback. Specify `null` to
   * not filter suggestions
   */
  +suggestionsFilter: ((query: string, option: Option) => boolean) | null,
  /** the maximum number of suggestions that will be presented */
  +maximumOptions: number,
  /** the suggestion to highlight for keyboard selection, can be a function that
   * returns what suggestion to highlight on value change */
  +highlight?: string | ((?string) => ?string),
|};

export const defaultFilter = (query: string, option: Option) => {
  const trimmedOption = option.toLowerCase().trim();
  const trimmedQuery = query.toLowerCase().trim();

  return trimmedOption.includes(trimmedQuery);
};

const defaultProps = {
  suggestionsFilter: defaultFilter,
  maximumOptions: 10,
};

/**
 * @category Data Entry
 * @short Collect simple text input from the user with dropdown suggestions
 * @brandStatus V2
 * @status Stable
 * TextInputAutocomplete is a text input with a suggestions dropdown. By default a maximum
 * of 10 suggestions are displayed by the dropdown.
 */
export default function TextInputAutocomplete({
  suggestions,
  suggestionsFilter,
  maximumOptions,
  value,
  highlight,
  ...textInputProps
}: Props) {
  const filteredSuggestions = suggestions
    .filter((option: string) =>
      suggestionsFilter ? suggestionsFilter(value, option) : true
    )
    .slice(0, maximumOptions);

  const popper = React.useRef();

  const handleChange = (newValue: string) => {
    textInputProps.onChange(newValue);

    if (typeof highlight === "function") {
      const valueToHighlight = highlight(newValue);

      if (valueToHighlight != null) {
        setHighlightedLabel(valueToHighlight);
      }
    }
  };

  const {highlightedIndex, handlers, setHighlightedLabel} = useDropdown(
    filteredSuggestions,
    {
      popper,
      onChange: handleChange,
      rememberHighlightPosition: suggestionsFilter === null,
      onMouseDown: e => {
        if (textInputProps.onClick) {
          textInputProps.onClick(e);
        }
      },
      onFocus: e => {
        if (textInputProps.onFocus) {
          textInputProps.onFocus(e);
        }
      },
      onBlur: e => {
        if (textInputProps.onBlur) {
          textInputProps.onBlur(e);
        }
      },
      onKeyDown: e => {
        if (textInputProps.onKeyDown) {
          textInputProps.onKeyDown(e);
        }
      },
    }
  );

  if (typeof highlight === "string") setHighlightedLabel(highlight);

  return (
    <PopupWithClickAway ref={popper}>
      {(Target, Popup) => (
        <div className={css(styles.container)}>
          <Target>
            <TextInput
              {...textInputProps}
              value={value}
              onChange={handlers.handleChange}
              onMouseDown={handlers.handleMouseDown}
              onFocus={handlers.handleFocus}
              onBlur={handlers.handleBlur}
              onKeyDown={handlers.handleKeyDown}
            />
          </Target>
          <Popup
            placement="bottom-start"
            zIndex={zIndices.zIndex1500AboveModal.value}
            noPortal={true}
          >
            <div
              tabIndex={-1}
              onFocus={handlers.handleFocus}
              onBlur={handlers.handleBlur}
              className={css(styles.dropdownContainer)}
            >
              <DropdownList
                options={filteredSuggestions.map(suggestion => ({
                  label: suggestion,
                }))}
                highlightedOption={
                  highlightedIndex != null
                    ? filteredSuggestions[highlightedIndex]
                    : null
                }
                onClick={handlers.handleItemClick}
              />
            </div>
          </Popup>
        </div>
      )}
    </PopupWithClickAway>
  );
}

TextInputAutocomplete.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  dropdownContainer: {
    position: "absolute",
    left: "0",
    top: "100%",
    padding: "6px 0",
    minWidth: "100%",
    zIndex: "10",
    transform: "none",
  },
});
