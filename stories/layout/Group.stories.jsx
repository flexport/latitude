/**
 * TEAM: frontend_infra
 *
 * @flow
 */
import * as React from "react";
import {StyleSheet, css} from "aphrodite";

import {storiesOf} from "@storybook/react";
import {number, boolean, select, withKnobs} from "@storybook/addon-knobs";
import sections from "../sections";

import colors from "../../colors";
import flexboxStyles from "../../styles/flexboxStyles";

import Group from "../../Group";
import Text from "../../Text";
import Button from "../../button/Button";

const stories = storiesOf(`${sections.layout}/Flex`, module);
stories.addDecorator(withKnobs);
const elements = {
  range: true,
  min: 0,
  max: 24,
  step: 1,
};
const gapOptions = {
  range: true,
  min: 4,
  max: 72,
  step: 4,
};
const wrapOptions = Object.keys(flexboxStyles.flexWrap);
const directionOptions = Object.keys(flexboxStyles.flexDirection);
const justifyContentOptions = Object.keys(flexboxStyles.justifyContent);
const alignItemsOptions = Object.keys(flexboxStyles.alignItems);
stories
  .add("basic", () => (
    <div className={css(styles.container)}>
      <Group>
        <div className={css(styles.example)} />
        <div className={css(styles.example)} />
      </Group>
    </div>
  ))
  .add("dynamic", () => (
    <div className={css(styles.container)}>
      <Group
        fillChildren={boolean("Fill children", false, "fill")}
        gap={number("Gap", 12, gapOptions, `gap`)}
        flexWrap={select("flexWrap", wrapOptions, "wrap")}
        flexDirection={select("flexDirection", directionOptions, "dir")}
        justifyContent={select("justifyContent", justifyContentOptions, "jc")}
        alignItems={select("alignItems", alignItemsOptions, "ai")}
      >
        {Array(number("Children", 4, elements, `kids`))
          .fill()
          .map((_, e) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={e}
              className={css(
                styles.example,
                boolean("Irregular height", false, "height") &&
                  e === 0 &&
                  styles.irregular
              )}
            >
              <Text scale="tiny" weight="bold">
                {e}
              </Text>
            </div>
          ))}
      </Group>
    </div>
  ))
  .add("Vertical", () => (
    <Group flexDirection="column">
      <Button>Clickable</Button>
      <Group flexDirection="row" gap={40}>
        <div>1</div>
        <div>2</div>
      </Group>
    </Group>
  ));

const styles = StyleSheet.create({
  container: {
    width: "600px",
  },
  example: {
    display: "flex",
    justifyContent: "center",
    background: colors.grey30,
    borderRadius: "3px",
    padding: "8px",
    width: "80px",
  },
  irregular: {
    padding: "16px 8px",
  },
});
