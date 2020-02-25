/**
 * TEAM: frontend_infra
 * @flow
 */

import {createContext} from "react";

export type RowContextType = {
  isSelected: boolean,
  isHighlighted: boolean,
};

export default createContext<RowContextType>({
  isSelected: false,
  isHighlighted: false,
});
