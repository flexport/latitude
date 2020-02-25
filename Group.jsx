/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow strict
 */
import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import invariant from "./tools/invariant";

import flexboxStyles from "./styles/flexboxStyles";

type Props = {|
  /** Children can be any React.Node and will be distributed based on the other props */
  +children?: React.Node,
  /** The gap between elements. (0, 1, 2, 4n) */
  +gap: number,
  /** Applies `flex: 1` to every child which provides an even distribution of elements in horizontal layouts. */
  +fillChildren: boolean,
  /** Sets whether flex items are forced onto one line or can wrap onto multiple lines. If wrapping is allowed, it sets the direction that lines are stacked. */
  +flexWrap: "nowrap" | "wrap" | "wrap-reverse",
  /** Sets how flex items are placed in the flex container defining the main axis and the direction (normal or reversed). */
  +flexDirection: "row" | "row-reverse" | "column" | "column-reverse",
  /** Defines how the browser distributes space between and around content items along the main-axis of a flex container, and the inline axis of a grid container. */
  +justifyContent:
    | "center"
    | "start"
    | "end"
    | "flex-start"
    | "flex-end"
    | "left"
    | "right"
    | "normal"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "stretch"
    | "safe center"
    | "unsafe center",
  /** Controls the alignment of items on the Cross Axis. */
  +alignItems:
    | "normal"
    | "stretch"
    | "center"
    | "start"
    | "end"
    | "flex-start"
    | "flex-end"
    | "self-start"
    | "self-end"
    | "baseline"
    | "first baseline"
    | "last baseline"
    | "safe center"
    | "unsafe center",
  +containerFlex: number | "none",
|};

const defaultProps = {
  gap: 8,
  flexWrap: "wrap",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "stretch",
  fillChildren: false,
  containerFlex: 1,
};

/**
 * @short Distribute and align elements linearly.
 * @brandStatus V3
 * @status Stable
 * @category Layout
 *
 * Building UI often involves simple horizontal and vertical distribution of
 * elements, e.g. a row of buttons or a stack fields. `Group` distributes and
 * aligns its children in a standardized way.
 *
 * Use `Group` instead of creating one-off styles for simple things like
 * paddings, margins, and alignment.
 *
 * If you know flexbox, the `Group` API will be familiar. But don't use `Group`
 * when you really want flexbox. `Group` is **not** syntax sugar for flexbox.
 *
 * Instead, more general flexbox layouts should be custom implemented with
 * Aphrodite stylesheets on a case-by-case basis.
 *
 * If you're looking for flexbox resources check out these links:
 * [MDN - Basic Concepts of Flexbox][1],
 * [MDN - Typical use cases of Flexbox][2], and
 * [MDN - Controlling Ratios of Flex Items][3]
 *
 * [1]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox
 *
 * [2]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Typical_Use_Cases_of_Flexbox
 *
 * [3]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Controlling_Ratios_of_Flex_Items_Along_the_Main_Ax
 */
function Group({
  children,
  gap,
  flexWrap,
  flexDirection,
  justifyContent,
  alignItems,
  fillChildren,
  containerFlex,
}: Props) {
  const elements = React.Children.toArray(children);
  invariant(
    gap === 0 || gap === 1 || gap === 2 || gap % 4 === 0,
    `Gap received an invalid value: ${gap}. Gap is limited to 0, 1, 2, or 4n. Refer to our whitespace guidelines for more information.`
  );
  const flex = fillChildren ? 1 : null;
  return (
    <div
      className={css(
        styles.container,
        flexboxStyles.flexWrap[flexWrap],
        flexboxStyles.flexDirection[flexDirection],
        flexboxStyles.justifyContent[justifyContent],
        flexboxStyles.alignItems[alignItems]
      )}
      style={{
        margin: `-${gap}px -${gap / 2}px 0 -${gap / 2}px`,
        flex: containerFlex,
        pointerEvents: "none",
      }}
    >
      {elements.map((element, i) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          style={{
            flex,
            margin: `${gap}px ${gap / 2}px 0 ${gap / 2}px`,
            pointerEvents: "auto",
          }}
        >
          {element}
        </div>
      ))}
    </div>
  );
}

Group.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    display: "flex",
  },
});

export default Group;
