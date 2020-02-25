/**
 * TEAM: frontend_infra
 *
 * @flow strict
 */

/**
 * This function works with an HTML page prepared by react-rails. It finds the
 * props and DOM element which will be used to instantiate the react loader 
 * component on the page.
 * 
 * Specifically, it expects a page with:
 * 
 * 1. A single div into which the app can be bootstrapped.
 * 
 *  2. The div must have an attribute "data-react-props".

 *      The value of this attribute must be a JSON string which
 *      can be parsed and passed as props into the React component
 *      to bootstrap the app.
 */

import invariant from "../invariant";
import {type MaybeBootstrapData} from "./bootstrapDataTypes";

function getNodeFromPage(document: Document): HTMLElement {
  const node = document.querySelector("[data-react-props]");

  invariant(
    node instanceof HTMLElement,
    'Page must have an HTMLElement (usually a div) with the attribute "data-react-props" which will be the "root" DOM node of the React app'
  );

  return node;
}

function getPropsFromNode(node: HTMLElement): MaybeBootstrapData {
  // The data-react-props attribute holds JSON stringified props for initializing the
  // component
  //
  // example: `data-react-props="{\"item\": { \"id\": 1, \"name\": \"My Item\"} }"`
  const propsJson = node.getAttribute("data-react-props");

  invariant(
    propsJson !== null && propsJson !== undefined,
    'The root node element must have an attribute "data-react-props" containing a JSON string which can be parsed and passed as props into the React component to bootstrap the app'
  );

  const props = JSON.parse(propsJson);

  return props;
}

function createBrowserAppLoader() {
  /**
   * Bootstrapping the app in a browser environment is only relevant when there is a
   * 'document' and 'window' object available.
   *
   * The document object will be missing during server-side rendering / SSR. (As of
   * 24-09-2019, the window object seems to be stubbed out somehow.)
   */

  if (typeof window === "undefined" || typeof document === "undefined") {
    // Returning "null" is the agreement with consumers of createBrowserAppLoader to
    // presume there is no browser app environment and behave accordingly. (Likely
    // they're in a server-side rendering environment.)
    return null;
  }

  const container = getNodeFromPage(document);
  const rawProps = getPropsFromNode(container);

  return {container, rawProps};
}

export default createBrowserAppLoader;
