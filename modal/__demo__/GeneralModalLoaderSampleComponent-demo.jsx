/**
 * TEAM: shipment_data
 * WATCHERS: Yangobears
 *
 * @flow
 */
import React from "react";
import Button from "../../button/Button";
import GeneralModalBody from "../GeneralModalBody";

export default class AddUserModal extends React.PureComponent<*, *> {
  static defaultProps = {
    isInvite: false,
  };

  // eslint-disable-next-line class-methods-use-this
  renderButtons() {
    return [
      <Button key="cancel" kind="bare">
        Cancel
      </Button>,
      <Button key="create" intent="basic" kind="solid">
        Create
      </Button>,
    ];
  }

  render() {
    return (
      <GeneralModalBody buttons={this.renderButtons()}>
        Demo Modal
      </GeneralModalBody>
    );
  }
}
