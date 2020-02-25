/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";

import {storiesOf} from "@storybook/react";
import {withKnobs} from "@storybook/addon-knobs";
import sections from "../sections";
import Drawer from "../../Drawer";
import Button from "../../button/Button";

const stories = storiesOf(`${sections.dataDisplay}/Drawer`, module);
stories.addDecorator(withKnobs);
stories.add("basic usage", () => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div>
      <Button onClick={() => setIsOpen(!isOpen)}>Toggle Drawer</Button>
      <Drawer
        isOpen={isOpen}
        title="Drawer"
        navOffset={0}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </div>
  );
});
