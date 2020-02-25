/**
 * TEAM: frontend_infra
 *
 * @flow
 */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import {storiesOf} from "@storybook/react";
import {select, text, number, withKnobs} from "@storybook/addon-knobs";
import sections from "../sections";
import Group from "../../Group";
import Badge from "../../Badge";
import Text from "../../Text";
import Button from "../../button/Button";
import Icon from "../../Icon";

const getBadgeNoCountKnobs = () => ({
  buttonText: text("buttonText", "Messages"),
  iconSize: select("iconSize", ["s", "m", "l", "xl", "xxl"], "l"),
  iconName: select(
    "iconName",
    ["bell", "calendar", "chat", "clock", "inbox", "mail"],
    "bell"
  ),
  intent: select(
    "intent",
    ["ready", "ready-green", "pending", "error", "complete", "due-soon"],
    "ready"
  ),
});

const getBadgeWithCountKnobs = () => ({
  ...getBadgeNoCountKnobs(),
  count: number("count", 15),
  max: number("max", 99),
  intent: select(
    "intent",
    ["ready", "ready-green", "pending", "error", "complete", "due-soon"],
    "ready"
  ),
});

const stories = storiesOf(`${sections.general}/Badge`, module);
stories.addDecorator(withKnobs);
stories.add("Badge with count", () => (
  <BadgeWithCountHoist {...getBadgeWithCountKnobs()} />
));
stories.add("Badge no count", () => (
  <BadgeNoCountHoist {...getBadgeNoCountKnobs()} />
));

function BadgeNoCountHoist(props: *) {
  return (
    <div className={css(styles.container)}>
      <Group flexDirection="column" gap={36}>
        <Text>Intent: ready (default)</Text>
        <Badge count={true}>
          <Button intent="none" kind="hollow">
            {props.buttonText}
          </Button>
        </Badge>
        <Badge count={true}>
          <Icon iconName={props.iconName} size={props.iconSize} />
        </Badge>

        <Text>Intent: ready-green</Text>
        <Badge count={true} intent="ready-green">
          <Button intent="none" kind="hollow">
            {props.buttonText}
          </Button>
        </Badge>
        <Badge count={true} intent="ready-green">
          <Icon iconName={props.iconName} size={props.iconSize} />
        </Badge>

        <Text>Intent: pending</Text>
        <Badge count={true} intent="pending">
          <Button intent="none" kind="hollow">
            {props.buttonText}
          </Button>
        </Badge>
        <Badge count={true} intent="pending">
          <Icon iconName={props.iconName} size={props.iconSize} />
        </Badge>

        <Text>Intent: error</Text>
        <Badge count={true} intent="error">
          <Button intent="none" kind="hollow">
            {props.buttonText}
          </Button>
        </Badge>
        <Badge count={true} intent="error">
          <Icon iconName={props.iconName} size={props.iconSize} />
        </Badge>

        <Text>Intent: complete</Text>
        <Badge count={true} intent="complete">
          <Button intent="none" kind="hollow">
            {props.buttonText}
          </Button>
        </Badge>

        <Badge count={true} intent="complete">
          <Icon iconName={props.iconName} size={props.iconSize} />
        </Badge>

        <Text>Standalone</Text>
        <Group>
          <Badge intent={props.intent} count={true} />
          <Text>badgey badge</Text>
        </Group>
      </Group>
    </div>
  );
}

function BadgeWithCountHoist(props: *) {
  return (
    <div className={css(styles.container)}>
      <Group flexDirection="column" gap={36}>
        <Text>Intent: ready (default)</Text>
        <Badge count={props.count} max={props.max}>
          <Button intent="none" kind="hollow">
            {props.buttonText}
          </Button>
        </Badge>
        <Badge count={props.count} max={props.max}>
          <Icon iconName={props.iconName} size={props.iconSize} />
        </Badge>

        <Text>Intent: ready-green</Text>
        <Badge intent="ready-green" count={props.count} max={props.max}>
          <Button intent="none" kind="hollow">
            {props.buttonText}
          </Button>
        </Badge>
        <Badge intent="ready-green" count={props.count} max={props.max}>
          <Icon iconName={props.iconName} size={props.iconSize} />
        </Badge>

        <Text>Intent: pending</Text>
        <Badge intent="pending" count={props.count} max={props.max}>
          <Button intent="none" kind="hollow">
            {props.buttonText}
          </Button>
        </Badge>
        <Badge intent="pending" count={props.count} max={props.max}>
          <Icon iconName={props.iconName} size={props.iconSize} />
        </Badge>

        <Text>Intent: error</Text>
        <Badge intent="error" count={props.count} max={props.max}>
          <Button intent="none" kind="hollow">
            {props.buttonText}
          </Button>
        </Badge>
        <Badge intent="error" count={props.count} max={props.max}>
          <Icon iconName={props.iconName} size={props.iconSize} />
        </Badge>

        <Text>Intent: complete</Text>
        <Badge intent="complete" count={props.count} max={props.max}>
          <Button intent="none" kind="hollow">
            {props.buttonText}
          </Button>
        </Badge>
        <Badge intent="complete" count={props.count} max={props.max}>
          <Icon iconName={props.iconName} size={props.iconSize} />
        </Badge>

        <Text>Standalone</Text>
        <Group>
          <Badge intent={props.intent} count={props.count} />
          <Text>how many</Text>
        </Group>
      </Group>
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "600px",
  },
});
