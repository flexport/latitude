/**
 * TEAM: frontend_infra
 * WATCHERS: uforic
 *
 * @flow
 */

import * as React from "react";
import {storiesOf} from "@storybook/react";
import sections from "../sections";
import Label from "../../Label";
import TextInput from "../../TextInput";
import HelpTooltip from "../../HelpTooltip";
import DeprecatedVerticalGroup from "../../DeprecatedVerticalGroup";

const stories = storiesOf(`${sections.dataEntry}/Label`, module);
stories.add("basic usage", () => (
  <DeprecatedVerticalGroup>
    <div>
      <Label value="Label without help tooltip">
        <TextInput onChange={() => {}} value="Input value 1" />
      </Label>
    </div>

    <div>
      <Label
        helpTooltip="Help tooltip text"
        value="Label with help tooltip text"
      >
        <TextInput onChange={() => {}} value="Input value 2" />
      </Label>
    </div>

    <div>
      <Label
        helpTooltip={
          <HelpTooltip
            text="Custom help tooltip"
            size="s"
            iconName="knowledge"
            iconColor="grey40"
          />
        }
        value="Label with custom help tooltip"
      >
        <TextInput onChange={() => {}} value="Input value 3" />
      </Label>
    </div>
  </DeprecatedVerticalGroup>
));
