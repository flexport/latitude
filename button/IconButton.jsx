/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow strict
 */

/* eslint-disable react/forbid-elements */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import Icon from "../Icon";
import Loader from "../Loader";
import type {IconNames} from "../tools/icons";
import colors from "../colors";
import stringOrFalse from "../tools/stringOrFalse";
import {sharedStyles, getButtonStyle} from "../button/styles";
import ThemeNameContext from "../context/ThemeNameContext";
import type {LoadingState} from "./useLoadingManager";
import type {ButtonSize} from "./Button";
import sizes from "../sizes";
import iconSizes from "../iconSizes";

type IconButtonKind = "hollow" | "bare" | "blank";
export type IconButtonIntent = "basic" | "none" | "danger";

type Props = {|
  /** The name of the icon meant to be used as the primary button label or meant to be placed next to the label text. */
  +iconName: IconNames,
  /** The position of the icon relative to the text. */
  +iconAlignment: "left" | "right",
  /** The text that should appear next to the icon. */
  +label?: string,
  /**
   * type="button" is the default type and has no inherent behavior.
   * type="reset" will reset the form if the button is meant to be a reset button.
   * type="submit" will submit the form when used as a submission button.
   * type="menu" will tell the browser that the button is meant to trigger a menu popup.
   */
  +type: "button" | "submit" | "reset" | "menu",
  /** Three main intents are used in our UI; intents are styles that convey meaning and reinforce the action. */
  +intent: IconButtonIntent,
  /** Defines the height of the button. Button sizes correspond to the main form sizes. */
  +size: ButtonSize,
  /** Solid buttons usually constitute a primary action; hollow buttons are generally secondary. Bare buttons can be used for icon buttons with no text or AnchorButtons. */
  +kind: IconButtonKind,
  /** whether the icon is loading or not. Remember to set the loading state to none after loading is complete */
  +isLoading: LoadingState,
  /** Buttons should generally use auto width ("responsive"). Fixed widths are good for multiple buttons in a row. Full width buttons work great for tables. */
  +width: "responsive" | "full",
  /** Buttons should generally use fixed height ("fixed"). Full heights are for filling the wrapping container vertically. Wrap in a <div> with a height. */
  +height: {type: "fixed"} | {type: "customDontUse", height: number},
  /** Give the button the disabled attribute, drop it's opacity, and remove pointer-events. */
  +disabled: boolean,
  /** Function invoked when the button is clicked. */
  +onClick?: (event: Event) => mixed,
  /** Function invoked when the button is focused */
  +onFocus?: (event: Event) => void,
  /** Function invoked when the button is blurred */
  +onBlur?: (event: Event) => void,
  /** Function invoked when mouse down is triggered */
  +onMouseDown?: (event: Event) => mixed,
  /** Function invoked when mouse up is triggered */
  +onMouseUp?: (event: Event) => mixed,
  /** Pre-css-in-js world icons could willy nilly inherit color from many sources. This is bad and we want to avoid at all costs. This prop defaults to retaining the old behavior. */
  +deprecatedAllowColorInheritance?: boolean,
|};

type State = {|
  +wasLoading: boolean,
|};

/**
 * Consider removing unsafe lifecycle methods for future concurrent mode support!
 * See https://reactjs.org/blog/2018/03/29/react-v-16-3.html#component-lifecycle-changes
 */
/* eslint-disable react/no-unsafe */
/**
 * @short IconButton art-directs the usage of icons and text inside a button.
 * @brandStatus V2
 * @status In Review
 * @category Interaction
 *
 * Our current icon list can be accessed from our [Icon Guidelines](/design/guidelines/iconography).
 * @extends React.Component */
export default class IconButton extends React.PureComponent<Props, State> {
  static contextType = ThemeNameContext;

  static defaultProps = {
    iconAlignment: "left",
    kind: "hollow",
    intent: "none",
    isLoading: false,
    size: "m",
    width: "responsive",
    disabled: false,
    height: {type: "fixed"},
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      wasLoading: false,
    };
  }

  handleFocus = (e: Event) => {
    const {onFocus} = this.props;

    if (onFocus) {
      onFocus(e);
    }
  };

  handleBlur = (e: Event) => {
    const {onBlur} = this.props;

    if (onBlur) {
      onBlur(e);
    }
  };

  render() {
    const {
      iconName,
      iconAlignment,
      label,
      type,
      intent,
      kind,
      size,
      onClick,
      onMouseDown,
      onMouseUp,
      disabled,
      isLoading,
      width,
      height,
      deprecatedAllowColorInheritance,
    } = this.props;
    const {wasLoading} = this.state;

    const buttonStyles = getButtonStyle(
      this.context,
      kind,
      intent,
      // $FlowFixMe(dirak) need to deprecate fixed size buttons
      height.type === "fixed" ? size : undefined,
      width,
      disabled,
      {
        isLoading: !!isLoading,
      }
    );

    const labelOrFalse = stringOrFalse(label);
    const LabelComponent = labelOrFalse ? (
      <span
        className={css(
          sharedStyles.label,
          iconAlignment === "right" && sharedStyles.labelLeft,
          ...buttonStyles.label
        )}
      >
        {labelOrFalse}
      </span>
    ) : null;

    const IconComponent = (
      <Icon
        // $FlowFixMe(ctan) Flow issue from upgrade (1.111.3 => 1.115.0)
        iconName={iconName}
        size={getIconSize(size)}
        alignment="center"
        deprecatedAllowColorInheritance={deprecatedAllowColorInheritance}
      />
    );

    const [FirstComponent, SecondComponent] =
      iconAlignment === "left"
        ? [IconComponent, LabelComponent]
        : [LabelComponent, IconComponent];

    const styles = getStyles(size, height);

    return (
      <button
        className={css(
          ...buttonStyles.button,
          styles.button,
          intent === "none" ? styles.none : null
        )}
        onClick={onClick}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        type={type}
        disabled={disabled || isLoading || wasLoading}
      >
        {getLoader(isLoading, size)}
        {FirstComponent}
        {SecondComponent}
      </button>
    );
  }
}

const getIconSize = (size: ButtonSize) => {
  switch (size) {
    case "s":
      return "xxs";
    case "m":
      return "xs";
    default:
      // case "l"
      return "s";
  }
};

const getLoader = (loaderState: LoadingState, size: ButtonSize) => {
  const getLoaderSize = (buttonSize: ButtonSize): number => {
    if (buttonSize === "s") {
      return 18;
    }

    return 24;
  };

  if (loaderState === false) {
    return null;
  }

  const loaderIndicator = (
    <Loader loaded={false} size={getLoaderSize(size)} isFullWidth={true} />
  );

  const successIndicator = (
    <Icon iconName="check" alignment="center" color="grey40" />
  );

  const failureIndicator = (
    <Icon iconName="cancel" alignment="center" color="grey40" />
  );

  const stateToIndicatorMap = new Map([
    [true, loaderIndicator],
    ["success", successIndicator],
    ["failure", failureIndicator],
  ]);

  return (
    <div className={css(sharedStyles.loaderContainer)}>
      {stateToIndicatorMap.get(loaderState)}
    </div>
  );
};

/** Padding makes icon-only IconButtons perfect squares */
const getButtonStyles = (
  size: ButtonSize,
  height: {type: "fixed"} | {type: "customDontUse", height: number}
) => {
  const buttonStyles = {};

  const buttonHeight = height.type === "fixed" ? sizes[size] : height.height;
  const iconHeight = iconSizes[getIconSize(size)];
  const borderWidth = 2;
  const horizontalPadding = (buttonHeight - iconHeight) / 2 + borderWidth;

  buttonStyles.padding = `0 ${horizontalPadding}px`;

  if (height.type === "customDontUse") {
    buttonStyles.height = height.height;
  }

  return buttonStyles;
};

const getStyles = (
  size: ButtonSize,
  height: {type: "fixed"} | {type: "customDontUse", height: number}
) =>
  StyleSheet.create({
    button: getButtonStyles(size, height),
    none: {
      fill: colors.grey50,
      ":hover span svg": {
        fill: colors.black,
      },
    },
    /*
    Padding differences for IconButton to make icon-only IconButtons perfect
    squares. deprecatedWhitespace.js and whitespace.js do not support this
    specific use case.
  */
    // eslint-disable-next-line flexport/no-unused-aphrodite-styles
    s: {
      padding: "0 6.5px",
    },
    // eslint-disable-next-line flexport/no-unused-aphrodite-styles
    m: {
      padding: "0 9px",
    },
    // eslint-disable-next-line flexport/no-unused-aphrodite-styles
    l: {
      padding: "0 12px",
    },
  });
