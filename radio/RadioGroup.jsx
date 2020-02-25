/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import {uniqueId} from "lodash";
import Radio from "./Radio";
import {type Size} from "../sizes";
import {LabelContext} from "../Label";

export type OptionObject<+T> = {|
  +label: string | React.Node,
  +value: T,
  +disabled?: boolean,
|};

type Props<T> = {|
  // TODO(zach): This type isn't technically correct, the | should move outward
  /** we support an array of strings OR type OptionObject */
  +options: $ReadOnlyArray<OptionObject<T> | string>,
  /** the selected value */
  +value: ?T,
  +onChange: (newValue: T) => void,
  /** moves from a vertical orientation to horizontal */
  +isInline?: boolean,
  /** the size of the radio buttons */
  +size?: Size,
  +disabled?: boolean,
  /** this is only here for type-safety, and has no actual effect */
  +isInvalid?: boolean,
  /** this is only here for type-safety, and has no actual effect */
  +onBlur?: () => void,
  /** specify this if the values you are providing are not strings. you need to provide a function that takes an object of type K and generates strings so we can dedupe / tell what's selected */
  +toKeyFn?: (value: ?T | string) => string,
|};

/**
 * @short RadioGroup collects a single option from an array of many options from the user.
 * @brandStatus V2
 * @status Stable
 * @category Data Entry
 */
export default function RadioGroup<T>({
  options,
  value,
  onChange,
  isInline = true,
  size = "m",
  disabled = false,
  isInvalid = false,
  toKeyFn = value => String(JSON.stringify(value)),
}: Props<T>) {
  const labelContext = React.useContext(LabelContext);
  const name = React.useRef(uniqueId("radiogroup_")).current;

  const optionObjects = options.map(option => {
    if (typeof option === "string") {
      return {
        label: option,
        value: option,
        disabled: false,
      };
    }

    return option;
  });

  const handleFocus = () => {
    if (labelContext.labelOnFocus) {
      labelContext.labelOnFocus();
    }
  };

  const handleBlur = () => {
    if (labelContext.labelOnBlur) {
      labelContext.labelOnBlur();
    }
  };

  return (
    <div
      className={css(styles.container, isInline && styles.containerInline)}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={disabled ? -1 : undefined}
    >
      {optionObjects.map(option => {
        const {label, value: optionValue, disabled: optionDisabled} = option;

        return (
          <Radio
            name={name}
            value={optionValue}
            key={`${name}-${toKeyFn(optionValue)}`}
            disabled={disabled || optionDisabled}
            checked={value === optionValue}
            /*
             * $FlowFixMe(dirak): Flow doesn't support conditional generics.
             * This FlowFixMe is necessary for generic T to be unconstrained.
             */
            onChange={onChange}
            label={label}
            size={size}
            isInvalid={isInvalid}
          />
        );
      })}
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexFlow: "column wrap",
    ":focus": {
      outline: "none",
    },
  },
  containerInline: {
    flexFlow: "row wrap",
  },
});
