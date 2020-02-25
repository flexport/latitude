/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {type DemoFile, bool} from "../demoTypes";
import DropdownWithIcon from "./DropdownButton/DropdownWithIcon.demo";
import DropdownWithEllipsis from "./DropdownButton/DropdownWithEllipsis.demo";
import DropdownButton from "../DropdownButton";
import ToggleButton from "../base_candidate/button/ToggleButton";

const demos: DemoFile = {
  demos: [
    {
      type: "full",
      example: (elementToCodeFn, demoProps) => (
        <DropdownButtonShim
          elementToCodeFn={elementToCodeFn}
          demoProps={demoProps}
        />
      ),
      knobs: {
        disabled: bool(false),
        menuAlignRight: bool(false),
      },
    },
    {
      type: "live",
      example: DropdownWithEllipsis,
    },
    {
      type: "live",
      example: DropdownWithIcon,
    },
  ],
};

export class DropdownButtonShim extends React.PureComponent<{
  +elementToCodeFn?: React.Node => void,
  +demoProps: any,
}> {
  render() {
    const element = (
      <DropdownButton
        button={<ToggleButton label="Toggle me" />}
        disabled={this.props.demoProps.disabled}
        menuAlignRight={this.props.demoProps.menuAlignRight}
        options={[
          {label: "test", handleClick: () => {}, iconName: "cancel"},
          {
            label: "Second test",
            labelTitle: "Title:",
            handleClick: () => {},
            iconName: "satellite",
          },
        ]}
      />
    );
    // eslint-disable-next-line prefer-destructuring
    const elementToCodeFn = this.props.elementToCodeFn;
    // eslint-disable-next-line no-unused-expressions
    elementToCodeFn && elementToCodeFn(element);
    return element;
  }
}

export default demos;
