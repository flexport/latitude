/**
 * TEAM: frontend_infra
 * @deprecated prefer using latitude/Flex
 * @flow strict
 */
/* eslint-disable no-restricted-imports*/
/* eslint-disable react/prefer-stateless-function */
import * as React from "react";
import classnames from "classnames";
import {compact, flatten} from "lodash";

// $FlowFixMe(ctan) Flow issue from upgrade (1.111.3 => 1.115.0)
import {SPACING_SIZES} from "./constants/styles";

const CROSS_ALIGN_CLASS_MAP = {
  baseline: "flexBaseline",
  center: "flexCenter",
  start: "flexStart",
  end: "flexEnd",
  stretch: "flexStretch",
  default: "",
};

const MAIN_ALIGN_CLASS_MAP = {
  start: "flexContentStart",
  end: "flexContentEnd",
  center: "flexContentCenter",
  between: "flexSpaceBetween",
  around: "flexSpaceAround",
  default: "",
};

type Props = {
  /** The percentage of the parent that each child should occupy. */
  +basis?: number,
  /** Children can be any React.Node and will be auto laid out based on Group's props. */
  +children?: React.Node,
  /** The flexbox align-items property which generally adjusts the vertical flex layout of the items. */
  +crossAlign: $Keys<typeof CROSS_ALIGN_CLASS_MAP>,
  /** Whether the elements should grow to fill the width of their container. */
  +fill: boolean,
  /** The flexbox justify-content property which generally adjusts the horizontal layout of the items. */
  +mainAlign: $Keys<typeof MAIN_ALIGN_CLASS_MAP>,
  /** The minimum width of each child. */
  +minWidth?: number,
  /** The gap between elements. */
  +spacing: $Keys<typeof SPACING_SIZES>,
  /** Whether the elements should wrap. */
  +wrap: boolean,
};

/**
 * @short Horizontally distribute elements using standard whitespace and simple flexbox rules
 * @brandStatus V2
 * @status Deprecated
 * @category Layout
 * @extends React.Component */
export default class DeprecatedHorizontalGroup extends React.PureComponent<Props> {
  static defaultProps = {
    mainAlign: "default",
    crossAlign: "baseline",
    spacing: "s",
    fill: false,
    wrap: true,
  };

  render() {
    const {
      basis,
      children,
      crossAlign,
      mainAlign,
      minWidth,
      spacing,
      fill,
      wrap,
    } = this.props;
    const wrapperClasses = classnames(
      "flex",
      CROSS_ALIGN_CLASS_MAP[crossAlign],
      MAIN_ALIGN_CLASS_MAP[mainAlign]
    );

    const paddingClass = spacing === "none" ? "" : `pr${spacing}`;
    const elementClasses = classnames(paddingClass, {
      flexfill: fill,
      flexStatic: !fill,
    });
    const margin = SPACING_SIZES[spacing];
    // When an element wraps, it needs a top margin, but all the elements on the
    // first row do not, so the negative margin here cancels it out.
    const wrapStyle = {
      flexFlow: `row ${wrap ? "" : "no"}wrap`,
      marginTop: `-${margin}px`,
    };
    const elementWrapStyle = {marginTop: `${margin}px`};
    const elementWidth = minWidth != null ? {minWidth} : {};
    const elementStyles = {...elementWrapStyle, ...elementWidth};
    if (basis != null) {
      // $FlowUpgradeFixMe(0.69.0 -> 0.70.0)
      elementStyles.flex = `1 0 ${basis}%`;
    }
    const elements = Array.isArray(children)
      ? compact(flatten(children))
      : [children];
    return Array.isArray(children) ? (
      <div className={wrapperClasses} style={wrapStyle}>
        {elements.map((e, i) =>
          i === elements.length - 1 ? (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              className={fill ? "flexfill" : "flexStatic"}
              style={elementStyles}
            >
              {e}
            </div>
          ) : (
            // eslint-disable-next-line react/no-array-index-key
            <div key={i} className={elementClasses} style={elementStyles}>
              {e}
            </div>
          )
        )}
      </div>
    ) : (
      // $FlowUpgradeFixMe(0.81.0 -> 0.82.0)
      children
    );
  }
}
