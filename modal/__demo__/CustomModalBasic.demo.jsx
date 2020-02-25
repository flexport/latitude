/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import Button from "../../button/Button";
import TextInput from "../../TextInput";
import Label from "../../Label";
import CustomModal, {defaultModalStyles} from "../CustomModal";
import {include, padding} from "../../styles";
import colors from "../../colors";

/**
 * @title Basic Custom Modal
 * @description CustomModal can be used to pop up content over the page.
 */
export default function CustomModalBasic() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Open Modal
      </Button>
      <CustomModal
        isOpen={isOpen}
        closeOptions={{
          onRequestClose: () => {
            setIsOpen(false);
          },
          shouldCloseOnEsc: true,
          shouldCloseOnOverlayClick: true,
        }}
        className={css(
          defaultModalStyles.content,
          defaultModalStyles.widthMedium,
          styles.modal
        )}
      >
        <div className={css(styles.leftPanel)}>
          <Label value="Example input">
            <TextInput value="" onChange={() => {}} />
          </Label>
        </div>
        <div className={css(styles.rightPanel)}>
          <div>Right Panel</div>
          <Button onClick={this.handleClose}>OK</Button>
        </div>
      </CustomModal>
    </div>
  );
}

const styles = StyleSheet.create({
  modal: {
    ...include(padding.a.m),
    backgroundColor: "white",
    display: "flex",
    padding: 0,
  },
  rightPanel: {flexGrow: 1, height: 400},
  leftPanel: {
    backgroundColor: colors.grey30,
  },
});
