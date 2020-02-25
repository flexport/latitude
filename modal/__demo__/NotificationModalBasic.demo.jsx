/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import Button from "../../button/Button";
import NotificationModal from "../NotificationModal";
import Text from "../../Text";

/**
 * @title Basic Usage
 */
export default function NotificationModalBasic() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Trigger Notification</Button>
      {isOpen && (
        <NotificationModal
          onRequestClose={() => setIsOpen(false)}
          title="Create New User"
          buttons={[
            <Button
              key="open"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Close Modal
            </Button>,
          ]}
        >
          <Text>
            You cant <Text fontStyle="italic">handle</Text> the truth!
          </Text>
        </NotificationModal>
      )}
    </>
  );
}
