/**
 * TEAM: frontend_infra
 *
 * @flow strict
 */

import * as React from "react";

export type StaticModalLegacyContextType =
  | {|
      +legacyMode: false,
    |}
  | {|
      +legacyMode: true,
      +legacyModeHandleHidden?: () => void,
    |};

/* StaticModalLegacyContext is to make sure our new StaticGeneralModalLoaders/GeneralModalLoaders will not use ModalStore.show() to render.
 * The preferred way to render is to use a shouldShow boolean state variable in the component that is rendering the modal
 * to determine whether the modal gets rendered.
 */
const StaticModalLegacyContext: React.Context<StaticModalLegacyContextType> = React.createContext(
  {legacyMode: false}
);
export default StaticModalLegacyContext;
