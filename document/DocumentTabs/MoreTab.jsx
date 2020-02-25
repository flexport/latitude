/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import Dotdotdot from "react-dotdotdot";
import PopupWithClickAway from "../../popup/PopupWithClickAway";
import Text from "../../Text";
import Icon from "../../Icon";
import colors from "../../colors";
import Clickable from "../../base_candidate/Clickable";
import typeof DocumentTab from "./DocumentTab";
import {type Size} from "./sizes";

const HORIZONTAL_MARGIN = 4;

type Props = {|
  +children: React.ChildrenArray<React.Element<DocumentTab>>,
  +width: number,
  +selectedLabel: string | null,
  +size: Size,
|};

export const ListPopupContext = React.createContext<{
  togglePopup: () => void,
}>({
  togglePopup: () => {},
});

function MoreTab({width, selectedLabel, size, children}: Props) {
  const marginAdjustedWidth = width - HORIZONTAL_MARGIN * 2;

  return (
    <div className={css(styles.container)} style={{width: marginAdjustedWidth}}>
      <PopupWithClickAway>
        {(Target, Popup, {togglePopup, isOpen}) => (
          <>
            <Target>
              <Clickable onClick={togglePopup}>
                <div
                  className={css(
                    styles.button,
                    !!selectedLabel && styles.selected
                  )}
                  style={selectedLabel && {width: marginAdjustedWidth}}
                >
                  {selectedLabel ? (
                    <div className={css(styles.labelWrapper)}>
                      <Dotdotdot clamp={size !== "s" ? 2 : 1}>
                        {selectedLabel}
                      </Dotdotdot>
                    </div>
                  ) : (
                    <div className={css(styles.textWrapper)}>
                      <Text color="white" weight="bold">
                        More
                      </Text>
                    </div>
                  )}
                  <Icon iconName="downOpen" color="white" size="xs" />
                </div>
              </Clickable>
            </Target>
            {isOpen ? (
              <Popup placement="bottom-end">
                <div
                  className={css(styles.listContainer)}
                  style={{width: marginAdjustedWidth}}
                >
                  <ListPopupContext.Provider value={{togglePopup}}>
                    {children}
                  </ListPopupContext.Provider>
                </div>
              </Popup>
            ) : null}
          </>
        )}
      </PopupWithClickAway>
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    display: "flex",
    position: "relative",
    margin: `0 ${HORIZONTAL_MARGIN}px`,
    justifyContent: "flex-end",
    alignItems: "stretch",
  },
  button: {
    display: "flex",
    padding: "6px 8px",
    minHeight: "100%",
    alignItems: "center",
    ":hover": {
      backgroundColor: colors.grey60,
    },
  },
  textWrapper: {
    margin: "0 8px 0 4px",
    boxShadow: "inset 0 -2px 0 0 #FFF",
  },
  labelWrapper: {
    wordWrap: "break-word",
    fontSize: "12px",
    lineHeight: "16px",
    color: colors.white,
    flex: "0 1 auto",
    overflow: "hidden",
    position: "relative",
    marginRight: "4px",
  },
  listContainer: {
    marginTop: "4px",
    minWidth: "100%",
  },
  selected: {
    backgroundColor: colors.grey50,
  },
});

export default MoreTab;
