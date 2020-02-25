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

const FormSectionError = ({errorMessage}: {+errorMessage: string}) => (
  <div className={css(formSectionErrorStyles.wrapper)}>
    <div className={css(formSectionErrorStyles.icon)}>
      <Icon iconName="attention" color="red40" />
    </div>
    <div className={css(formSectionErrorStyles.message)}>
      <Text>{errorMessage}</Text>
    </div>
  </div>
);

export default FormSectionError;

const formSectionErrorStyles = StyleSheet.create({
  wrapper: {
    background: colors.grey10,
    borderRadius: "5px",
    padding: "16px",
    height: "100%",
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "flex-start",
  },
  icon: {
    display: "flex",
  },
  message: {
    paddingLeft: "12px",
  },
});
