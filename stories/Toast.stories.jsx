/**
 * TEAM: frontend_infra
 * WATCHERS: FermiDirak
 *
 * @flow
 */

import * as React from "react";
import {storiesOf} from "@storybook/react";
import {withKnobs, select, text} from "@storybook/addon-knobs";
import sections from "./sections";

import ConnectedToaster from "../toast/ConnectedToaster";
import ToastActions from "../toast/ToastActions";
import Toast from "../toast/Toast";

import DeprecatedVerticalGroup from "../DeprecatedVerticalGroup";
import Button from "../button/Button";

const intents = ["none", "success", "danger"];

const stories = storiesOf(sections.toast, module);
stories.addDecorator(withKnobs);

stories.add("Toast", () => {
  const props = knobs();
  const {intent, message} = props;
  /** creates a toast action */
  const createToast = () => {
    ToastActions.show({
      message,
      intent,
    });
  };

  return (
    <div>
      <ConnectedToaster />

      <DeprecatedVerticalGroup spacing="l">
        <Toast intent={intent} message={message} />
        <Button onClick={createToast} width="full">
          Launch toast
        </Button>
      </DeprecatedVerticalGroup>
    </div>
  );
});

const knobs = () => ({
  intent: select("Intent", intents, intents[0]),
  message: text("Message", "FLEX 124263 has been created"),
});
