/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {css} from "aphrodite";
import {type DemoFile, demoCommonStyles} from "../../demoTypes";
import Button from "../../button/Button";
import Takeover from "../Takeover";
import TakeoverLoader from "../TakeoverLoader";

const demos: DemoFile = {
  demos: [
    {
      type: "full",
      example: (elementToCodeFn, demoProps) => (
        <TakeoverShim elementToCodeFn={elementToCodeFn} demoProps={demoProps} />
      ),
      knobs: {},
    },
  ],
};

const DemoTakeover = (props: {+onDismiss: () => void}) => (
  <>
    <Takeover.Header title="Demo takeover" onDismiss={props.onDismiss} />
    <Takeover.Body />
  </>
);

DemoTakeover.displayName = "TakeoverComponent";

type DemoProps = {header: string};

export class TakeoverShim extends React.PureComponent<
  {+elementToCodeFn?: React.Node => void, +demoProps: DemoProps},
  {
    isOpen?: () => Promise<{default: typeof DemoTakeover}>,
  }
> {
  state = {
    isOpen: undefined,
  };

  handleOpenTakeover = () => {
    this.setState({
      isOpen: () =>
        new Promise(resolve => {
          setTimeout(() => resolve({default: DemoTakeover}), 100);
        }),
    });
  };
  handleCloseTakeover = () => {
    if (this.state.isOpen) {
      this.setState({isOpen: undefined});
    }
  };

  render() {
    const takeoverElement = (
      <TakeoverLoader title="Demo Takeover" onClose={this.handleCloseTakeover}>
        <DemoTakeover onDismiss={this.handleCloseTakeover} />
      </TakeoverLoader>
    );
    const writtenElement = (
      <div>
        <span>{`const TakeoverComponent = React.lazy(() => import( /* webpackChunkName: "path_to_component_Takeover" */ "path/to/component/Takeover"))`}</span>
        {takeoverElement}
      </div>
    );
    // eslint-disable-next-line prefer-destructuring
    const elementToCodeFn = this.props.elementToCodeFn;
    // eslint-disable-next-line no-unused-expressions
    elementToCodeFn && elementToCodeFn(writtenElement);
    return (
      <div className={css(demoCommonStyles.smallWrapper)}>
        <Button onClick={this.handleOpenTakeover}>Open. Dat. Takeover!</Button>
        {this.state.isOpen ? takeoverElement : null}
      </div>
    );
  }
}

export default demos;
