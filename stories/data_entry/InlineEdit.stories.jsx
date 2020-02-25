/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import {storiesOf} from "@storybook/react";
import sections from "../sections";
import Group from "../../Group";
import InlineEdit from "../../InlineEdit";
import TextInput from "../../TextInput";
import FloatInput from "../../FloatInput";
import SelectInput from "../../select/SelectInput";
import TextareaInput from "../../TextareaInput";
import Label from "../../Label";

const stories = storiesOf(sections.interaction, module);

stories.add("Inline Edit", () => <InlineEditHoist />);

function InlineEditHoist() {
  const [short, setShort] = React.useState("asdf");
  const [text, setText] = React.useState(
    "sadf asdf \nsd sd sadf awf sadf asdfas dawdff"
  );
  const [selected, setSelected] = React.useState("cat");
  const [number, setNumber] = React.useState(9001);

  return (
    <Group flexDirection="column" gap={20}>
      <div>Interesting Types!</div>

      <div className={css(styles.container)}>
        <Label value="Text Input" indicateRequired={true}>
          <InlineEdit value={short} onChange={setShort}>
            {/* $FlowFixMe(ctan) Flow issue from upgrade (1.111.3 => 1.115.0) */}
            {props => <TextInput {...props} />}
          </InlineEdit>
        </Label>
      </div>

      <div className={css(styles.container)}>
        <Label value="Float Input" indicateRequired={true}>
          <InlineEdit value={number} onChange={setNumber}>
            {/* $FlowFixMe(ctan) Flow issue from upgrade (1.111.3 => 1.115.0) */}
            {props => <FloatInput {...props} />}
          </InlineEdit>
        </Label>
      </div>

      <div className={css(styles.container)}>
        <Label value="Select Input" indicateRequired={true}>
          <InlineEdit value={selected} onChange={setSelected}>
            {props => (
              <SelectInput
                value={props.value}
                onChange={props.onChange}
                options={[
                  {label: "cat", value: "cat"},
                  {label: "mouse", value: "mouse"},
                  {label: "hen", value: "hen"},
                ]}
              />
            )}
          </InlineEdit>
        </Label>
      </div>

      <div className={css(styles.container)}>
        <Label value="Text Input" indicateRequired={true}>
          <InlineEdit
            editStyle="pencil"
            textWrap={true}
            value={short}
            onChange={setShort}
          >
            {/* $FlowFixMe(ctan) Flow issue from upgrade (1.111.3 => 1.115.0) */}
            {props => <TextInput {...props} />}
          </InlineEdit>
        </Label>
      </div>

      <div className={css(styles.container)}>
        <Label value="Float Input" indicateRequired={true}>
          <InlineEdit
            editStyle="pencil"
            textWrap={true}
            value={number}
            onChange={setNumber}
          >
            {/* $FlowFixMe(ctan) Flow issue from upgrade (1.111.3 => 1.115.0) */}
            {props => <FloatInput {...props} />}
          </InlineEdit>
        </Label>
      </div>

      <div className={css(styles.container)}>
        <Label value="Select Input" indicateRequired={true}>
          <InlineEdit
            editStyle="pencil"
            textWrap={true}
            value={selected}
            onChange={setSelected}
          >
            {props => (
              <SelectInput
                value={props.value}
                onChange={props.onChange}
                options={[
                  {label: "cat", value: "cat"},
                  {label: "mouse", value: "mouse"},
                  {label: "hen", value: "hen"},
                ]}
              />
            )}
          </InlineEdit>
        </Label>
      </div>

      <div className={css(styles.container)}>
        <InlineEdit textWrap={true} value={text} onChange={setText}>
          {/* $FlowFixMe(ctan) Flow issue from upgrade (1.111.3 => 1.115.0) */}
          {props => <TextareaInput {...props} rows={{min: 3, max: 10}} />}
        </InlineEdit>
      </div>

      <div className={css(styles.container)}>
        <InlineEdit
          textWrap={true}
          editStyle="pencil"
          value={text}
          onChange={setText}
        >
          {/* $FlowFixMe(ctan) Flow issue from upgrade (1.111.3 => 1.115.0) */}
          {props => <TextareaInput {...props} rows={{min: 3, max: 10}} />}
        </InlineEdit>
      </div>
    </Group>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "240px",
  },
});
