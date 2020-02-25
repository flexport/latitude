/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import ThemeNameContext, {type Theme} from "../context/ThemeNameContext";
import Portal from "../Portal";
import Takeover from "./Takeover";

type TakeoverLoaderProps<C, K: React.ComponentType<C>> = {|
  /** There should be one child, which is a lazy loaded component that returns <React.Fragment><Takeover.Header>...<Takeover.Body>...</React.Fragment> */
  +children: React.Element<K>,
  /** If lazy loading the takeover fails, or the user cancels before it is downloaded, onClose gets called. */
  +onClose: () => void,
  /** While your takeover code is loading, you need to decide what to
  display in the header. If the takeover has constant text,
  just repeat it here. If it is dynamic, you might want to put something
  like "Loading...".
  This text only appears while we are waiting for the lazy loaded
  takeover JavaScript to be executed.*/
  +title: string,
|};

/**
 * @brandStatus V2
 * @status In Review
 * @category Overlay
 * @short A loader that facilitates code splitting for Takeover components. Use of Takeover without a loader is discouraged.
 * Takeovers are a pattern that are discouraged. They came into existence because of the difficulty
 * in creating new routes and new pages; it seemed easier to use JavaScript to create "new pages" in
 * takeovers.
 *
 * The reasons against using takeovers are:
 *
 * * You should just make a page for that, most likely.
 * * Historically, they have been bad for code splitting. All takeover code is loaded with the page that generates the takeover.
 *
 *
 * This TakeoverLoader component aims to alleviate the second of those problems.
 *
 * 1. Simply make a component that returns a React.Fragment, where within the fragment you've instatiated Takeover.Header and Takeover.Body.
 *
 * 2. Dynamically import that Takeover component, like: `const TakeoverComponent = import(<path here>)`.
 *
 * 3. Instantiate `TakeoverComponent` as a child of `TakeoverLoader`.
 *
 * @extends React.Component */
export default class TakeoverLoader<
  C,
  K: React.ComponentType<C>
> extends React.PureComponent<TakeoverLoaderProps<C, K>> {
  static contextType = ThemeNameContext;
  context: Theme;

  render() {
    const {children, title} = this.props;
    return (
      <Portal>
        <Takeover.DeprecatedWrapperUseLoaderInstead visible={true}>
          <React.Suspense
            fallback={
              <Takeover.Header
                onDismiss={this.props.onClose}
                title={title}
                theme={this.context}
              />
            }
          >
            {children}
          </React.Suspense>
        </Takeover.DeprecatedWrapperUseLoaderInstead>
      </Portal>
    );
  }
}
