/**
 * TEAM: frontend_infra
 * @flow strict
 */
/* eslint-disable global-require */
// eslint-disable-next-line no-restricted-imports
import Select, {Option, type ExternalProps as FooProps} from "react-select";

/**
 * CSS Loader only works when not server side rendered.
 */
if (typeof document !== "undefined") {
  // $FlowFixMe(uforic)
  require("../vendor_stylesheets/react-select.css");
}

export type ExternalProps = FooProps;
export default Select;
export {Option};
