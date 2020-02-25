/**
 * TEAM: frontend_infra
 * @flow strict
 */

/**
 * Use this hook to manage the loading state of your buttons
 *
 * ## Example Usage
 *
 * ```jsx
 * function SubmitButton() {
 *   const { loadingState, onBeginLoading, onSuccess, onFail } = useLoadingManager();
 *
 *   const networkRequest = () => {
 *     onBeginLoading();
 *     sleep(1000)
 *       .then(() => {
 *         onSuccess();
 *       })
 *       .catch(() => {
 *         onFail();
 *       });
 *   }
 *
 *   return (
 *     <Button
 *       isLoading={loadingState}
 *       onClick={networkRequest}
 *     >
 *       Submit
 *     </Button>
 *   );
 * }
 * ```
 */

import * as React from "react";
import useSetTimeout from "../hooks/useSetTimeout";

export type LoadingState = boolean | "success" | "failure";

const transitionDurationMS = 500;

export default function useLoadingManager() {
  const [loadingState, setLoadingState] = React.useState<LoadingState>(false);
  const setTimeout = useSetTimeout();

  const onBeginLoading = () => {
    setLoadingState(true);
  };

  const onSuccess = () => {
    setLoadingState("success");
    setTimeout(() => {
      setLoadingState(false);
    }, transitionDurationMS);
  };

  const onFail = () => {
    setLoadingState("failure");
    setTimeout(() => {
      setLoadingState(false);
    }, transitionDurationMS);
  };

  return {
    loadingState,
    onBeginLoading,
    onSuccess,
    onFail,
  };
}
