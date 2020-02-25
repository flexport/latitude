/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import DropdownList from "../DropdownList";
import Group from "../../Group";

/**
 * @title Basic Usage
 * @description A dropdown list can be used to create custom dropdown menus.
 */
export default function DropdownListBasicUsage() {
  const options = [
    {label: "AJD017391"},
    {label: "AJD017392"},
    {label: "AJD017393"},
    {label: "AJD017394"},
  ];
  const [selected, setSelected] = React.useState(options[0].label);

  return (
    <div style={{width: "200px"}}>
      <Group>
        Selected: <b>{selected}</b>
      </Group>
      <br />
      <DropdownList options={options} onClick={setSelected} />
    </div>
  );
}
