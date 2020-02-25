/**
 * TEAM: frontend_infra
 * @flow strict
 */

import * as React from "react";
import onClickOutside from "./onClickOutside";
import getHocDisplayName from "./getHocDisplayName";

export type PopupWithClickAwayProps = {
  +togglePopupVisible: () => void,
  +isPopupVisible: boolean,
  +setPopupVisible: boolean => void,
};

type State = {|
  isPopupVisible: boolean,
|};

export default function popupWithClickAway<P: PopupWithClickAwayProps>(
  WrappedComponent: React.ComponentType<P>
) {
  class PopupWithClickAway extends React.PureComponent<
    $Diff<P, PopupWithClickAwayProps>,
    State
  > {
    static displayName = getHocDisplayName(
      "PopupWithClickAway",
      WrappedComponent
    );

    state = {isPopupVisible: false};

    setPopupVisible = isPopupVisible => this.setState({isPopupVisible});

    togglePopupVisible = () => this.setPopupVisible(!this.state.isPopupVisible);

    // Called by listensToClickOutside
    // eslint-disable-next-line flexport/no-unused-handlers,autofix/no-unused-vars
    handleClickOutside = event => {
      if (this.state.isPopupVisible) {
        this.setPopupVisible(false);
      }
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          isPopupVisible={this.state.isPopupVisible}
          setPopupVisible={this.setPopupVisible}
          togglePopupVisible={this.togglePopupVisible}
        />
      );
    }
  }

  return onClickOutside(PopupWithClickAway);
}
