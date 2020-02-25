/**
 * TEAM: frontend_infra
 *
 * @flow strict
 */
import * as React from "react";

const TabOne = ({displayText}: {+displayText: string}) => (
  <div
    style={{
      height: 200,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    Thorin Balin Dwalin {displayText}
  </div>
);
export default TabOne;
