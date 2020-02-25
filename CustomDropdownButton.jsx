/**
 * TEAM: customs
 * @flow
 */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import {Manager} from "react-popper";
import typeof Button from "./button/Button";
import typeof IconButton from "./button/IconButton";
import typeof ToggleButton from "./base_candidate/button/ToggleButton";
import popupWithClickAway, {
  type PopupWithClickAwayProps,
} from "./tools/popupWithClickAway";
import DeprecatedPopperTarget from "./popup/DeprecatedPopperTarget";
import DeprecatedPopper from "./popup/DeprecatedPopper";
import colors from "./colors";
import {border, include, margin} from "./styles/index";
import {zIndices} from "./tools/zIndices";

export type DropdownProps = PopupWithClickAwayProps & {
  // Makes the field unclickable and greyed out.
  disabled?: boolean,
  // The button that triggers the dropdown menu.
  button: React.Element<Button | IconButton | ToggleButton>,
  // The content of the button to render
  children: React.Node,
  // Overrides the default container of the dropdown to have custom sizing, colors, etc.
  isCustomContainer?: boolean,
  // Aligns the right part of the menu with the right border of the button; by default, it is left-left.
  menuAlignRight?: boolean,
};

/**
 * Consider removing unsafe lifecycle methods for future concurrent mode support!
 * See https://reactjs.org/blog/2018/03/29/react-v-16-3.html#component-lifecycle-changes
 */
/* eslint-disable react/no-unsafe */
export class CustomDropdownButtonClass extends React.PureComponent<DropdownProps> {
  UNSAFE_componentWillReceiveProps(newProps: DropdownProps) {
    if (newProps.disabled && newProps.isPopupVisible) {
      newProps.setPopupVisible(false);
    }
  }

  render() {
    const {
      button,
      children,
      disabled,
      isCustomContainer,
      isPopupVisible,
      menuAlignRight,
      togglePopupVisible,
    } = this.props;
    const btn: React.Element<
      Button | IconButton | ToggleButton
      // $FlowFixMe(alanhu1996)
    > = React.cloneElement(button, {
      ...button.props,
      disabled,
      isToggled: isPopupVisible,
      onClick: e => {
        if (disabled) return;
        togglePopupVisible();
        e.stopPropagation();
      },
    });
    return (
      <div className={css(styles.outerDiv)}>
        <Manager>
          <DeprecatedPopperTarget>
            <div>{btn}</div>
          </DeprecatedPopperTarget>
          {isPopupVisible ? (
            <DeprecatedPopper
              className={css(styles.popperZindex)}
              placement={menuAlignRight ? "bottom-end" : "bottom-start"}
            >
              {isCustomContainer ? (
                children
              ) : (
                <div className={css(styles.dropdownContainer)}>{children}</div>
              )}
            </DeprecatedPopper>
          ) : null}
        </Manager>
      </div>
    );
  }
}

export const styles = StyleSheet.create({
  dropdownContainer: {
    ...include(margin.t.xs),
    backgroundColor: colors.white,
    maxHeight: 250,
    width: 400,
    overflowY: "auto",
    ...border.a.s,
    borderRadius: 3,
    boxShadow: "2px 2px 2px rgba(0,0,0,0.06)",
  },
  outerDiv: {
    display: "inline-block",
  },
  popperZindex: {
    zIndex: zIndices.zIndex10.value,
  },
});

export const _test = {
  CustomDropdownButtonClass,
};

const CustomDropdownButton = popupWithClickAway(CustomDropdownButtonClass);
export default CustomDropdownButton;
