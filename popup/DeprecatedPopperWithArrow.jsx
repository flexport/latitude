/**
 * TEAM: frontend_infra
 *
 * @flow strict
 */
import * as React from "react";
import {Popper} from "react-popper";

type Placement = $PropertyType<React.ElementConfig<typeof Popper>, "placement">;

type Props = {|
  +placement?: Placement,
  +className?: string,
  +style?: {},
  +arrowStyle?: {},
  +modifiers?: $PropertyType<React.ElementConfig<typeof Popper>, "modifiers">,
  +children: React.Node,
|};

/**
 * A shim to match react-popper's old API. Don't use this for new code.
 */
export default function DeprecatedPopperWithArrow({
  placement,
  className,
  style: baseStyle,
  arrowStyle,
  children,
}: Props) {
  return (
    <Popper placement={placement}>
      {({ref, style, placement, arrowProps, scheduleUpdate}) => (
        <PopperContent
          style={baseStyle}
          className={className}
          placement={placement}
          popperProps={{
            ref,
            style,
          }}
          arrowProps={{
            ref: arrowProps.ref,
            style: {...arrowStyle, ...arrowProps.style},
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
  +placement: Placement,
  +popperProps: {
    +ref: (?HTMLElement) => void,
    +style: {+[string]: mixed},
  },
  +arrowProps: {
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
  arrowProps,
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
      <div
        ref={arrowProps.ref}
        // eslint-disable-next-line flexport/no-oocss
        className="popperArrow"
        style={arrowProps.style}
      />
      {children}
    </div>
  );
}
