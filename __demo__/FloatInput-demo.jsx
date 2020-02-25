/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow
 */

import * as React from "react";
import {css} from "aphrodite";
import {
  type DemoFile,
  text,
  bool,
  textAlignKnob,
  demoCommonStyles,
  textInputSizeKnob,
} from "../demoTypes";
import FloatInput from "../FloatInput";

const demos: DemoFile = {
  demos: [
    {
      type: "full",
      example: (elementToCodeFn, demoProps) => (
        <InputShim elementToCodeFn={elementToCodeFn} demoProps={demoProps} />
      ),
      knobs: {
        disabled: bool(false),
        size: textInputSizeKnob,
        isInvalid: bool(false),
        textAlign: textAlignKnob,
        placeholder: text(),
      },
    },
  ],
};

export class InputShim extends React.PureComponent<
  {+elementToCodeFn?: React.Node => void, +demoProps?: any},
  {value: number | null}
> {
  state = {
    value: null,
  };

  handleChange = (value: ?number) => {
    this.setState({value});
  };

  render() {
    const {elementToCodeFn, demoProps} = this.props;
    const element = (
      <FloatInput
        {...demoProps}
        value={this.state.value}
        onChange={this.handleChange}
      />
    );
    // eslint-disable-next-line no-unused-expressions
    elementToCodeFn && elementToCodeFn(element);
    return <div className={css(demoCommonStyles.smallWrapper)}>{element}</div>;
  }
}

export default demos;
