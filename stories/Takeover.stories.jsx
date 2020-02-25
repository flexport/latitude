/**
 * TEAM: frontend_infra
 *
 * @flow
 */

import * as React from "react";
import {storiesOf} from "@storybook/react";
import sections from "./sections";
import Button from "../button/Button";
import Takeover from "../takeover/Takeover";
import TakeoverLoader from "../takeover/TakeoverLoader";

const stories = storiesOf(sections.takeover, module);
stories.add("basic usage", () => <TakeoverHoist />);

const DemoTakeover = (props: {+onDismiss: () => void}) => (
  <>
    <Takeover.Header title="Demo takeover" onDismiss={props.onDismiss} />
    <Takeover.Body />
  </>
);

class TakeoverHoist extends React.PureComponent<
  *,
  {
    isOpen?: () => Promise<{default: typeof DemoTakeover}>,
  }
> {
  constructor(props: {takeoverContentResponse: string}) {
    super(props);
    this.state = {isOpen: undefined};
  }
  handleOpenTakeover = () => {
    const {takeoverContentResponse} = this.props;
    this.setState({
      isOpen: () =>
        new Promise(resolve => {
          setTimeout(
            () => resolve({default: DemoTakeover}),
            Number.parseInt(takeoverContentResponse, 10)
          );
        }),
    });
  };
  handleCloseTakeover = () => {
    if (this.state.isOpen) {
      this.setState({isOpen: undefined});
    }
  };
  render() {
    return (
      <div>
        <Button onClick={this.handleOpenTakeover}>Open. Dat. Takeover!</Button>
        {this.state.isOpen ? (
          <TakeoverLoader
            title="Demo Takeover"
            onClose={this.handleCloseTakeover}
          >
            <DemoTakeover onDismiss={this.handleCloseTakeover} />
          </TakeoverLoader>
        ) : null}
      </div>
    );
  }
}
