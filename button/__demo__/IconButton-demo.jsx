/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow
 */

import * as React from "react";
import {
  type DemoFile,
  text,
  getIconKnob,
  bool,
  iconAlignmentKnob,
  iconButtonSizeKnob,
  buttonIntentKnob,
  iconButtonKindKnob,
  buttonWidthKnob,
  type DemoProps,
} from "../../demoTypes";
import IconButton from "../IconButton";
import invariant from "../../tools/invariant";

import IconButtonAlignment from "./IconButtonAlignment.demo";
import IconButtonBare from "./IconButtonBare.demo";
import IconButtonBasicUsage from "./IconButtonBasicUsage.demo";
import IconButtonBlank from "./IconButtonBlank.demo";
import IconButtonIntents from "./IconButtonIntents.demo";
import IconButtonLabel from "./IconButtonLabel.demo";
import IconButtonSizes from "./IconButtonSizes.demo";

const iconButtonKnobs = {
  label: text("demo"),
  iconName: getIconKnob(),
  iconAlignment: iconAlignmentKnob,
  size: iconButtonSizeKnob,
  intent: buttonIntentKnob,
  kind: iconButtonKindKnob,
  width: buttonWidthKnob,
  disabled: bool(false),
};

const demos: DemoFile = {
  demos: [
    {
      type: "live",
      example: IconButtonBasicUsage,
    },
    {
      type: "live",
      example: IconButtonBare,
    },
    {
      type: "live",
      example: IconButtonBlank,
    },
    {
      type: "live",
      example: IconButtonLabel,
    },
    {
      type: "live",
      example: IconButtonSizes,
    },
    {
      type: "full",
      example: (elementToCodeFn, demoProps) => (
        <IconButtonShim
          elementToCodeFn={elementToCodeFn}
          demoProps={demoProps}
        />
      ),
      knobs: iconButtonKnobs,
    },
    {
      type: "live",
      example: IconButtonIntents,
    },
    {
      type: "live",
      example: IconButtonAlignment,
    },
  ],
};

export class IconButtonShim extends React.PureComponent<
  {
    +elementToCodeFn?: React.Node => void,
    +demoProps: DemoProps<typeof iconButtonKnobs>,
  },
  {}
> {
  render() {
    const {elementToCodeFn, demoProps} = this.props;
    const {iconName} = demoProps;
    invariant(
      iconName != null,
      "Need iconName, iconName knob shouldn't be nullable."
    );
    const element = (
      <IconButton {...demoProps} iconName={iconName} type="button" />
    );
    // eslint-disable-next-line no-unused-expressions
    elementToCodeFn && elementToCodeFn(element);
    return element;
  }
}

export default demos;
