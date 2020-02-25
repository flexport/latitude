/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {storiesOf} from "@storybook/react";
import {withKnobs, select, boolean} from "@storybook/addon-knobs";
import sections from "../sections";
import {ThemeProvider} from "../../context/ThemeNameContext";
import Group from "../../Group";
import Text from "../../Text";
import Button from "../../button/Button";
import useLoadingManager from "../../button/useLoadingManager";
import IconButton from "../../button/IconButton";

storiesOf(`${sections.buttons}`, module)
  .addDecorator(withKnobs)
  .add("Loading Buttons", () => {
    const disabled = boolean("Disabled", false);
    const size = select("Size", ["s", "m", "l"], "m");

    return (
      <ThemeProvider theme={select("Theme", ["Base", "Transmission"], "Base")}>
        <Group flexDirection="column">
          <Text scale="headline">Loading Buttons</Text>

          <Button
            intent="basic"
            kind="solid"
            disabled={disabled}
            isLoading={false}
          >
            your average plain old button
          </Button>

          <Button
            intent="basic"
            kind="solid"
            disabled={disabled}
            isLoading={true}
          >
            You cannot read this
          </Button>

          <Group>
            <Group flexDirection="column">
              <LoadingButtonHoist intent="basic" kind="blank" size={size} />
              <LoadingButtonHoist intent="basic" kind="hollow" size={size} />
              <LoadingButtonHoist intent="basic" kind="bare" size={size} />
            </Group>
            <Group flexDirection="column">
              <LoadingButtonHoist intent="danger" kind="blank" size={size} />
              <LoadingButtonHoist intent="danger" kind="hollow" size={size} />
              <LoadingButtonHoist intent="danger" kind="bare" size={size} />
            </Group>
            <Group flexDirection="column">
              <LoadingButtonHoist intent="none" kind="hollow" size={size} />
              <LoadingButtonHoist intent="none" kind="bare" size={size} />
            </Group>
          </Group>
        </Group>
      </ThemeProvider>
    );
  });

function sleep(ms: number) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve();
      } else {
        reject(new Error("A Random Error"));
      }
    }, ms)
  );
}

function LoadingButtonHoist(props: *) {
  const {loadingState, onBeginLoading, onSuccess, onFail} = useLoadingManager();

  const networkRequest = () => {
    onBeginLoading();
    sleep(1000)
      .then(() => {
        onSuccess();
      })
      .catch(() => {
        onFail();
      });
  };

  return (
    <Group flexDirection="column">
      <Button isLoading={loadingState} onClick={networkRequest} {...props}>
        Submit
      </Button>

      <IconButton
        type="button"
        iconName="ship"
        label="Submit"
        kind={props.kind}
        isLoading={loadingState}
        onClick={networkRequest}
        {...props}
      />
    </Group>
  );
}
