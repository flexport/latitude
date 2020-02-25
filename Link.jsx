/**
 * TEAM: frontend_infra
 * @flow strict
 *
 * TODO(dmnd): Should this even be documented? Seem like we'd want consumers to
 * call a more design-opinionated link.
 */
/* eslint-disable react/forbid-elements */

import * as React from "react";
import RouterContext, {type Router} from "./context/RouterContext";

/* eslint-disable react/prefer-stateless-function */

/**
 * Pass through attributes expected by the HTML anchor element.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a for details.
 */
export type BasicAnchorProps = {|
  +children: React.Node,
  +id?: string,
  +className?: string,
  +style?: {},
  +href?: string,
  +target?: string,
  +rel?: string,
  +title?: string,
  +role?: string,
  +download: boolean,

  /** Please don't use this to assign to window location. Use href instead */
  +onClick?: (
    // TODO(dmnd): Is this union comprehensive?
    evt:
      | SyntheticMouseEvent<HTMLAnchorElement>
      | SyntheticKeyboardEvent<HTMLAnchorElement>
  ) => void,
  +onMouseDown?: (evt: SyntheticMouseEvent<HTMLAnchorElement>) => void,
  +onMouseUp?: (evt: SyntheticMouseEvent<HTMLAnchorElement>) => void,
|};

type Props = {|
  ...BasicAnchorProps,

  /** Should this link open in a new tab, i.e. target='_blank' */
  +openInNewTab: boolean,

  /**
   * our single page app routing (called spaMixin) hijacks all clicks on
   * anchor tags. You might not want this, most often for switching between
   * applications (you want a full page reload). Set this to true to disable that
   * behavior.
   */
  +disableSpaHijack: boolean,

  /**
   * Gets passed through to Found router. If specified, the link will only
   * render as active if the current location exactly matches the `to` location
   * descriptor; by default, the link also will render as active on subpaths of
   * the `to` location descriptor.
   */
  +exact?: boolean,
|};

/**
 * @short A thin wrapper around "a" that can be used if AnchorButton or TextLink is not sufficient.
 * @brandStatus V2
 * @status Stable
 * @category Interaction
 * If you find that there aren not enough props, feel free to add properties. Really, this is an HTML <a> element,
 * that does the correct thing when it comes to SinglePageApplication routing.
 * @extends React.Component */
class Link extends React.PureComponent<Props> {
  static contextType = RouterContext;
  context: Router;

  static defaultProps = {
    openInNewTab: false,
    disableSpaHijack: false,
    download: false,
  };

  render() {
    const {openInNewTab, disableSpaHijack, exact, ...otherProps} = this.props;
    const {RouterLink} = this.context;
    return (
      <RouterLink
        disableSpaHijack={disableSpaHijack}
        exact={exact}
        anchorProps={{
          rel: openInNewTab ? "noopener noreferrer" : undefined,
          target: openInNewTab ? "_blank" : undefined,
          ...otherProps,
        }}
      />
    );
  }
}

export default Link;
