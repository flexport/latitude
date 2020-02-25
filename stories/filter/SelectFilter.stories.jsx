/**
 * TEAM: frontend_infra
 * WATCHERS: uforic
 *
 * @flow
 */

import * as React from "react";
import {storiesOf} from "@storybook/react";
import {boolean, withKnobs} from "@storybook/addon-knobs";
import sections from "../sections";
import SelectFilter from "../../filter/SelectFilter";

const stories = storiesOf(`${sections.filter}/Select Filter`, module);
stories.addDecorator(withKnobs);
stories.add("basic usage", () => <FilterHoist {...getKnobs()} />);

const getKnobs = () => ({
  disabled: boolean("isDisabled", false),
  isNullable: boolean("isNullable", false),
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

// eslint-disable-next-line import/prefer-default-export
export class FilterHoist extends React.Component<
  {
    +disabled: boolean,
  },
  {value: null | StarWarsChar}
> {
  constructor() {
    super();
    this.state = {
      value: null,
    };
  }

  handleChange = (value: StarWarsChar | null) => {
    this.setState({value});
  };

  render() {
    return (
      <div>
        {/* $FlowFixMe(ctan) Flow issue from upgrade (1.111.3 => 1.115.0) */}
        <SelectFilter
          {...this.props}
          label="Favorite Star Wars character"
          value={this.state.value}
          options={options.map(character => ({
            label: character.name,
            value: character,
          }))}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
