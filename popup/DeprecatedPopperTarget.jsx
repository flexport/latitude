/**
 * TEAM: frontend_infra
 *
 * @flow strict
 */
import * as React from "react";
import {Reference} from "react-popper";

type Props = {|
  +children: React.Node,
  +onMouseEnter?: () => mixed,
  +onMouseLeave?: () => mixed,
|};

/**
 * A shim to match react-popper's old API. Don't use this for new code.
 */
export default function DeprecatedPopperTarget({children, ...divProps}: Props) {
  return (
    <Reference>
      {({ref}) => (
        <div ref={ref} {...divProps}>
          {children}
        </div>
      )}
    </Reference>
  );
}
