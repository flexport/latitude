/**
 * TEAM: frontend_infra
 * WATCHERS: uforic
 * @flow strict
 */

import * as React from "react";
import parseDecimalNumber from "parse-decimal-number";
import {round} from "lodash";
import {type Size} from "./sizes";
import TextInput, {type InputPrefixSuffix} from "./TextInput";

export type FloatInputProps = {|
  +value: ?number,
  +placeholder?: string,
  /**
   * The the number of digits after the decimal the inputted number will be rounded to.
   * Must be between 0 and 100.
   */
  +decimalPrecision?: number,
  +disabled?: boolean,
  +readOnly?: boolean,
  +isInvalid?: boolean,
  +isPrefilled?: boolean,
  +size?: Size,
  +inputRef?: (HTMLElement | null) => void,
  +onChange: (?number) => void,
  +onClick?: Event => void,
  +onFocus?: Event => void,
  +onBlur?: Event => void,
  +onKeyDown?: KeyboardEvent => void,
  // most Flexport forms do not use the browser FormData API, which requires
  /** named inputs; only use this if you need the form data API to work. */
  +name?: string,
  +textAlign?: "left" | "right" | "center",
  +maxLength?: number,
  +prefix?: InputPrefixSuffix,
  +suffix?: InputPrefixSuffix,
|};

function numberToString(val: ?number, decimalPrecision?: number) {
  if (val === undefined || val === null || Number.isNaN(val)) {
    return "";
  }

  if (decimalPrecision !== undefined && decimalPrecision !== null) {
    return val.toFixed(decimalPrecision);
  }

  return val.toString();
}

function parseNumber(val: string, decimalPrecision?: number) {
  if (val.trim() === "") {
    return null;
  }

  return decimalPrecision != null
    ? round(parseDecimalNumber(val), decimalPrecision)
    : parseDecimalNumber(val);
}

/**
 * @short Collect simple numerical input from the user.
 * @brandStatus V2
 * @status Stable
 * @category Data Entry
 * FloatInput will process user-entered values per keystroke only.
 * However, poorly formatted numbers will not trigger onChange events.
 * Instead, the input will reset unparseable user values on blur to the originally provided value.
 */
export default function FloatInput({
  value,
  decimalPrecision,
  onChange,
  onBlur,
  isPrefilled,
  ...textInputProps
}: FloatInputProps) {
  const [textValue, setTextValue] = React.useState(
    numberToString(value, decimalPrecision)
  );

  React.useEffect(() => {
    if (value !== parseNumber(textValue, decimalPrecision)) {
      setTextValue(numberToString(value, decimalPrecision));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, decimalPrecision]);

  const handleChange = (newText: string) => {
    setTextValue(newText);

    const parsedNumber = parseNumber(newText, decimalPrecision);

    if (!Number.isNaN(parsedNumber) && parsedNumber !== value) {
      onChange(parsedNumber);
    }
  };

  const handleBlur = (e: Event) => {
    setTextValue(numberToString(value, decimalPrecision));

    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <TextInput
      value={textValue}
      onChange={handleChange}
      onBlur={handleBlur}
      isPrefilled={isPrefilled}
      {...textInputProps}
    />
  );
}
