/**
 * TEAM: frontend_infra
 *
 * @flow
 */

import React from "react";

import SegmentedControl from "../SegmentedControl";

/**
 * @title Basic Usage
 */
export default function SegmentedControlBasicUsage() {
  const [value, setValue] = React.useState("option1");

  return (
    <SegmentedControl
      options={[
        "apple",
        "banana",
        {value: "mangosteen", label: "Purple Mangosteen"},
        {value: "kiwi", label: "Kiwi"},
      ]}
      gap={0}
      size="xs"
      value={value}
      onChange={value => setValue(value)}
      isInvalid={false}
      disabled={false}
      fillChildren={false}
    />
  );
}
