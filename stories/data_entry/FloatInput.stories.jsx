/**
 * TEAM: frontend_infra
 * WATCHERS: uforic
 *
 * @flow
 */

import * as React from "react";
import {storiesOf} from "@storybook/react";
import sections from "../sections";
import FloatInput from "../../FloatInput";

const stories = storiesOf(`${sections.dataEntry}/Float Input`, module);
stories.add("FloatInput", () => <FloatInputHoist />);

function FloatInputHoist() {
  const [floatValue, setFloatValue] = React.useState(null);

  return <FloatInput value={floatValue} onChange={setFloatValue} prefix="$" />;
}
