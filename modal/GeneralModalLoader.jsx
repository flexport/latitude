/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {css, StyleSheet} from "aphrodite";

import Loader from "../Loader";
import ToastActions from "../toast/ToastActions";
import StaticGeneralModalLoader from "./StaticGeneralModalLoader";
import invariant from "../tools/invariant";
import {deprecatedPaddingSizeConstants} from "../styles";

type Props<C, K: React.ComponentType<C>> = {|
  +_debug: {
    preModalDelayMillis: number,
    afterModalIsOpenMinLoaderDisplayMillis: number,
    onCloseAfterErrorDelayMillis: number,
    timeoutMillis: number,
  },
  +children: (
    WrappedComponent: K,
    loaderCallbacks: {
      setTitle: string => void,
    }
  ) => React.Node,
  +component: () => Promise<{
    default: K,
  } | void>,
  +onClose: () => void,
  +title: string,
  /** will determine the max width of the standard modal, to see what sizes these correspond to check CustomModal. */
  +width: "s" | "m" | "l",
|};

type State<C, K: React.ComponentType<C>> = {
  shouldRenderBaseModal: boolean,
  loadedModule?: K,
  currentPhase: AnimationState,
  title: string,
};
// We show a blank title when the actual title is not yet provided from the dynamic module
const LOADING_TITLE = "";

// Amount of time in milliseconds for modal to transition onto the screen. Need this for modal animations with no flickering
const MODAL_TRANSITION_TIME_IN_MS = 450;

type AnimationState =
  // We delay here in case we are able to download the user's modal in time to display during modal transition
  | "PRE_MODAL"
  // State for when the modal is transitioning into being displayed (showing the loading spinner)
  | "MODAL_LOADING"
  // State for when we display modal form
  | "SHOW_CONTENT"
  // State for when we need a delay to close modal in a timeout
  | "TIMEOUT";

type TimerArg = {delay: number, callback: () => void};
/**
 * ModalTimers class represents a group of timers which are required to make dynamic modal's animation timings work correctly.
 */
class Timers {
  constructor(timerParams: {[string]: TimerArg}) {
    // Sets up timer delays for initial modal render, transition and timeout events
    Object.keys(timerParams).forEach(key => {
      this.timerIDMap[key] = setTimeout(
        timerParams[key].callback,
        timerParams[key].delay
      );
    });
  }
  /**
   *  We keep a map of timer id variables so that we can clear them at the end
   * */
  timerIDMap: {[string]: TimeoutID} = {};

  clearTimersAndIntervals(): void {
    Object.keys(this.timerIDMap).forEach(key => {
      clearTimeout(this.timerIDMap[key]);
    });
  }
}

/**
 * @category Overlay
 * @short GeneralModalLoader loads modal content dynamically and it should used in favor of static modals for dependency/code heavy modals.
 *
 * A shell modal UI that meets the animation needs of dynamic modals, with a title / subtitle and close icon on the top.
 * In contrast to [StaticGeneralModalLoader](/design/components/StaticGeneralModalLoader) which loads modal content statically, GeneralModalLoader loads modal content dynamically using a promise.
 *
 * **How to create dynamic modals:**
 *
 * 1. Put all modal dependencies and content in a file and wrap the exported component in a GeneralModalBody. See [GeneralModalBody docs](/design/components/GeneralModalBody) for modal body component details.
 *
 * 2. In the component which you want to render the modal, use GeneralModalLoader with the exported component as child.
 *
 * **How it works**
 *
 * By design, GeneralModalLoader is responsible to initially render the outer modal box, which decides to show modal body or loader depending on the arrival of data.
 * Additional behavior to note is that the modal should show the loading circle if the data takes longer than 50ms to load.
 * However, if the modal data chunk was already loaded (it was opened previously) or if the modal data gets downloaded in under 50ms, then we show the modal directly.
 *
 * @brandStatus V2
 * @status Stable
 * @extends React.Component */
export default class GeneralModalLoader<
  K,
  C: React.ComponentType<K>
> extends React.PureComponent<Props<K, C>, State<K, C>> {
  constructor(props: Props<K, C>) {
    super(props);
    this.state = {
      // we wait before initiating the modal animation, in vain hope that we download the chunk before this process begins
      shouldRenderBaseModal: false,
      currentPhase: "PRE_MODAL",
      title: this.props.title,
    };
  }
  errorOnCloseTimerId: TimeoutID;

  modalTimers: Timers;
  static defaultProps = {
    title: LOADING_TITLE,
    _debug: {
      preModalDelayMillis: 50,
      afterModalIsOpenMinLoaderDisplayMillis: 2000,
      onCloseAfterErrorDelayMillis: 5000,
      timeoutMillis: 10000,
    },
    width: "m",
  };

  /**
   * fetchComponent fetches the form data dynamically at the same time
   * makes sure all the animations are done on time with no flicking
   */
  fetchComponent() {
    this.props
      .component()
      .then(result => {
        invariant(
          typeof result !== "undefined",
          "void result means there's an error, and it must be caught!"
        );
        this.setState(prevState => {
          // This means that we got our data earlier than the initial render delay time so we don't need to show the loading screen
          if (prevState.currentPhase === "PRE_MODAL") {
            this.clearAllTimers();
            return {
              loadedModule: result.default,
              shouldRenderBaseModal: true,
              currentPhase: "SHOW_CONTENT",
            };
          }
          // If our data loads later than the initial render delay time, we show loading screen
          return {
            loadedModule: result.default,
          };
        });
      })
      .catch(error => {
        this.modalTimers.clearTimersAndIntervals();
        ToastActions.show({
          message: `Modal data: ${error}. Please reload the page.`,
          intent: "danger",
        });
        this.errorOnCloseTimerId = setTimeout(() => {
          this.props.onClose();
        }, this.props._debug.onCloseAfterErrorDelayMillis);
      });
  }
  clearAllTimers = () => {
    this.modalTimers.clearTimersAndIntervals();
    clearTimeout(this.errorOnCloseTimerId);
  };
  componentDidMount() {
    const {
      preModalDelayMillis,
      timeoutMillis,
      afterModalIsOpenMinLoaderDisplayMillis,
    } = this.props._debug;

    // Transition delay calculation since there are 2 things we have to take into account for modal loading:
    // transition time and the minimum amount of time we want to show the loader
    const totalDelayTime =
      MODAL_TRANSITION_TIME_IN_MS + afterModalIsOpenMinLoaderDisplayMillis;

    // Initializing modal timers with delays and callbacks so that we'll not need to worry about it later
    this.modalTimers = new Timers({
      baseModalRender: {
        delay: preModalDelayMillis,
        callback: () => this.timerCallback("MODAL_LOADING"),
      },
      transition: {
        delay: totalDelayTime,
        callback: () => this.timerCallback("SHOW_CONTENT"),
      },

      timeout: {
        delay: timeoutMillis,
        callback: () => this.timerCallback("TIMEOUT"),
      },
    });
    // Start to dynamically fetch modal component
    this.fetchComponent.bind(this)();
  }
  componentWillUnmount() {
    this.clearAllTimers();
  }

  timerCallback(changeToPhase: AnimationState): void {
    switch (changeToPhase) {
      case "TIMEOUT":
        // this is technically unnecessary since timeout is the last message, but in testing, we don't want the modal to show up after the timeout event has called (to make the behaviour more predictable)
        this.clearAllTimers();
        ToastActions.show({
          message: "Modal data timeout. Modal will close in 5 seconds...",
          intent: "danger",
        });
        this.setState({
          currentPhase: "TIMEOUT",
        });
        this.errorOnCloseTimerId = setTimeout(() => {
          this.props.onClose();
        }, this.props._debug.onCloseAfterErrorDelayMillis);
        break;
      case "MODAL_LOADING":
        this.setState({
          shouldRenderBaseModal: true,
          currentPhase: "MODAL_LOADING",
        });
        break;

      case "SHOW_CONTENT":
        this.setState({
          // Setting shouldRenderBaseModal to true here since data chunk might be received before our initial render delay ends
          shouldRenderBaseModal: true,
          currentPhase: "SHOW_CONTENT",
        });
        this.clearAllTimers();

        break;

      default:
    }
  }

  setTitle = (title: string): void => {
    this.setState({title});
  };

  render() {
    return (
      <>
        {this.state.shouldRenderBaseModal ? (
          <StaticGeneralModalLoader
            onRequestClose={this.props.onClose}
            title={this.state.title}
            width={this.props.width}
          >
            <div
              className={css(
                !(
                  this.state.loadedModule &&
                  this.state.currentPhase === "SHOW_CONTENT"
                ) && styles.loaderContent
              )}
            >
              {/* Need to show loader if module is not yet loaded, else we show the modal content */}
              {this.state.loadedModule &&
              this.state.currentPhase === "SHOW_CONTENT" ? (
                this.props.children(this.state.loadedModule, {
                  setTitle: this.setTitle,
                })
              ) : (
                <div className={css(styles.loaderWrapper)}>
                  <Loader isFullWidth={true} loaded={false} />
                </div>
              )}
            </div>
          </StaticGeneralModalLoader>
        ) : null}
      </>
    );
  }
}

const styles = StyleSheet.create({
  loaderWrapper: {paddingTop: deprecatedPaddingSizeConstants.s},
  loaderContent: {
    maxHeight: "150px",
    height: "150px",
  },
});
