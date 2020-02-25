/**
 * TEAM: frontend_infra
 * @flow strict
 */
/* eslint-disable react/prefer-stateless-function */

import * as React from "react";

import {StyleSheet, css} from "aphrodite";
import colors from "./colors";
import {margin} from "./styles/whitespace";
import {include} from "./styles";

type Props = {|
  +errorText: string | React.Node,
  +showError?: boolean,
  +children?: React.Node,
|};

/**
 * @short Renders error text relating to an input below the input; if not error is shown, the spacing it would have taken up is maintained (to avoid UX jitter).
 * @category Data Entry
 * @brandStatus V2
 * @status Stable
 */
export default function InputError({
  errorText,
  showError = false,
  children,
}: Props) {
  return (
    <div>
      {children}
      {showError ? (
        <div
          className={css(
            inputErrorStyles.inputError,
            true && inputErrorStyles.redesign
          )}
        >
          {errorText}
        </div>
      ) : null}
    </div>
  );
}

export const inputErrorStyles = StyleSheet.create({
  inputError: {
    fontSize: "13px",
    color: colors.red40,
  },
  redesign: {
    ...include(margin.t.xs),
    fontWeight: 500,
    color: colors.red40,
  },
});
