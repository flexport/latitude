/**
 * TEAM: frontend_infra
 * @flow strict
 */

import * as React from "react";

/**
 * Creates timeouts that properly clear timeoutIds on component unmount
 */
function useSetTimeout() {
  const timeoutIds = React.useRef([]).current;

  React.useEffect(
    () =>
      // Do nothing onMount, clear timeouts on unMount
      () => timeoutIds.forEach(timeoutId => clearTimeout(timeoutId)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const timeout = (callback: () => void, duration: number) => {
    const timeoutId = setTimeout(callback, duration);

    timeoutIds.push(timeoutId);
  };

  return timeout;
}

export default useSetTimeout;
