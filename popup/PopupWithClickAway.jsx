/**
 * TEAM: frontend_infra
 * WATCHERS: zgotsch
 * @flow strict
 */

/*
A component which manages the state for whether a
popup should be displayed, as well as handling the
creation of a React Portal to hold the popup content.
Clicking outside of the <PopupWithClickAway> will
close the popup. This class does not handle positioning,
use <Popper> and friends to position based on parent
components, or regular css to position less reactively.

This component can be arbitrarily nested. This is useful
when you are using components that may create a popup,
such as <CalendarDateInput>.

## Usage

<PopupWithClickAway> takes a function child which
receives some parameters:
- Popup: A react component which must wrap content
    that appears in the popup. If this component is not
    rendered, no popup will appear.
- Target: A react component that works like react-popper's
    <Target>, it is used to determine what component the
    popup will be positioned relative to
- openPopup: Call this to open the popup
- closePopup: Call this to close the popup
- togglePopup: Call this to toggle popup
- isOpen: A boolean indicating whether the popup is open

### Example:

```
<PopupWithClickAway>
  {(Target, Popup, {openPopup}) => (
    <React.Fragment>
      <Target>
        <Button onClick={openPopup}>Open</Button>
      </Target>
      <Popup placement="bottom-start">
        <div style={{padding: 5, border: "1px solid black"}}>
          Hello world!
        </div>
      </Popup>
    </React.Fragment>
  )}
</PopupWithClickAway>
```

## Implementation

When nesting, each portal receives a class that allows
clicks within it to not count as "outside" for the
purpose of dismissing the popup. As you nest
ever deeper, you need additional classes (since you
are "inside" many popups).

The portals and their CSS classes look like this:

In the DOM              In the portal for A
+--------------------+  +-------------------+
|PopupWithClickAway A|  |content that is in |
|                    |  |PWCA A's popup()   |
| content that isn't |  |                   |
| in popup()         |  | PWCA B            |
|                    |  |                   |
|.ignore             |  |.ignore.ignore-inner
+--------------------+  +-------------------+
In the portal for B
+--------------------+
|content that is in  |
|PWCA B's popup()    |
|                    |
| PWCA C             |
|                    |
|.ignore.ignore-inner.ignore-inner-inner
+--------------------+

## Migration

In order to migrate from the old popupWithClickAway HOC,
place unconditionally rendered content in the return
value of the children function, and content which is
rendered based on isPopupVisible in the argument
to the popup() function.
*/

import * as React from "react";
import {Manager, Popper, Reference} from "react-popper";
import Portal from "../Portal";
import onClickOutside from "../tools/onClickOutside";
import {ESC} from "../constants/interactions/KeyCodes";

const OnClickOutside = onClickOutside(
  class OnClickOutside extends React.Component<{
    +outsideClickIgnoreClass: string,
    +onClickOutside: () => void,
    +children: React.Node,
  }> {
    handleClickOutside() {
      this.props.onClickOutside();
    }
    render() {
      return this.props.children;
    }
  }
);

// As we nest PWCAs, we need new names for inner classes to ignore
// with onClickOutside. This simply appends "-inner" to the last
// name we generated.
function nextClassName(lastClassName: string): string {
  return `${lastClassName}-inner`;
}

// The context tracks a list of class names which are ignored by each level of
// the nesting. When we make a new modal for a nested onClickOutside, we
// need to put _all_ the ignored classes on it.
const PWCAContext = React.createContext({
  classNames: ["ignore-react-onclickoutside"],
});

// In general, it can be useful to know where the popper was _actually_ placed
// after applying constraints. Rather than require children to be a react
// component capable of receiving props, we instead expose this information via
// context.
export const ActualPlacementContext = React.createContext<?string>(null);

// prettier-ignore
export type PopperPlacement =
  | "auto"   | "auto-start"   | "auto-end"
  | "top"    | "top-start"    | "top-end"
  | "right"  | "right-start"  | "right-end"
  | "bottom" | "bottom-start" | "bottom-end"
  | "left"   | "left-start"   | "left-end";

type TargetProps = {|
  +children: React.Node,
|};

type PopupProps = {|
  +children: React.Node,
  +placement?: PopperPlacement,
  +zIndex?: number,
  +noPortal?: boolean,
  +shouldApplyMagicOverflowHiddenFix?: boolean,
  +className?: ?string,
|};

type PWCAChild = (
  Target: React.ComponentType<TargetProps>,
  Popup: React.ComponentType<PopupProps>,
  {
    openPopup: () => void,
    closePopup: () => void,
    togglePopup: () => void,
    isOpen: boolean,
  }
) => React.Node;

type Props = {|
  +children: PWCAChild,
  /** Allows the Popup to be closed with the escape key when the popup is focused */
  +escToClose: boolean,
  +onClose: () => void,
  +onOpen: () => void,
|};
type State = {
  isOpen: boolean,
};

export default class PopupWithClickAway extends React.Component<Props, State> {
  static defaultProps = {
    escToClose: false,
    onClose: () => {},
    onOpen: () => {},
  };

  state = {
    isOpen: false,
  };

  openPopup = () => {
    if (!this.state.isOpen) {
      this.setState({isOpen: true});
      this.props.onOpen();
    }
  };

  closePopup = () => {
    // There might be multiple PopupWithClickAway on the same page. This happens in the case of
    // table filters. In that case, whenever you are clicking inside of an open popup,
    // it registers as clicking outside of the closed ones. This causes the closed popups
    // set their state to false again on every click. Putting this check around the setState
    // call prevents unnecessary calls to reset state to false.
    if (this.state.isOpen) {
      this.setState({isOpen: false});
      this.props.onClose();
    }
  };

  togglePopup = () => {
    this.setState({isOpen: !this.state.isOpen});
    if (this.state.isOpen) {
      this.props.onClose();
    } else {
      this.props.onOpen();
    }
  };

  handleKeyDown = (e: KeyboardEvent) => {
    if (this.props.escToClose && e.keyCode === ESC) {
      this.closePopup();
      e.stopPropagation();
    }
  };

  Target = ({children}: TargetProps) => (
    <Reference>
      {({ref}) => (
        <div ref={ref} onKeyDown={this.handleKeyDown} role="presentation">
          {children}
        </div>
      )}
    </Reference>
  );

  Popup = ({
    children,
    placement,
    zIndex,
    shouldApplyMagicOverflowHiddenFix = false,
    noPortal = false,
    className,
  }: PopupProps): React.Node => (
    <PWCAContext.Consumer>
      {({classNames}) => {
        const PortalOrFragment = noPortal ? React.Fragment : Portal;
        const innerClassName = nextClassName(classNames[classNames.length - 1]);

        // See https://github.com/FezVrasta/popper.js/issues/535
        const popperModifiers = shouldApplyMagicOverflowHiddenFix
          ? {preventOverflow: {boundariesElement: "viewport"}}
          : undefined;

        return (
          <PWCAContext.Provider
            value={{classNames: [...classNames, innerClassName]}}
          >
            <PortalOrFragment>
              <div className={classNames.join(" ")}>
                <Popper placement={placement} modifiers={popperModifiers}>
                  {({ref, style, placement}) =>
                    this.state.isOpen ? (
                      <div
                        ref={ref}
                        style={{zIndex, ...style, outline: "none"}}
                        // adding a tabIndex so this div can capture keydown events
                        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                        tabIndex={0}
                        onKeyDown={this.handleKeyDown}
                        role="presentation"
                        className={className}
                      >
                        <ActualPlacementContext.Provider value={placement}>
                          {children}
                        </ActualPlacementContext.Provider>
                      </div>
                    ) : null
                  }
                </Popper>
              </div>
            </PortalOrFragment>
          </PWCAContext.Provider>
        );
      }}
    </PWCAContext.Consumer>
  );

  render() {
    return (
      <Manager>
        <PWCAContext.Consumer>
          {({classNames}) => (
            <OnClickOutside
              // eslint-disable-next-line react/jsx-handler-names
              onClickOutside={this.closePopup}
              outsideClickIgnoreClass={classNames[classNames.length - 1]}
            >
              {this.props.children(this.Target, this.Popup, {
                openPopup: this.openPopup,
                closePopup: this.closePopup,
                togglePopup: this.togglePopup,
                isOpen: this.state.isOpen,
              })}
            </OnClickOutside>
          )}
        </PWCAContext.Consumer>
      </Manager>
    );
  }
}
