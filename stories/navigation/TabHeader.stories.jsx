/**
 * TEAM: frontend_infra
 *
 * @flow
 */
/* eslint-disable flexport/dynamic-import-webchunkname */

import * as React from "react";
import {storiesOf} from "@storybook/react";
import {boolean, withKnobs} from "@storybook/addon-knobs";
import sections from "../sections";
import TabHeader from "../../tabs/TabHeader";
import Tabs, {Tab} from "../../tabs/Tabs";
import Button from "../../button/Button";

type State = {|
  active: string,
|};

type Props = {|
  +enableButton: boolean,
|};

const tabs = [
  {name: "Indian", id: "Indian"},
  {name: "Mexican", id: "Mexican", status: "complete"},
  {name: "Japanese", id: "Japanese"},
];

class HeaderHoist extends React.Component<Props, State> {
  state = {active: "Indian"};

  static defaultProps = {
    enableButton: false,
  };

  handleTabChange = (input: string) => {
    this.setState({active: input});
  };

  render() {
    if (this.props.enableButton) {
      return (
        <div style={{width: 800}}>
          <TabHeader
            onTabChange={this.handleTabChange}
            activeTab={this.state.active}
            tabs={tabs}
            components={<Button intent="none" kind="hollow" label="Cancel" />}
          />
        </div>
      );
    }
    return (
      <div style={{width: 800}}>
        <TabHeader
          onTabChange={this.handleTabChange}
          activeTab={this.state.active}
          tabs={tabs}
        />
      </div>
    );
  }
}

const Tab1 = React.lazy(() =>
  import(/* webpackChunkName "Stories_tab1" */ "./Tab1")
);
const Tab2 = React.lazy(() =>
  import(/* wepbpackChunkName "Stories_tab2" */ "./Tab2")
);
const Tab3 = React.lazy(() =>
  import(/* wepbpackChunkName "Stories_tab3" */ "./Tab3")
);

class TabHoist extends React.Component<{}, {currentTab: string}> {
  state = {currentTab: "one"};

  handleTabChange = (tab: string) => {
    this.setState({currentTab: tab});
  };

  render() {
    return (
      <div style={{width: 500, minHeight: 500}}>
        <Tabs
          onTabChange={this.handleTabChange}
          currentTab={this.state.currentTab}
        >
          <Tab name="Elfs" id="one">
            <Tab1 displayText="Gimly" />
          </Tab>
          <Tab name="Hobbits" id="two">
            <Tab2 />
          </Tab>
          <Tab name="Wizards" id="three">
            <Tab3 />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

const getKnobs = () => ({
  enableRightButton: boolean("enableRightButton", false),
});

const stories = storiesOf(`${sections.navigation}/TabHeader`, module);
stories.addDecorator(withKnobs);

stories.add("basic-tab-header", () => {
  const {enableRightButton} = getKnobs();
  return <HeaderHoist enableButton={enableRightButton} />;
});

stories.add("tabs", () => <TabHoist />);
