/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow
 */
/* eslint-disable react/prefer-stateless-function */
import * as React from "react";
import {css, StyleSheet} from "aphrodite";
import {TransitionGroup, CSSTransition} from "react-transition-group";

import type {ToastRecord} from "./ToastStore";

import {zIndices} from "../tools/zIndices";
import {padding} from "../styles/deprecatedWhitespace";

import Toast from "./Toast";

export type ToasterPropsFromParent = {
  /* Option to add space to the top so it doesn't overlap with a header */
  +topOffset?: number,
};

export type ToasterProps = {
  ...ToasterPropsFromParent,
  +toasts: Array<ToastRecord>,
};

/**
 * Toaster is an invisible full page overlay which manages and displays incoming and outgoing toasts. Head over to [Toast Documention](/design/components/Toast) for examples, UI anatomy, and toast options.
 *
 * **Adding toasts:**
 *
 * 1. Ensure ConnectedToaster is rendered in your app (`import ConnectedToaster from "latitude/toast/ConnectedToaster";`)
 *
 * 2. Use ToastActions to emit a toast: `ToastActions.show({message, intent});`
 *
 *
 * **How it works**
 *
 * Toasts will automatically stack and disappear according to the default settings. To display a toast, use: `ToastActions.show({message, intent});`. You can optionally specify a timeout duration by passing a second argument to `show()`. (The default duration is `3000ms`.)
 *
 * @short The manager that controls Toast animation and display
 * @brandStatus V2
 * @status Stable
 * @category Feedback
 * @extends React.Component */
export default class Toaster extends React.PureComponent<ToasterProps> {
  render() {
    const {topOffset} = this.props;
    return (
      <TransitionGroup
        className={css(styles.toaster, padding.t.m)}
        style={{top: topOffset || 0}}
      >
        {this.props.toasts.map(toast => (
          <CSSTransition
            key={`${toast.message}-${toast.id}`}
            timeout={300}
            classNames={{
              enter: css(styles.toastEnter),
              enterActive: css(styles.toastEnterActive),
              exit: css(styles.toastExit),
              exitActive: css(styles.toastExitActive),
            }}
          >
            {/* The active-toast class is used by the Flexport gmail extension,
             * please look there before removing this - benbernard 2018-08-09
             */}
            {/* eslint-disable-next-line flexport/no-oocss */}
            <div className="active-toast">
              <Toast {...toast} />
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    );
  }
}

const styles = StyleSheet.create({
  toaster: {
    position: "fixed",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: zIndices.zIndex1500AboveModal.value,
    textAlign: "center",
  },
  toastEnter: {
    opacity: 0,
    transform: "translateX(-64px)",
  },
  toastEnterActive: {
    opacity: 1,
    transform: "translateX(0)",
    transition: "all 0.3s cubic-bezier(.42,0,.58,1)",
  },
  toastExit: {
    opacity: 1,
    transform: "translateX(0)",
  },
  toastExitActive: {
    opacity: 0,
    transform: "translateX(48px)",
    transition: "all 0.3s cubic-bezier(.42,0,.58,1)",
  },
});
