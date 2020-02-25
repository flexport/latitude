/**
 * TEAM: frontend_infra
 * @flow
 */
import * as React from "react";
import {StyleSheet, css} from "aphrodite";

import colors from "../colors";
import {type Size} from "../sizes";
import TextInput from "../TextInput";
import DropdownList, {type Option as DropdownOption} from "./DropdownList";
import useDropdown from "../tools/useDropdown";
import {defaultFilter} from "../TextInputAutocomplete";
import PopupWithClickAway from "../popup/PopupWithClickAway";
import {zIndices} from "../tools/zIndices";

import {BACKSPACE} from "../constants/interactions/KeyCodes";

export type Option<K> = {|
  ...DropdownOption,
  +value: K,
|};

type DropdownListProps = $Diff<
  React.ElementConfig<typeof DropdownList>,
  {|
    +options: any,
    +highlightedOption: any,
    +onClick: any,
    +isOpen: any,
  |}
>;

export type SelectInputProps<T> = {|
  // See DropdownList for dropdown props
  ...DropdownListProps,
  /** the current selected value of the select input */
  +value: T | null,
  /** the options the select input will display (see `Option` type for option's parameters) */
  +options: $ReadOnlyArray<Option<T>>,
  /** place holder text that will be displayed when the select input is empty */
  +placeholder?: string,
  /** whether the entire select input is disabled */
  +disabled?: boolean,
  /** the size of the input field */
  +size?: Size,
  /** whether the select input is in an invalid state */
  +isInvalid?: boolean,
  /** when true, this allows the user to select the empty element from the list. this calls onChange with `null`. */
  +isNullable?: boolean,
  /** whether the select input is in an prefilled state */
  +isPrefilled?: boolean,
  /** called when the value of the select input is changed */
  +onChange: (T | null) => void,
  /** called when the select input field is focused */
  +onFocus?: Event => void,
  /** called when the select input field is blurred */
  +onBlur?: Event => void,
  /** whether the popover generated uses a portal */
  +noPortal?: boolean,
|};

/**
 * @short Use SearchableSelectInput when constructing forms, if you need to select only one value from a list but the list is long.
 * @category Data Entry
 * @brandStatus V2
 * @status Stable
 */
function SearchableSelectInput<T>({
  sectionOrder,
  header,
  footer,
  value,
  options,
  placeholder = "",
  disabled = false,
  size = "m",
  isInvalid = false,
  isNullable = true,
  isPrefilled = false,
  onChange,
  onFocus,
  onBlur,
  noPortal = true,
}: SelectInputProps<T>) {
  const labelValueMap = options.reduce((acc, curr) => {
    acc.set(curr.label, curr.value);
    return acc;
  }, new Map());
  const valueLabelMap = options.reduce((acc, curr) => {
    acc.set(curr.value, curr.label);
    return acc;
  }, new Map());
  const [inputText, setInputText] = React.useState("");
  const [tabbingTextPlaceholder, setTabbingTextPlaceholder] = React.useState(
    valueLabelMap.get(value) || null
  );
  const popper = React.useRef();

  React.useEffect(() => {
    setTabbingTextPlaceholder(valueLabelMap.get(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const filteredDropdownOptions = options
    .filter(option => defaultFilter(inputText, option.label))
    .map(option => {
      const {value, ...dropdownOption} = option;
      return dropdownOption;
    });

  const handleChange = (newText: string | null) => {
    setInputText("");
    setTabbingTextPlaceholder(newText);

    onChange(labelValueMap.get(newText) || null);
  };

  const {highlightedIndex, handlers} = useDropdown(
    filteredDropdownOptions.map(option => option.label),
    {
      popper,
      onChange: handleChange,
      selectedLabel: valueLabelMap.get(value),
      rememberHighlightPosition: true,
      onFocus: (e: Event) => {
        if (onFocus) {
          onFocus(e);
        }
      },
      onBlur: (e: Event) => {
        setInputText("");
        setTabbingTextPlaceholder(valueLabelMap.get(value) || null);

        if (onBlur) {
          onBlur(e);
        }
      },
      onKeyDown: (e: KeyboardEvent) => {
        if (isNullable && e.keyCode === BACKSPACE && inputText === "") {
          handleChange(null);
          setTabbingTextPlaceholder("");
        }
      },
    }
  );

  const handleCancelClick = (e: Event) => {
    e.stopPropagation();

    handleChange(null);
    setInputText("");
  };

  const isInputTextPopulated =
    (tabbingTextPlaceholder && tabbingTextPlaceholder.length > 0) ||
    (inputText && inputText.length > 0);

  const suffix =
    isInputTextPopulated && isNullable
      ? {
          iconName: "cancel",
          onClick: handleCancelClick,
          size,
        }
      : {iconName: "downOpen"};

  return (
    <PopupWithClickAway ref={popper}>
      {(Target, Popup) => (
        <div
          className={css(
            styles.container,
            tabbingTextPlaceholder ? styles.darkPlaceholderText : null
          )}
        >
          <Target>
            <div className={css(styles.inputWrapper)}>
              <TextInput
                value={inputText}
                textOverflow="ellipsis"
                onChange={setInputText}
                onMouseDown={handlers.handleMouseDown}
                onFocus={handlers.handleFocus}
                onBlur={handlers.handleBlur}
                onKeyDown={handlers.handleKeyDown}
                isInvalid={isInvalid}
                disabled={disabled}
                placeholder={tabbingTextPlaceholder || placeholder}
                size={size}
                isPrefilled={isPrefilled}
                suffix={suffix}
              />
            </div>
          </Target>
          <Popup
            placement="bottom-start"
            zIndex={zIndices.zIndex1500AboveModal.value}
            noPortal={noPortal}
            className={noPortal ? css(styles.popup) : null}
          >
            <div
              tabIndex={-1}
              onFocus={handlers.handleFocus}
              onBlur={handlers.handleBlur}
              className={css(styles.dropdownContainer)}
            >
              <DropdownList
                options={filteredDropdownOptions}
                highlightedOption={
                  typeof highlightedIndex === "number"
                    ? filteredDropdownOptions[highlightedIndex].label
                    : null
                }
                sectionOrder={sectionOrder}
                header={header}
                footer={footer}
                onClick={handlers.handleItemClick}
              />
            </div>
          </Popup>
        </div>
      )}
    </PopupWithClickAway>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  inputWrapper: {
    position: "relative",
  },
  darkPlaceholderText: {
    ":nth-child(1n) > div > div > div > input::placeholder": {
      color: colors.grey60,
    },
  },
  popup: {
    width: "100%",
  },
  dropdownContainer: {
    outline: "none",
    display: "block",
    position: "absolute",
    left: "0",
    top: "100%",
    padding: "8px 0",
    minWidth: "100%",
    zIndex: "10",
    transform: "none",
  },
});

export default SearchableSelectInput;
