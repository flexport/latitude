/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {css} from "aphrodite";
import {type DemoFile, demoCommonStyles} from "../../demoTypes";
import Button from "../../button/Button";
import ConnectedToaster from "../../toast/ConnectedToaster";
import GeneralModalLoader from "../GeneralModalLoader";

import typeof SampleModalType from "./GeneralModalLoaderSampleComponent-demo";

const demos: DemoFile = {
  demos: [
    {
      type: "full",
      example: (elementToCodeFn, demoProps) => (
        <GeneralModalLoaderShim
          elementToCodeFn={elementToCodeFn}
          demoProps={demoProps}
        />
      ),
      knobs: {},
    },
  ],
};

type DemoProps = {};

export class GeneralModalLoaderShim extends React.PureComponent<
  {+elementToCodeFn?: React.Node => void, +demoProps: DemoProps},
  {isOpen: boolean}
> {
  static defaultProps = {disabled: false, isInvalid: false};
  state = {
    isOpen: false,
  };

  handleClose = () => {
    this.setState({isOpen: false});
  };

  handleOpen = () => {
    this.setState({isOpen: true});
  };

  render() {
    const element = (
      <>
        <ConnectedToaster />
        <GeneralModalLoader
          component={
            /* eslint-disable flexport/dynamic-import-webchunkname */
            (() =>
              import(/* webpackChunkName: "GeneralModalLoaderSampleComponent-demo" */ "./GeneralModalLoaderSampleComponent-demo.jsx"): () => Promise<{
              default: SampleModalType,
            }>)
            /* eslint-enable flexport/dynamic-import-webchunkname */
          }
          onClose={this.handleClose}
          title="Create New User"
        >
          {(AddUserModal: SampleModalType) => (
            <AddUserModal
              contact={null}
              isOpen={true}
              onClose={this.handleClose}
            />
          )}
        </GeneralModalLoader>
      </>
    );
    const {elementToCodeFn} = this.props;
    // eslint-disable-next-line no-unused-expressions
    elementToCodeFn &&
      elementToCodeFn(
        <div>
          <div>
            {` <GeneralModalLoader
          component={
            (() =>
              import(/* webpackChunkName: "sample_modal" */ "GeneralModalLoaderSampleComponent.jsx"): () => Promise<{
              default: SampleModalType,
            }>)
          }
          onClose={this.handleClose}
          title="Create New User"
        >
          {(AddUserModal: SampleModalType) => (
            <AddUserModal
              contact={null}
              isOpen={true}
              onClose={this.handleClose}
            />
          )}
        </GeneralModalLoader>`}
          </div>
        </div>
      );
    return (
      <div className={css(demoCommonStyles.smallWrapper)}>
        <Button onClick={this.handleOpen}>Open Modal</Button>
        {this.state.isOpen ? element : null}
      </div>
    );
  }
}

export default demos;
