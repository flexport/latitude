/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {css, StyleSheet} from "aphrodite";
import typeof Button from "../button/Button";
import Group from "../Group";
import colors from "../colors";

export type ModalProps = {|
  /** a set of buttons corresponding to actions that can be taken in the modal form */
  +buttons: $ReadOnlyArray<React.Element<Button>>,
  /** body of the modal */
  +children: React.ChildrenArray<React.Node>,
|};

/**
 * @category Overlay
 * @short Body of a modal which should be used with StaticGeneralModalLoader or GeneralModalLoader to load statically or dynamically.
 * To create modals, visit [GeneralModalLoader docs](/design/components/GeneralModalLoader) and [StaticGeneralModalLoader docs](/design/components/StaticGeneralModalLoader) for more usage details and how they work with GeneralModalBody.
 * Please note that GeneralModalBody is also responsible for placing the option buttons (ie. cancel/submit).
 * @brandStatus V2
 * @status Stable
 */
export default function GeneralModalBody({buttons, children}: ModalProps) {
  return (
    <>
      <div className={css(styles.body)}>{children}</div>
      {buttons.length > 0 ? (
        <div className={css(styles.footer)}>
          <Group gap={12} justifyContent="flex-end">
            {buttons.map((button, idx) => {
              const buttonIdentifier =
                (typeof button.props.children === "string"
                  ? button.props.children
                  : button.props.label) || idx;

              return <div key={buttonIdentifier}>{button}</div>;
            })}
          </Group>
        </div>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  footer: {
    padding: "0 20px 20px 20px",
  },
  body: {
    padding: "20px",
    marginBottom: "4px",
    backgroundColor: colors.white,
  },
});
