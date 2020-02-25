/**
 * TEAM: frontend_infra
 *
 * @flow strict
 */
import * as React from "react";
import {Popper} from "react-popper";

type Props = {|
  +placement?: $PropertyType<React.ElementConfig<typeof Popper>, "placement">,
  +className?: string,
  +style?: {},
  +modifiers?: $PropertyType<React.ElementConfig<typeof Popper>, "modifiers">,
  +children: React.Node,
|};

/**
 * A shim to match react-popper's old API. Don't use this for new code.
 */
export default function DeprecatedPopper({
  placement,
  className,
  style: baseStyle,
  children,
}: Props) {
  return (
    <Popper placement={placement}>
      {({ref, style, placement, scheduleUpdate}) => (
        <PopperContent
          style={baseStyle}
          className={className}
          placement={placement}
          popperProps={{
            ref,
            style,
          }}
          scheduleUpdate={scheduleUpdate}
        >
          {children}
        </PopperContent>
      )}
    </Popper>
  );
}

type DeprecatedPopperContentProps = {|
  +style: ?{+[string]: mixed},
  +className: ?string,
  +placement: $PropertyType<React.ElementConfig<typeof Popper>, "placement">,
  +popperProps: {
    +ref: (?HTMLElement) => void,
    +style: {+[string]: mixed},
  },
  +scheduleUpdate: () => void,
  +children: React.Node,
|};

function PopperContent({
  style,
  className,
  placement,
  popperProps,
  scheduleUpdate,
  children,
}: DeprecatedPopperContentProps) {
  React.useEffect(() => {
    setTimeout(() => {
      scheduleUpdate();
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [className, placement, style]);

  return (
    <div
      ref={popperProps.ref}
      style={popperProps.style}
      className={className}
      data-placement={placement}
    >
      {children}
    </div>
  );
}
