/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import Checkbox from "../../Checkbox";

type Props = {|
  /** The label associated with the option */
  +label: string,
  /** Whether or not the checkbox option is checked */
  +checked: boolean,
  /** Called when the checkbox is checked or unchecked */
  +onChange: (newValue: boolean) => void,
|};

function CheckboxOption({label, checked, onChange}: Props) {
  return (
    <div className={css(styles.container)}>
      <div
        onMouseDown={(e: Event) => {
          e.stopPropagation();
        }}
        role="presentation"
      >
        <Checkbox label={label} checked={checked} onChange={onChange} />
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    height: "40px",
    padding: "0 12px",
  },
});

export default CheckboxOption;
