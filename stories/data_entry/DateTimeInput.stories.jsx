/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {storiesOf} from "@storybook/react";
import {withKnobs} from "@storybook/addon-knobs";
import sections from "../sections";
import Group from "../../Group";
import Text from "../../Text";
import Button from "../../button/Button";
import GeneralPopover from "../../popover/GeneralPopover";
import DateTimeInput from "../../date/DateTimeInput";
import {getTextInputKnobs} from "./TextInput.stories";
import PopupWithClickAway from "../../popup/PopupWithClickAway";

const stories = storiesOf(`${sections.dataEntry}/Date Time Input`, module);
stories.addDecorator(withKnobs);
stories.add("DateTimeInput", () => (
  <DateTimeInputHoist {...getTextInputKnobs()} />
));

function DateTimeInputHoist(props: *) {
  const [dateTime, setDateTime] = React.useState({
    calendarDate: null,
    wallTime: null,
  });

  return (
    <Group flexDirection="column">
      <DateTimeInput
        value={dateTime}
        onChange={setDateTime}
        timeZone="UTC"
        {...props}
      />

      <Text>
        Date Time Input should close on click away in the context of a Popover
      </Text>
      <PopupWithClickAway>
        {(Target, Popup, {togglePopup}) => (
          <>
            <Target>
              <Button onClick={() => togglePopup()}>Open Popup</Button>
            </Target>
            <Popup placement="bottom-start">
              <GeneralPopover
                title="Date Time Input"
                subtitle="Clicking away into the body should close dropdowns"
                buttons={[]}
              >
                <DateTimeInput
                  value={dateTime}
                  onChange={setDateTime}
                  timeZone="UTC"
                  {...props}
                />
              </GeneralPopover>
            </Popup>
          </>
        )}
      </PopupWithClickAway>
    </Group>
  );
}
