/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {css, StyleSheet} from "aphrodite";
import invariant from "../tools/invariant";
import Loader from "../Loader";

import TabHeader, {type Status} from "./TabHeader";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
  },
});

type TabProps = {|
  /** name is the tab name that is displayed in the header */
  +name: string,
  /** id is uniquely identifies a tab. is passed back in the callback onTabChange callback */
  +id: string,
  /** as contains the import(...) that loads the tab component */
  +children: React.Node,
  /** status of tab */
  +status?: ?Status,
|};

export const Tab = (_: TabProps) => null;

type Props = {|
  // +the current tab to be displayed, this should be maintained in state of
  /** the component mounting Tab */
  +currentTab: string,
  /** onTabChange is called with the ID when the user navigates to a tab */
  +onTabChange: string => void,
  /** a button displayed on the right side, optional */
  +components?: React.Node,
  /** children are <Tab /> components only. See TabProps for the Props required by <Tab /> */
  +children: React.ChildrenArray<?React.Element<typeof Tab>>,
|};

type State = {|
  currentTab: string,
  prevTab: string | null,
|};

type TimeLoaderProps = {|
  +spinnerAfterMs: number,
  +children: React.Node,
|};

type TimedLoaderState = {|
  showSpinner: boolean,
|};

class TimedLoader extends React.PureComponent<
  TimeLoaderProps,
  TimedLoaderState
> {
  constructor(props: TimeLoaderProps) {
    super(props);
    this.state = {showSpinner: false};
  }

  timeoutRef: TimeoutID | null = null;

  componentDidMount() {
    this.timeoutRef = setTimeout(
      () => this.setState({showSpinner: true}),
      this.props.spinnerAfterMs
    );
  }

  componentWillUnmount() {
    if (this.timeoutRef) {
      clearTimeout(this.timeoutRef);
    }
  }

  render() {
    if (this.state.showSpinner) {
      return <Loader isFullWidth={true} loaded={false} />;
    }
    return this.props.children;
  }
}

/**
 * @short Tab navigation component that loads code asynchronously
 * @brandStatus V2
 * @status In Review
 * @category Navigation
 *
 * The wrapper component should maintain the currentTab and pass it as a prop
 * to this component. This component does not manage the state.
 * This is an uncontrolled component i.e. you cannot change the tablist after
 * it has been rendered. If you need to do that, please set a key on `Tabs`
 * and change it when your tab-list changes.
 * It is recommended to set a minHeight greater than all your tabs in the
 * wrapper component to prevent a jarring grow.
 * @extends React.Component */
class Tabs extends React.PureComponent<Props, State> {
  tabs: $ReadOnlyArray<{|id: string, name: string|}> = [];

  constructor(props: Props) {
    super(props);
    this.state = {
      prevTab: null,
      currentTab: props.currentTab,
    };
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    // If the user has changed the currentTab in props,
    // if it is different than the current tab, we need to put it in nextTab in our state

    if (props.currentTab === state.currentTab) {
      return null;
    }
    return {currentTab: props.currentTab, prevTab: state.currentTab};
  }

  render() {
    const {currentTab, prevTab} = this.state;
    const {components, onTabChange} = this.props;

    const tabs = React.Children.toArray(this.props.children)
      .filter(Boolean)
      .map(child => ({
        id: child.props.id,
        name: child.props.name,
        component: child.props.children,
        status: child.props.status,
      }));

    const tabsForHeader = tabs.map(t => ({
      id: t.id,
      name: t.name,
      status: t.status,
    }));

    const prevTabDetails = tabs.find(tab => tab.id === this.state.prevTab);
    const currentTabDetails = tabs.find(
      tab => tab.id === this.state.currentTab
    );
    invariant(currentTabDetails, `cannot find tab with id ${currentTab}`);

    let fallbackComponent = null;
    if (prevTabDetails && prevTab) {
      fallbackComponent = (
        <TimedLoader spinnerAfterMs={500}>
          {prevTabDetails.component}
        </TimedLoader>
      );
    }

    return (
      <div className={css(styles.container)}>
        <TabHeader
          tabs={tabsForHeader}
          activeTab={this.state.currentTab}
          onTabChange={onTabChange}
          components={components}
        />
        <React.Suspense fallback={<Loader isFullWidth={true} loaded={false} />}>
          <React.Suspense fallback={fallbackComponent}>
            {currentTabDetails.component}
          </React.Suspense>
        </React.Suspense>
      </div>
    );
  }
}
export default Tabs;
