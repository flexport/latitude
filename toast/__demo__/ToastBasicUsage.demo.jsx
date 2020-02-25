/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import Button from "../../button/Button";
import ToastActions from "../ToastActions";

/**
 * @title Basic Toast Usage
 * @description The toast message should be concise and direct. Toasts consist of a signle line of text with a style that reflects the intent of the notification.
 */
export default function ToastBasicUsage() {
  const launchToast = () => {
    const toastProps = {
      intent: "success",
      message: "Something happened and you should know 👍",
      action: {
        type: "refresh",
        onClick: () => {},
      },
      isLoading: false,
    };
    ToastActions.show(toastProps, 2000);
  };
  return <Button onClick={launchToast}>Lanch Toast</Button>;
}
