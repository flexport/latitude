/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow
 */

import * as React from "react";
import {css} from "aphrodite";
import TextInput from "../TextInput";
import Label from "../Label";
import {
  type DemoFile,
  text,
  bool,
  demoCommonStyles,
  list,
  type ListKnob,
  type DemoProps,
} from "../demoTypes";

export const labelWeightKnob: ListKnob<"bold" | "regular"> = list(
  [{value: "bold", label: "bold"}, {value: "regular", label: "regular"}],
  false,
  false,
  undefined,
  "regular"
);

const labelknobs = {
  value: text("Let me tell you about this text input"),
  indicateOptional: bool(false),
  indicateRequired: bool(false),
  typeWeight: labelWeightKnob,
  helpTooltip: text("I'm a tool tip!"),
  isInvalid: bool(false),
};

const demos: DemoFile = {
  demos: [
    {
      type: "full",
      example: (elementToCodeFn, demoProps) => (
        <InputShim elementToCodeFn={elementToCodeFn} demoProps={demoProps} />
      ),
      knobs: labelknobs,
    },
  ],
};

export class InputShim extends React.PureComponent<
  {
    +elementToCodeFn?: React.Node => void,
    +demoProps: DemoProps<typeof labelknobs>,
  },
  {value: string}
> {
  static defaultProps = {disabled: false, isInvalid: false};
  state = {
    // eslint-disable-next-line react/no-unused-state
    value: "",
  };

  handleChange = (value: string) => {
    // eslint-disable-next-line react/no-unused-state
    this.setState({value});
  };

  render() {
    const {elementToCodeFn, demoProps} = this.props;
    const {
      indicateOptional: _indicateOptional,
      indicateRequired,
      isInvalid,
      ...otherDemoProps
    } = demoProps;
    // we'd like to prevent errors being generated from this frontend,
    // and there is an invariant forcing optional and required to both not
    // be true
    const indicateOptional = !indicateRequired && _indicateOptional;

    const element = (
      <Label
        {...otherDemoProps}
        indicateRequired={indicateRequired}
        indicateOptional={indicateOptional}
      >
        <TextInput
          value=""
          onChange={this.handleChange}
          isInvalid={isInvalid}
        />
      </Label>
    );
    // eslint-disable-next-line no-unused-expressions
    elementToCodeFn && elementToCodeFn(element);
    return <div className={css(demoCommonStyles.smallWrapper)}>{element}</div>;
  }
}

export default demos;
