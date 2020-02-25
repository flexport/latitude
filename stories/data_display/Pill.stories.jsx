/**
 * TEAM: frontend_infra
 *
 * @flow
 */

import * as React from "react";
import {storiesOf} from "@storybook/react";
import {withKnobs, boolean, select, text} from "@storybook/addon-knobs";
import {action} from "@storybook/addon-actions";

import sections from "../sections";

import Pill from "../../Pill";

const stories = storiesOf(`${sections.dataDisplay}/Pill`, module);
stories.addDecorator(withKnobs);

stories.add("Pill", () => {
  const dismissable: boolean = boolean("Close button?", false);

  return (
    <Pill
      size={select("Size", ["xs", "s", "m", "l"], "m")}
      onDismiss={
        dismissable
          ? () => {
              action("dismiss");
            }
          : undefined
      }
      href={text("Link", "")}
    >
      {text("Label", "A Pill")}
    </Pill>
  );
});
