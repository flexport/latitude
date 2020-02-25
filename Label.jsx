/**
 * TEAM: frontend_infra
 * @flow strict
 */

/* eslint-disable flexport/no-unused-aphrodite-styles */

import * as React from "react";
import {css, StyleSheet} from "aphrodite";

import {latitudeT as t} from "./config/I18n";
import invariant from "./tools/invariant";
import HelpTooltip from "./HelpTooltip";
import {fontWeights as typeWeights} from "./styles/typography";
import latitudeColors from "./colors";

export type TypeWeights = $Keys<typeof typeWeights>;

type Props = {|
  /** TextField and other form fields can be wrapped by `Label`. Their focus will trigger `Label` focus if it uses EditableField. */
  +children?: React.Node,
  /** Adds a " - Optional" flag to indicate that the field is not required. */
  +indicateOptional?: boolean,
  /** Adds a small asterisk to indicate that the field is required. */
  +indicateRequired?: boolean,
  /** The function invoked when the label is clicked. */
  +onClick?: () => void,
  /** The boldness of the label. */
  +typeWeight?: TypeWeights,
  /** Whether the label should include some padding above the child. */
  +paddingBottom?: "none" | "xs",
  /** The actual value of the label. */
  +value: string | React.Node,
  /** Optional help tooltip - either the text for a tooltip with default settings or a custom `HelpTooltip`. */
  +helpTooltip?: ?string | React.Element<typeof HelpTooltip>,
|};

export type LabelContextType = {|
  labelOnFocus?: () => void,
  labelOnBlur?: () => void,
|};

/**
 * LabelContext is used so that nested child elements can alter the focused state without passing
 * the field setter functions props down multiple levels
 */
export const LabelContext: React.Context<LabelContextType> = React.createContext(
  {labelOnFocus: undefined, labelOnBlur: undefined}
);

/**
 * @short Label should be used in conjunction with input fields.
 * @brandStatus V2
 * @status Stable
 * @category Data Entry
 */
export default function Label({
  children,
  indicateOptional = false,
  indicateRequired = false,
  onClick,
  typeWeight = "regular",
  paddingBottom = "xs",
  value,
  helpTooltip,
}: Props) {
  invariant(
    !(indicateRequired && indicateOptional),
    "cannot have both optional and required label"
  );

  const [focused, setFocused] = React.useState(false);
  const labelRef = React.useRef();

  const labelSetters = {
    labelOnFocus: () => {
      setFocused(true);
    },
    labelOnBlur: () => {
      setFocused(false);
    },
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }

    // Focus the first child input of the label component
    const inputRef =
      labelRef.current && labelRef.current.querySelector("input");

    if (inputRef) {
      inputRef.focus();
    }
  };

  const renderHelpTooltip = () => {
    if (helpTooltip == null) {
      return null;
    } else if (typeof helpTooltip === "string") {
      return (
        <HelpTooltip
          iconName="question"
          position="top"
          size="xs"
          text={helpTooltip}
        />
      );
    }

    return helpTooltip;
  };

  const colorStyle = focused ? styles.darkType : styles.lightType;
  const paddingStyle =
    paddingBottom === "xs" ? styles.paddingBottom : undefined;

  return (
    // the style below is an IE bug fix for the flexfill classname. flexfill sets `flex: 1` which in chrome is fine, but IE, for some reason,  interprets the flex-basis value as 0% "|"
    <div ref={labelRef} className={css(styles.wrapper)}>
      {/* eslint-disable-next-line jsx-a11y/label-has-for */}
      <label
        className={css(styles.label, colorStyle, paddingStyle)}
        onClick={handleClick}
        style={{fontWeight: typeWeights[typeWeight]}}
      >
        {value}
        {indicateOptional ? (
          <span className={css(colorStyle, styles.optionalReqdMargin)}>
            {t("(Optional)")}
          </span>
        ) : null}
        {indicateRequired ? (
          <span className={css(styles.optionalReqdMargin)}>*</span>
        ) : null}
        {renderHelpTooltip()}
      </label>
      <LabelContext.Provider value={labelSetters}>
        {children}
      </LabelContext.Provider>
    </div>
  );
}

const styles = StyleSheet.create({
  darkType: {
    color: latitudeColors.grey60,
  },
  lightType: {
    color: latitudeColors.grey40,
  },
  label: {
    marginTop: 0,
    whiteSpace: "nowrap",
    fontSize: "13px",
    lineHeight: "18px",
    height: "20px",
    marginBottom: "1px",
  },
  paddingBottom: {
    paddingBottom: "4px",
  },
  optionalReqdMargin: {
    marginLeft: "4px",
  },
  wrapper: {
    flex: 1,
    flexBasis: "auto",
    minHeight: 0,
    minWidth: 0,
    flexDirection: "column",
    display: "flex",
  },
});
