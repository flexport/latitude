/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import RadioGroup from "./RadioGroup";
import {type Size} from "../sizes";
import {commonT as t} from "../config/I18n";

type Props = {
  +value: boolean | null | void,
  +onChange: boolean => void,
  +size?: Size,
  +isInline?: boolean,
  +options: [string, string],
  +disabled?: boolean,
};

export default class BooleanRadioGroup extends React.PureComponent<Props> {
  static defaultProps: $Shape<Props> = {
    options: [t("Yes"), t("No")],
  };

  handleChange = (value: string) => {
    this.props.onChange(value === this.props.options[0]);
  };

  render() {
    const {value, options, size, isInline, disabled} = this.props;
    return (
      <RadioGroup
        // eslint-disable-next-line no-nested-ternary
        value={value == null ? undefined : value ? options[0] : options[1]}
        onChange={this.handleChange}
        options={options}
        size={size}
        isInline={isInline}
        disabled={disabled}
      />
    );
  }
}
