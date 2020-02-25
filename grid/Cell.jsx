/**
 * TEAM: frontend_infra
 * @flow strict
 */
import * as React from "react";
import {css} from "aphrodite";
import {GridContext, type GridProps} from "./Grid";
import invariant from "../tools/invariant";

import {columnStyles, GRID_COLUMNS} from "./gridTools";

type Spans = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type BreakpointSpan = {|
  +span: Spans,
  +offset?: Spans,
|};
type ResponsiveSpan = {|
  +xs: BreakpointSpan,
  +sm?: BreakpointSpan,
  +md?: BreakpointSpan,
  +lg?: BreakpointSpan,
  +xl?: BreakpointSpan,
|};
type Span = Spans | ResponsiveSpan;
type Props = {|
  +children: React.Node,
  +span: Span,
|};

/**
 * @short A 12 column grid component
 * @brandStatus V3
 * @status Beta
 * @category Layout
 *
 * Grids on grids on grids.
 */
/**
 * $Hide from docgen
 */
export default function Cell({children, span}: Props) {
  const grid = React.useContext(GridContext);
  if (typeof span !== "number") {
    Object.keys(span).forEach((breakpoint: $Keys<ResponsiveSpan>) => {
      if (
        span[breakpoint] &&
        span[breakpoint].span &&
        span[breakpoint].offset
      ) {
        invariant(
          span[breakpoint].span + span[breakpoint].offset <= GRID_COLUMNS,
          `Uh oh! on breakpoint: ${breakpoint} the span (${
            span[breakpoint].span
          }) and offset (${span[breakpoint].offset}) sum to ${span[breakpoint]
            .span +
            span[breakpoint]
              .offset}, but must be less than or equal to the total number of Grid columns (${GRID_COLUMNS}).`
        );
      }
    });
  }
  return <div className={css(makeSpanRules(span, grid))}>{children}</div>;
}

const makeSpanRules = (span: Span, grid: GridProps) => {
  if (typeof span === "number") {
    return columnStyles[`xs-${span}-${grid.gutter}-${grid.rowGap}`];
  }
  return Object.keys(span).map((breakpoint: $Keys<ResponsiveSpan>) => {
    const responsiveSpan = [];
    if (span[breakpoint]) {
      if (span[breakpoint].span) {
        responsiveSpan.push(
          columnStyles[
            `${breakpoint}-${span[breakpoint].span}-${grid.gutter}-${
              grid.rowGap
            }`
          ]
        );
      }
      if (span[breakpoint].offset) {
        responsiveSpan.push(
          columnStyles[
            `${breakpoint}Offset-${span[breakpoint].offset}-${grid.gutter}`
          ]
        );
      }
    }
    return responsiveSpan;
  });
};
