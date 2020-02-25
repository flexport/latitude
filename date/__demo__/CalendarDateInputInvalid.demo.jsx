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
 * @title Invalid state
 * @description Use the `isInvalid` prop to indicate error
 */
export default function CalendarDateInputInvalid() {
  const [value, setValue] = useState(today("America/Los_Angeles"));

  return (
    <div className={css(demoCommonStyles.v2wrapper)}>
      <CalendarDateInput value={value} onChange={setValue} isInvalid={true} />
    </div>
  );
}
