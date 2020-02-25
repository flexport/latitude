/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {type DemoFile, bool, list} from "../demoTypes";
import Group from "../Group";
import CheckboxList from "../CheckboxList";
import {characters} from "../tools/demo";

const demos: DemoFile = {
  demos: [
    {
      type: "full",
      knobs: {
        isInline: bool(true),
        gap: list([
          {value: "4", label: "4px"},
          {value: "8", label: "8px"},
          {value: "12", label: "12px"},
          {value: "16", label: "16px"},
          {value: "20", label: "20px"},
        ]),
      },
      example: (elementToCodeFn, knobs) => {
        const component = (
          <Group flexDirection="column" gap={40}>
            <CheckboxListShim elementToCodeFn={elementToCodeFn} {...knobs} />
          </Group>
        );

        return component;
      },
    },
  ],
};

type Props = {|
  +elementToCodeFn: React.Node => void,
  isInline: boolean,
  gap: number,
|};

function CheckboxListShim({elementToCodeFn, ...checkboxListProps}: Props) {
  const [checked, setChecked] = React.useState([]);

  const checkboxList = (
    <CheckboxList
      values={checked}
      onChange={setChecked}
      options={characters.slice(0, 5).map(character => ({
        value: character.name,
        label: character.name,
      }))}
      {...checkboxListProps}
    />
  );

  elementToCodeFn(checkboxList);

  return checkboxList;
}

export default demos;
