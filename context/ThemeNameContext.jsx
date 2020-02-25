/**
 * TEAM: frontend_infra
 *
 * @flow strict
 */

import * as React from "react";
import {iconColor} from "../dispatch/styles/colors";
import stringOrFalse from "../tools/stringOrFalse";

export {iconColor};

export type Theme = "Base" | "Transmission";
export const BASE: Theme = "Base";
export const TRANSMISSION: Theme = "Transmission";

const ThemeNameContext: React.Context<Theme> = React.createContext(BASE);
export default ThemeNameContext;

type ProviderType = {
  +theme: Theme,
  +children?: React.Node,
};

export function ThemeProvider(props: ProviderType) {
  return (
    <ThemeNameContext.Provider value={props.theme}>
      {props.children}
    </ThemeNameContext.Provider>
  );
}

export type AcceptsTheme = {
  +theme: Theme,
};

/**
 * Wraps a component which expects a theme in a typesafe consumer.
 *
 * Since the themed component is functional, it cannot take a ref.
 * _This is intentional._  If it were a class, the ref wouldn't do what you
 * want anyway (it would reference ThemeHOC, not WrappedComponent).
 * Building ref forwarding into the HOC breaks tests, mostly because Enzyme is
 * borked (as of 2018-08-01, see https://github.com/airbnb/enzyme/issues/1553).
 * Possible fixes:
 * - rearchitect the solution to avoid refs;
 * - give the wrapped component a receiver function prop and provide `this` as
 *   the parameter on mounting, for example
 *   https://github.com/flexport/flexport/pull/29063/commits/02af3dfe446f85ff1e5839ae6e9941ced0b24f62
 */
export function connectTheme<K: AcceptsTheme, C: React.ComponentType<K>>(
  WrappedComponent: C
): React.StatelessFunctionalComponent<
  $Diff<React.ElementConfig<C>, AcceptsTheme>
> {
  const name =
    stringOrFalse(WrappedComponent.displayName) ||
    stringOrFalse(WrappedComponent.name) ||
    "Component";
  const ThemeHOC = (props: $Diff<React.ElementConfig<C>, AcceptsTheme>) => (
    <ThemeNameContext.Consumer>
      {/* $FlowFixMe(ctan) Flow issue from upgrade (1.111.3 => 1.115.0) */}
      {theme => <WrappedComponent theme={theme} {...props} />}
    </ThemeNameContext.Consumer>
  );
  ThemeHOC.displayName = `connectTheme(${name})`;
  return ThemeHOC;
}

export function appName(theme: Theme) {
  switch (theme) {
    case TRANSMISSION:
      return "Transmission";
    default:
      return "Flexport";
  }
}

export function substituteAppName(theme: Theme, message: string) {
  switch (theme) {
    case TRANSMISSION:
      return message.replace("Flexport", "Transmission");
    default:
      return message;
  }
}
