/**
 * TEAM: frontend_infra
 * @flow
 */

import React, {useState} from "react";

import TextInputAutocomplete from "../TextInputAutocomplete";

/**
 * @title Basic Usage
 */
export default function TextInputAutocompleteBasicUsage() {
  const suggestions = [
    "Darth Vader",
    "Anakin Skywalker",
    "Jar Jar Binx",
    "Count Dooku",
    "this is a suggestion",
    "another suggestion",
    "this is another suggestion",
  ];

  const [inputValue, setInputValue] = useState("");

  return (
    <TextInputAutocomplete
      value={inputValue}
      placeholder="enter text here"
      onChange={setInputValue}
      suggestions={suggestions}
      maximumOptions={Infinity}
    />
  );
}
