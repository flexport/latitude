/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import moment from "moment-timezone";
import BaseFilter, {type PopupPlacement} from "./BaseFilter";
import DropdownList from "../select/DropdownList";
import CalendarDateInput from "../date/CalendarDateInput";
import {
  formatCalendarDate,
  today,
  calendarDateMin,
  calendarDateMax,
  type CalendarDate,
} from "../date/CalendarDateType";
import {type Size} from "../sizes";

type PresetDateFilterValue = {|
  +type: "preset",
  +label: string,
  +startDate: CalendarDate,
  +endDate: CalendarDate,
|};

type CustomDateFilterValue = {|
  +type: "custom",
  +startDate: CalendarDate,
  +endDate: CalendarDate,
|};

export type Preset = {|
  +label: string,
  +startDate: CalendarDate,
  +endDate: CalendarDate,
|};

export type DateFilterValue = PresetDateFilterValue | CustomDateFilterValue;

type Props = {|
  /** Description of the filter pivot, e.g. `Delivery Date Range` */
  +label: string,
  /**
   * The value for a DateRangeFilter is either a custom date range, or a preset date range.
   * The preset data range must match one of the provided presets.
   */
  +value: DateFilterValue,
  /** Called when a new date range is selected */
  +onChange: DateFilterValue => void,
  /**
   * Replaces the downOpen icon with an X button. When this button is pressed,
   * onRemove is called
   */
  +onRemove?: () => void,
  /** Whether the label hides if there are any options selected */
  +shyLabel?: boolean,
  /** Blocks calendar off prior to this date */
  +minDate?: CalendarDate,
  /** Blocks calendar off after to this date */
  +maxDate?: CalendarDate,
  /**
   * You can provide an ordered list of preset options such as "Last week"
   * that will prepopulate the DateDange list.
   */
  +presets: $ReadOnlyArray<{|
    +label: string,
    +startDate: CalendarDate,
    +endDate: CalendarDate,
  |}>,
  /** The size of the filter button */
  +size?: Size,
  /** Whether the filter is disabled */
  +disabled?: boolean,
  /** controls where the dropdown menu is anchored in relation to the multiselect input */
  +dropdownPlacement?: PopupPlacement,
  /** whether to use a Portal or React Fragment component */
  +noPortal?: boolean,
|};

const customRangeOptionLabel = "Custom date range";

/**
 * @short DateRangeFilter allows for filtering across date ranges
 * @category Filter
 * @brandStatus V2
 * @status Stable
 * DateRangeFilter is the filter analog for CalendarDateRange. The API is the approximately the same as CalendarDateRange, but appears in a filter UX.
 * Note: The first preset is the "default", and is assumed to be inactive (i.e. "All dates").
 */
function DateRangeFilter({
  label,
  value,
  onChange,
  onRemove,
  shyLabel,
  minDate,
  maxDate,
  presets,
  size,
  disabled,
  dropdownPlacement,
  noPortal = false,
}: Props) {
  const [customDate, setCustomDate] = React.useState<CustomDateFilterValue>({
    type: "custom",
    startDate: today(moment.tz.guess()),
    endDate: today(moment.tz.guess()),
  });

  const handleOptionClick = (optionLabel: string) => {
    if (optionLabel === customRangeOptionLabel) {
      onChange(customDate);
    } else {
      const selectedPreset = presets.find(
        preset => preset.label === optionLabel
      );
      // $FlowUpgradeFixMe(0.110.1 -> 0.111.1)
      onChange({type: "preset", ...selectedPreset});
    }
  };

  const handleCustomRangeChange = (newDateRange: CustomDateFilterValue) => {
    setCustomDate(newDateRange);
    onChange(newDateRange);
  };

  const displayOptions = presets
    .map(preset => ({label: preset.label}))
    .concat({label: customRangeOptionLabel});

  const formattedStartDate = formatCalendarDate(value.startDate, "MMM D");
  const formattedEndDate = formatCalendarDate(value.endDate, "MMM D");

  const isActive =
    value.type === "custom" ||
    presets.findIndex(preset => preset.label === value.label) !== 0;

  return (
    <BaseFilter
      label={label}
      size={size}
      shyLabel={shyLabel}
      onRemove={onRemove}
      disabled={disabled}
      placement={dropdownPlacement}
      selectedText={
        isActive
          ? value.label || `${formattedStartDate} – ${formattedEndDate}`
          : undefined
      }
      noPortal={noPortal}
    >
      {closePopup => (
        <DropdownList
          highlightedOption={value.label || customRangeOptionLabel}
          onClick={label => {
            handleOptionClick(label);
            closePopup();
          }}
          options={displayOptions}
          footer={
            <CustomRangeFooter
              isOpen={value.type === "custom"}
              value={customDate}
              onChange={handleCustomRangeChange}
              minDate={minDate}
              maxDate={maxDate}
            />
          }
        />
      )}
    </BaseFilter>
  );
}

type CustomRangeFooterProps = {|
  +isOpen: boolean,
  +value: CustomDateFilterValue,
  +onChange: CustomDateFilterValue => void,
  +minDate?: CalendarDate,
  +maxDate?: CalendarDate,
|};

/** A footer that allows a user to enter in a custom date range. This footer
 * appears when the `custom` option in DateRangeFilter is selected */
function CustomRangeFooter({
  isOpen,
  value,
  onChange,
  minDate,
  maxDate,
}: CustomRangeFooterProps) {
  const handleChange = (newDate: CalendarDate | null, isStart: boolean) => {
    if (newDate == null) {
      return;
    }

    if (isStart) {
      onChange({
        type: "custom",
        startDate: newDate,
        endDate: calendarDateMax(newDate, value.endDate),
      });
    } else {
      onChange({
        type: "custom",
        startDate: calendarDateMin(newDate, value.startDate),
        endDate: newDate,
      });
    }
  };

  if (!isOpen) {
    return <div className={css(styles.footer)} />;
  }

  return (
    <div className={css(styles.footer, styles.customRangeFooter)}>
      <CalendarDateInput
        value={value.startDate}
        onChange={date => {
          handleChange(date, true);
        }}
        minDate={minDate}
        maxDate={maxDate}
      />
      <div className={css(styles.gap)}>to</div>
      <CalendarDateInput
        value={value.endDate}
        onChange={date => {
          handleChange(date, false);
        }}
        minDate={minDate}
        maxDate={maxDate}
      />
    </div>
  );
}

const dropdownWidth = 280;
const spacing = 12;

const styles = StyleSheet.create({
  footer: {
    width: dropdownWidth,
  },
  customRangeFooter: {
    display: "flex",
    flexDirection: "row",
    padding: spacing,
  },
  gap: {
    padding: spacing / 2,
  },
});

export default DateRangeFilter;
