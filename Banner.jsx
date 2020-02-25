/**
 * TEAM: frontend_infra
 * @flow strict
 */

/* eslint-disable flexport/no-unused-aphrodite-styles */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import Icon, {type IconNames} from "./Icon";
import invariant from "./tools/invariant";
import IconButton from "./button/IconButton";
import latitudeColors, {type Color} from "./colors";

import Text from "./Text";

type Intent = "default" | "default-light" | "warning" | "danger";

type Props = {|
  /**
   * defines the visual style which conveys the level of importance / urgency
   * to the user
   */
  +intent?: Intent,
  /** the name of the icon to be displayed on the left of the banner */
  +iconName?: IconNames,
  /** the message that will appear at the center of the banner */
  +message: string | React.Element<typeof Text>,
  /** additional content to display in the banner below the message */
  +additionalContent?: React.Node,
  /**
   * The call to action button that will appear below the banner message.
   * This button should have intent "basic" and kind "blank"
   */
  +ctaButton?: React.Node,
  /**
   * Called when the close button is pressed. If an onClose
   * isn't provided, the close button will not appear
   */
  +onClose?: () => void,
|};

/**
 * @category Data Display
 * @short Spans the entire width of its parent and displays a informing message
 * @brandStatus V2
 * @status Beta
 *
 * The banner component is used to provide feedback to the user such as when
 * an app update has occured or when there are errors returned from the server.
 * Banners can also be used to display passive messages such as when times are
 * being displayed in a separate timezone or when the user is impersonating
 * a client.
 */
export default function Banner({
  intent = "default",
  iconName,
  message,
  additionalContent,
  ctaButton,
  onClose,
}: Props) {
  invariant(
    !(intent === "danger" && ctaButton),
    "Danger Banners cannot have a call to action button"
  );

  const messageContent = message === "string" ? <Text>message</Text> : message;

  const iconColor = getIconColor(intent);

  const ctaButtonContent =
    ctaButton != null ? (
      <div className={css(styles.ctaButtonWrapper)}>{ctaButton}</div>
    ) : null;

  const additionalContentNode =
    additionalContent != null ? (
      <div className={css(styles.additionalContentWrapper)}>
        {additionalContent}
      </div>
    ) : null;

  let closeNode = null;
  if (onClose) {
    closeNode = (
      <div className={css(intent === "danger" && styles.closeWrapperDanger)}>
        <IconButton
          iconName="cancel"
          onClick={onClose}
          kind="blank"
          intent="none"
          type="button"
          size="l"
          height={{type: "customDontUse", height: 20}}
        />
      </div>
    );
  }

  return (
    <div
      className={css(
        styles.container,
        styles[intent],
        additionalContent != null && styles.closeButtonWrapper
      )}
    >
      <div className={css(styles.contentWrapper)}>
        <div className={css(styles.iconWrapper)}>
          {iconName && <Icon size="s" iconName={iconName} color={iconColor} />}
        </div>
        <div className={css(styles.content)}>
          {messageContent}
          {additionalContentNode}
          {ctaButtonContent}
        </div>
      </div>
      {closeNode}
    </div>
  );
}

const getIconColor = (intent: Intent): Color => {
  if (intent === "danger") {
    return "white";
  } else if (intent === "warning") {
    return "red40";
  }
  return "grey60";
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    borderRadius: "0",
    alignItems: "flex-start",
  },
  closeButtonWrapper: {
    alignItems: "baseline",
  },
  contentWrapper: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
  },
  iconWrapper: {
    marginRight: "20px",
  },
  closeWrapperDanger: {
    ":nth-child(1n) > button > span > svg": {
      fill: latitudeColors.white,
      animationDuration: "0",
    },
    ":nth-child(1n) > button > span > svg :hover": {
      fill: latitudeColors.white,
    },
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flex: "1",
    marginRight: "20px",
    lineHeight: "20px",
  },
  additionalContentWrapper: {
    marginTop: "8px",
  },
  ctaButtonWrapper: {
    paddingTop: "8px",
  },

  default: {
    background: latitudeColors.grey10,
    padding: "18px",
    border: `2px solid ${latitudeColors.grey20}`,
  },
  "default-light": {
    background: latitudeColors.white,
    padding: "18px",
    border: `2px solid ${latitudeColors.grey20}`,
  },
  warning: {
    border: `2px solid ${latitudeColors.red40}`,
    padding: "18px",
    background: latitudeColors.white,
  },
  danger: {
    background: latitudeColors.red40,
    padding: "20px",
    color: latitudeColors.white,
  },
});
