/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow strict
 */
/* eslint-disable react/forbid-elements */

import * as React from "react";
import {css, StyleSheet} from "aphrodite";

import {typeScale, fontWeights} from "./styles";
import linkStyles, {type LinkStyle} from "./styles/linkStyles";
import colors from "./colors";

import ThemeNameContext, {type Theme} from "./context/ThemeNameContext";
import TextLinkContext from "./TextLinkContext";
import RouterContext from "./context/RouterContext";
import Link from "./Link";

/* eslint-disable react/prefer-stateless-function */

type Props = {|
  /** TextLink tags can only wrap strings. If you find this restrictive, contact @theseus. The thought is we want to avoid the temptation for folks to wrap entire apps or components in TextLink tags, since that usually means a different component should be built. */
  +children: string,
  /** The url that the link component will direct to. */
  +href: string,
  /** One of three standard link color schemes. */
  +linkStyle: LinkStyle,
  /** Should this link open in a new tab, i.e. target='_blank' */
  +openInNewTab: boolean,
  /** The size of the link which is is a subset of TypeScale's sizes. */
  +scale?: "base" | "subtext" | "title",
  /** The boldness of the link. */
  +weight?: $Keys<typeof fontWeights>,
  /** Select a custom display property depending on how you intend to use the link. */
  +display:
    | "inline"
    | "inline-block"
    | "flex"
    | "block"
    | "inline-flex"
    | "none",
  // determines if we download the target page content instead of navigation.
  /** download attribute will override the target (new tab) behaviour if set to true */
  +download: boolean,
  /**
   * our single page app routing (called spaMixin) hijacks all clicks on
   * anchor tags. You might not want this, most often for switching between
   * applications (you want a full page reload). Set this to true to disable that
   * behavior.
   */
  +disableSpaHijack: boolean,
|};

/**
 * @short A TextLink which we can pass in a href for webpage navigation. TextLinks are more accessible (hovering over them shows the link preview in the browser), and don't require JavaScript.
 * @brandStatus V2
 * @status Stable
 * @category Interaction
 * @extends React.Component */
class TextLink extends React.PureComponent<Props> {
  static defaultProps = {
    linkStyle: "default",
    openInNewTab: false,
    display: "inline-block",
    disableSpaHijack: false,
    download: false,
  };
  static contextType = ThemeNameContext;
  context: Theme;

  render() {
    const {
      children,
      href,
      openInNewTab,
      download,
      display,
      disableSpaHijack,
      linkStyle,
    } = this.props;
    return (
      <TextLinkContext.Consumer>
        {parentStyles => (
          <RouterContext.Consumer>
            {router => {
              let {scale, weight} = this.props;
              // If we are not provided with a style prop and we will use the one from context
              scale = scale || parentStyles.scale;
              weight = weight || parentStyles.weight;
              const isActive = router.isActive(href, true);
              return (
                <Link
                  download={download}
                  disableSpaHijack={disableSpaHijack}
                  openInNewTab={openInNewTab}
                  className={css(
                    styles.standardOverride,
                    linkStyles(this.context)[linkStyle],
                    isActive && styles.activeColor
                  )}
                  href={href}
                  style={{
                    display,
                    ...typeScale[scale],
                    fontWeight: fontWeights[weight],
                  }}
                >
                  {children}
                </Link>
              );
            }}
          </RouterContext.Consumer>
        )}
      </TextLinkContext.Consumer>
    );
  }
}

export default TextLink;

const styles = StyleSheet.create({
  standardOverride: {
    // override for our questionable OOCSS bottom margins on all semantic type tags
    marginBottom: 0,
    marginTop: 0,
    cursor: "pointer",
  },
  // activeColor is only used in apps that support Found router
  activeColor: {
    color: colors.blue50,
  },
});
