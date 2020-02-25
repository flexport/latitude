/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow
 */
/* eslint-disable react/prefer-stateless-function,flexport/no-unused-aphrodite-styles */

import * as React from "react";
import {css, StyleSheet} from "aphrodite";

import {typeScale} from "../styles/typography";
import TextLinkAction from "../TextLinkAction";
import latitudeColors from "../colors";
import {whitespaceSizeConstants} from "../styles/whitespace";

export type ToastIntent = "none" | "success" | "danger";

type Props = {
  /** The message to be shown in the Toast body. */
  +message: string,
  /** Intents are styles that convey meaning and reinforce the action. */
  +intent: ToastIntent,
  +action:
    | {|
        +type: "undo",
        +onClick: () => void,
      |}
    | {|
        +type: "refresh",
        +onClick: () => void,
      |}
    | {|
        +type: "none",
      |},
};

/**
 * Toasts actually *ARE NOT* implemented with `Toast.jsx`. See [Toaster docs](/design/components/Toaster) for implementation documentation.
 *
 * @short A quick message that should provide some additional information that relates to a user action. Toasts shouldn't interrupt the user or require input to dismiss.
 * @brandStatus V2
 * @status Stable
 * @category Feedback
 * @extends React.Component */
export default class Toast extends React.PureComponent<Props> {
  static defaultProps = {
    intent: "none",
    action: {type: "none"},
  };

  render() {
    const {action, message, intent} = this.props;
    const onClick = action.type === "none" ? undefined : action.onClick;
    const link =
      action.type === "none" ? null : (
        <TextLinkAction weight="bold" linkStyle="inverse" onClick={onClick}>
          {action.type === "undo" ? "Undo" : "Refresh"}
        </TextLinkAction>
      );

    return (
      <div
        className={css(styles.wrapper, styles[intent])}
        style={{
          ...typeScale.base,
        }}
      >
        <div>{message}</div>
        {link ? <div className={css(styles.actionPadding)}>{link}</div> : null}
      </div>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    display: "inline-flex",
    position: "relative",
    alignItems: "center",
    background: latitudeColors.grey60,
    color: latitudeColors.white,
    boxShadow: "0 0 20px rgba(57, 65, 77, 0.15)",
    borderLeft: `solid 12px`,
    marginBottom: whitespaceSizeConstants.m,
    padding: "24px 32px 24px 20px",
  },
  actionPadding: {paddingLeft: "40px"},
  none: {
    borderColor: latitudeColors.black,
  },
  success: {
    borderColor: latitudeColors.green40,
  },
  danger: {
    borderColor: latitudeColors.red40,
  },
});
