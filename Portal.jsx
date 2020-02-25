/**
 * TEAM: frontend_infra
 * @flow strict
 */
import * as React from "react";
import ReactDOM from "react-dom";
import invariant from "./tools/invariant";

type Props = {|
  +children: React.Node,
|};

/**
 * @short Wrap Popper components with Portal for popper overlay management.
 * @category Layout
 * @status Beta
 * @brandStatus V3
 *
 * Wrapper to place any element into the body of the dom. Should be used for
 * components like a Takeover.
 */
function Portal({children}: Props): React.Portal {
  invariant(document.body !== null);
  return ReactDOM.createPortal(children, document.body);
}

export default Portal;
