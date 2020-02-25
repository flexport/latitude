/**
 * TEAM: frontend_infra
 * WATCHERS: uforic
 *
 * @flow
 */

import * as React from "react";
import {storiesOf} from "@storybook/react";
import {boolean, withKnobs} from "@storybook/addon-knobs";
import sections from "../sections";
import TimeInput, {getTimeIntervals} from "../../date/TimeInput";

import {
  ZERO_OCLOCK,
  EOD_OCLOCK,
  type WallTime,
  wallTime,
} from "../../date/wallTime";
import {getTextInputKnobs} from "./TextInput.stories";

const stories = storiesOf(`${sections.dataEntry}/Time Input`, module);
stories.addDecorator(withKnobs);
stories.add("basic usage", () => (
  <TimeInputHoist {...getTextInputKnobs()} {...getTimeInputKnobs()} />
));

const getTimeInputKnobs = () => ({
  militaryTime: boolean("militaryTime", false),
});

// eslint-disable-next-line import/prefer-default-export
export function TimeInputHoist(props: *) {
  const [value, setValue] = React.useState(wallTime("00:00:00.000"));

  return (
    <div>
      <TimeInput
        value={value}
        onChange={(wallTime: WallTime | null) => {
          setValue(wallTime);
        }}
        options={getTimeIntervals(ZERO_OCLOCK, EOD_OCLOCK, 60)}
        {...props}
      />
    </div>
  );
}
