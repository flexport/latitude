/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";
import DropdownButton from "../../DropdownButton";
import ToggleButton from "../../base_candidate/button/ToggleButton";

/**
 * @title Ellipsis Dropdown
 * @description An example of an ellipsis dropdown menu
 */
export default function DropdownWithEllipsis() {
  return (
    <DropdownButton
      button={<ToggleButton iconName="ellipsis" hideToggleIcon={true} />}
      options={[
        {label: "test", handleClick: () => {}, iconName: "cancel"},
        {
          label: "Second test",
          labelTitle: "Title:",
          handleClick: () => {},
          iconName: "satellite",
        },
      ]}
    />
  );
}
