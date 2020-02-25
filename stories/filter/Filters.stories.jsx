/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {storiesOf} from "@storybook/react";
import {boolean, withKnobs} from "@storybook/addon-knobs";
import moment from "moment-timezone";
import sections from "../sections";
import Group from "../../Group";
import Text from "../../Text";
import FilterButton from "../../filter/FilterButton";
import BaseFilter from "../../filter/BaseFilter";
import SelectFilter from "../../filter/SelectFilter";
import DateRangeFilter from "../../filter/DateRangeFilter";
import MultiselectFilter, {
  getValueArrayFromFilterValue,
  getFilterValueFromArray,
} from "../../filter/MultiselectFilter";
import SearchableMultiselectFilter from "../../filter/SearchableMultiselectFilter";
import {addDaysFromCalendarDate, today} from "../../date/CalendarDateType";

const stories = storiesOf(sections.filter, module);
stories.addDecorator(withKnobs);
stories.add("basic filter", () => (
  <div style={{width: "700px"}}>
    <Group gap={56}>
      <Group flexDirection="column">
        <Text scale="title">Base Filter</Text>
        <BaseFilter label="location">
          <div style={{width: "400px", height: "150px"}} />
        </BaseFilter>

        <Text scale="title">Prop permutations</Text>
        <FilterButton label="location" />
        <FilterButton label="disabled" disabled={true} />
        <FilterButton label="selected" selectedText="2" />
        <FilterButton
          label="selected with remove"
          selectedText="2"
          onRemove={() => {}}
        />
        <FilterButton
          label="location"
          selectedText="California"
          shyLabel={true}
        />
        <FilterButton label="location" selectedText="2" disabled={true} />
        <FilterButton label="location" selectedText="2" isActive={true} />

        <Text scale="title">Sizes</Text>
        <FilterButton size="s" label="small" selectedText="2" />
        <FilterButton size="m" label="medium" selectedText="2" />
        <FilterButton size="l" label="large" selectedText="2" />
      </Group>

      <Group flexDirection="column">
        <Text scale="title">Filters</Text>
        <SelectFilterShim />
        <DateRangeFilterShim />
        <MultiselectFilterShim />
        <SearchableMultiselectFilterShim />
      </Group>
    </Group>
  </div>
));

function SelectFilterShim() {
  const options = [
    {label: "San Francisco", value: "San Francisco"},
    {label: "Los Angeles", value: "Los Angeles"},
    {label: "New York", value: "New York"},
    {label: "Boston", value: "Boston"},
  ];

  const [selected, setSelected] = React.useState(null);

  return (
    <Group flexDirection="column">
      <Text>SelectFilter</Text>
      <SelectFilter
        label="City"
        options={options}
        value={selected}
        onChange={setSelected}
        onRemove={boolean("clearable", false) ? () => {} : undefined}
      />
    </Group>
  );
}

function DateRangeFilterShim() {
  const timezone = moment.tz.guess();

  const presets = [
    {
      label: "All time",
      startDate: addDaysFromCalendarDate(today(timezone), -365),
      endDate: addDaysFromCalendarDate(today(timezone), 365),
    },
    {
      label: "Last week",
      startDate: addDaysFromCalendarDate(today(timezone), -7),
      endDate: today(timezone),
    },
    {
      label: "Next month",
      startDate: addDaysFromCalendarDate(today(timezone), -1),
      endDate: addDaysFromCalendarDate(today(timezone), 30),
    },
  ];

  const [selected, setSelected] = React.useState({
    type: "preset",
    ...presets[0],
  });

  return (
    <Group flexDirection="column">
      <Text>DateRangeFilter</Text>
      <DateRangeFilter
        label="Delivery Date Range"
        value={selected}
        onChange={setSelected}
        presets={presets}
        onRemove={boolean("clearable", false) ? () => {} : undefined}
      />
    </Group>
  );
}

function MultiselectFilterShim() {
  const options = [
    {label: "San Francisco", value: "San Francisco"},
    {label: "Los Angeles", value: "Los Angeles"},
    {label: "New York", value: "New York"},
    {label: "Boston", value: "Boston"},
  ];

  const [selected, setSelected] = React.useState([]);

  return (
    <Group flexDirection="column">
      <Text>MultiselectFilter</Text>
      <MultiselectFilter
        label="City"
        value={getFilterValueFromArray(selected, options)}
        onChange={newSelected =>
          setSelected(getValueArrayFromFilterValue(newSelected))
        }
        options={options}
        displaySelectAllButton={true}
        onRemove={boolean("clearable", false) ? () => {} : undefined}
      />
    </Group>
  );
}

function SearchableMultiselectFilterShim() {
  const options = [
    {label: "San Francisco", value: "San Francisco"},
    {label: "Los Angeles", value: "Los Angeles"},
    {label: "New York", value: "New York"},
    {label: "Boston", value: "Boston"},
  ];

  const [selected, setSelected] = React.useState([]);

  return (
    <Group flexDirection="column">
      <Text>SearchableMultiselectFilter</Text>
      <SearchableMultiselectFilter
        label="Cities"
        value={selected}
        onChange={setSelected}
        options={options}
        onRemove={boolean("clearable", false) ? () => {} : undefined}
      />
    </Group>
  );
}
