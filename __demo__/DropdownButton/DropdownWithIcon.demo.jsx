/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";
import DropdownButton from "../../DropdownButton";
import ToggleButton from "../../base_candidate/button/ToggleButton";

/**
 * @title Dropdown with Icon
 * @description An example of a dropdown with an Icon
 */
export default function DropdownWithIcon() {
  return (
    <DropdownButton
      button={<ToggleButton iconName="cog" label="Settings" />}
      options={[
        {label: "Ocean", handleClick: () => {}, iconName: "ship"},
        {
          label: "Air",
          handleClick: () => {},
          iconName: "plane",
        },
      ]}
    />
  );
}
