/**
 * TEAM: frontend_infra
 * @flow
 */
/* eslint-disable flexport/dynamic-import-webchunkname */

import React, {type Node, lazy} from "react";
import {css, StyleSheet} from "aphrodite";
import {type DemoFile, number} from "../../demoTypes";
import Tabs, {Tab} from "../Tabs";

const demos: DemoFile = {
  demos: [
    {
      type: "full",
      example: elementToCodeFn => (
        <TabHoist elementToCodeFn={elementToCodeFn} />
      ),
      knobs: {
        delay: number(),
      },
    },
  ],
};
/*
const delay = t => new Promise(resolve => setTimeout(resolve, t));
const slowImport = (p: () => Promise<any>, time: number): Promise<any> =>
  delay(time).then(() => p());
  */

const ElfTab = lazy(() => import(/* webpackChunkName: "ElfTab" */ "./ElfTab"));

const DwarfTab = lazy(() =>
  import(/* webpackChunkName: "DwarfTab" */ "./DwarfTab")
);

const WizardTab = lazy(() =>
  import(/* webpackChunkName: "WizardTab" */ "./WizardTab")
);

class TabHoist extends React.Component<
  {+elementToCodeFn?: Node => void},
  {currentTab: string}
> {
  state = {currentTab: "one"};

  handleTabChange = (tab: string) => {
    this.setState({currentTab: tab});
  };

  render() {
    const {elementToCodeFn} = this.props;

    const element = (
      <Tabs
        onTabChange={this.handleTabChange}
        currentTab={this.state.currentTab}
      >
        <Tab name="Elfs" id="one">
          <ElfTab />
        </Tab>
        <Tab name="Dwarfs" id="two">
          <DwarfTab displayText="Gimli" />
        </Tab>
        <Tab name="Wizards" id="three">
          <WizardTab />
        </Tab>
      </Tabs>
    );
    // eslint-disable-next-line no-unused-expressions
    elementToCodeFn && elementToCodeFn(element);
    return <div className={css(styles.container)}>{element}</div>;
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});

export default demos;
