/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {type DemoFile, bool} from "../../demoTypes";

import TabHeader from "../TabHeader";
import Button from "../../button/Button";

type State = {|
  active: string,
|};

type Props = {|
  +components: boolean,
  +centerTabs: boolean,
  +elementToCodeFn: React.Node => void,
|};

const tabs = [
  {name: "Indian Food", id: "Indian"},
  {name: "Mexican Food", id: "Mexican"},
  {name: "Japanese Food", id: "Japanese"},
];

class HeaderHoist extends React.Component<Props, State> {
  state = {active: "Indian"};

  static defaultProps = {
    components: false,
    centerTabs: false,
  };

  handleTabChange = (input: string) => {
    this.setState({active: input});
  };

  render() {
    let element;
    if (this.props.components) {
      element = (
        <TabHeader
          onTabChange={this.handleTabChange}
          activeTab={this.state.active}
          tabs={tabs}
          components={<Button intent="none" kind="hollow" label="Cancel" />}
          centerTabs={this.props.centerTabs}
        />
      );
    } else {
      element = (
        <TabHeader
          onTabChange={this.handleTabChange}
          activeTab={this.state.active}
          tabs={tabs}
          centerTabs={this.props.centerTabs}
        />
      );
    }
    const {elementToCodeFn} = this.props;
    if (elementToCodeFn) {
      elementToCodeFn(element);
    }
    return element;
  }
}

const demos: DemoFile = {
  demos: [
    {
      type: "full",
      example: (fn, demoProps) => (
        <HeaderHoist {...demoProps} elementToCodeFn={fn} />
      ),
      knobs: {
        components: bool(false),
        centerTabs: bool(false),
      },
    },
  ],
};

export default demos;
