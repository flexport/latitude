/**
 * TEAM: frontend_infra
 * @flow strict
 */

import * as React from "react";
import {css, StyleSheet} from "aphrodite";

import {fontWeights, typeScale} from "./styles/typography";
import linkStyles, {type LinkStyle} from "./styles/linkStyles";
import ThemeNameContext, {type Theme} from "./context/ThemeNameContext";
import {sharedStyles} from "./button/styles";
import TextLinkContext from "./TextLinkContext";

/* eslint-disable react/prefer-stateless-function */

type Props = {|
  /** TextLinkAction tags can only wrap strings. If you find this restrictive, contact @theseus. The thought is we want to avoid the temptation for folks to wrap entire apps or components in Link tags, since that usually means a different component should be built. */
  +children: string | React.ChildrenArray<string>,
  +onClick: (e: SyntheticInputEvent<HTMLButtonElement>) => void,
  /** One of three standard link color schemes. */
  +linkStyle: LinkStyle,
  /** The size of the link which is is a subset of TypeScale's sizes. */
  +scale?: "base" | "subtext" | "title",
  /** The boldness of the link. */
  +weight?: "regular" | "bold",
  /** Select a custom display property depending on how you intend to use the link. */
  +display:
    | "inline"
    | "inline-block"
    | "flex"
    | "block"
    | "inline-flex"
    | "none",
  +disabled: boolean,
|};

/**
 * @short In general, try and use a TextLink, which takes an href not an onClick. TextLinks are more accessible (hovering over them shows the link preview in the browser), and don't require JavaScript. Sometimes, however, you need to have something that looks and feels like a TextLink but takes an onClick. This is rendered as a button, but can be nested in <Text> like a TextLink
 * @brandStatus V2
 * @status Stable
 * @category Interaction
 * @extends React.Component */
class TextLinkAction extends React.PureComponent<Props> {
  static defaultProps = {
    linkStyle: "default",
    display: "inline-block",
    // onClick is noop by default
    onClick: () => {},
    disabled: false,
  };
  static contextType = ThemeNameContext;
  context: Theme;

  render() {
    const {children, onClick, linkStyle, disabled, display} = this.props;
    return (
      <TextLinkContext.Consumer>
        {parentStyles => {
          let {scale, weight} = this.props;
          // If we are not provided with a style prop and we will use the one from context
          scale = scale || parentStyles.scale;
          weight = weight || parentStyles.weight;
          return (
            // eslint-disable-next-line react/forbid-elements
            <button
              type="button"
              className={css(
                sharedStyles.resetButton,
                styles.link,
                styles.standardOverride,
                linkStyles(this.context)[linkStyle]
              )}
              style={{
                display,
                weight: fontWeights[weight],
                ...typeScale[scale],
              }}
              onClick={onClick}
              disabled={disabled}
            >
              {children}
            </button>
          );
        }}
      </TextLinkContext.Consumer>
    );
  }
}

export default TextLinkAction;

const styles = StyleSheet.create({
  link: {
    background: "none",
    color: "inherit",
    border: "none",
    padding: "0",
    font: "inherit",
    cursor: "pointer",
  },
  standardOverride: {
    // override for our questionable OOCSS bottom margins on all semantic type tags
    marginBottom: 0,
    marginTop: 0,
    cursor: "pointer",
  },
});
