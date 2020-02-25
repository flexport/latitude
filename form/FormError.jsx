/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow
 */

import * as React from "react";
import {css, StyleSheet} from "aphrodite";

import colors from "../colors";

import Icon from "../Icon";
import Text from "../Text";
import Group from "../Group";

const FormError = ({
  errorMessage,
  errors,
}: {
  +errorMessage: string,
  +errors?: Array<string>,
}) => (
  <div className={css(formErrorStyles.wrapper)}>
    <Group gap={12} flexDirection="row">
      <Icon iconName="attention" color="red40" />
      <Group flexDirection="column">
        <Text>{errorMessage}</Text>
        {errors ? (
          <ol className={css(formErrorStyles.list)}>
            {errors.map((error, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={i}>{error}</li>
            ))}
          </ol>
        ) : null}
      </Group>
    </Group>
  </div>
);

export default FormError;

const formErrorStyles = StyleSheet.create({
  wrapper: {
    background: colors.red10,
    borderRadius: "5px",
    padding: "16px",
  },
  list: {
    paddingLeft: "16px",
  },
});
