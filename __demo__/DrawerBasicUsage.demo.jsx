/**
 * TEAM: frontend_infra
 * @flow
 */

import React, {useState} from "react";
import Button from "../button/Button";
import Drawer from "../Drawer";
import Text from "../Text";

/**
 * @title Basic usage
 */
export default function DrawerBasicUsage() {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  const drawerElement = (
    <Drawer
      title="Messages"
      onClose={closeDrawer}
      isOpen={isOpen}
      navOffset={0}
    >
      <Text>Testing!</Text>
    </Drawer>
  );

  return (
    <div>
      <Button onClick={isOpen ? closeDrawer : openDrawer}>
        {`${isOpen ? "Close" : "Open"} drawer`}
      </Button>
      {isOpen ? drawerElement : null}
    </div>
  );
}
