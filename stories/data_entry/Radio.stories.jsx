/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 *
 * @flow
 */

import * as React from "react";
import {storiesOf} from "@storybook/react";
import {boolean, withKnobs, select} from "@storybook/addon-knobs";
import sections from "../sections";
import {ThemeProvider, type Theme} from "../../context/ThemeNameContext";
import DeprecatedVerticalGroup from "../../DeprecatedVerticalGroup";
import RadioGroup from "../../radio/RadioGroup";
import HelpTooltip from "../../HelpTooltip";

storiesOf(`${sections.dataEntry}/Radio Group`, module)
  .addDecorator(withKnobs)
  .add("Radio", () => <RadioHoist {...getKnobs()} />);

export const getKnobs = () => ({
  isInline: boolean("Inline", true),
  size: select("size", ["s", "m", "l"], "m"),
  disabled: boolean("Disabled", false),
  theme: select("Theme", ["Base", "Transmission"], "Base"),
});

type Props = {|
  +isInline: boolean,
  +size: "s" | "m" | "l",
  +disabled: boolean,
  +theme: Theme,
|};

type State = {|
  selected1: "Option1" | "Option2" | null,
  selected2: "Invalid1" | "Invalid2" | null,
|};

class RadioHoist extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selected1: null,
      selected2: null,
    };
  }

  handleClick1 = (newValue: "Option1" | "Option2") => {
    this.setState({
      selected1: newValue,
    });
  };

  handleClick2 = (newValue: "Invalid1" | "Invalid2") => {
    this.setState({
      selected2: newValue,
    });
  };

  render() {
    const {isInline, size, disabled, theme} = this.props;
    const {selected1, selected2} = this.state;
    return (
      <ThemeProvider theme={theme}>
        <DeprecatedVerticalGroup>
          <RadioGroup
            isInline={isInline}
            size={size}
            disabled={disabled}
            options={[
              "Option1",
              {
                label: [
                  "Option2",
                  <HelpTooltip
                    key="help"
                    iconColor="grey50"
                    size="xs"
                    text="Option2 HelpTooltip"
                  />,
                ],
                value: "Option2",
              },
            ]}
            value={selected1}
            onChange={this.handleClick1}
          />

          <RadioGroup
            isInline={isInline}
            size={size}
            disabled={disabled}
            options={["Invalid1", "Invalid2"]}
            value={selected2}
            isInvalid={true}
            onChange={this.handleClick2}
          />
        </DeprecatedVerticalGroup>
      </ThemeProvider>
    );
  }
}
