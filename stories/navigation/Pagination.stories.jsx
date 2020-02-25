/**
 * TEAM: frontend_infra
 *
 * @flow
 */

import * as React from "react";
import {storiesOf} from "@storybook/react";
import {withKnobs, number} from "@storybook/addon-knobs";
import sections from "../sections";
import Pagination from "../../Pagination";

const stories = storiesOf(`${sections.navigation}`, module);

stories.addDecorator(withKnobs);

const getKnobs = () => ({
  totalItemCount: number("totalItemCount", 15, {
    range: true,
    min: 0,
    max: 200,
    step: 15,
  }),
  itemsPerPage: number("itemsPerPage", 10, {range: true, min: 1, max: 20}),
});

stories.add("Pagination", () => {
  const [page, setPage] = React.useState(0);

  return (
    <div style={{width: "600px"}}>
      <Pagination page={page} {...getKnobs()} onChange={setPage} />
    </div>
  );
});
