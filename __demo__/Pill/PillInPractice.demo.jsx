/**
 * TEAM: frontend_infra
 * @flow
 */

import React, {useState} from "react";
import {Form, Field} from "formula-one";

import Pill from "../../Pill";
import Label from "../../Label";
import Text from "../../Text";
import TextInput from "../../TextInput";
import Button from "../../button/Button";
import DeprecatedHorizontalGroup from "../../DeprecatedHorizontalGroup";
import DeprecatedVerticalGroup from "../../DeprecatedVerticalGroup";

/**
 * @title In-practice example
 */
export default function PillInPractice() {
  const [pills, setPills] = useState([]);

  const handleAdd = (value: string) => {
    setPills([...pills, value]);
  };

  const handleRemove = (index: number) => {
    const newPills = [...pills];
    newPills.splice(index, 1);
    setPills(newPills);
  };

  return (
    <Form initialValue="" onSubmit={handleAdd}>
      {(link, onSubmit) => (
        <DeprecatedVerticalGroup spacing="l">
          <DeprecatedHorizontalGroup crossAlign="end">
            <Field link={link}>
              {(value, _errors, onChange, onBlur) => (
                <Label value="Add a tag">
                  <TextInput
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                </Label>
              )}
            </Field>
            <Button onClick={onSubmit}>Submit</Button>
          </DeprecatedHorizontalGroup>
          <DeprecatedHorizontalGroup>
            {pills.length > 0 ? (
              pills.map((pill, i) => (
                <Pill key={pill} onDismiss={() => handleRemove(i)}>
                  {pill}
                </Pill>
              ))
            ) : (
              <Text>No tags added.</Text>
            )}
          </DeprecatedHorizontalGroup>
        </DeprecatedVerticalGroup>
      )}
    </Form>
  );
}
