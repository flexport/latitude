/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow strict
 */
/* eslint-disable react/prefer-stateless-function */

import * as React from "react";
import {type GraphicIcons, graphicIcons} from "./tools/graphicIcons";

import ThemeNameContext, {type Theme} from "./context/ThemeNameContext";

type Props = {|
  /** Illustrations available are designed on a case-by-case basis and generally have specific intentions. */
  +icon: GraphicIcons,
  /** Width can be any pixel value. If "auto" is passed, then a width of 100% will be assigned so the SVG fills it's container. */
  +width: number | "auto",
|};

/**
 * @short Detailed SVG illustrations made for empty states, loading states, and ownable moments.
 * @brandStatus V2
 * @status Stable
 * @category General
 * @extends React.Component */
class GraphicIcon extends React.PureComponent<Props> {
  static defaultProps = {
    width: 320,
  };

  static contextType = ThemeNameContext;
  context: Theme;
  render() {
    const {icon, width} = this.props;
    const svgWidth = width === "auto" ? "100%" : width;
    const graphic = graphicIcons(this.context)[icon];
    const viewBox = "0 0 360 360";
    return (
      <div>
        <svg
          viewBox={viewBox}
          role="img"
          aria-hidden="true"
          aria-labelledby="title desc"
          width={svgWidth}
        >
          {graphic.svgData}
        </svg>
      </div>
    );
  }
}

export default GraphicIcon;
