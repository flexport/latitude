/**
 * TEAM: frontend_infra
 *
 * @flow strict
 */

// Needed, because flow props for aphrodite don't have _name
// will need to fix this long term
// $FlowFixMe(dnichol)
export function getNameFromStyle(style: any) {
  return style._name;
}

export function dataQa(term: string) {
  return {"data-qa": term};
}

export function isTestEnvironment() {
  return process.env.NODE_ENV === "test";
}
