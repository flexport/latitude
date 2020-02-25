/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {storiesOf} from "@storybook/react";
import {withKnobs} from "@storybook/addon-knobs";
import sections from "../sections";
import TextInputAutocomplete from "../../TextInputAutocomplete";
import DeprecatedVerticalGroup from "../../DeprecatedVerticalGroup";

const stories = storiesOf(
  `${sections.dataEntry}/Text Input Suggestions`,
  module
);
stories.addDecorator(withKnobs);
stories.add("basic usage", () => (
  <DeprecatedVerticalGroup>
    <TextInputAutocompleteHoist
      initialSuggestions={["aaa", "aaabbb", "aaabbbccc"]}
    />

    <TextInputAutocompleteHoist
      initialSuggestions={[
        "suggestion",
        "another suggestion",
        "text",
        "a very long string of text that goes on forever",
      ]}
    />
  </DeprecatedVerticalGroup>
));

type Props = {|
  +initialSuggestions: $ReadOnlyArray<string>,
|};

type State = {|
  +inputValue: string,
  +suggestions: $ReadOnlyArray<string>,
|};

class TextInputAutocompleteHoist extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      inputValue: "",
      suggestions: props.initialSuggestions,
    };
  }

  render() {
    const {inputValue, suggestions} = this.state;

    return (
      <TextInputAutocomplete
        value={inputValue}
        placeholder="enter text here"
        onChange={newValue => {
          this.setState({inputValue: newValue});
        }}
        suggestions={suggestions}
      />
    );
  }
}
