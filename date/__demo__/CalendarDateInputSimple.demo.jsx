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
 * @title Simple Usage
 * @description CalendarDateInput is both a visual calendar component and a functional text field.
 */
export default function CalendarDateInputSimple() {
  const [value, setValue] = useState(today("America/Los_Angeles"));

  return (
    <div className={css(demoCommonStyles.v2wrapper)}>
      <CalendarDateInput value={value} onChange={setValue} />
    </div>
  );
}
