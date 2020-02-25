/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {storiesOf} from "@storybook/react";
import {withKnobs} from "@storybook/addon-knobs";
import sections from "../sections";
import Group from "../../Group";
import MultiInput from "../../MultiInput";
import Label from "../../Label";

const stories = storiesOf(`${sections.dataEntry}/Multi Input`, module);
stories.addDecorator(withKnobs);
stories.add("Multi Input", () => {
  const [texts, setTexts] = React.useState([
    "first pill",
    "another pill",
    "one more pill",
    "another another",
    "more pill",
  ]);

  return (
    <Group flexDirection="column">
      <div style={{width: "400px"}}>
        <Label value="MultiInput">
          <MultiInput
            value={texts}
            onChange={setTexts}
            placeholder="you can type whatever here"
          />
        </Label>
      </div>
      <div style={{width: "400px"}}>
        <Label value="MultiInput small">
          <MultiInput
            value={texts}
            onChange={setTexts}
            size="s"
            placeholder="you can type whatever here"
          />
        </Label>
      </div>
      <div style={{width: "400px"}}>
        <Label value="MultiInput large">
          <MultiInput
            value={texts}
            onChange={setTexts}
            size="l"
            placeholder="you can type whatever here"
          />
        </Label>
      </div>
    </Group>
  );
});
