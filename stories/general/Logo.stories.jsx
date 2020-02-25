/**
 * TEAM: frontend_infra
 * @flow
 */
import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import {storiesOf} from "@storybook/react";
import {number, withKnobs} from "@storybook/addon-knobs";
import sections from "../sections";

import Logo from "../../Logo";
import Text from "../../Text";
import DeprecatedVerticalGroup from "../../DeprecatedVerticalGroup";

const stories = storiesOf(`${sections.general}/Logo`, module);
stories.addDecorator(withKnobs);

const widthOptions = {
  range: true,
  min: 64,
  max: 1200,
  step: 1,
};
stories
  .add("withKnobs", () => (
    <Logo
      colorScheme="default"
      width={number("Width", 320, widthOptions, `w1`)}
    />
  ))
  .add("overview", () => (
    <DeprecatedVerticalGroup spacing="l">
      <div className={css(styles.wrapper)}>
        <DeprecatedVerticalGroup spacing="m">
          <Text scale="subtext">DEFAULT</Text>
          <Logo colorScheme="default" width={320} />
        </DeprecatedVerticalGroup>
      </div>
      <div className={css(styles.wrapper, styles.darkBG)}>
        <DeprecatedVerticalGroup spacing="m">
          <Text scale="subtext" color="white">
            REVERSED
          </Text>
          <Logo colorScheme="reversed" width={320} />
        </DeprecatedVerticalGroup>
      </div>
      <div className={css(styles.wrapper)}>
        <DeprecatedVerticalGroup spacing="m">
          <Text scale="subtext">SECONDARY-DARK</Text>
          <Logo colorScheme="dark" width={320} />
        </DeprecatedVerticalGroup>
      </div>
      <div className={css(styles.wrapper, styles.altBG)}>
        <DeprecatedVerticalGroup spacing="m">
          <Text scale="subtext" color="white">
            SECONDARY-LIGHT
          </Text>
          <Logo colorScheme="light" width={320} />
        </DeprecatedVerticalGroup>
      </div>
      <div className={css(styles.wrapper)}>
        <DeprecatedVerticalGroup spacing="m">
          <Text scale="subtext">MONO-BLACK</Text>
          <Logo colorScheme="monoBlack" width={320} />
        </DeprecatedVerticalGroup>
      </div>
      <div className={css(styles.wrapper, styles.altBG)}>
        <DeprecatedVerticalGroup spacing="m">
          <Text scale="subtext" color="white">
            MONO-WHITE
          </Text>
          <Logo colorScheme="monoWhite" width={320} />
        </DeprecatedVerticalGroup>
      </div>
    </DeprecatedVerticalGroup>
  ));

const styles = StyleSheet.create({
  wrapper: {
    padding: "36px",
  },
  darkBG: {
    background: "#000",
  },
  altBG: {
    background: "#24303E",
  },
});
