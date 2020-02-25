/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import Toast from "../Toast";

/**
 * @title Toast Anatomy
 * @description The toast message should be concise and direct. Toasts consist of a signle line of text with a style that reflects the intent of the notification.
 */
export default function ToastAnatomy() {
  return <Toast message="Email has been sent!" intent="success" />;
}
