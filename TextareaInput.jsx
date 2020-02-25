/**
 * TEAM: frontend_infra
 * @flow strict
 */

import {clamp} from "lodash";
import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import {getInputStyles} from "./styles/input";
import {type Size} from "./sizes";
import {LabelContext} from "./Label";

const VERTICAL_PADDING = 10;

export type TextareaInputProps = {|
  /** The text value of the input. This must be a string and cannot be null or undefined */
  +value: string,
  /** the placeholder text that will be displayed when the input is empty */
  +placeholder?: string,
  /** sets the alignment of the text within the input field */
  +textAlign?: "left" | "right" | "center",
  /**
   * number of rows in the text area. If {min, max} row count is specified,
   * then textarea input will auto-expand with the user input
   */
  +rows?: number | {|+min: number, +max: number|},
  /** whether the input is disabled or not */
  +disabled?: boolean,
  /** whether the input is readonly or not */
  +readOnly?: boolean,
  /** whether the input is invalid or not */
  +isInvalid?: boolean,
  /** the size of the input */
  +size?: Size,
  /** forwards a ref to the input field */
  +inputRef?: (HTMLTextAreaElement | null) => void,
  /** called when the value in the textarea input changes */
  +onChange: string => void,
  /** called when the input is clicked */
  +onClick?: Event => void,
  /** called when the input is focused */
  +onFocus?: Event => void,
  /** called when the input is blurred */
  +onBlur?: Event => void,
  /** called when the paste event is triggered on the input */
  +onPaste?: ClipboardEvent => void,
  /** called when the keydown event is triggered on the input */
  +onKeyDown?: KeyboardEvent => void,
|};

/**
 * @category Data Entry
 * @short Collect multi-line text input from the user
 * @brandStatus V2
 * @status Stable
 * You may want to use TextareaInput with InputError, a decorator that
 * modify the look and feel of TextareaInput. If you need a single-line text input, think about using
 * TextInput.
 */
export default function TextareaInput({
  value,
  placeholder = "",
  textAlign = "left",
  rows = 2,
  disabled = false,
  readOnly = false,
  isInvalid = false,
  size = "m",
  inputRef,
  onChange,
  onClick,
  onFocus,
  onBlur,
  onPaste,
  onKeyDown,
}: TextareaInputProps) {
  const labelContext = React.useContext(LabelContext);

  const [computedRows, setComputedRows] = React.useState(0);
  const _inputRef = React.createRef<null | HTMLTextAreaElement>();

  // recalculate and update the next of rows of the textarea
  React.useEffect(() => {
    if (typeof rows === "object" && _inputRef.current != null) {
      const {min, max} = rows;

      // set rows to one to properly measure scrollHeight
      // note: we measure scrollHeight with rows set to one since rows must be a positive number greater than zero
      // https://html.spec.whatwg.org/multipage/form-elements.html#the-textarea-element
      _inputRef.current.rows = 1;

      const textRowsCount = Math.ceil(
        (_inputRef.current.scrollHeight - VERTICAL_PADDING) /
          getTextSizeFromSize(size)
      );

      const newComputedRows = clamp(textRowsCount, min, max);

      if (_inputRef.current) {
        _inputRef.current.rows = newComputedRows;
      }

      setComputedRows(newComputedRows);
    }
  } /* eslint-disable react-hooks/exhaustive-deps */, [
    value,
    typeof rows === "object" && rows.min,
    typeof rows === "object" && rows.max,
  ]);
  /* eslint-enable react-hooks/exhaustive-deps */

  const handleChange = React.useCallback(
    (event: SyntheticInputEvent<HTMLTextAreaElement>) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  const handleFocus = React.useCallback(
    (event: Event) => {
      if (labelContext.labelOnFocus) {
        labelContext.labelOnFocus();
      }

      if (onFocus) {
        onFocus(event);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onFocus]
  );

  const handleBlur = React.useCallback(
    (event: Event) => {
      if (labelContext.labelOnBlur) {
        labelContext.labelOnBlur();
      }

      if (onBlur) {
        onBlur(event);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onBlur]
  );

  return (
    <textarea
      value={value}
      placeholder={placeholder}
      rows={typeof rows === "object" ? computedRows : rows}
      disabled={disabled}
      readOnly={readOnly}
      onChange={handleChange}
      onClick={onClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onPaste={onPaste}
      onKeyDown={onKeyDown}
      ref={(ref: null | HTMLTextAreaElement) => {
        _inputRef.current = ref;

        if (inputRef) {
          inputRef(ref);
        }
      }}
      className={css(
        ...getInputStyles({size, readOnly, disabled, isInvalid}),
        styles.heightPaddingOverrides
      )}
      style={{textAlign}}
    />
  );
}

const getTextSizeFromSize = (size: Size) => {
  switch (size) {
    case "s":
      return 16;
    case "m":
      return 20;
    case "l":
      return 20;
    default:
      return 18;
  }
};

const styles = StyleSheet.create({
  heightPaddingOverrides: {
    height: "",
    minHeight: "30px",
    // these two paddings are added together to correctly compute
    // the number of rows we need when we autoexpand
    paddingTop: VERTICAL_PADDING / 2,
    paddingBottom: VERTICAL_PADDING / 2,
  },
});
