/**
 * TEAM: frontend_infra
 *
 * @flow
 */

import * as React from "react";

import GeneralPopover from "../GeneralPopover";
import Button from "../../button/Button";
import PopupWithClickAway from "../../popup/PopupWithClickAway";

/**
 * @title Example Popover Implementation
 * @description Popovers are triggered by buttons and give additional information or quick access to short forms.
 */
export default function GeneralPopoverImplementation() {
  return (
    <div style={{display: "flex", justifyContent: "start"}}>
      <PopupWithClickAway>
        {(Target, Popup, {openPopup, closePopup, isOpen}) => (
          <>
            <Target>
              <Button onClick={!isOpen ? openPopup : closePopup}>
                Click me
              </Button>
            </Target>
            <Popup placement="bottom-start">
              <GeneralPopover
                title="Popover"
                subtitle="This is a popover"
                buttons={[
                  <Button
                    kind="bare"
                    intent="none"
                    key={1}
                    onClick={closePopup}
                  >
                    Cancel
                  </Button>,
                  <Button
                    kind="bare"
                    intent="basic"
                    key={2}
                    onClick={closePopup}
                  >
                    Submit
                  </Button>,
                ]}
              >
                Verified Gross Mass (VGM) rail transpacific east bound shipment
                less than container load.
              </GeneralPopover>
            </Popup>
          </>
        )}
      </PopupWithClickAway>
    </div>
  );
}
