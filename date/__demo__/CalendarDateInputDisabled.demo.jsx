/**
 * TEAM: frontend_infra
 * @flow
 */

import React, {useState} from "react";
import {css} from "aphrodite";
import CalendarDateInput from "../CalendarDateInput";
import {today} from "../CalendarDateType";
import {demoCommonStyles} from "../../demoTypes";

/**
 * @title Disabled Input
 * @description Use the `disabled` prop to disable the CalendarDateInput
 */
export default function CalendarDateInputDisabled() {
  const [value, setValue] = useState(today("America/Los_Angeles"));

  return (
    <div className={css(demoCommonStyles.v2wrapper)}>
      <CalendarDateInput value={value} onChange={setValue} disabled={true} />
    </div>
  );
}
