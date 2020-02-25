/**
 * TEAM: frontend_infra
 * @flow strict
 */

import * as React from "react";

import {today} from "./CalendarDateType";
import {
  type WallTime,
  isWallTime,
  displayTime,
  parseInputText,
  momentFromCalDateWallTime,
  momentToWallTime,
} from "./wallTime";

import TextInputAutocomplete from "../TextInputAutocomplete";
import typeof TextInput from "../TextInput";

type TextInputProps = React.ElementConfig<TextInput>;

type TimeInputProps = {|
  /** all TextInput props will be passed into the TextInput */
  ...TextInputProps,
  /** The currently selected time represented as a WallTime */
  +value: WallTime | null,
  /** called when the value of the TimeInput changes */
  +onChange: (WallTime | null) => void,
  /** display 24 hour time */
  +militaryTime?: boolean,
  /* preset time options to choose from. create them using `getTimeIntervals` exported in TimeInput. */
  +options: $ReadOnlyArray<WallTime>,
|};

/**
 * @short A simple time chooser that supports precreated times as well as arbitrary user input.
 * @category Data Entry
 * @group Date and Time
 * @brandStatus V3
 * @status Stable
 */
export default function TimeInput({
  value,
  onChange,
  militaryTime = false,
  placeholder = "-- : -- --",
  options,
  onBlur,
  ...textInputProps
}: TimeInputProps) {
  const [displayText, setDisplayText] = React.useState(
    formatWallTime(value, militaryTime)
  );
  const [isFocused, setIsFocused] = React.useState(false);

  // Update display time if given 'value' is 'military time' is updated
  React.useEffect(() => {
    if (isFocused) return;

    updateDisplayTime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, militaryTime]);

  const handleOnChange = (newDisplayText: string) => {
    if (newDisplayText === "") {
      onChange(null);
    } else {
      const newWallTime = parseInputText(newDisplayText);

      if (newWallTime !== null) {
        onChange(newWallTime);
      }
    }

    setDisplayText(newDisplayText);
  };

  const handleFocus = () => {
    if (!isFocused) setIsFocused(true);
  };

  const handleBlur = (e: Event) => {
    if (onBlur) {
      onBlur(e);
    }

    if (isFocused) setIsFocused(false);

    updateDisplayTime();
  };

  function updateDisplayTime() {
    const valueAsDisplayTime = formatWallTime(value, militaryTime);

    if (
      (!isWallTime(displayText) && displayText !== "") ||
      displayText !== valueAsDisplayTime
    ) {
      setDisplayText(valueAsDisplayTime);
    }
  }

  return (
    <TextInputAutocomplete
      {...textInputProps}
      placeholder={placeholder}
      value={displayText}
      onChange={handleOnChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      prefix={{iconName: "clock"}}
      suggestions={options.map(option => formatWallTime(option, militaryTime))}
      suggestionsFilter={(query: string, option: string) => {
        const trimmedOption = option
          .toLowerCase()
          .split(" ")
          .join("");
        const trimmedQuery = query
          .toLowerCase()
          .split(" ")
          .join("");

        return trimmedOption.includes(trimmedQuery);
      }}
      maximumOptions={Infinity}
      highlight={text =>
        formatWallTime(parseInputText(text), militaryTime)
          .toLowerCase()
          .split(" ")
          .join("")
      }
    />
  );
}

function formatWallTime(wallTime: WallTime | null, isMilitaryTime: boolean) {
  if (wallTime === null) {
    return "";
  }

  return displayTime(wallTime, {military: isMilitaryTime});
}

export function getTimeIntervals(
  startTime: WallTime,
  endTime: WallTime,
  interval: 15 | 30 | 60
) {
  const intervals: Array<WallTime> = [];
  const arbitraryDay = today("UTC");
  const startMmt = momentFromCalDateWallTime(arbitraryDay, startTime, "UTC");
  const endMmt = momentFromCalDateWallTime(arbitraryDay, endTime, "UTC");
  let currentMmt = startMmt.clone();

  /** this is (60 / 15) * 24, the max number of times that could be displayed */
  for (let i = 0; i < 24 * 4; i += 1) {
    if (!currentMmt.isBefore(endMmt)) {
      break;
    }
    intervals.push(momentToWallTime(currentMmt, "UTC"));
    currentMmt = currentMmt.add(interval, "minutes");
  }
  return intervals;
}
