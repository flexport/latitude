/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow strict
 */

import * as React from "react";
import {css, StyleSheet} from "aphrodite";
import {typeScale, fontWeights, fontStyles} from "./styles";
import {uiFontFamily} from "./styles/typography";
import invariant from "./tools/invariant";
import {type Size} from "./sizes";
import TextLinkContext from "./TextLinkContext";
import colors, {type Color} from "./colors";

const tagMap = {
  display: "h1",
  headline: "h3",
  title: "h5",
  base: "p",
  subtext: "span",
  tiny: "span",
};
export type TypeScale = $Keys<typeof tagMap>;

type Props = {|
  +children: ?React.Node,
  /** A string specifying the color for the Text. Look in latitude/colors for a full list. */
  +color?: Color,
  /** The size of the text. Look in Text for tagMap. Selecting a scale will choose a corresponding semantic html tag. */
  +scale?: TypeScale,
  /** The boldness of the text. */
  +weight?: "bold" | "regular" | "boldExtended",
  /** The font style for a text. */
  +fontStyle?: "normal" | "italic",
  /** Select a custom display property depending on how you intend to use the text. */
  +display?:
    | "inline"
    | "inline-block"
    | "flex"
    | "block"
    | "inline-flex"
    | "none",
  /** The overflow condition for the text content */
  +overflow?: "visible" | "hidden" | "overlay" | "scroll",
  /** Sets how hidden overflow content is displayed */
  +textOverflow?: "initial" | "clip" | "ellipsis",
  /** Sets the capitalization of the text */
  +textTransform?: "initial" | "uppercase" | "lowercase" | "capitalize",
  /** To maintain the line height when null, undefined, or empty string Set this boolean to true. A space character will be rendered inside the appropriate tag. */
  +emptyRetainsLineHeight?: boolean,
  /** A custom line height for this text. This overrides the line height from the `scale` prop. */
  +customLineHeight?: string,
  +wordBreak?: "normal" | "break-all" | "keep-all" | "break-word",
  /** Sets how white space is handled */
  +whiteSpace?:
    | "normal"
    | "nowrap"
    | "pre"
    | "pre-wrap"
    | "pre-line"
    | "inherit",
|};

/**
 * @short Rendering words? Use this component!
 * @brandStatus V2
 * @status Stable
 * @category Data Display
 *
 * This component reduces the variablility of typography in our UI and should give everyone an easy way to reason about the different text sizes.
 */
export default function Text({
  children,
  color = "grey60",
  scale = "base",
  weight = "regular",
  display = "inline-block",
  emptyRetainsLineHeight = false,
  customLineHeight,
  wordBreak = "normal",
  fontStyle = "normal",
  overflow = "visible",
  textOverflow = "initial",
  textTransform = "initial",
  whiteSpace = "inherit",
}: Props) {
  const textLinkContext = React.useContext(TextLinkContext);

  if (children === null && !emptyRetainsLineHeight) {
    return null;
  }

  const renderedText =
    (children === "" && emptyRetainsLineHeight) || children == null
      ? // eslint-disable-next-line autofix/no-unused-vars
        childStyles => " "
      : nestedStyles => (
          <TextLinkContext.Provider value={{...nestedStyles, isNested: true}}>
            <>
              {React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                  return child;
                }
                return child;
              }).filter(child => child != null)}
            </>
          </TextLinkContext.Provider>
        );

  if (Array.isArray(renderedText) && !renderedText.length) {
    return null;
  }

  const Tag = textLinkContext.isNested
    ? "span"
    : tagMap[scale || textLinkContext.scale];

  // If we are not provided with a style prop and we will use the one from context
  // The children will inherit by defualt whatever styles the parent uses but they can be overwritten by their own style props
  const nestedStyles = {
    scale: scale || textLinkContext.scale,
    color: color || textLinkContext.color,
    weight: weight || textLinkContext.weight,
    fontStyle: fontStyle || textLinkContext.fontStyle,
    overflow: overflow || textLinkContext.overflow,
    textOverflow: textOverflow || textLinkContext.textOverflow,
    textTransform: textTransform || textLinkContext.textTransform,
    whiteSpace: whiteSpace || textLinkContext.whiteSpace,
  };

  const textColor = colors[nestedStyles.color];

  return (
    <Tag
      className={css(
        styles.standardOverride,
        wordBreak === "break-word" && styles.breakWordFallbackForFirefox
      )}
      style={{
        display,
        color: textColor,
        ...typeScale[nestedStyles.scale],
        fontFamily: uiFontFamily,
        fontWeight: fontWeights[nestedStyles.weight],
        fontStyle: fontStyles[nestedStyles.fontStyle],
        ...(customLineHeight != null ? {lineHeight: customLineHeight} : null),
        wordBreak,
        overflow,
        textOverflow,
        textTransform,
        whiteSpace,
      }}
    >
      {renderedText(nestedStyles)}
    </Tag>
  );
}

const styles = StyleSheet.create({
  standardOverride: {
    // override for our questionable OOCSS bottom margins on all semantic type tags
    marginBottom: 0,
    marginTop: 0,
  },
  breakWordFallbackForFirefox: {
    wordBreak: "break-all",
  },
});

/**
 * Conversion function between Text scale property and TextInput size property.
 *
 * We had the option of naming them the same thing, but purposefully chose different scales.
 * The reason is that scale is more semantic (i.e. title), whereas TextInput's are more size
 * oriented. I.E. what would it mean to have a "title" sized text input?
 *
 * Additionally, the TextInput sizes line up with <Button> and other component sizes.
 */
export const getTextScaleFromSize = (
  size: Size
): "subtext" | "base" | "title" => {
  // eslint-disable-next-line default-case
  switch (size) {
    case "s":
      return "subtext";
    case "m":
      return "base";
    case "l":
      return "title";
  }
  invariant(false, `Could not find TextInputSize ${size}, you need to map`);
};
