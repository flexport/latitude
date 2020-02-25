/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 *
 * @flow
 */
import * as React from "react";
import {storiesOf} from "@storybook/react";
import {select, withKnobs} from "@storybook/addon-knobs";
import sections from "../sections";
import GraphicIcon from "../../GraphicIcon";

const stories = storiesOf(`${sections.general}/Graphic Icon`, module);
const options = [
  "document",
  "document_add",
  "container",
  "container_none",
  "invoices_none",
  "products_none",
  "requests_none",
  "search",
  "shipments_none",
  "truck",
  "truck_none",
];
stories.addDecorator(withKnobs);
stories
  .add("withKnobs", () => (
    <GraphicIcon icon={select("iconName", options, "truck")} />
  ))
  .add("double", () => (
    <div>
      <GraphicIcon icon="container" />
      <GraphicIcon icon="truck" />
    </div>
  ))
  .add("doubleWide", () => <GraphicIcon icon="document_add" width={640} />)
  .add("automatic", () => (
    <div style={{width: 100}}>
      <GraphicIcon icon="products_none" width="auto" />
    </div>
  ));
