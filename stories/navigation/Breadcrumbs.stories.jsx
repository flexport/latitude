/**
 * TEAM: frontend_infra
 *
 * @flow
 */

import * as React from "react";
import {storiesOf} from "@storybook/react";
import {withKnobs, button} from "@storybook/addon-knobs";
import sections from "../sections";
import Breadcrumbs from "../../Breadcrumbs";

const stories = storiesOf(`${sections.navigation}`, module);

stories.addDecorator(withKnobs);

// Not the best way to use  breadcrumbs, ideally best way is to use `url` prop but changing the URL in stories while retaining the story seems to be non-trivial
stories.add("Breadcrumbs", () => {
  const [depth, setDepth] = React.useState(4);

  button("Reset Breadcrumbs", () => {
    setDepth(4);

    return false;
  });

  return (
    <div style={{width: "600px"}}>
      <Breadcrumbs
        items={[
          {
            onClick: () => setDepth(1),
            content: "Breads",
          },
          {
            onClick: () => setDepth(2),
            content: "Flours",
          },
          {
            onClick: () => setDepth(3),
            content: "Buckwheat",
          },
          {
            content: "Origin",
          },
        ].slice(0, depth)}
      />
    </div>
  );
});
