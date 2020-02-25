/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow
 */

import * as React from "react";
import {css} from "aphrodite";
import TextInput from "../TextInput";
import InputError from "../InputError";
import {type DemoFile, text, bool, demoCommonStyles} from "../demoTypes";
import invariant from "../tools/invariant";

const demos: DemoFile = {
  demos: [
    {
      type: "full",
      example: (elementToCodeFn, demoProps) => (
        <InputShim elementToCodeFn={elementToCodeFn} demoProps={demoProps} />
      ),
      knobs: {
        errorText: text("The value is incorrect."),
        showError: bool(true),
      },
    },
  ],
};

export class InputShim extends React.PureComponent<
  {+elementToCodeFn?: React.Node => void, +demoProps?: any},
  {value: string}
> {
  state = {
    value: "Incorrect value.",
  };

  handleChange = (value: string) => {
    this.setState({value});
  };

  render() {
    const {elementToCodeFn, demoProps} = this.props;
    invariant(demoProps !== undefined);
    const element = (
      <InputError {...demoProps}>
        <TextInput
          value={this.state.value}
          onChange={this.handleChange}
          isInvalid={demoProps.showError}
        />
      </InputError>
    );
    // eslint-disable-next-line no-unused-expressions
    elementToCodeFn && elementToCodeFn(element);
    return <div className={css(demoCommonStyles.smallWrapper)}>{element}</div>;
  }
}

export default demos;
