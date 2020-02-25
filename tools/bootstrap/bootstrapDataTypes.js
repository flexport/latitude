/**
 * TEAM: frontend_infra
 *
 * @flow strict
 */

export type Environment =
  | "production"
  | "staging"
  | "development"
  | "test"
  | "sandbox";

export type AppName = "DesignSystem" | "Core";

export type User = {|
  +id: number,
  +email: string,
  +username: string,
  +roles: $ReadOnlyArray<string>,
|};

export type MaybeUser = {
  +id: ?number,
  +email: ?string,
  +name: ?string,
  +roles: ?Array<string>,
};

export type MaybeClient = {
  id?: number,
  name?: string,
  segment?: string,
  feature_options?: {[string]: boolean},
};

export type Client = {|
  +id: number,
  +name: string,
  +segment: string,
|};

export type MaybeBootstrapData = ?{
  +apiKeys: ?{
    +sentry: ?{|
      +token: string,
    |},
  },
  +session: ?{
    +isImpersonating: ?boolean,
    +impersonator: ?MaybeUser,
    +isSignedIn: ?boolean,
    +active_experiments: ?{[string]: string},
  },
  +gitRevision: ?string,
  +user?: MaybeUser,
  +users: ?$ReadOnlyArray<MaybeUser>,
  +client?: MaybeClient,
  +environment: Environment,
  +isRequestFromChina: boolean,
  +hackilyRenderComponentNotApp: ?string,
};
