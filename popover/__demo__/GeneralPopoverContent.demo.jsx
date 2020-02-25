/**
 * TEAM: frontend_infra
 *
 * @flow
 */

import * as React from "react";

import GeneralPopover from "../GeneralPopover";
import Button from "../../button/Button";

/**
 * @title Standard Popover Content
 * @description A popover consists of a title, subtitle, body, and an array of action buttons.
 */
export default function GeneralPopoverContent() {
  return (
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
}
