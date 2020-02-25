/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import Dotdotdot from "react-dotdotdot";
import PopupWithClickAway from "../../popup/PopupWithClickAway";
import GeneralPopover from "../../popover/GeneralPopover";
import Button from "../../button/Button";
import IconButton from "../../button/IconButton";
import Tooltip from "../../Tooltip";
import Text from "../../Text";
import colors from "../../colors";
import {type Size} from "./sizes";
import {ListPopupContext} from "./MoreTab";
import Clickable from "../../base_candidate/Clickable";

const HORIZONTAL_MARGIN = 4;

type Props = {|
  +children: string,
  +isOverflow: boolean,
  +width: number,
  +isSelected: boolean,
  +isInDropdown: boolean,
  +onClick: () => void,
  +onDelete: () => void,
  +size: Size,
|};

function DocumentTab({
  children,
  isOverflow,
  width,
  size,
  isSelected,
  onClick,
  onDelete,
  isInDropdown,
}: Props) {
  const listPopupContext = React.useContext(ListPopupContext);
  const marginAdjustedWidth = width - HORIZONTAL_MARGIN * 2;

  return (
    <PopupWithClickAway>
      {(Target, Popup, {togglePopup, isOpen}) => (
        <>
          <Target>
            <Tooltip
              placement={isOverflow ? "right" : "bottom"}
              mouseEnterDelay={0.5}
              overlay={
                <div
                  style={{
                    minWidth: marginAdjustedWidth,
                    wordWrap: "break-word",
                  }}
                >
                  {children}
                </div>
              }
            >
              <Clickable
                onClick={() => {
                  onClick();
                  if (!isOverflow) {
                    listPopupContext.togglePopup();
                  }
                }}
              >
                <div
                  className={css(
                    styles.container,
                    (isSelected || isOpen) && styles.selected,
                    isInDropdown && styles.dropdownContainer,
                    isOverflow && isSelected && styles.dropdownSelected
                  )}
                  style={{width: marginAdjustedWidth}}
                >
                  <div className={css(styles.textContainer)}>
                    <Dotdotdot clamp={size !== "s" ? 2 : 1}>
                      {children}
                    </Dotdotdot>
                  </div>

                  <div
                    className={css(
                      styles.buttonContainer,
                      !isSelected && !isOpen && styles.hidden
                    )}
                  >
                    <IconButton
                      iconName="trash"
                      type="button"
                      intent="none"
                      kind="blank"
                      onClick={e => {
                        e.stopPropagation();
                        togglePopup();
                      }}
                    />
                  </div>
                </div>
              </Clickable>
            </Tooltip>
          </Target>
          <Popup placement={isOverflow ? "right-start" : "bottom-start"}>
            <div style={{margin: isOverflow ? "0 8px" : "8px 0"}}>
              <GeneralPopover
                title="Delete Shipping Order"
                buttons={[
                  <Button key={1} label="Cancel" onClick={togglePopup} />,
                  <Button
                    key={2}
                    label="Delete"
                    intent="danger"
                    kind="solid"
                    onClick={() => {
                      onDelete();
                      togglePopup();
                    }}
                  />,
                ]}
              >
                <div className={css(styles.popoverBody)}>
                  <Text display="inline">
                    Are you sure you want to delete <b>{children}</b>?
                  </Text>
                  <br />
                  <Text display="inline">
                    You will not be able to access this file once it is deleted.
                    Data from this file will be deleted as well.
                  </Text>
                  <br />
                </div>
              </GeneralPopover>
            </div>
          </Popup>
        </>
      )}
    </PopupWithClickAway>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    padding: "6px 8px",
    margin: `0 ${HORIZONTAL_MARGIN}px`,
    justifyContent: "space-between",
    cursor: "pointer",
    minHeight: "100%",
    backgroundColor: colors.black,
    color: colors.white,
    ":hover": {
      backgroundColor: colors.grey60,
    },
    ":hover > :nth-child(2)": {
      visibility: "visible",
    },
    ":active": {
      backgroundColor: colors.grey40,
    },
  },
  dropdownContainer: {
    padding: "8px 12px",
    backgroundColor: colors.grey60,
    margin: "0",
    ":hover": {
      backgroundColor: colors.grey50,
    },
  },
  selected: {
    backgroundColor: colors.grey50,
  },
  textContainer: {
    wordWrap: "break-word",
    fontSize: "12px",
    lineHeight: "16px",
    overflow: "hidden",
    flex: "0 1 auto",
  },
  buttonContainer: {
    justifyContent: "center",
    height: "100%",
    margin: "0 -4px 0 4px",
    padding: "4px",
    // Hack: since inverted colors for buttons are not yet supported
    ":nth-child(1n) > button": {
      fill: colors.grey20,
      ":hover span svg": {
        fill: colors.white,
      },
    },
  },
  hidden: {
    visibility: "hidden",
  },
  dropdownSelected: {
    background: colors.black,
  },
  popoverBody: {
    display: "flex",
    flexDirection: "column",
    wordWrap: "break-word",
  },
});

export default DocumentTab;
