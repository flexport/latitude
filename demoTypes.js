/**
 * TEAM: frontend_infra
 *
 * @flow
 */

import * as React from "react";
import {StyleSheet} from "aphrodite";
import {iconData, type IconNames} from "./tools/icons";
import {
  graphicIconNames,
  type GraphicIcons,
} from "./tools/graphicIconsConstants";
import deprecatedColors, {
  type DeprecatedColor,
} from "./styles/deprecatedColorConstants";

export type Option<K> = {|
  +label: string,
  +value: K,
  +disabled?: boolean,
|};

export type DemoType = TextDemo | FullDemo | LiveDemo;

export type EditorConfig = {|
  +initialInline?: boolean,
  +initialSplit?: boolean,
  +initialShowCode?: boolean,
  +showSettings?: boolean,
  +showScope?: boolean,
  +codeFirst?: boolean,
|};

type TextDemo = {|
  type: "text",
  title: string,
  description: string,
  fullWidth?: boolean,
|};

type LiveDemo = {|
  type: "live",
  fullWidth?: boolean,
  example: () => React.Node,
|};

type FullDemo = {|
  type: "full",
  example: (renderCodeFn: (React.Node) => void, demoProps: any) => React.Node,
  knobs: {[string]: Knob},
  showCode?: boolean,
|};

export type DemoFile = {|
  demos: $ReadOnlyArray<DemoType>,
|};

type BooleanKnob = {|
  type: "bool",
  defaultValue: boolean,
|};

type StringKnob = {|
  type: "text",
  defaultValue?: string,
|};

type NumberKnob = {|
  type: "text",
  defaultValue?: number,
|};

type CalendarDateKnob = {|
  type: "calendarDate",
  defaultValue?: string,
|};

export type ListKnob<K> = {|
  type: "list",
  defaultValue?: K,
  options: $ReadOnlyArray<Option<K>>,
  toKeyFn?: K => string,
  isNullable?: boolean,
  isSearchable: boolean,
|};

export function bool(defaultValue: boolean): BooleanKnob {
  return {
    type: "bool",
    defaultValue,
  };
}

export function list<K>(
  options: $ReadOnlyArray<Option<K>>,
  isSearchable: boolean = false,
  isNullable: boolean = false,
  toKeyFn?: K => string,
  defaultValue?: K
): ListKnob<K> {
  return {
    type: "list",
    options,
    toKeyFn,
    defaultValue,
    isNullable,
    isSearchable,
  };
}

export const calendarDate = (defaultValue?: string) => ({
  type: "calendarDate",
  defaultValue,
});

export const text = (defaultValue?: string) => ({type: "text", defaultValue});

export const number = (defaultValue?: number) => ({
  type: "text",
  defaultValue,
});

export const icon = (defaultValue?: IconNames) => ({
  type: "text",
  defaultValue,
});

export const graohicIcon = (defaultValue?: GraphicIcons) => ({
  type: "text",
  defaultValue,
});

export const getDefaultPropForType = (
  type: "bool" | "text" | "number" | "list" | "calendarDate"
) => {
  // eslint-disable-next-line default-case
  switch (type) {
    case "bool":
      return false;
    case "text":
      return "";
    case "number":
      return 0;
    case "list":
      return null;
    case "calendarDate":
      return null;
  }
};

export function getIconKnob(
  isNullable: boolean = false
): ListKnob<IconNames | void> {
  const icons = Object.keys(iconData).map(item => {
    const iconOption = {value: item, label: item};
    return iconOption;
  });
  return list(icons, true, isNullable, undefined, icons[0].value);
}

export function getGraphicIconKnob(): ListKnob<GraphicIcons> {
  const graphicIcons = graphicIconNames.map(item => {
    const graphicIconOption = {value: item, label: item};
    return graphicIconOption;
  });
  return list(graphicIcons, true, false, undefined, graphicIcons[0].value);
}

export const textAlignKnob: ListKnob<"left" | "right" | "center"> = list([
  {value: "left", label: "Left"},
  {value: "right", label: "Right"},
  {value: "center", label: "Center"},
]);

export const textInputSizeKnob: ListKnob<"s" | "m" | "l"> = list(
  [
    {value: "s", label: "Small"},
    {value: "m", label: "Medium"},
    {value: "l", label: "Large"},
  ],
  false,
  false,
  undefined,
  "m"
);

export const iconAlignmentKnob: ListKnob<"left" | "right"> = list(
  [{value: "left", label: "Left"}, {value: "right", label: "Right"}],
  false,
  false,
  undefined,
  "left"
);

export const iconButtonSizeKnob: ListKnob<"s" | "m" | "l"> = textInputSizeKnob;

export const iconSizeKnob: ListKnob<
  "xxxs" | "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl"
> = list(
  [
    {value: "xxxs", label: "xxxs"},
    {value: "xxs", label: "xxs"},
    {value: "xs", label: "xs"},
    {value: "s", label: "s"},
    {value: "m", label: "m"},
    {value: "l", label: "l"},
    {value: "xl", label: "xl"},
    {value: "xxl", label: "xxl"},
  ],
  false,
  false
);

export const deprecatedColorKnob: ListKnob<DeprecatedColor> = list(
  Object.keys(deprecatedColors).map(color => ({value: color, label: color})),
  false,
  false
);

export const buttonIntentKnob: ListKnob<"none" | "basic" | "danger"> = list(
  [
    {value: "none", label: "None"},
    {value: "basic", label: "Basic"},
    {value: "danger", label: "Danger"},
  ],
  false,
  false,
  undefined,
  "none"
);

export const iconButtonKindKnob: ListKnob<"bare" | "blank" | "hollow"> = list(
  [
    {value: "hollow", label: "Hollow"},
    {value: "bare", label: "Bare"},
    {value: "blank", label: "Blank"},
  ],
  false,
  false,
  undefined,
  "hollow"
);

export const buttonWidthKnob: ListKnob<"full" | "responsive"> = list(
  [{value: "responsive", label: "responsive"}, {value: "full", label: "full"}],
  false,
  false,
  undefined,
  "responsive"
);

export const isInvalidKnob: BooleanKnob = bool(false);

export const disabledKnob: BooleanKnob = bool(false);

export const isLargeKnob: BooleanKnob = bool(false);

export const demoCommonStyles = StyleSheet.create({
  smallWrapper: {
    maxWidth: 200,
  },
  midWrapper: {
    maxWidth: 400,
  },
  v2wrapper: {
    width: 320,
  },
});

type ExtractReturnType = <V>({defaultValue: V}) => V;

export function extractDefaults<O: {[key: string]: any}>(
  o: O
): $ObjMap<O, ExtractReturnType> {
  return Object.keys(o).reduce(
    (acc, k) => Object.assign(acc, {[k]: o[k].defaultValue}),
    {}
  );
}

export type DemoProps<V> = $Call<typeof extractDefaults, V>;

export type Knob =
  | BooleanKnob
  | StringKnob
  | NumberKnob
  | ListKnob<any>
  | CalendarDateKnob;
