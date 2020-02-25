/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";

import Highlighter from "../Highlighter";
import colors from "../colors";
import Group from "../Group";

/**
 * @title Hover Usage
 */
export default function BreadcrumbsBasicUsage() {
  const EXAMPLE_GROUPS = [
    {
      title: "Land",
      content:
        "the solid part of the surface of the earth\nalso : a corresponding part of a celestial body (such as the moon)",
    },
    {
      title: "Sea",
      content:
        "The sea, the world ocean or simply the ocean is the connected body of salty water that covers over 70% of Earth's surface (361,132,000 square kilometres (139,434,000 sq mi), with a total volume of roughly 1,332,000,000 cubic kilometres (320,000,000 cu mi)).",
    },
    {
      title: "Space",
      content:
        "Outer space, or simply space, is the expanse that exists beyond the Earth and between celestial bodies. Outer space is not completely empty—it is a hard vacuum containing a low density of particles, predominantly a plasma of hydrogen and helium, as well as electromagnetic radiation, magnetic fields, neutrinos, dust, and cosmic rays. The baseline temperature of outer space, as set by the background radiation from the Big Bang, is 2.7 kelvins (−270.45 °C; −454.81 °F). The plasma between galaxies accounts for about half of the baryonic (ordinary) matter in the universe; it has a number density of less than one hydrogen atom per cubic metre and a temperature of millions of kelvins. Local concentrations of matter have condensed into stars and galaxies. Studies indicate that 90% of the mass in most galaxies is in an unknown form, called dark matter, which interacts with other matter through gravitational but not electromagnetic forces.",
    },
  ];
  const highlighterSelectionRef = React.createRef();
  const [highlightedGroup, setHighlightedGroup] = React.useState(
    EXAMPLE_GROUPS[0].title
  );

  return (
    <div style={{width: 600}}>
      <b>Hover over any section:</b>
      <br />
      <br />
      <Highlighter color="grey10" selectionRef={highlighterSelectionRef}>
        <Group gap={0} fillChildren={true} flexDirection="column">
          {EXAMPLE_GROUPS.map(group => (
            <div
              key={group.title}
              role="button"
              tabIndex="0"
              ref={
                highlightedGroup === group.title
                  ? highlighterSelectionRef
                  : null
              }
              style={{
                position: "relative",
                cursor: "pointer",
                outline: "none",
                padding: "24px 16px",
                borderBottom: `2px solid ${colors.grey40}`,
                width: "100%",
              }}
              onMouseEnter={() => {
                setHighlightedGroup(group.title);
              }}
            >
              <Group flexDirection="column">
                <b>{group.title}</b>
                <div>
                  {group.content.split("\n").map(line => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </Group>
            </div>
          ))}
        </Group>
      </Highlighter>
    </div>
  );
}
