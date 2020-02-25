/**
 * TEAM: frontend_infra
 * WATCHERS: uforic
 * @flow strict
 */

import * as React from "react";

export const NO_INPUT_GROUP: InputGroupContextType = "None";
export const CENTER_INPUT: InputGroupContextType = "CenterInput";
export const LEFT_INPUT: InputGroupContextType = "LeftInput";
export const RIGHT_INPUT: InputGroupContextType = "RightInput";

export opaque type InputGroupContextType =
  | NO_INPUT_GROUP
  | CENTER_INPUT
  | LEFT_INPUT
  | RIGHT_INPUT;

const InputGroupContext: React.Context<InputGroupContextType> = React.createContext(
  "None"
);
export default InputGroupContext;
