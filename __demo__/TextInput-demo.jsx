/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow
 */

import * as React from "react";
import {css} from "aphrodite";
import TextInput, {type TextInputType} from "../TextInput";
import {
  type DemoFile,
  text,
  bool,
  textAlignKnob,
  demoCommonStyles,
  textInputSizeKnob,
  list,
  type Option,
} from "../demoTypes";
import TextInputPrefixSuffix from "./TextInputPrefixSuffix.demo";

const textInputTypes: $ReadOnlyArray<Option<TextInputType>> = [
  "text",
  "password",
  "email",
].map(type => ({
  value: type,
  label: type,
}));

const knobs = {
  disabled: bool(false),
  readOnly: bool(false),
  isInvalid: bool(false),
  isPrefilled: bool(false),
  size: textInputSizeKnob,
  textAlign: textAlignKnob,
  placeholder: text(),
  type: list(textInputTypes),
};

const demos: DemoFile = {
  demos: [
    {
      type: "full",
      example: (elementToCodeFn, demoProps) => (
        <TextInputShim
          elementToCodeFn={elementToCodeFn}
          demoProps={demoProps}
        />
      ),
      knobs,
    },
    {
      type: "live",
      example: TextInputPrefixSuffix,
    },
  ],
};

function TextInputShim({elementToCodeFn, demoProps}: any) {
  const [value, setValue] = React.useState("");

  const element = (
    <div className={css(demoCommonStyles.smallWrapper)}>
      <TextInput value={value} onChange={setValue} {...demoProps} />
    </div>
  );

  if (elementToCodeFn) elementToCodeFn(element);

  return element;
}

export default demos;
