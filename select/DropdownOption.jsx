/**
 * TEAM: frontend_infra
 * @flow strict
 */

/* eslint-disable flexport/no-unused-aphrodite-styles */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import latitudeColors from "../colors";

type Props = {|
  /** the unique label associated with the option. */
  +label: string,
  /** can be used to render a custom view */
  +customView?: React.Node,
  /** whether the option is currently highlighted */
  +isHighlighted: boolean,
  /** called when the option is clicked */
  +onClick?: (selected: string) => void,
  /** whether the option is disabled */
  +disabled?: boolean,
|};

/**
 * @category Data Entry
 * @short A singular option used by the dropdown list
 * @brandStatus V2
 * @status In Review
 */
export default function DropdownOption({
  label,
  customView,
  isHighlighted = false,
  onClick,
  disabled = false,
}: Props) {
  const liElement = React.useRef<HTMLLIElement | null>(null);

  if (isHighlighted && liElement.current && liElement.current.scrollIntoView) {
    liElement.current.scrollIntoView({
      block: "nearest",
    });
  }

  return (
    <li
      key={label}
      className={css(
        styles.dropdownItem,
        isHighlighted && !disabled && styles.dropdownItemHighlight,
        disabled && styles.dropdownItemDisabled
      )}
      onMouseDown={() => {
        if (onClick) {
          onClick(label);
        }
      }}
      ref={liElement}
    >
      {customView !== false && customView != null ? (
        customView
      ) : (
        <div className={css(styles.dropdownItemText)}>{label}</div>
      )}
    </li>
  );
}

const styles = StyleSheet.create({
  dropdownItem: {
    cursor: "pointer",
    ":hover": {
      background: latitudeColors.grey10,
    },
  },
  dropdownItemText: {
    lineHeight: "32px",
    padding: "0 12px",
    minWidth: "120px",
    whiteSpace: "nowrap",
    textAlign: "start",
  },
  dropdownItemHighlight: {
    background: latitudeColors.grey20,
    ":hover": {
      background: latitudeColors.grey20,
    },
  },
  dropdownItemDisabled: {
    color: latitudeColors.grey40,
    ":hover": {
      background: latitudeColors.white,
    },
    cursor: "default",
  },
});
