/**
 * TEAM: frontend_infra
 *
 * @flow
 */
import PayloadSources from "../constants/PayloadSources";
import {ActionTypes} from "./Constants";
import type {ToastRecord} from "./ToastStore";
import Toast from "./Toast";
import FluxDispatcher from "../tools/FluxDispatcher";

const ToastActions = {
  ActionTypes,
  source: PayloadSources.TOAST,

  show(
    toastProps: React.ElementConfig<typeof Toast>,
    removeAfter: number = 3000
  ) {
    FluxDispatcher.handleViewAction(PayloadSources.TOAST, {
      actionType: ActionTypes.SHOW,
      toast: {
        ...toastProps,
        removeAfter,
      },
      removeAfter,
    });
    if (__TEST_ENV__) global.testHook.addToast(toastProps.message);
  },

  remove(toast: ToastRecord) {
    FluxDispatcher.handleViewAction(PayloadSources.TOAST, {
      actionType: ActionTypes.REMOVE,
      toast,
    });
  },
};

export default ToastActions;
