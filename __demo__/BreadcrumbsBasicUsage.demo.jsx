/**
 * TEAM: frontend_infra
 * @flow
 */

import React, {useState} from "react";

import Breadcrumbs from "../Breadcrumbs";
import IconButton from "../button/IconButton";

/**
 * @title Basic Usage
 */
export default function BreadcrumbsBasicUsage() {
  const [depth, setDepth] = useState(4);

  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Breadcrumbs
        items={[
          {
            onClick: () => setDepth(1),
            content: "Breads",
          },
          {
            onClick: () => setDepth(2),
            content: "Flours",
          },
          {
            onClick: () => setDepth(3),
            content: "Buckwheat",
          },
          {
            content: "Origin",
          },
        ].slice(0, depth)}
      />
      {depth !== 4 && (
        <IconButton
          iconName="revert"
          type="button"
          kind="hollow"
          intent="basic"
          label="Reset Breadcrumbs"
          onClick={() => setDepth(4)}
        />
      )}
    </div>
  );
}
