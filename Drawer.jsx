/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow
 */
import * as React from "react";
import {StyleSheet, css} from "aphrodite";

import {CSSTransition} from "react-transition-group";
import IconButton from "./button/IconButton";
import Text from "./Text";

import Portal from "./Portal";
import {zIndices} from "./tools/zIndices";
import colors from "./colors";

const DRAWER_WIDTHS = {
  s: 400,
  m: 500,
};

const TRANSITION_DELAY = 320;
const WORKSPACE_DEFAULT_NAV_HEIGHT = 56;

type Props = {|
  +children?: React.Node,
  +title: string,
  +navOffset?: number,
  +isOpen: boolean,
  +onClose: () => void,
  +width?: $Keys<typeof DRAWER_WIDTHS>,
|};

/**
 * @category Layout
 * @short Drawers slide in from the side of the viewport and allow for any custom content
 * @brandStatus V3
 * @status Beta
 */
function Drawer({
  children,
  title,
  navOffset = WORKSPACE_DEFAULT_NAV_HEIGHT,
  isOpen,
  onClose,
  width = "s",
}: Props) {
  if (!isOpen) {
    return null;
  }

  const styles = getStyles(width);

  return (
    <Portal>
      <div className={css(styles.drawerWrapper, styles.transitionGroup)}>
        <CSSTransition
          in={isOpen}
          classNames={{
            enter: css(styles.drawerEnter),
            enterActive: css(styles.drawerEnterActive),
            exit: css(styles.drawerExit),
            exitActive: css(styles.drawerExitActive),
          }}
          timeout={{
            enter: TRANSITION_DELAY,
            exit: TRANSITION_DELAY,
          }}
          mountOnEnter={true}
          unmountOnExit={true}
        >
          <div
            className={css(styles.container)}
            style={{
              top: navOffset,
              height: `calc(100vh - ${navOffset}px)`,
            }}
          >
            <div className={css(styles.header)}>
              <Text scale="headline" weight="bold">
                {title}
              </Text>
              <IconButton
                iconName="cancel"
                intent="none"
                kind="hollow"
                type="button"
                onClick={onClose}
              />
            </div>
            <div className={css(styles.body)}>{children}</div>
          </div>
        </CSSTransition>
      </div>
    </Portal>
  );
}

function getStyles(width: $Keys<typeof DRAWER_WIDTHS>) {
  return StyleSheet.create({
    drawerWrapper: {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      width: DRAWER_WIDTHS[width],
    },
    container: {
      width: `${DRAWER_WIDTHS[width]}px`,
      position: "fixed",
      backgroundColor: colors.grey10,
      boxShadow: "0 0 20px rgba(57, 65, 77, 0.15)",
      pointerEvents: "all",
      zIndex: zIndices.zIndexPageOverlay.value,
      display: "flex",
      flexDirection: "column",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      padding: "32px",
    },
    body: {
      flex: 1,
      overflowY: "auto",
    },
    transitionGroup: {
      display: "flex",
      justifyContent: "flex-end",
    },
    drawerEnter: {
      right: `-${DRAWER_WIDTHS[width]}px`,
    },
    drawerEnterActive: {
      right: "0px",
      transition: `right ${TRANSITION_DELAY}ms cubic-bezier(0.645, 0.045, 0.355, 1.000)`,
    },
    drawerExit: {
      right: "0px",
    },
    drawerExitActive: {
      right: `-${DRAWER_WIDTHS[width]}px`,
      transition: `right ${TRANSITION_DELAY}ms cubic-bezier(0.645, 0.045, 0.355, 1.000)`,
    },
  });
}

export default Drawer;
