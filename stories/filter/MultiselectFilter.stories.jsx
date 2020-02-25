/**
 * TEAM: frontend_infra
 * WATCHERS: uforic
 *
 * @flow
 */

import * as React from "react";
import {omit} from "lodash";
import {action} from "@storybook/addon-actions";
import {storiesOf} from "@storybook/react";
import {boolean, withKnobs} from "@storybook/addon-knobs";
import sections from "../sections";
import MultiselectFilter, {type ValueObj} from "../../filter/MultiselectFilter";

const stories = storiesOf(`${sections.filter}/MultiSelect Filter`, module);
stories.addDecorator(withKnobs);
stories.add("basic usage", () => <FilterHoist {...getKnobs()} />);

const getKnobs = () => ({
  clearable: boolean("clearable", false),
  disabled: boolean("isDisabled", false),
  displaySelectAllButton: boolean("displaySelectAllButton", true),
});

type StarWarsChar = {
  name: string,
  side: string,
};

const options = [
  {
    name: "Anakin Skywalker",
    side: "Rebel Alliance",
  },
  {
    name: "Darth Vader",
    side: "Empire",
  },
  {
    name: "Yoda",
    side: "Rebel Alliance",
  },
];

const defaultState = {
  value: {type: "specificValues", specificValues: []},
};

// eslint-disable-next-line import/prefer-default-export
export class FilterHoist extends React.Component<
  {
    +clearable: boolean,
    +disabled: boolean,
  },
  {value: ValueObj<StarWarsChar>}
> {
  constructor() {
    super();
    this.state = {
      ...defaultState,
    };
  }

  handleChange = (value: ValueObj<StarWarsChar>) => {
    action("Selected")(value);
    this.setState({value});
  };

  handleRemove = () => {
    action("Cleared")();
    this.setState({value: {type: "allSelected"}});
  };

  render() {
    const parsedOptions = options.map(option => ({
      label: option.name,
      value: option,
    }));
    return (
      <div>
        <MultiselectFilter
          {...omit(this.props, "clearable")}
          label="This is a large label"
          value={this.state.value}
          options={parsedOptions}
          onChange={this.handleChange}
          onRemove={this.props.clearable ? this.handleRemove : null}
        />
      </div>
    );
  }
}
