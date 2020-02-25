/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {storiesOf} from "@storybook/react";
import sections from "../sections";
import ConnectedToaster from "../../toast/ConnectedToaster";
import ToastActions from "../../toast/ToastActions";
import Group from "../../Group";
import PopupWithClickAway from "../../popup/PopupWithClickAway";
import CustomModal from "../../modal/CustomModal";
import FloatInput from "../../FloatInput";
import Button from "../../button/Button";
import Text from "../../Text";

const stories = storiesOf(sections.popover, module);

stories.add("Layering Fixture", () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalPopoverZIndex, setModalPopoverZIndex] = React.useState(1500);

  return (
    <Group flexDirection="column">
      <ConnectedToaster />
      <Group flexDirection="column">
        <Text>
          The nested popup should appear above it&apos;s parent popover
        </Text>
        <Group flexDirection="row">
          <PopupWithClickAway>
            {(Target, Popup, {togglePopup}) => (
              <>
                <Target>
                  <Button onClick={togglePopup}>Popup Button</Button>
                </Target>
                <Popup placement="bottom">
                  <div
                    style={{
                      padding: 20,
                      border: "1px solid black",
                      background: "white",
                    }}
                  >
                    <PopupWithClickAway>
                      {(Target, Popup, {togglePopup}) => (
                        <>
                          <Target>
                            <Button onClick={togglePopup}>
                              Nested Popup Button
                            </Button>
                          </Target>
                          <Popup placement="bottom">
                            <div
                              style={{
                                padding: 20,
                                border: "1px solid black",
                                background: "white",
                              }}
                            >
                              Popup contents
                            </div>
                          </Popup>
                        </>
                      )}
                    </PopupWithClickAway>
                  </div>
                </Popup>
              </>
            )}
          </PopupWithClickAway>
        </Group>
      </Group>
      <Group flexDirection="column">
        <Text>Toasts should appear over Popovers</Text>
        <Button
          onClick={() => {
            setIsModalOpen(!isModalOpen);
          }}
        >
          Display Modal
        </Button>
        {/* eslint-disable-next-line flexport/no-oocss */}
        <CustomModal isOpen={isModalOpen} className="">
          <Group flexDirection="column">
            <Button
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              Close Modal
            </Button>
            <Text>Toasts should appear over Popovers</Text>
            <Button
              onClick={() => {
                ToastActions.show({message: "toast", intent: "success"});
              }}
            >
              spawn toast
            </Button>

            <Text>Popovers within Modals should appear over the modal</Text>
            <Group flexDirection="row">
              <FloatInput
                value={modalPopoverZIndex}
                onChange={number => setModalPopoverZIndex(number ?? 0)}
                placeholder="modal popover z-index"
              />
              <Text>Update the Modal Popover z-index</Text>
            </Group>

            <PopupWithClickAway>
              {(Target, Popup, {togglePopup}) => (
                <>
                  <Target>
                    <Button onClick={togglePopup}>Popup Button</Button>
                  </Target>
                  <Popup placement="bottom-start" zIndex={modalPopoverZIndex}>
                    <div
                      style={{
                        padding: 20,
                        border: "1px solid black",
                        background: "white",
                      }}
                    >
                      Popup contents
                    </div>
                  </Popup>
                </>
              )}
            </PopupWithClickAway>
          </Group>
        </CustomModal>
      </Group>
    </Group>
  );
});
