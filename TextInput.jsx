/**
 * TEAM: frontend_infra
 * WATCHERS: uforic
 * @flow strict
 */

import {StyleSheet, css} from "aphrodite";
import * as React from "react";
import InputGroupContext, {
  CENTER_INPUT,
  LEFT_INPUT,
  RIGHT_INPUT,
} from "./context/InputGroupContext";
import latitudeColors from "./colors";
import {LabelContext} from "./Label";
import IconButton from "./button/IconButton";
import Icon, {type IconNames, type StandardIconSizes} from "./Icon";
import {type Size} from "./sizes";
import {
  getInputStyles,
  HORIZONTAL_INPUT_PADDING_BASE_PX,
  HORIZONTAL_INPUT_PADDING_LARGE_PX,
  HORIZONTAL_INPUT_PADDING_SMALL_PX,
} from "./styles/input";
import iconSizes from "./iconSizes";
import {getWidthOfText} from "./styles/fontWidths";
import {typeScale} from "./styles/typography";

export type TextAlignment = "left" | "right" | "center";
export type TextInputType = "text" | "password" | "email";

export type InputPrefixSuffix =
  | ?string
  | {|iconName: IconNames, onClick?: () => void, onFocus?: () => void|};

export type TextInputProps = {|
  /** note that this must be a string, and cannot be null or undefined. */
  +value: string,
  /** the placeholder text that will be displayed when the input is empty */
  +placeholder: string,
  /** whether the input is disabled or not */
  +disabled: boolean,
  /** whether the input is readonly or not */
  +readOnly: boolean,
  /** whether the input is invalid or not */
  +isInvalid: boolean,
  /** whether the input is prefilled or not */
  +isPrefilled: boolean,
  /** whether the input should show ellipsis and a tooltip on overflow  */
  +textOverflow?: "clip" | "ellipsis",
  /** the size of the input */
  +size: Size,
  /** forwards a ref to the inputfield of the input */
  +inputRef?: ((HTMLElement | null) => void) | {|current: ?HTMLElement|},
  /** called when the value of the textinput changes */
  +onChange: string => void,
  /** called on the mouseDown event */
  +onMouseDown?: Event => void,
  /** called when the keydown event is trigged on the input */
  +onClick?: Event => void,
  /** called when the input is focused */
  +onFocus?: Event => void,
  /** called when the input is blurred */
  +onBlur?: Event => void,
  /** called when the input is clicked */
  +onKeyDown?: KeyboardEvent => void,
  /** most Flexport forms do not use the browser FormData API, which requires
   * named inputs; only use this if you need the form data API to work. */
  +name?: string,
  /** sets the alignment of the text in the input field */
  +textAlign: TextAlignment,
  /** the HTML type of this text input, see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input for a complete list */
  +type: TextInputType,
  /** the maximum number of characters the textinput will accept */
  +maxLength?: number,
  /** prefix sigil that will appear within and at the start of the input field */
  +prefix?: InputPrefixSuffix,
  /** suffix sigil that will appear within and at the end of the input field */
  +suffix?: InputPrefixSuffix,
|};

type SigilProps = {|
  +side: "left" | "right",
  +paddingDefaultTextInput: number,
  +sigil: InputPrefixSuffix,
  +size: Size,
  +disabled: boolean,
|};

/**
 * Sigil returns the appropriate prefix/suffix label based on the type of context obj
 */
function Sigil({
  side,
  paddingDefaultTextInput,
  sigil,
  size,
  disabled,
}: SigilProps) {
  let innerContent = null;

  if (sigil == null) {
    return null;
  }

  if (typeof sigil === "string") {
    innerContent = (
      <span
        className={css(
          styles.sigilText,
          disabled ? styles.sigilTextDisabled : undefined
        )}
        style={{
          ...getTextTypeScale(size),
        }}
      >
        {sigil}
      </span>
    );
  } else if (sigil.onClick) {
    innerContent = (
      <IconButton
        {...sigil}
        disabled={disabled}
        kind="blank"
        intent="none"
        type="button"
        size={size}
      />
    );
  } else {
    innerContent = (
      <Icon
        iconName={sigil.iconName}
        size={getIconSizeFromTextInputSize(size)}
        color="grey50"
      />
    );
  }

  return (
    <span
      className={css(styles.sigil)}
      style={{
        [(side: string)]: `${paddingDefaultTextInput}px`,
        ...(typeof sigil === "string" || !sigil.onClick
          ? {
              pointerEvents: "none",
            }
          : {}),
      }}
    >
      {innerContent}
    </span>
  );
}

/**
 * @category Data Entry
 * @short Collect simple text input from the user.
 * @brandStatus V2
 * @status Stable
 * You may want to use TextInput with InputError or TextInputPrefixSuffix, decorators that
 * modify the look and feel of TextInput. If you need a multiline input, think about using
 * TextareaInput.
 */
function TextInput(props: TextInputProps) {
  const labelContext = React.useContext(LabelContext);
  const inputGroupContext = React.useContext(InputGroupContext);

  const handleFocus = (event: Event) => {
    if (labelContext.labelOnFocus) {
      labelContext.labelOnFocus();
    }

    if (props.onFocus) {
      props.onFocus(event);
    }
  };

  const handleBlur = (event: Event) => {
    if (labelContext.labelOnBlur) {
      labelContext.labelOnBlur();
    }

    if (props.onBlur) {
      props.onBlur(event);
    }
  };

  const {
    size,
    disabled,
    isInvalid,
    isPrefilled,
    textOverflow = "clip",
    onKeyDown,
    onChange,
    onMouseDown,
    placeholder,
    textAlign,
    name,
    value,
    maxLength,
    onClick,
    readOnly,
    prefix = null,
    suffix = null,
  } = props;

  const paddingDefaultTextInput = getPaddingFromTextInputSize(size);

  let prefixPadding = paddingDefaultTextInput;
  let prefixSigil = null;

  if (prefix !== null) {
    prefixPadding = paddingDefaultTextInput * 2 + getWidth(prefix, size);

    prefixSigil = (
      <Sigil
        side="left"
        sigil={prefix}
        size={size}
        paddingDefaultTextInput={paddingDefaultTextInput}
        disabled={disabled}
      />
    );
  }

  let suffixPadding = paddingDefaultTextInput;
  let suffixSigil = null;

  if (suffix !== null) {
    suffixPadding = paddingDefaultTextInput * 2 + getWidth(suffix, size);

    suffixSigil = (
      <Sigil
        side="right"
        sigil={suffix}
        size={size}
        paddingDefaultTextInput={paddingDefaultTextInput}
        disabled={disabled}
      />
    );
  }

  const textFieldStyles = {
    textAlign,
    paddingLeft: prefixPadding,
    paddingRight: suffixPadding,
  };

  const inputStyle = css(
    ...getInputStyles({
      size,
      readOnly,
      disabled,
      isInvalid,
      isPrefilled,
      applyEllipsis: textOverflow === "ellipsis",
      noPadding: true,
    }),
    inputGroupContext === CENTER_INPUT && styles.noBorders,
    inputGroupContext === LEFT_INPUT && styles.noRightBorders,
    inputGroupContext === RIGHT_INPUT && styles.noLeftBorders
  );

  const passwordAtts =
    props.type === "password"
      ? {autoComplete: "off", "data-sensitve": true}
      : undefined;

  return (
    <div className={css(styles.wrapper)}>
      <input
        className={inputStyle}
        disabled={disabled}
        onKeyDown={onKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={evt => onChange(evt.target.value)}
        onMouseDown={onMouseDown}
        ref={props.inputRef}
        onClick={onClick}
        type={props.type}
        placeholder={placeholder}
        value={value}
        name={name}
        maxLength={maxLength}
        style={textFieldStyles}
        readOnly={readOnly}
        {...passwordAtts}
      />
      {prefixSigil}
      {suffixSigil}
    </div>
  );
}

TextInput.defaultProps = {
  disabled: false,
  placeholder: "",
  size: "m",
  isPrefilled: false,
  isInvalid: false,
  textAlign: "left",
  maxLength: 255,
  readOnly: false,
  type: "text",
};

export default TextInput;

/**
 * getWidth returns the appropriate width for text or icon depending on the text, icon name and size we provide since icons and text varies in size
 */
const getWidth = (sigil: InputPrefixSuffix, size: Size) => {
  switch (typeof sigil) {
    case "string": {
      return getWidthOfText(sigil);
    }
    default: {
      return getSvgSizeFromTextInputSize(size);
    }
  }
};

const getTextTypeScale = (size: Size) => {
  switch (size) {
    case "s":
      return typeScale.subtext;
    case "m":
      return typeScale.base;
    case "l":
      // Need to make custom font size here due to the original font size not existing in constants
      return styles.largeFontSize;
    default:
      return typeScale.base;
  }
};
const getIconSizeFromTextInputSize = (size: Size): StandardIconSizes => {
  // eslint-disable-next-line default-case
  switch (size) {
    case "s":
    case "m":
      return "xs";
    case "l":
      return "s";
  }
  return "xs";
};
const getPaddingFromTextInputSize = (size: Size): number => {
  // eslint-disable-next-line default-case
  switch (size) {
    case "s":
      return HORIZONTAL_INPUT_PADDING_SMALL_PX;
    case "m":
      return HORIZONTAL_INPUT_PADDING_BASE_PX;
    case "l":
      return HORIZONTAL_INPUT_PADDING_LARGE_PX;
  }
  return HORIZONTAL_INPUT_PADDING_BASE_PX;
};

const getSvgSizeFromTextInputSize = (size: Size): number => {
  // eslint-disable-next-line default-case
  switch (size) {
    case "s":
      return iconSizes.xxs;
    case "m":
      return iconSizes.xs;
    case "l":
      return iconSizes.s;
  }
  return iconSizes.xs;
};

const styles = StyleSheet.create({
  largeFontSize: {
    fontSize: "16px",
    lineHeight: "18px",
  },
  wrapper: {
    display: "flex",
    position: "relative",
  },
  sigil: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
  },
  sigilTextDisabled: {
    color: latitudeColors.grey40,
  },
  sigilText: {
    lineHeight: "100%",
    color: latitudeColors.grey50,
  },
  noBorders: {
    borderRadius: "0px 0px 0px 0px",
  },
  noLeftBorders: {
    borderRadius: "0px 3px 3px 0px",
  },
  noRightBorders: {
    borderRadius: "3px 0px 0px 3px",
  },
});
