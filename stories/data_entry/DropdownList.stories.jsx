/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import {storiesOf} from "@storybook/react";
import {withKnobs} from "@storybook/addon-knobs";
import sections from "../sections";
import DeprecatedHorizontalGroup from "../../DeprecatedHorizontalGroup";
import DropdownList, {type Option} from "../../select/DropdownList";
import colors from "../../colors";

const stories = storiesOf(`${sections.dataEntry}/Dropdown List`, module);

stories.addDecorator(withKnobs);
stories.add("basic usage", () => (
  <DeprecatedHorizontalGroup>
    <DropdownListHoist
      options={[
        {label: "option 1"},
        {label: "option 2", disabled: true},
        {label: "option 3"},
        {label: "option 4"},
      ]}
    />

    <DropdownListHoist
      options={[
        {label: "AJD017391", section: "Recently Used"},
        {label: "AJD017392", disabled: true, section: "Recently Used"},
        {label: "AJD017393", section: "Other"},
        {label: "AJD017394", section: "Other"},
      ]}
      sectionOrder={["Recently Used", "Other"]}
    />

    <DropdownListHoist
      header={<div>This header is sticky</div>}
      options={[
        {label: "AJD017391", customView: <CustomView label="AJD017391" />},
        {label: "AJD017392", customView: <CustomView label="AJD017392" />},
        {label: "AJD017393", customView: <CustomView label="AJD017393" />},
        {label: "AJD017394", customView: <CustomView label="AJD017394" />},
      ]}
    />
  </DeprecatedHorizontalGroup>
));

type Props = {|
  +options: $ReadOnlyArray<Option>,
  +sectionOrder?: $ReadOnlyArray<string>,
  +header?: React.Node,
|};

function DropdownListHoist({options, sectionOrder, header}: Props) {
  const [selected, setSelected] = React.useState(options[0].label);

  const handleClick = (selected: string) => {
    setSelected(selected);
  };

  return (
    <div>
      <span>
        Selected Index: <b>{selected}</b>
      </span>
      <DropdownList
        header={header}
        options={options}
        sectionOrder={sectionOrder}
        highlightedOption={selected}
        onClick={handleClick}
      />
    </div>
  );
}

type CustomViewProps = {|
  +label: string,
|};

function CustomView({label}: CustomViewProps) {
  return (
    <div className={css(styles.container)}>
      <div className={css(styles.header)}>{label}</div>
      <span className={css(styles.body)}>
        Wrought aluminum, provided for in headings 7604, 7605, 7606, 7607, 7608,
        7609 and castings and forgings of aluminum provided for in subheading
        7616.99.51
      </span>
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "8px 12px",
    maxWidth: "300px",
  },
  header: {
    paddingBottom: "4px",
  },
  body: {
    color: colors.grey50,
    whiteSpace: "normal",
  },
});
