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
 * @title minColumnWidth is important
 * @description While specifying the number of columns will establish the basis for the form grid, specifying the minColumnWidth is crucially important for form responsiveness. The grid is auto generated based on a mixture of columns specified and minColumnWidth. If you specify 3 columns with a high minColumnWidth then it is likely that 3 columns will not fit on one line (since their collective min-widths would extend beyond the width of the container). In this case, the grid will auto-fill as many columns that will fit on one line without sacrificing the minColumnWidth.
 */
export default function FormSectionColumnWidth() {
  return (
    <FormSection columns={3} columnGap={20} minColumnWidth={140}>
      <FormRow columnSpans={[1, 1, 1]}>
        <Label value="Length">
          <TextInput
            disabled={false}
            isInvalid={false}
            onChange={() => undefined}
            placeholder=""
            size="m"
            value=""
          />
        </Label>
        <Label value="Width">
          <TextInput
            disabled={false}
            isInvalid={false}
            onChange={() => undefined}
            placeholder=""
            size="m"
            value=""
          />
        </Label>
        <Label value="Height">
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
