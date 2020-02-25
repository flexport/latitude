/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {uniqueId} from "lodash";
import {css, StyleSheet} from "aphrodite";
import connectToStores from "../connectors/connectToStores";
import {isTestEnvironment} from "../tools/test";
import StaticModalLegacyContext, {
  type StaticModalLegacyContextType,
} from "./StaticModalLegacyContext";

// eslint-disable-next-line import/no-named-as-default
import ModalStoreNew from "./CustomModalStore";
import ModalActions from "./CustomModalActions";

type ModalType = any;

// Modal has side effects that break server side rendering. Can only import it if we are in a valid environment.
// We set the Modal component equal to the default export from the Modal library.
let Modal: ?ModalType;
if (
  !isTestEnvironment() &&
  window !== "undefined" &&
  window.document &&
  window.document.getElementsByTagName
) {
  // eslint-disable-next-line global-require
  const modal = require("react-modal");
  // eslint-disable-next-line autofix/no-unused-vars,global-require
  const unusedCss = require("../vendor_stylesheets/react_modal.css");
  // should only perform this on the client. server side rendering doesn't have a document tag.
  // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
  modal.setAppElement(document.getElementsByTagName("body")[0]);
  Modal = modal;
}

type CloseOptions = {
  onRequestClose: () => void,
  shouldCloseOnEsc?: boolean,
  shouldCloseOnOverlayClick?: boolean,
};

export type ModalProps = {|
  /**
   * Not recommended to use this property.
   * If you decide to have this modal always rendered, use isOpen to control if it's open or closed.
   * Generally, it's better to have logic like: {isModalOpen ? <CustomModal /> : null}, because that
   * way there is a fresh new component in between modal toggles (otherwise form state would be maintined, etc.)
   * TODO(uforic): This has a default value of true, but HOCs don't handle default prop type resolution.
   */
  +isOpen?: boolean,
  /**
   * Close options are optional; if specified, they require at least an onRequestClose function.
   * Currently, we support "shouldCloseOnEsc" and "shouldCloseOnOverlayClick", which are disabled by default.
   */
  +closeOptions?: CloseOptions,
  /** Defines the style object of the black overlay */
  +overlayClassName?: string,
  /**
   * Defines the style object of the holding container that appears on the black overlay.
   * Required, but it is recommended that you start from the defaultModalStyles, defined and exported in
   * this file, which will set up the box shadow, border, etc. If you'd like to have a fixed width modal,
   * please choose from the sizes exported in defaultModalStyles, or add another size if it's likely to be reused.
   * Lastly, StaticGeneralModalLoader is implemented with customModal, so check it out to see how to use CustomModal.
   */

  +className: string,
  /** body of the modal */
  +children: React.Node,
|};

type ModalStoreProps = {|
  +visibleModal: $ReadOnlyArray<{|
    +uniqueId: string,
  |}>,
|};

type CombinedProps = {|
  ...ModalStoreProps,
  ...ModalProps,
|};

const defaultCloseOptions = {
  shouldCloseOnEsc: true,
  shouldCloseOnOverlayClick: false,
};

/**
 * @category Overlay
 * @short Full screen takeover, an semi-transparent black canvas drawn over the page.
 * @brandStatus V2
 * @status In Review
 * Avoid using this modal if you can; we have GeneralModalLoader, AlertModal, and ConfirmationModal for most use cases.
 * To use this modal, provide a css class that contains all the desired styles for the content pane. You'll likely
 * want to use the majority of the default styles for modals, which are exported from this file.
 * it will look like:
 *
 * ```
 * css(defaultModalStyles.content, your.custom.styles);
 * ```
 *
 * The most important style to specify yourself is maxWidth; without it, your modal will take up the whole screen.
 *
 * You may be tempted to use isOpen to toggle between modal visible states. Think twice about this - 95% of modal use cases
 * you _want_ the modal to unmount as it becomes visible / hidden. Otherwise, things like form state from the previous modal
 * opening may persist through. By default `isOpen` is true, and we recommend toggling it via {this.state.isModalShowing ? <CustomModal /> : null}
 *
 * Note: Don't instantiate this using ModalStore.show(). This component handles adding and removing itself from global
 * state when you mount it and its value is set to isOpen, and hides itself when it is unmounted or isOpen is set to false.
 *
 * **Testing**
 *
 * During unit tests, CustomModal will render into the DOM where you've placed it in the render function. This differs from its behavior on a browser,
 * where it renders into a react-portal at the top level (attached to the <body> of a page). This should make it easy to test toggling modal visibility.
 *
 * Technically, there is one last hurdle for visibility beyond rendering something that uses CustomModal. This is whether or not the global ModalStoreNew
 * is rendering the modal. If there is more than one, it will just render the last one in the list. In your test, you can call the method
 * isVisible (a method on the React class) in order to tell if your modal is the one that is being displayed.
 *
 * Uses [react-modal](https://reactcommunity.org/react-modal/).
 * @extends React.Component */
class CustomModal extends React.PureComponent<CombinedProps> {
  static defaultProps = {
    isOpen: true,
  };
  uniqueId = uniqueId("CustomModal");

  static contextType = StaticModalLegacyContext;
  context: StaticModalLegacyContextType;

  componentDidUpdate(prevProps: CombinedProps) {
    if (
      this.context.legacyMode &&
      prevProps.isOpen === true &&
      this.props.isOpen === false
    ) {
      // eslint-disable-next-line no-unused-expressions
      this.context.legacyModeHandleHidden &&
        this.context.legacyModeHandleHidden();
    }
    if (!prevProps.isOpen && this.props.isOpen) {
      ModalActions.show(this.uniqueId);
    }
    if (prevProps.isOpen && !this.props.isOpen) {
      ModalActions.hide(this.uniqueId);
    }
  }

  componentDidMount() {
    if (this.props.isOpen && this.context.legacyMode !== true) {
      // this is a hack, we need this to occur async. This is because
      // componentDidMount has not yet been called in connectToStores.
      // If we do this later with setTimeout, it will give connectToStores
      // a chance to mount, and set up the listener for the event emitter changed event,
      // so that it can capture this change in state.
      window.setTimeout(() => ModalActions.show(this.uniqueId), 0);
    }
  }

  componentWillUnmount() {
    if (this.context.legacyMode !== true) {
      ModalActions.hide(this.uniqueId);
    }
  }

  isVisible = () =>
    !!(
      (this.context.legacyMode && this.props.isOpen) ||
      (this.props.isOpen &&
        this.props.visibleModal &&
        this.props.visibleModal.find(
          modalRecord => modalRecord.uniqueId === this.uniqueId
        ))
    );

  renderTestModal() {
    return <div className={this.props.className}>{this.props.children}</div>;
  }

  renderModal(ModalComponent: ModalType) {
    const closeOptions = this.props.closeOptions
      ? {...defaultCloseOptions, ...this.props.closeOptions}
      : undefined;
    return (
      <ModalComponent
        overlayClassName={
          this.props.overlayClassName || css(defaultModalStyles.overlay)
        }
        closeTimeoutMS={450}
        isOpen={this.isVisible()}
        className={this.props.className}
        // $FlowFixMe(ctan) Flow issue from upgrade (1.111.3 => 1.115.0)
        {...closeOptions}
      >
        {this.props.children}
      </ModalComponent>
    );
  }

  render() {
    const ModalComponent = Modal;
    return ModalComponent === undefined
      ? this.renderTestModal()
      : this.renderModal(ModalComponent);
  }
}

// these styles are exported for users of CustomModal
// they have a lot of the defaults you probably want to use
// such as centering, margin from top, etc.
export const defaultModalStyles = StyleSheet.create({
  overlay: {
    zIndex: 1049, // ModalStore renders its modals with z-index 1050, we don't want to cover up error modals.
    display: "block",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "fixed",
    top: "0px",
    bottom: "0px",
    left: "0px",
    right: "0px",
    overflow: "auto",
  },
  content: {
    boxShadow: "0 3px 9px rgba(0,0,0,0.5)",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "80px",
    marginBottom: "80px",
    outline: "none",
    borderStyle: "none",
    borderRadius: "6px",
  },
  // ideally, custom modals have one of these widths
  widthSmall: {maxWidth: 360},
  widthMedium: {maxWidth: 500},
  widthLarge: {maxWidth: 760},
  // these styles are even more bare than the default content styles and are
  // only used for old components we are converting.
  legacyContentStylesDoNotUse: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "80px",
    outline: "none",
  },
});

const connector = (connectToStores(
  [ModalStoreNew],
  (propsFromParent: ModalProps): CombinedProps => ({
    closeOptions: propsFromParent.closeOptions,
    isOpen: propsFromParent.isOpen,
    overlayClassName: propsFromParent.overlayClassName,
    className: propsFromParent.className,
    children: propsFromParent.children,
    visibleModal: ModalStoreNew.getVisible(),
  })
): (React.ComponentType<CombinedProps>) => React.ComponentType<ModalProps>);

export default connector(CustomModal);

export const getWidthStyle = (width: "s" | "m" | "l") => {
  switch (width) {
    case "s":
      return defaultModalStyles.widthSmall;
    case "m":
      return defaultModalStyles.widthMedium;
    case "l":
      return defaultModalStyles.widthLarge;
    default:
      // eslint-disable-next-line no-unused-expressions
      (width: empty);
  }
};
