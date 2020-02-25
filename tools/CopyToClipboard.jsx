/**
 * TEAM: customs
 * WATCHERS: francisco-delgado
 *
 * @flow
 */

import ToastActions from "../toast/ToastActions";
import invariant from "./invariant";

export default function copyToClipboard(copyText: string, toastText: string) {
  // A hidden element is created and then deleted as we can only copy from
  // existing elements
  const textArea = ((document.createElement(
    "textArea"
  ): any): HTMLTextAreaElement);
  textArea.classList.add("hideVisually");

  textArea.value = copyText;

  invariant(document.body);
  document.body.appendChild(textArea);

  textArea.select();
  document.execCommand("copy");

  invariant(document.body);
  document.body.removeChild(textArea);

  ToastActions.show({
    message: toastText,
    intent: "none",
  });
}
