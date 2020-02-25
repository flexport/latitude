/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow
 */

import * as React from "react";
import {css} from "aphrodite";
import TextareaInput from "../TextareaInput";
import {
  type DemoFile,
  text,
  bool,
  textAlignKnob,
  demoCommonStyles,
  textInputSizeKnob,
  type DemoProps,
  number,
} from "../demoTypes";
import TextareaInputRows from "./TextareaInputRows.demo";

const knobs = {
  disabled: bool(false),
  readOnly: bool(false),
  size: textInputSizeKnob,
  isInvalid: bool(false),
  textAlign: textAlignKnob,
  placeholder: text(),
  minRows: number(2),
  maxRows: number(10),
};

const demos: DemoFile = {
  demos: [
    {
      type: "full",
      example: (elementToCodeFn, demoProps) => (
        <InputShim elementToCodeFn={elementToCodeFn} demoProps={demoProps} />
      ),
      knobs,
    },
    {
      type: "live",
      fullWidth: true,
      example: TextareaInputRows,
    },
  ],
};

class InputShim extends React.PureComponent<
  {+elementToCodeFn?: React.Node => void, +demoProps: DemoProps<typeof knobs>},
  {value: string}
> {
  state = {
    value: "",
  };

  handleChange = (value: string) => {
    this.setState({value});
  };

  render() {
    const {elementToCodeFn, demoProps} = this.props;
    const {minRows, maxRows, ...otherDemoProps} = demoProps;
    const element = (
      <TextareaInput
        {...otherDemoProps}
        value={this.state.value}
        onChange={this.handleChange}
        rows={{
          min: minRows || 2,
          max: maxRows || 10,
        }}
      />
    );
    // eslint-disable-next-line no-unused-expressions
    elementToCodeFn && elementToCodeFn(element);
    return <div className={css(demoCommonStyles.smallWrapper)}>{element}</div>;
  }
}

export default demos;
