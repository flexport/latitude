/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";
import FormSection from "../FormSection";
import FormRow from "../FormRow";
import Label from "../../Label";
import TextInput from "../../TextInput";

/**
 * @title Basic Usage
 * @description A simple form can be composed from a single FormSection and a number of FormRows
 */
export default function FormSectionBasic() {
  return (
    <FormSection columns={2} columnGap={20} minColumnWidth={160}>
      <FormRow columnSpans={[1, 1]}>
        <Label value="First name">
          <TextInput
            disabled={false}
            isInvalid={false}
            onChange={() => undefined}
            placeholder=""
            size="m"
            value=""
          />
        </Label>
        <Label value="Last name">
          <TextInput
            disabled={false}
            isInvalid={false}
            onChange={() => undefined}
            placeholder=""
            size="m"
            value=""
          />
        </Label>
      </FormRow>
      <FormRow columnSpans={[2]}>
        <Label value="Email">
          <TextInput
            disabled={false}
            isInvalid={false}
            onChange={() => undefined}
            placeholder=""
            size="m"
            value=""
          />
        </Label>
      </FormRow>
    </FormSection>
  );
}
