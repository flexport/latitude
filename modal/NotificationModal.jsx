/**
 * TEAM: frontend_infra
 * @flow
 */

/* eslint-disable react/prefer-stateless-function */

import * as React from "react";
import StaticGeneralModalLoader from "./StaticGeneralModalLoader";
import GeneralModalBody from "./GeneralModalBody";
import typeof Button from "../button/Button";
import typeof Text from "../Text";
import typeof Link from "../Link";

export type NotificationModalProps = {|
  /** title of the modal body */
  +title: string,
  /** a set of buttons corresponding to actions that can be taken in the modal form */
  +buttons: $ReadOnlyArray<React.Element<Button>>,
  /** body of the modal */
  +children: React.ChildrenArray<React.Element<Text | Link>>,
  /**
   * What do to when the "X" to the modal is clicked
   */
  +onRequestClose: () => void,
|};

/**
 * @category Overlay
 * @short Simple notification modal. These are not dynamically loaded, because they are just text. For more complext modals, use GeneralModalBody.
 * @brandStatus V2
 * @status Stable
 * @extends React.Component */
class NotificationModal extends React.Component<NotificationModalProps> {
  render() {
    return (
      <StaticGeneralModalLoader
        title={this.props.title}
        onRequestClose={this.props.onRequestClose}
        width="l"
      >
        <GeneralModalBody buttons={this.props.buttons}>
          {this.props.children}
        </GeneralModalBody>
      </StaticGeneralModalLoader>
    );
  }
}

export default NotificationModal;
