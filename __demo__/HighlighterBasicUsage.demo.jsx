/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";

import Highlighter from "../Highlighter";
import colors from "../colors";
import Group from "../Group";
import Text from "../Text";

/**
 * @title Basic Usage
 */
export default function BreadcrumbsBasicUsage() {
  const EXAMPLE_BUTTONS = ["Boats", "Trains", "Planes", "Spaceships"];
  const highlighterSelectionRef = React.createRef();
  const [selectedButton, setSelectedButton] = React.useState(
    EXAMPLE_BUTTONS[0]
  );

  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{width: 300}}>
        <b>Click any button:</b>
        <br />
        <br />
        <Highlighter color="blue20" selectionRef={highlighterSelectionRef}>
          <Group gap={0}>
            {EXAMPLE_BUTTONS.map(buttonText => (
              <div
                key={buttonText}
                role="button"
                tabIndex="0"
                ref={
                  selectedButton === buttonText ? highlighterSelectionRef : null
                }
                style={{
                  position: "relative",
                  cursor: "pointer",
                  outline: "none",
                  padding: "4px 8px",
                  border: `2px solid ${colors.blue50}`,
                }}
                onClick={() => {
                  setSelectedButton(buttonText);
                }}
                onKeyDown={event => {
                  if (event.key === "Enter") setSelectedButton(buttonText);
                }}
              >
                <Text weight="bold">{buttonText}</Text>
              </div>
            ))}
          </Group>
        </Highlighter>
      </div>
    </div>
  );
}
