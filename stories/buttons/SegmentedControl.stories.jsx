/**
 * TEAM: frontend_infra
 *
 * @flow
 */

import * as React from "react";

import {storiesOf} from "@storybook/react";
import {boolean, withKnobs, select} from "@storybook/addon-knobs";
import sections from "../sections";

import SegmentedControl, {
  type SegmentedControlProps,
} from "../../segmented_control/SegmentedControl";

storiesOf(`${sections.navigation}/SegmentedControl`, module)
  .addDecorator(withKnobs)
  .add("no gap", () => (
    <SegmentedControlHoist gap={0} {...getRadioButtonKnobs()} />
  ))
  .add("gap of 8", () => (
    <SegmentedControlHoist {...getRadioButtonKnobsWithGap()} />
  ))
  .add("fillchildren", () => (
    <div style={{width: "720px"}}>
      <span>
        With &#39;fillChildren&#39; set to &#39;false&#39; or not set:
      </span>
      <SegmentedControlHoist
        {...getRadioButtonKnobs()}
        options={[
          {value: "option1", label: "Apple"},
          {value: "option2", label: "Banana"},
          {value: "option3", label: "Purple Mangosteen"},
          {value: "option4", label: "Kiwi"},
        ]}
      />
      <br />
      <span>With &#39;fillChildren&#39; set to &#39;true&#39;:</span>
      <SegmentedControlHoist
        {...getRadioButtonKnobs()}
        options={[
          {value: "option1", label: "Apple"},
          {value: "option2", label: "Banana"},
          {value: "option3", label: "Purple Mangosteen"},
          {value: "option4", label: "Kiwi"},
        ]}
        fillChildren={true}
      />
    </div>
  ));

const getRadioButtonKnobs = () => ({
  gap: select("Gap", [0, 2, 4, 8, 16, 32], 0),
  size: select("Size", ["xs", "s", "m", "l"], "xs"),
  disabled: boolean("Disabled", false),
  isInvalid: boolean("Invalid", false),
});

const getRadioButtonKnobsWithGap = () => ({
  gap: select("Gap", [0, 2, 4, 8, 16, 32], 8),
  size: select("Size", ["xs", "s", "m", "l"], "xs"),
  disabled: boolean("Disabled", false),
  isInvalid: boolean("Invalid", false),
});

const OPTIONS = [
  {value: "option1", label: "Option 1"},
  {value: "option2", label: "Option 2"},
  {value: "option3", label: "Option 3"},
  {value: "option4", label: "Option 4"},
];

type Props = {|
  +gap: $PropertyType<SegmentedControlProps, "gap">,
  +size: $PropertyType<SegmentedControlProps, "size">,
  +options?: $PropertyType<SegmentedControlProps, "options">,
  +disabled: $PropertyType<SegmentedControlProps, "disabled">,
  +isInvalid: $PropertyType<SegmentedControlProps, "isInvalid">,
  +fillChildren?: $PropertyType<SegmentedControlProps, "fillChildren">,
|};

function SegmentedControlHoist({
  gap,
  size,
  disabled,
  isInvalid,
  options,
  fillChildren,
}: Props) {
  const [value, setValue] = React.useState("option1");

  return (
    <SegmentedControl
      gap={gap}
      size={size}
      options={options || OPTIONS}
      value={value}
      onChange={value => setValue(value)}
      isInvalid={isInvalid}
      disabled={disabled}
      fillChildren={fillChildren}
    />
  );
}
