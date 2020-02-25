/**
 * TEAM: frontend_infra
 * WATCHERS: uforic
 * @flow strict
 */
/* eslint-disable react/prefer-stateless-function */

import {StyleSheet, css} from "aphrodite";
import * as React from "react";
import InputGroupContext, {
  CENTER_INPUT,
  LEFT_INPUT,
  RIGHT_INPUT,
} from "./context/InputGroupContext";
import invariant from "./tools/invariant";

type CustomWidthSetting = {|
  flex?: number,
  width?: number,
  minWidth?: number,
  maxWidth?: number,
|};

export type InputGroupProps = {|
  +customWidthSettings?: $ReadOnlyArray<CustomWidthSetting>,
  +children: React.Node,
|};

/**
 * @category Layout
 * @short Groups supported inputs into a continuous section
 * @brandStatus V2
 * @status Stable
 * You may want to use TextInput with InputError or TextInputPrefixSuffix, decorators that
 * modify the look and feel of TextInput. If you need a multiline input, think about using
 * TextareaInput.
 * @extends React.Component */
class InputGroup extends React.PureComponent<InputGroupProps> {
  render() {
    const {children, customWidthSettings: _customWidthSettings} = this.props;
    const customWidthSettings = _customWidthSettings;
    if (customWidthSettings) {
      invariant(
        customWidthSettings.length === React.Children.count(children),
        "If you are using custom width settings, you need to pass in custom widths for every input element"
      );
    }
    const childComponents = React.Children.map(children, child => child);
    const leftComponent = (
      <InputGroupContext.Provider key={0} value={LEFT_INPUT}>
        <span
          className={css(styles.thang)}
          style={{
            ...(customWidthSettings && customWidthSettings[0]),
          }}
        >
          {childComponents[0]}
        </span>
      </InputGroupContext.Provider>
    );
    const centerElements = (
      <InputGroupContext.Provider key={1} value={CENTER_INPUT}>
        {childComponents.slice(1, -1).map((childComponent, idx) => (
          <span
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            className={css(styles.thang)}
            style={{
              ...(customWidthSettings && customWidthSettings[idx + 1]),
              marginLeft: `${-1 * (idx + 2)}px`,
            }}
          >
            {childComponent}
          </span>
        ))}
      </InputGroupContext.Provider>
    );
    const rightComponent = (
      <InputGroupContext.Provider key={2} value={RIGHT_INPUT}>
        <span
          className={css(styles.thang)}
          style={{
            ...(customWidthSettings &&
              customWidthSettings[childComponents.length - 1]),
            marginLeft: `${-1 * childComponents.length}px`,
          }}
        >
          {childComponents[childComponents.length - 1]}
        </span>
      </InputGroupContext.Provider>
    );

    const providerChildren = [leftComponent, centerElements, rightComponent];
    return <div className={css(styles.innerBorder)}>{providerChildren}</div>;
  }
}

const styles = StyleSheet.create({
  innerBorder: {
    display: "flex",
    flexDirection: "row",
  },
  thang: {
    ":focus-within": {zIndex: 2},
    ":hover": {zIndex: 1},
  },
});

export default InputGroup;
