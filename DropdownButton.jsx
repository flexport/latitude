/**
 * TEAM: frontend_infra
 * WATCHERS: uforic
 * @flow
 */

import * as React from "react";

import DeprecatedDropdownList, {
  type DropdownOption,
} from "./form/DeprecatedDropdownList";

import popupWithClickAway, {
  type PopupWithClickAwayProps,
} from "./tools/popupWithClickAway";
import {CustomDropdownButtonClass} from "./CustomDropdownButton";
import typeof Button from "./button/Button";
import typeof IconButton from "./button/IconButton";
import typeof ToggleButton from "./base_candidate/button/ToggleButton";

export type DropdownButtonProps = {|
  ...$Exact<PopupWithClickAwayProps>,
  /** Makes the field unclickable and greyed out. */
  +disabled?: boolean,
  /** The button that triggers the dropdown menu. */
  +button: React.Element<Button | IconButton | ToggleButton>,
  /** The options to render in the dropdown list. */
  +options: Array<DropdownOption>,
  /** Aligns the right part of the menu with the right border of the button; by default, it is left-left. */
  +menuAlignRight?: boolean,
|};

/**
 * Consider removing unsafe lifecycle methods for future concurrent mode support!
 * See https://reactjs.org/blog/2018/03/29/react-v-16-3.html#component-lifecycle-changes
 */
/* eslint-disable react/no-unsafe */
/**
 * @short Use a button to launch a simple dropdown. The button's on click will be hijacked and replaced, so don't bother specifying one.
 * @brandStatus V2
 * @status Stable
 * @category Interaction
 *
 * Use this component for dropdowns with selectable options. For a dropdown with custom rendering check out the CustomDropdownButton component.
 * @extends React.Component */
class DropdownButtonClass extends React.PureComponent<DropdownButtonProps> {
  UNSAFE_componentWillReceiveProps(newProps: DropdownButtonProps) {
    if (newProps.disabled && newProps.isPopupVisible) {
      newProps.setPopupVisible(false);
    }
  }

  render() {
    const {
      button,
      disabled,
      menuAlignRight,
      options,
      setPopupVisible,
      ...popupClickAwayProps
    } = this.props;

    return (
      <CustomDropdownButtonClass
        {...popupClickAwayProps}
        button={button}
        disabled={disabled}
        isCustomContainer={true}
        menuAlignRight={menuAlignRight}
        setPopupVisible={setPopupVisible}
      >
        <DeprecatedDropdownList
          options={options}
          setPopupVisible={setPopupVisible}
          splitLayout={false}
        />
      </CustomDropdownButtonClass>
    );
  }
}

export const _test = {
  DropdownButtonClass,
};

export default popupWithClickAway(DropdownButtonClass);
