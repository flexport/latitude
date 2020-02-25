/**
 * TEAM: frontend_infra
 * @flow strict
 */
import * as React from "react";
import stringOrFalse from "./stringOrFalse";

export default function getHocDisplayName(
  hocName: string,
  Component: React.ComponentType<*>
) {
  const innerName = stringOrFalse(
    stringOrFalse(Component.displayName) || Component.name
  );
  if (innerName) {
    return `${hocName}(${innerName})`;
  }
  return hocName;
}
