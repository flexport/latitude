/**
 * TEAM: frontend_infra
 *
 * @flow strict
 */

/**
 * Helper function that takes responsibility for bootstrapping a React component into
 * a DOM element using a given set of props.
 *
 * See comments below for why this is in a helper.
 */

import * as React from "react";
import ReactDOM from "react-dom";

export default function launchWhenReady<Props>(
  Component: React.ComponentType<Props>,
  props: Props,
  container: HTMLElement
) {
  /**
   * TODO(slybeck) In theory we can mount the app immediately instead of waiting for
   * DOMContentLoaded. In that case, I'd offload the ReactDOM render call to the loader
   * components and scrap this helper.
   *
   * However, as of now (2 Oct 2019), there is an unclear dependency that causes integration
   * tests to fail unless the ReactDOM.render() call happens after DOMContentLoaded. For
   * now I'd rather hide that complexity inside this helper instead of a variety of
   * different loaders.
   */
  function renderComponent() {
    ReactDOM.render(<Component {...props} />, container);
  }
  if ("addEventListener" in window) {
    document.addEventListener("DOMContentLoaded", renderComponent);
  } else {
    // add support to IE8 without jQuery
    window.attachEvent("onload", renderComponent);
  }
}
