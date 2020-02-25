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
};

/**
 * @short Vertically distribute elements using standard whitespace and simple flexbox rules
 * @brandStatus V2
 * @status Deprecated
 * @category Layout
 * @extends React.Component */
export default class DeprecatedVerticalGroup extends React.PureComponent<Props> {
  static defaultProps = {
    mainAlign: "default",
    crossAlign: "default",
    spacing: "s",
    fill: false,
  };

  render() {
    const {
      children,
      crossAlign,
      mainAlign,
      minWidth,
      spacing,
      fill,
    } = this.props;
    const wrapperClasses = classnames(
      "flex flexcol",
      {flexfill: fill},
      CROSS_ALIGN_CLASS_MAP[crossAlign],
      MAIN_ALIGN_CLASS_MAP[mainAlign]
    );

    const paddingClass = spacing === "none" ? "" : `pb${spacing}`;
    const elementClasses = classnames(paddingClass, {
      flexfill: fill,
      flexStatic: !fill,
    });
    const elementWidth = minWidth != null ? {minWidth} : {};
    const elementStyles = {...elementWidth};
    const elements = Array.isArray(children)
      ? compact(flatten(children))
      : [children];
    return Array.isArray(children) ? (
      <div className={wrapperClasses}>
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
