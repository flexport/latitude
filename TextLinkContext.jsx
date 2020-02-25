/**
 * TEAM: frontend_infra
 * @flow strict
 */
import * as React from "react";
import type {Color} from "./colors";
import type {TypeScale} from "./Text";

export type TextLinkContextType = {
  isNested: boolean,
  // A string specifying the color for the text style. Look in latitude/colors for a full list. This will get passed to child Links / child LinkActions / child Texts
  color: Color,
  // The size of the text. This can get passed to child Links / LinkActions / child Texts
  scale: TypeScale,
  // The boldness of the text. This can get passed to child Links / LinkActions / child Texts
  weight: "bold" | "regular" | "boldExtended",
  /** The font style for a text. */
  fontStyle: "normal" | "italic",
  /** The overflow condition for the text content */
  +overflow?: "visible" | "hidden" | "overlay" | "scroll",
  /** Sets how hidden overflow content is displayed */
  +textOverflow?: "initial" | "clip" | "ellipsis",
  /** Sets the capitalization of the text */
  +textTransform?: "initial" | "uppercase" | "lowercase" | "capitalize",
  /** Sets how white space is handled */
  +whiteSpace?:
    | "normal"
    | "nowrap"
    | "pre"
    | "pre-wrap"
    | "pre-line"
    | "inherit",
};
const defaultContextStyleProps = {
  scale: "base",
  color: "grey60",
  weight: "regular",
  fontStyle: "normal",
  overflow: "visible",
  textOverflow: "initial",
  textTransform: "initial",
  whiteSpace: "normal",
};
/**
 * TextLinkContext keeps parent styles and isNested property to provide to nested Links/LinkActions/Texts to
 * provide cleaner parent to child style pass through + nested component detection
 */
const TextLinkContext: React.Context<TextLinkContextType> = React.createContext(
  {
    isNested: false,
    ...defaultContextStyleProps,
  }
);

export default TextLinkContext;
