/**
 * TEAM: frontend_infra
 * WATCHERS: kejistan
 *
 * @flow strict
 */

import * as React from "react";

type Cursor =
  | "auto"
  | "default"
  | "none"
  | "context-menu"
  | "help"
  | "pointer"
  | "progress"
  | "wait"
  | "cell"
  | "crosshair"
  | "text"
  | "vertical-text"
  | "alias"
  | "copy"
  | "move"
  | "no-drop"
  | "not-allowed"
  | "grab"
  | "grabbing"
  | "all-scroll"
  | "col-resize"
  | "row-resize"
  | "n-resize"
  | "e-resize"
  | "s-resize"
  | "w-resize"
  | "ne-resize"
  | "nw-resize"
  | "se-resize"
  | "sw-resize"
  | "ew-resize"
  | "ns-resize"
  | "nesw-resize"
  | "nwse-resize"
  | "zoom-in"
  | "zoom-out";

type Props = {|
  +children: React.Element<"div"> | React.Element<"span">,
  +onClick: ?(
    SyntheticKeyboardEvent<HTMLElement> | SyntheticMouseEvent<HTMLElement>
  ) => mixed,
  +tabIndex: number,
  +cursor: Cursor,
|};

/**
  Use Clickable to make a div or span respond to clicks. This should be
  preferred over setting the `onClick` property directly as this component will
  also respond to accessibility events. This component doesn't introduce new
  DOM elements, it just takes care of setting up the right properties on the
  child div or span.

  Example:
    <Clickable
      onClick={this.handleClick}
    >
      <span
        className={someClasses}
      >
        Something that can't be an Anchor element
      </span>
    </Clickable>
 */

export default class Clickable extends React.PureComponent<Props> {
  static defaultProps = {
    tabIndex: 0,
    cursor: "pointer",
  };

  render() {
    const {children, onClick, tabIndex, cursor} = this.props;

    const child:
      | React.Element<"div">
      | React.Element<"span"> = React.Children.only(children);

    if (onClick != null) {
      return React.cloneElement(child, {
        onClick,
        tabIndex,
        onKeyDown: a11yClickEvent(onClick),
        // Disable focus when clicking (this stops an outline from appearing
        // when clicking). The outline will still appear when focusing on the
        // element by other means (e.g. Tab).
        onMouseDown: preventFocus,
        role: "button",
        style: {
          ...child.props.style,
          cursor,
        },
      });
    }

    return child;
  }
}

const KEY_ENTER = 13;
const KEY_SPACE = 32;

function a11yClickEvent(
  clickHandler: (
    SyntheticKeyboardEvent<HTMLElement> | SyntheticMouseEvent<HTMLElement>
  ) => mixed
): ?(SyntheticKeyboardEvent<HTMLElement>) => void {
  return (e: SyntheticKeyboardEvent<HTMLElement>) => {
    if (e.which === KEY_ENTER || e.which === KEY_SPACE) {
      clickHandler(e);
    }
  };
}

function preventFocus(e: SyntheticMouseEvent<HTMLElement>) {
  e.preventDefault();
}
