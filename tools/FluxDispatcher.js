/**
 * TEAM: frontend_infra
 * @flow strict
 */

// eslint-disable-next-line no-restricted-imports
import {defer, extend} from "lodash";
import {Dispatcher} from "flux";
import invariant from "../tools/invariant";

type Action = {
  actionType?: string,
  options?: {} | null,
};

const FluxDispatcher = extend(new Dispatcher(), {
  handleViewAction(source: string, action: Action) {
    invariant(
      source != null,
      "Did you forget to register the payload source of your new store " +
        "in PayloadSources.js? Please make sure to do that to prevent " +
        "very hard to trace bugs."
    );

    const payload = {
      source,
      action,
    };

    // TODO(dmnd): Probably we can remove this from Latitude's dispatcher.
    if (this.isDispatching()) {
      return defer(() => {
        this.dispatch(payload);
      });
    }

    this.dispatch(payload);
  },
});

export default FluxDispatcher;
