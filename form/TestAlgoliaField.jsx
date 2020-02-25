/**
 * TEAM: frontend_infra
 *
 * @flow
 */

import * as React from "react";
import {css, StyleSheet} from "aphrodite";
import colors from "../colors";

type Props = {
  +value: any,
  +onChange: ({value: string | number, label: string, full: mixed}) => void,
};

type State = {
  value: string,
};

class TestAlgoliaField extends React.PureComponent<Props, State> {
  state = {
    value: "",
  };

  render() {
    return (
      <input
        value={this.state.value}
        onChange={this.handleChange}
        className={this.props.value ? css(styles.lightGreenBackground) : null}
      />
    );
  }

  handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    // eslint-disable-next-line prefer-destructuring
    const value = event.currentTarget.value;
    this.setState({value}, this.syncValue);
  };

  syncValue = () => {
    let jsonValue = null;
    try {
      jsonValue = JSON.parse(this.state.value);
    } catch (e) {
      // Do nothing
      return;
    }

    this.props.onChange({
      value: "value",
      label: "label",
      full: jsonValue,
    });
  };
}

const styles = StyleSheet.create({
  lightGreenBackground: {
    backgroundColor: `lighten(${colors.green30}, 10%)`,
  },
});

export default TestAlgoliaField;
