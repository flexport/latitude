/**
 * TEAM: frontend_infra
 * @deprecated in favor of latitude/DropdownList
 * @flow
 */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import {include, border, margin, padding} from "../styles";
import colors from "../colors";

import Icon, {type IconNames} from "../Icon";

export type DropdownOption = {|
  label: string,
  labelTitle?: string, // appears in bold before the label
  iconName: IconNames | null,
  handleClick: Event => void,
  disabled?: boolean,
|};

type Props = {|
  +options: $ReadOnlyArray<DropdownOption>,
  +setPopupVisible: boolean => void,
  +splitLayout: boolean,
  +selected?: DropdownOption,
|};

function DeprecatedDropdownList({
  options,
  setPopupVisible,
  splitLayout,
  selected,
}: Props) {
  return (
    <div className={css(styles.listContainer)}>
      {options.map(option => {
        const isSelected = option === selected;
        const onClick = evt => {
          option.handleClick(evt);
          setPopupVisible(false);
        };
        return (
          <div
            className={css(
              option.disabled ? styles.listItemDisabled : styles.listItemHover,
              isSelected && styles.selectedBackground
            )}
            key={option.label}
            onMouseDown={option.disabled ? undefined : onClick}
            onClick={option.disabled ? undefined : onClick}
            onKeyPress={option.disabled ? undefined : onClick}
          >
            {option.iconName ? (
              <span className={css(margin.r.m)}>
                {/* $FlowFixMe(ctan) Flow issue from upgrade (1.111.3 => 1.115.0) */}
                <Icon iconName={option.iconName} />
              </span>
            ) : null}
            {option.labelTitle ? (
              <span className={css(styles.labelTitle)}>
                {option.labelTitle}
              </span>
            ) : null}
            <span className={css(splitLayout && styles.floatRight)}>
              {option.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export const styles = StyleSheet.create({
  selectedBackground: {
    backgroundColor: colors.grey20,
  },
  listItemHover: {
    ":hover": {backgroundColor: colors.grey20},
    // $FlowUpgradeFixMe(0.110.1 -> 0.111.1)
    ...include(padding.h.m),
    ...include(padding.v.s),
    cursor: "pointer",
  },
  listItemDisabled: {
    cursor: "not-allowed",
    // $FlowUpgradeFixMe(0.110.1 -> 0.111.1)
    ...include(padding.h.m),
    ...include(padding.v.s),
    color: colors.grey50,
  },
  labelTitle: {
    ...include(margin.r.s),
    fontWeight: 500,
  },
  floatRight: {
    float: "right",
  },
  listContainer: {
    backgroundColor: colors.white,
    // $FlowUpgradeFixMe(0.110.1 -> 0.111.1)
    ...include(padding.v.s),
    maxHeight: 300,
    minWidth: 160,
    overflowY: "auto",
    ...border.a.s,
    ...include(margin.t.xs),
    borderRadius: 3,
    boxShadow: "2px 2px 2px rgba(0,0,0,0.06)",
    "::-webkit-scrollbar": {
      width: 7,
    },
    "::-webkit-scrollbar-thumb": {
      borderRadius: 5,
      backgroundColor: "rgba(0, 0, 0, .5)",
      "-webkit-box-shadow": "0 0 1px rgba(255, 255, 255, .5)",
    },
    scrollbarWidth: "thin", // for Firefox
  },
});

export default DeprecatedDropdownList;
