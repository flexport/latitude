/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow
 */

import connectToStores from "../connectors/connectToStores";
import Toaster, {
  type ToasterPropsFromParent,
  type ToasterProps,
} from "./Toaster";
// eslint-disable-next-line import/no-named-as-default
import ToastStore from "./ToastStore";

const connector = (connectToStores(
  [ToastStore],
  (propsFromParent: ToasterPropsFromParent): ToasterProps => ({
    ...propsFromParent,
    toasts: ToastStore.getAll(),
  })
): (React.ComponentType<*>) => React.ComponentType<ToasterProps>);

const ConnectedToaster = connector(Toaster);

export default ConnectedToaster;
