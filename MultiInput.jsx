/**
 * TEAM: frontend_infra
 * @flow
 */

/* eslint-disable flexport/no-unused-aphrodite-styles */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import Pill from "./Pill";
import IconButton from "./button/IconButton";
import {getInputStyles} from "./styles/input";
import {LabelContext} from "./Label";
import {type Size} from "./sizes";

import {BACKSPACE, ENTER, COMMA} from "./constants/interactions/KeyCodes";

const clearButtonWidth = "28px";
const inputMinSize = "20px";

type Props = {|
  /** The list of selected options */
  +value: $ReadOnlyArray<string>,
  /**
   * Whenever an option is added or deleted, onChange is called with all
   * the selected options
   */
  +onChange: ($ReadOnlyArray<string>) => void,
  /**
   * The input text of the MultiInput. If unspecified, the MultiInput's
   * text input is controlled by the MultiInput.
   */
  +searchText?: string,
  /** Called when the text input value changes */
  +onSearch?: (search: string) => void,
  /** Called whenever a key is pressed */
  +onKeyDown?: (e: KeyboardEvent) => void,
  /** Called when the multiInput is blurred */
  +onBlur?: (e: SyntheticFocusEvent<HTMLInputElement>) => void,
  /** Called when text is pasted into the MultiInput */
  +onPaste?: (e: ClipboardEvent) => void,
  /** Whether or not blurring the input should add the current value */
  +addValueOnBlur?: boolean,
  /** The size of the MultiInput */
  +size?: Size,
  /** Placeholder text that will be displayed when the input is empty */
  +placeholder?: string,
  /** Focus the input when the component mounts */
  +autoFocus?: boolean,
|};

/**
 * @category Data Entry
 * @short An input for creating lists of text items
 * @brandStatus V2
 * @status Beta
 * MultiInput allows users to input lists of items. Users can paste a comma
 * separated list into the `MultiInput` and `MultiInput` will appropriately
 * parse and split the list.
 */
function MultiInput({
  value,
  onChange,
  searchText,
  onSearch,
  onKeyDown,
  autoFocus,
  onBlur,
  onPaste,
  addValueOnBlur = true,
  size = "m",
  placeholder = "",
}: Props) {
  const labelContext = React.useContext(LabelContext);
  const inputRef = React.useRef();
  const [_text, _setText] = React.useState("");
  const text = typeof searchText === "string" ? searchText : _text;
  const setText = (newText: string) => {
    if (onSearch) {
      onSearch(newText);
    }

    _setText(newText);
  };

  const onClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (onKeyDown) {
      onKeyDown(e);
    }

    const {keyCode, shiftKey} = e;

    if (text === "" && keyCode === BACKSPACE) {
      onChange(value.slice(0, value.length - 1));
      return;
    }

    if (
      text.trim() !== "" &&
      (keyCode === ENTER || (keyCode === COMMA && !shiftKey))
    ) {
      const newValue = [...value, text.trim()];
      onChange(newValue);
      e.preventDefault();
      setText("");

      if (inputRef.current) {
        inputRef.current.style.width = inputMinSize;
      }
    }
  };

  const defaultHandlePaste = (e: ClipboardEvent) => {
    if (text.trim() !== "" || !e.clipboardData) {
      return;
    }

    const pastedText = e.clipboardData.getData("text/plain");
    const pastedItems = pastedText.split(",").map(text => text.trim());

    e.preventDefault();
    onChange([...value, ...pastedItems]);
  };

  const onInputChange = (e: SyntheticInputEvent<EventTarget>) => {
    setText(e.target.value);
  };

  const onClear = () => {
    onChange([]);
  };

  const handleFocus = () => {
    if (labelContext.labelOnFocus) {
      labelContext.labelOnFocus();
    }
  };

  const handleBlur = (e: SyntheticFocusEvent<HTMLInputElement>) => {
    if (labelContext.labelOnBlur) {
      labelContext.labelOnBlur();
    }

    if (addValueOnBlur && text.trim() !== "") {
      onChange([...value, text.trim()]);
      setText("");
    }

    if (onBlur) {
      onBlur(e);
    }
  };

  if (inputRef.current) {
    inputRef.current.style.width = value.length === 0 ? "100%" : "20px";
    const {scrollWidth} = inputRef.current;
    if (value.length) {
      inputRef.current.style.width = `${scrollWidth}px`;
    }
  }

  const pillContainerStyles = css(
    styles.pillContainer,
    size === "s" && styles.pillContainerSmall,
    size === "l" && styles.pillContainerLarge
  );

  const pills = (
    <>
      {value.map((pillText, i) => (
        <span key={pillText} className={pillContainerStyles}>
          <Pill
            selectable={false}
            size={getPillSize(size)}
            onDismiss={() => {
              const newValue = [...value.slice(0, i), ...value.slice(i + 1)];
              onChange(newValue);
            }}
          >
            {pillText}
          </Pill>
        </span>
      ))}
    </>
  );

  return (
    <div
      className={css(...getInputStyles({size}), styles.container)}
      onClick={onClick}
      role="presentation"
    >
      <div
        className={css(
          styles.contentContainer,
          size === "s" && styles.contentContainerSmall,
          size === "l" && styles.contentContainerLarge
        )}
      >
        {pills}
        <span
          className={pillContainerStyles}
          style={{width: value.length === 0 ? "100%" : "auto"}}
        >
          <input
            type="text"
            placeholder={value.length === 0 ? placeholder : ""}
            value={text}
            ref={inputRef}
            className={css(styles.input)}
            onChange={onInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onPaste={onPaste || defaultHandlePaste}
            style={{width: value.length === 0 ? "100%" : inputMinSize}}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={autoFocus}
          />
        </span>
      </div>
      {value.length !== 0 ? (
        <div className={css(styles.clearButtonContainer)}>
          <IconButton
            type="button"
            kind="blank"
            size="s"
            iconName="cancel"
            onClick={onClear}
          />
        </div>
      ) : null}
    </div>
  );
}

const getPillSize = (size: Size) => {
  switch (size) {
    case "s":
      return "xs";
    case "m":
      return "xs";
    case "l":
      return "s";
    default:
      return "xs";
  }
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "auto",
    paddingTop: "0",
    paddingRight: "0",
    paddingBottom: "0",
    paddingLeft: "1px",
  },
  contentContainer: {
    display: "inline",
    flex: 1,
    width: `calc(100% - ${clearButtonWidth})`,
    height: "auto",
    paddingTop: "0px",
    paddingBottom: "3px",
  },
  contentContainerLarge: {
    paddingBottom: "6px",
    minHeight: "36px",
  },
  contentContainerSmall: {
    paddingTop: "0px",
    paddingBottom: "0px",
  },
  clearButtonContainer: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    width: clearButtonWidth,
  },
  input: {
    border: "none",
    outline: "none",
    maxWidth: "100%",
  },
  pillContainer: {
    display: "inline-block",
    lineHeight: "18px",
    paddingLeft: "4px",
    verticalAlign: "text-top",
    maxWidth: "100%",
    paddingTop: "3px",
  },
  pillContainerSmall: {
    paddingTop: "0px",
    paddingBottom: "0px",
  },
  pillContainerLarge: {
    paddingTop: "6px",
  },
});

export default MultiInput;
