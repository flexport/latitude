/**
 * TEAM: frontend_infra
 */

// @flow strict

import onClickOutside from "react-onclickoutside";

// IE11 doesn't support classList for SVG elements. The author of
// react-onclickoutside doesn't want to include a shim in his library, so
// we have to do this.
// https://github.com/Pomax/react-onclickoutside#ie-does-not-support-classlist-for-svg-elements
// (We dynamically require so the polyfill doesn't execute on the server.)
if (typeof window !== "undefined" && window.document) {
  // eslint-disable-next-line global-require
  require("classlist-polyfill");
}

export default onClickOutside;
