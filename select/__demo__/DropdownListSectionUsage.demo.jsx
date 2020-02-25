/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import DropdownList from "../DropdownList";
import Group from "../../Group";

/**
 * @title Section Usage
 * @description Group DropdownList items into sections. Each option specifies what section it belongs to. `sectionOrder` prop specifies order sections are shown.
 */
export default function DropdownListSectionUsage() {
  const options = [
    {label: "AJD017391", section: "RECENTLY USED"},
    {label: "AJD017392", section: "RECENTLY USED"},
    {label: "AJD017393", section: "OTHER"},
    {label: "AJD017394", section: "OTHER"},
  ];

  const [selected, setSelected] = React.useState(options[0].label);

  return (
    <div style={{width: "200px"}}>
      <Group>
        Selected: <b>{selected}</b>
      </Group>
      <br />
      <DropdownList
        options={options}
        onClick={setSelected}
        sectionOrder={["RECENTLY USED", "OTHER"]}
      />
    </div>
  );
}
