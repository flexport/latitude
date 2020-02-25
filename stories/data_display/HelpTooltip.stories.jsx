/**
 * TEAM: frontend_infra
 *
 * @flow
 */

import * as React from "react";
import {storiesOf} from "@storybook/react";
import {withKnobs, text, select} from "@storybook/addon-knobs";
import sections from "../sections";

import {deprecatedPaddingSizeConstants} from "../../styles/deprecatedWhitespace";
import DeprecatedVerticalGroup from "../../DeprecatedVerticalGroup";
import DeprecatedHorizontalGroup from "../../DeprecatedHorizontalGroup";
import Text from "../../Text";
import Icon from "../../Icon";
import HelpTooltip from "../../HelpTooltip";

const stories = storiesOf(`${sections.dataDisplay}/Help Tooltip`, module);
stories.addDecorator(withKnobs);

stories.add("HelpTooltip", () => (
  <DeprecatedVerticalGroup>
    <div>
      <Text>Regular Div + HelpTooltip baseline</Text>
      <HelpTooltip {...getLabelKnobs()} />
    </div>

    <DeprecatedHorizontalGroup>
      <Text>Horizontal Group + HelpTooltip baseline</Text>
      <div>
        <HelpTooltip {...getLabelKnobs()} />
      </div>
    </DeprecatedHorizontalGroup>

    <div style={{display: "flex", alignItems: "center"}}>
      <Text>Flexbox + HelpTooltip center</Text>
      <div style={{width: deprecatedPaddingSizeConstants.s}} />
      <HelpTooltip {...getLabelKnobs()} alignment="center" />
    </div>

    <br />

    <DeprecatedHorizontalGroup crossAlign="center">
      <Text>Horizontal Group + Icon baseline</Text>
      <Icon iconName="question" size={getLabelKnobs().size} />
    </DeprecatedHorizontalGroup>

    <div style={{display: "flex", alignItems: "center"}}>
      <Text>Flexbox + Icon center</Text>
      <div style={{width: deprecatedPaddingSizeConstants.s}} />
      <Icon
        iconName="question"
        size={getLabelKnobs().size}
        alignment="center"
      />
    </div>

    <br />

    <HelpTooltip {...getLabelKnobs()} size="m" alignment="center" />
    <HelpTooltip {...getLabelKnobs()} size="l" alignment="center" />
    <HelpTooltip {...getLabelKnobs()} size="xl" alignment="center" />
    <HelpTooltip {...getLabelKnobs()} size="xxl" alignment="center" />
  </DeprecatedVerticalGroup>
));

const getLabelKnobs = () => ({
  position: select("Position", ["left", "right", "top", "bottom"], "right"),
  text: text("text", "Hello world"),
  size: select("size", ["s", "m", "l", "xl", "xxl"], "s"),
});
