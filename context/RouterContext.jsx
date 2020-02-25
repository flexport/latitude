/**
 * TEAM: frontend_infra
 * @flow strict
 */
import * as React from "react";
import {type BasicAnchorProps} from "../Link";

type Location = {|
  +hash: string,
  +pathname: string,
  +query: {[key: string]: string},
  +search: string,
|};

type TransitionHookResult = boolean | string | null | void;
type TransitionHook = (
  location: Location
) => TransitionHookResult | Promise<TransitionHookResult>;

export type Router = {|
  +push: string => void,
  +replace: string => void,
  +isActive: (href: string, exact?: boolean) => boolean,
  +addTransitionHook: TransitionHook => () => void,
  +RouterLink: React.ComponentType<RouterLinkProps>,
  +location: Location,
|};

export type RouterLinkProps = {|
  +disableSpaHijack: boolean,
  +exact?: boolean,
  +anchorProps: BasicAnchorProps,
|};

function ClassicRouterLink({
  disableSpaHijack,
  exact: _,
  anchorProps,
}: RouterLinkProps) {
  // TODO(dmnd): Try to enable this invariant
  // invariant(!exact, "classic app links do not have active state");
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content,react/forbid-elements
    <a
      data-ignore-spa-route={disableSpaHijack ? "true" : undefined}
      {...anchorProps}
    />
  );
}

const BLANK_ROUTER = {
  addTransitionHook: () => () => {},
  isActive: () => false,
  RouterLink: ClassicRouterLink,
  push: () => {},
  replace: () => {},
  // this won't work, but non specialist apps don't use this (yet), and it's basically window.location
  location: {
    pathname: "",
    hash: "",
    search: "",
    query: {},
  },
};

const RouterContext: React.Context<Router> = React.createContext(BLANK_ROUTER);
export default RouterContext;
