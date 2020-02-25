/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow strict
 */
/* eslint-disable react/prefer-stateless-function */

import * as React from "react";
import {css, StyleSheet} from "aphrodite";
import classnames from "classnames";
import invariant from "./tools/invariant";
import {type IconNames, iconData} from "./tools/icons";
import colors, {type Color} from "./colors";
import deprecatedColors, {
  type DeprecatedColor,
} from "./styles/deprecatedColorConstants";
import transmissionDeprecatedColors from "./dispatch/styles/colors";
import iconSizes from "./iconSizes";
import ThemeNameContext, {
  type Theme,
  TRANSMISSION,
} from "./context/ThemeNameContext";

export type {IconNames};

export type StandardIconSizes =
  | "xxxs"
  | "xxs"
  | "xs"
  | "s"
  | "m"
  | "l"
  | "xl"
  | "xxl";

type Props = {|
  /** The size of the icon represents an enum that defines the width and height of the square icon. */
  +size?: StandardIconSizes,
  /** A specific number that overrides `size` and sets a specific width and height (commonly used for irregularly large icons). */
  +customSize?: number,
  /** The name of the icon you intend to use. */
  +iconName: IconNames,
  /** Please do not pass classnames to components via a prop like this. */
  +className?: string,
  /** Icons inherit text color by default but can be any one of our approved colors. */
  +color?: Color | "inherit",
  +deprecatedColor?: DeprecatedColor,
  /* eslint-enable react/require-default-props */
  /**
   * `baseline` is the default alignment prop since most icons are displayed
   * inline with text at the same size at the text. Sometimes, icons need to be
   * larger or smaller than the text; in these scenarios `center` alignment
   * should be used.
   */
  +alignment: "baseline" | "center",
  /** Whether the ARIA accessible title should be included. */
  +isARIAAccessible: boolean,
  /** Pre-css-in-js world icons could willy nilly inherit color from many sources. This is bad and we want to avoid at all costs. This prop defaults to retaining the old behavior. */
  +deprecatedAllowColorInheritance: boolean,
|};

/**
 * @short Inline SVG iconography
 * @brandStatus V2
 * @status In Review
 * @category General
 *
 * Our current icon list can be accessed from our [Icon Guidelines](/design/guidelines/iconography).
 * @extends React.Component */
class Icon extends React.PureComponent<Props> {
  static contextType = ThemeNameContext;

  static defaultProps = {
    alignment: "baseline",
    isARIAAccessible: false,
    deprecatedAllowColorInheritance: true,
  };

  render() {
    const {
      iconName,
      className,
      color,
      deprecatedColor,
      alignment,
      isARIAAccessible,
      deprecatedAllowColorInheritance,
    } = this.props;
    const icon = iconData[iconName];
    // $FlowFixMe(uforic): This is here to double check.
    invariant(
      icon,
      `IconName received an invalid value. There is no option for "${iconName}". Check tools/icons.jsx for valid options.`
    );

    const isElaborate = !!icon.elaboratePath;
    const iconColor = getIconColor(this.context, color, deprecatedColor);

    // HACK(@kaye): the "svgIcon" classname is needed because of OOCSS color inheritance
    const classes = classnames(css(styles.wrapper), className, {
      svgIcon: deprecatedAllowColorInheritance,
    });
    const viewBox = "0 0 64 64";
    const size = this.props.size || null;
    const customSize =
      this.props.customSize != null ? this.props.customSize : null;
    // proportions are set on the svg if we know the specific size intended.
    // Pass undefined if no size is defined to omit the attributes.
    // Browsers such as chrome throw errors if width/height have
    // empty values
    const proportion = size ? iconSizes[size] : undefined;
    return (
      <span
        className={classes}
        style={{
          ...getIconSize(size, customSize),
          ...{fill: iconColor},
        }}
      >
        <svg
          className={css(
            alignment === "center" ? styles.svgCenter : styles.svgBaseline
          )}
          color={iconColor}
          viewBox={viewBox}
          width={proportion}
          height={proportion}
          role="img"
          aria-hidden="true"
          aria-labelledby="title desc"
          style={{
            width: getDimensions(proportion, customSize),
            height: getDimensions(proportion, customSize),
          }}
        >
          <title id="title">{isARIAAccessible ? icon.name : ""}</title>
          <desc id="desc">{icon.description}</desc>
          <g fillRule="nonzero">
            {isElaborate
              ? icon.elaboratePath
              : icon.path.map((value, index) => (
                  <path
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    d={value}
                    role="presentation"
                    fillRule="evenodd"
                  />
                ))}
          </g>
        </svg>
      </span>
    );
  }
}

export default Icon;

/**
 * Passing a `customSize` will override the icon's `1em` sizing
 * (which is the default) and will normally allow the svg to inherit it's
 * size from the text-size.
 */
const getIconSize = (size: ?StandardIconSizes, customSize: ?number) => {
  if (customSize != null && !size) {
    return {
      width: customSize,
      height: customSize,
    };
  } else if (!size) {
    return {
      width: "1em",
      height: "1em",
    };
  }
  const width = iconSizes[size];
  const height = iconSizes[size];
  return {
    width,
    height,
  };
};

const getDimensions = (proportion: ?number, customSize: ?number) => {
  if (proportion != null) {
    // When `size` is defined, the width and height *styles* should be reset to "unset".
    return "unset";
  } else if (customSize != null) {
    // When `customSize` is defined, the width and height *styles* should be defined on the SVG.
    return customSize;
  }
  // When no `size` or `customSize` is specified, the icon should inherit it's size.
  return "1em";
};

const getIconColor = (
  theme: Theme,
  color?: Color | "inherit",
  deprecatedColor?: DeprecatedColor
) => {
  if (color == null) {
    // fall back to using deprecated colors
    if (deprecatedColor) {
      if (theme === TRANSMISSION) {
        return transmissionDeprecatedColors[deprecatedColor];
      }
      return deprecatedColors[deprecatedColor];
    }
    return "unset";
  }

  if (color === "inherit") {
    return "inherit";
  }

  return colors[color];
};

export const styles = StyleSheet.create({
  wrapper: {
    display: "inline-block",
    position: "relative",
  },
  svgCenter: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
  },
  svgBaseline: {
    position: "absolute",
    bottom: "-0.125em",
    left: 0,
  },
});

export const _test = {Icon};
