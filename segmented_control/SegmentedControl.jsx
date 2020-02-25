/**
 * TEAM: frontend_infra
 *
 * @flow
 */

import * as React from "react";
import {uniqueId} from "lodash";
import {StyleSheet, css} from "aphrodite";
import {whitespaceSizeConstants} from "../styles/whitespace";
import colors from "../colors";
import SegmentedControlButton from "./SegmentedControlButton";
import Group from "../Group";
import Highlighter from "../Highlighter";

export type Option = {|
  +label: string,
  +value: string,
  +disabled?: boolean,
|};

export type SegmentedControlProps = {|
  /** selectable options represented either as a string or Option */
  +options: $ReadOnlyArray<Option | string>,
  /** value of the currently selected option from 'options' */
  +value: ?string,
  /** invoked when selected option changes, value of new selected option is passed  */
  +onChange: (newValue: string) => void,
  /** the gap between options (0, 1, 2, 4n) */
  +gap?: number,
  /** provides an even distribution of option widths, see 'Group' component */
  +fillChildren?: boolean,
  /** the height of each of each option button */
  +size: "xs" | "s" | "m" | "l",
  /** determines if the entire component is disabled  */
  +disabled?: boolean,
  /** determines if the entire component is invalid */
  +isInvalid?: boolean,
|};

/**
 * @short SegmentedControl presents a group of buttons where only one can be selected at a time
 * @brandStatus V3
 * @status Stable
 * @category Navigation */
export default function SegmentedControl({
  options,
  value,
  onChange,
  gap = 0,
  size = "xs",
  disabled = false,
  isInvalid = false,
  fillChildren = false,
}: SegmentedControlProps) {
  const id = React.useRef(uniqueId("segmentedcontrol")).current; // links child radio inputs into a group
  const showSlidingHighlighter = gap === 0;
  const highlighterSelectionRef = React.createRef();
  const content = (
    <Group gap={gap} fillChildren={fillChildren}>
      {options.map((option, index) => {
        const optionItem =
          typeof option === "string"
            ? {label: option, value: option, disabled: false}
            : option;
        let optionType = "independent";

        if (gap === 0) {
          if (index === 0) {
            optionType = "first";
          } else if (index === options.length - 1) {
            optionType = "last";
          } else {
            optionType = "middle";
          }
        }
        return (
          <SegmentedControlButton
            key={optionItem.value}
            parentId={id}
            label={optionItem.label}
            value={optionItem.value}
            disableSelectionHighlightEffect={true}
            disabled={disabled || optionItem.disabled}
            size={size}
            selected={value === optionItem.value}
            onChange={() => onChange(optionItem.value)}
            type={optionType}
            ref={
              showSlidingHighlighter && value === optionItem.value
                ? highlighterSelectionRef
                : null
            }
          />
        );
      })}
    </Group>
  );

  return (
    <div className={css(isInvalid && styles.invalid)}>
      {showSlidingHighlighter ? (
        <Highlighter color="grey20" selectionRef={highlighterSelectionRef}>
          {content}
        </Highlighter>
      ) : (
        content
      )}
    </div>
  );
}

const styles = StyleSheet.create({
  invalid: {
    padding: whitespaceSizeConstants.xs,
    border: `1px solid ${colors.red40}`,
    borderRadius: "3px",
  },
});
