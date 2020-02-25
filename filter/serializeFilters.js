/**
 * TEAM: frontend_infra
 * WATCHERS: uforic
 * @flow
 */

import invariant from "../tools/invariant";
import {type CalendarDate, isCalendarDateValid} from "../date/CalendarDateType";
import {type ValueObj, ALL_SELECTED_VALUE_STATE} from "./MultiselectFilter";

type FilterValue = string;

const SELECT_FILTER_TYPE = "Select";
const MULTISELECT_FILTER_TYPE = "Multiselect";
const DATE_RANGE_FILTER_TYPE = "DateRange";
const TEXT_FILTER_TYPE = "Text";

// All filter types can have null values; this represents the case where the
// filter element is displayed but nothing in particular has been selected yet.

export type SelectFilter = {
  +type: "Select",
  +key: string,
  +value?: FilterValue,
};

export type MultiselectFilter = {
  +type: "Multiselect",
  +key: string,
  +value: ValueObj<FilterValue>,
};

type CustomDateRangeValue = {|
  +type: "custom",
  +startDate: CalendarDate,
  +endDate: CalendarDate,
|};

type PresetDateRangeValue = {|
  +type: "preset",
  +label: string,
|};

export type DateRangeFilter = {|
  +type: "DateRange",
  +key: string,
  +value?: CustomDateRangeValue | PresetDateRangeValue,
|};

export type TextFilter = {|
  +type: "Text",
  +key: string,
  value?: FilterValue,
|};

export type Filter =
  | SelectFilter
  | MultiselectFilter
  | DateRangeFilter
  | TextFilter;

export const castToValueObj: (
  inputValue:
    | FilterValue
    | CustomDateRangeValue
    | PresetDateRangeValue
    | ValueObj<string>
    | null
    | void
) => ValueObj<string> = inputValue => {
  invariant(
    typeof inputValue !== "string" &&
      (!(inputValue && inputValue.type === "custom") ||
        !(inputValue && inputValue.type === "preset")),
    "Input should be value obj or null"
  );
  return inputValue &&
    (inputValue.type === "allSelected" || inputValue.type === "specificValues")
    ? inputValue
    : ALL_SELECTED_VALUE_STATE;
};

const serializeSelect = (filter: SelectFilter) =>
  JSON.stringify(filter.value) || "";

const deserializeSelect = (key: string, value: string): SelectFilter => ({
  type: SELECT_FILTER_TYPE,
  value: value ? JSON.parse(value) : undefined,
  key,
});

const serializeMultiselect = (filter: MultiselectFilter) =>
  filter.value.type === "allSelected" ? "" : JSON.stringify(filter.value);
const deserializeMultiselect = (
  key: string,
  value: string
): MultiselectFilter => {
  const defaultMultiselectFilter = {
    type: MULTISELECT_FILTER_TYPE,
    key,
    value: ALL_SELECTED_VALUE_STATE,
  };

  if (!value) {
    return defaultMultiselectFilter;
  }

  return {
    type: MULTISELECT_FILTER_TYPE,
    value: JSON.parse(value),
    key,
  };
};

const serializeDateRange = (filter: DateRangeFilter) =>
  JSON.stringify(filter.value) || "";

const castPresetDateRangeValue = (
  maybeDateRangeValue: any
): ?PresetDateRangeValue => {
  if (
    maybeDateRangeValue.type === "preset" &&
    typeof maybeDateRangeValue.label === "string"
  ) {
    return maybeDateRangeValue;
  }

  return undefined;
};

const isValidMaybeDate = (maybeDate: ?string) =>
  !maybeDate || isCalendarDateValid(maybeDate);

const castCustomDateRangeValue = (
  maybeDateRangeValue: any
): ?CustomDateRangeValue => {
  if (
    maybeDateRangeValue.type === "custom" &&
    (maybeDateRangeValue.startDate || maybeDateRangeValue.endDate) &&
    isValidMaybeDate(maybeDateRangeValue.startDate) &&
    isValidMaybeDate(maybeDateRangeValue.endDate)
  ) {
    return maybeDateRangeValue;
  }

  return undefined;
};

const deserializeDateRange = (key: string, value: string) => {
  if (!value) {
    return {
      type: DATE_RANGE_FILTER_TYPE,
      key,
    };
  }
  const shouldBeDateRange = JSON.parse(value);

  invariant(
    typeof shouldBeDateRange === "object",
    "parsed date range should be filter %s",
    shouldBeDateRange
  );

  const dateRange =
    castPresetDateRangeValue(shouldBeDateRange) ||
    castCustomDateRangeValue(shouldBeDateRange);
  invariant(dateRange, "parsed date range should be filter %s", dateRange);

  return {type: DATE_RANGE_FILTER_TYPE, value: dateRange, key};
};

const serializeText = (filter: TextFilter) => filter.value || "";

const deserializeText = (key: string, value: string): TextFilter => ({
  type: TEXT_FILTER_TYPE,
  value: value !== "" ? value : undefined,
  key,
});

const serializeSingleFilter = (filter: Filter) => {
  switch (filter.type) {
    case SELECT_FILTER_TYPE:
      return serializeSelect(filter);
    case MULTISELECT_FILTER_TYPE:
      return serializeMultiselect(filter);
    case DATE_RANGE_FILTER_TYPE:
      return serializeDateRange(filter);
    case TEXT_FILTER_TYPE:
      return serializeText(filter);
    default:
      throw new Error(`Could not serialize filter ${filter.type}`);
  }
};

/**
 * Usage: serializeFilters(filters) => {key: value, key2: value2}
 * You can pass into URLSearchParams(serializedParams) to send to the
 * router.
 * @param {*} filters
 */
export function serializeFilters(filters: $ReadOnlyArray<Filter>) {
  const urlParams = {};
  filters.forEach(filter => {
    urlParams[filter.key] = serializeSingleFilter(filter);
  });
  return urlParams;
}

type FilterArg =
  | {
      type: "Select",
      key: string,
    }
  | {
      type: "Multiselect",
      key: string,
    }
  | {
      type: "DateRange",
      key: string,
    }
  | {
      type: "Text",
      key: string,
    };

/**
 * Usage: deserializeFilters(filterList, urlParams);
 *
 * The reason a user needs to specify the filters and filter types
 * ahead of time is that when we deserialize, we do different things
 * depending on the type of the filter.
 *
 * This can be thought of as "querying" the query string for filters and args.
 *
 * Missing filters won't be returned, and can be assumed to be in an "empty" state.
 * @param {*} filterArgs
 * @param {*} urlParams
 */
export const deserializeFilters = (
  filterArgs: $ReadOnlyArray<FilterArg>,
  urlParams: {[string]: string}
): $ReadOnlyArray<Filter> =>
  filterArgs
    .map(filterArg => {
      const value = urlParams[filterArg.key];
      if (value == null) {
        return null;
      }
      if (filterArg.type === SELECT_FILTER_TYPE) {
        return deserializeSelect(filterArg.key, value);
      } else if (filterArg.type === MULTISELECT_FILTER_TYPE) {
        return deserializeMultiselect(filterArg.key, value);
      } else if (filterArg.type === DATE_RANGE_FILTER_TYPE) {
        return deserializeDateRange(filterArg.key, value);
      } else if (filterArg.type === TEXT_FILTER_TYPE) {
        return deserializeText(filterArg.key, value);
      }
      throw new Error(`Could not deserialize filter of type ${filterArg.type}`);
    })
    .filter(Boolean);

export const _test = {
  serializeSelect,
  serializeMultiselect,
  serializeDateRange,
  serializeText,
  serializeFilters,
  deserializeFilters,
  SELECT_FILTER_TYPE,
  MULTISELECT_FILTER_TYPE,
  DATE_RANGE_FILTER_TYPE,
  TEXT_FILTER_TYPE,
  deserializeSelect,
  deserializeMultiselect,
  deserializeText,
  deserializeDateRange,
};
