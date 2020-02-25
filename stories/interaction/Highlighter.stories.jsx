/**
 * TEAM: frontend_infra
 * WATCHERS: ctan
 *
 * @flow
 */
import * as React from "react";
import {storiesOf} from "@storybook/react";
import {select, withKnobs} from "@storybook/addon-knobs";
import sections from "../sections";
import colors from "../../colors";
import Highlighter from "../../Highlighter";
import Group from "../../Group";
import Text from "../../Text";

const stories = storiesOf(`${sections.interaction}/Highlighter`, module);

stories.addDecorator(withKnobs);

const EXAMPLE_TEXT =
  "At Flexport, we believe a world that does business together is a better one. It’s called global trade. And freight forwarding is the $2 trillion industry that functions as the circulatory system of global trade — without freight forwarding, global trade simply wouldn’t exist. \n  \n Problem is, the freight forwarding industry is antiquated, not customer focused, and definitely not tech savvy. We’re changing all that.\n\n FLEXPORT IS THE MODERN FREIGHT FORWARDER.\n   \n Only Flexport brings together advanced technology and data analytics, logistics infrastructure, and supply chain expertise to deliver a dramatically better experience. Flexport and the Operating System for Global Trade give businesses what they’ve never had before with their freight forwarders: Deep visibility and control from origin to destination, fast and reliable transit times, and low and predictable supply chain costs.";
const EXAMPLE_BUTTONS = ["Boats", "Trains", "Planes", "Spaceships"];
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

const colorOptions = Object.keys(colors).reduce(
  (result: {[string]: string}, key) => {
    // eslint-disable-next-line no-param-reassign
    result[key] = key;

    return result;
  },
  {}
);

stories.add("Highlighting Buttons", () => {
  const color = select("color", colorOptions, "blue20");
  const highlighterSelectionRef = React.createRef();
  const [selectedButton, setSelectedButton] = React.useState(
    EXAMPLE_BUTTONS[0]
  );

  return (
    <div style={{width: 300}}>
      <b>Click any button:</b>
      <br />
      <br />
      <Highlighter color={color} selectionRef={highlighterSelectionRef}>
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
  );
});

stories.add("Highlighting Groups", () => {
  const color = select("color", colorOptions, "grey10");
  const highlighterSelectionRef = React.createRef();
  const [highlightedGroup, setHighlightedGroup] = React.useState(
    EXAMPLE_GROUPS[0].title
  );

  return (
    <div style={{width: 600}}>
      <b>Hover over any section:</b>
      <br />
      <br />
      <Highlighter color={color} selectionRef={highlighterSelectionRef}>
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
});

stories.add("Highlighting Text", () => {
  const color = select("color", colorOptions, "grey20");
  const highlighterSelectionRef = React.createRef();
  const [selectedWordIndex, setSelectedWordIndex] = React.useState(null);

  return (
    <div style={{width: 420}}>
      <b>Click any word below:</b>
      <br />
      <br />
      <Highlighter color={color} selectionRef={highlighterSelectionRef}>
        {EXAMPLE_TEXT.split("\n").map((line, lineIndex) => (
          // eslint-disable-next-line react/no-array-index-key
          <React.Fragment key={lineIndex}>
            {line.split(" ").map((word, index) => {
              const wordIndex = `${lineIndex}-${index}`;

              if (!word) return word;

              return (
                <React.Fragment key={wordIndex}>
                  <span
                    role="button"
                    tabIndex="0"
                    ref={
                      selectedWordIndex === wordIndex
                        ? highlighterSelectionRef
                        : null
                    }
                    style={{
                      position: "relative",
                      cursor: "pointer",
                      outline: "none",
                    }}
                    onClick={() => {
                      setSelectedWordIndex(wordIndex);
                    }}
                    onKeyDown={event => {
                      if (event.key === "Enter")
                        setSelectedWordIndex(wordIndex);
                    }}
                  >
                    {word}
                  </span>{" "}
                </React.Fragment>
              );
            })}
            <br />
          </React.Fragment>
        ))}
      </Highlighter>
    </div>
  );
});
