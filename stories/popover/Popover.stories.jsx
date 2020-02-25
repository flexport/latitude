/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {storiesOf} from "@storybook/react";
import sections from "../sections";

import DeprecatedVerticalGroup from "../../DeprecatedVerticalGroup";
import CustomPopover from "../../popover/CustomPopover";
import GeneralPopover from "../../popover/GeneralPopover";
import Button from "../../button/Button";
import PopupWithClickAway from "../../popup/PopupWithClickAway";

const stories = storiesOf(sections.popover, module);

const generalPopover = (
  <GeneralPopover
    title="Popover"
    subtitle="This is a popover"
    buttons={[
      <Button kind="bare" intent="none" key={1}>
        Cancel
      </Button>,
      <Button kind="bare" intent="basic" key={2}>
        Submit
      </Button>,
    ]}
  >
    Verified Gross Mass (VGM) rail transpacific east bound shipment less than
    container load.
  </GeneralPopover>
);

stories.add("Popovers", () => (
  <DeprecatedVerticalGroup>
    <CustomPopover>Custom content</CustomPopover>

    {generalPopover}

    <PopupWithClickAway>
      {(Target, Popup, {openPopup, isOpen, closePopup}) => (
        <>
          <Target>
            <Button onClick={!isOpen ? openPopup : closePopup}>Click me</Button>
          </Target>
          <Popup placement="bottom">{generalPopover}</Popup>
        </>
      )}
    </PopupWithClickAway>
  </DeprecatedVerticalGroup>
));
