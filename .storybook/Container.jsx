/**
 * TEAM: frontend_infra
 * WATCHERS: zgotsch
 * @flow
 */

// A simple wrapper which centers its content.

import * as React from "react";
import "./manifest.css";

export default function Container({story}: {+story: any}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div
        style={{
          border: "1px solid lightgray",
          padding: "3em",
          backgroundColor: "white",
          margin: "auto",
        }}
      >
        {story()}
      </div>
    </div>
  );
}
