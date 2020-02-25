/**
 * TEAM: frontend_infra
 */

/* eslint-disable flowtype/require-valid-file-annotation,react/jsx-filename-extension */

import React from "react";
import {action} from "@storybook/addon-actions";
import {Button} from "@storybook/react/demo";

export default {
  title: "Button",
};

export const text = () => (
  <Button onClick={action("clicked")}>Hello Button</Button>
);

export const emoji = () => (
  <Button onClick={action("clicked")}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);
