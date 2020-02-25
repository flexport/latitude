/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import moment from "moment-timezone";
import {
  addDaysFromCalendarDate,
  today as getToday,
} from "../../date/CalendarDateType";
import DateRangeFilter from "../DateRangeFilter";

const TZ = moment.tz.guess();
const today = getToday(TZ);

/**
 * @title Basic DateRangeFilter Usage
 * @description DateRangeFilter can be used to filter on a date range
 */
export default function DateRangeFilterBasicUsage() {
  const presets = [
    {
      label: "All time",
      startDate: addDaysFromCalendarDate(today, -365),
      endDate: addDaysFromCalendarDate(today, 365),
    },
    {
      label: "Last week",
      startDate: addDaysFromCalendarDate(today, -7),
      endDate: today,
    },
    {
      label: "Next month",
      startDate: addDaysFromCalendarDate(today, -1),
      endDate: addDaysFromCalendarDate(today, 30),
    },
  ];

  const [value, setValue] = React.useState({
    type: "preset",
    ...presets[0],
  });

  return (
    <DateRangeFilter
      label="Delivery date range"
      value={value}
      onChange={setValue}
      presets={presets}
    />
  );
}
