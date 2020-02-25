/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import DropdownList from "../DropdownList";
import Group from "../../Group";
import Link from "../../Link";
import Text from "../../Text";

/**
 * @title Section Usage
 * @description A `customView` prop can be specified for custom option rendering. Add a header or footer that will be stickied to the top or bottom of your list.
 */
export default function DropdownListCustomViewUsage() {
  const options = [
    {
      label: "AJD017391",
      customView: <CustomView label="AJD017391" />,
    },
    {
      label: "AJD017392",
      customView: <CustomView label="AJD017392" />,
    },
    {
      label: "AJD017393",
      customView: <CustomView label="AJD017393" />,
    },
    {
      label: "AJD017394",
      customView: <CustomView label="AJD017394" />,
    },
  ];
  const [selected, setSelected] = React.useState(options[0].label);

  return (
    <div style={{width: "400px"}}>
      <Group>
        Selected: <b>{selected}</b>
      </Group>
      <br />
      <DropdownList
        options={options}
        onClick={setSelected}
        footer={
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              padding: "8px",
            }}
          >
            <Link href="/design/components/DropdownList">Do Some Action</Link>
          </div>
        }
      />
    </div>
  );

  function CustomView({label}: CustomViewProps) {
    return (
      <div
        style={{
          padding: "8px 12px",
          width: "100%",
        }}
      >
        <Group flexDirection="column" gap={4}>
          <Text>{label}</Text>
          <Text color="grey50">
            Wrought aluminum, provided for in headings 7604, 7605, 7606, 7607,
            7608, 7609 and castings and forgings of aluminum provided for in
            subheading 7616.99.51
          </Text>
        </Group>
      </div>
    );
  }
}

type CustomViewProps = {|
  +label: string,
|};
