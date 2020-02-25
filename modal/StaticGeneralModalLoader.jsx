/**
 * TEAM: frontend_infra
 * @flow
 */

/* eslint-disable flexport/no-unused-aphrodite-styles */

import * as React from "react";
import {css, StyleSheet} from "aphrodite";
import Text from "../Text";
import IconButton from "../button/IconButton";
import CustomModal, {defaultModalStyles, getWidthStyle} from "./CustomModal";

import {margin, padding} from "../styles/whitespace";
import {border, include} from "../styles";
import invariant from "../tools/invariant";
import latitudeColors from "../colors";
import StaticModalLegacyContext, {
  type StaticModalLegacyContextType,
} from "./StaticModalLegacyContext";

export type ModalProps = {|
  /** a string rendered along the top of the modal */
  +title: string,
  /** an optional subtitle rendered to the right side of the title */
  +subtitle?: string,

  /**
   * An x to cancel the modal will only appear if an onRequestClose function is provided.
   * You may also provide a cancel button in the buttons prop, and it will likely reference
   * the same function.
   */
  +onRequestClose?: () => void,
  /** will determine the max width of the standard modal, to see what sizes these correspond to check CustomModal. */
  +width: "s" | "m" | "l",
  /** body of the modal */
  +children: React.ChildrenArray<React.Node>,
|};

/**
 * @category Overlay
 * @short A shell modal UI that meets the animation needs of a static modal, with a title / subtitle and close icon on the top.
 * Unlike [GeneralModalLoader](/design/components/GeneralModalLoader), StaticGeneralModalLoader statically loads modal content (it is not promised based) for the use of light modals (where it becomes more expensive to use GeneralModalLoader).
 *
 * **How to create static modals:**
 *
 * 1. Put all the components which the modal should render in [GeneralModalBody](/design/components/GeneralModalBody).
 *
 * 2. Wrap the GeneralModalBody with StaticGeneralModalLoader
 *
 * Please note that we'd like to code split on large modals, since we only need modal contents when the modal is shown, and replacing it with GeneralModalLoader would reduce bundle size in comparison to light modals.
 * So, avoid using StaticGeneralModalLoader for modals which are larger than GeneralModalLoader!
 * @brandStatus V2
 * @status Stable
 * @extends React.Component */
class StaticGeneralModalLoader extends React.PureComponent<ModalProps> {
  static defaultProps = {
    width: "m",
  };
  static contextType = StaticModalLegacyContext;
  context: StaticModalLegacyContextType;

  render() {
    invariant(
      this.context.legacyMode !== true,
      "Error: do not render StaticGeneralModalLoader with ModalStore.show(). Just render it inline."
    );

    return (
      <CustomModal
        closeOptions={
          this.props.onRequestClose
            ? {onRequestClose: this.props.onRequestClose}
            : undefined
        }
        className={css(
          defaultModalStyles.content,
          styles.modal,
          getWidthStyle(this.props.width),
          styles.modalBorderOverride
        )}
        isOpen={true}
      >
        <div className={css(styles.header)}>
          <div className={css(styles.headerText)}>
            <Text weight="bold">{this.props.title}</Text>
            {this.props.subtitle ? (
              <>
                {" "}
                <Text weight="bold">/</Text> <Text>{this.props.subtitle}</Text>
              </>
            ) : null}
          </div>
          {this.props.onRequestClose ? (
            <div className={css(styles.closeTrigger)}>
              <IconButton
                iconName="cancel"
                kind="blank"
                onClick={this.props.onRequestClose}
                type="button"
                size="l"
              />
            </div>
          ) : null}
        </div>
        {this.props.children}
      </CustomModal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    maxWidth: "450px",
    backgroundColor: latitudeColors.white,
  },
  modalBorderOverride: {
    borderRadius: "0px",
  },
  header: {
    ...include(margin.h.l),
    ...include(padding.t.l),
    ...include(padding.b.m),
    display: "flex",
    justifyContent: "space-between",
    ...border.b.s,
    borderColor: latitudeColors.grey30,
  },
  headerText: {
    ...include(margin.r.l),
  },
  closeTrigger: {
    display: "flex",
    alignSelf: "center",
  },
});

export default StaticGeneralModalLoader;
