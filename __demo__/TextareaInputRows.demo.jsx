/**
 * TEAM: frontend_infra
 * @flow
 */

import React, {useState} from "react";

import TextareaInput from "../TextareaInput";

/**
 * @title Static Row Count
 * @description TextareaInput's row count can be set to a static value by specifying rows as a number
 */
export default function TextareaInputRows() {
  const [text, setText] = useState("");
  return (
    <div style={{maxWidth: 600}}>
      <TextareaInput value={text} onChange={setText} rows={4} />
    </div>
  );
}
