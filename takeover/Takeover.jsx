/**
 * TEAM: frontend_infra
 *
 * @flow
 */
import * as React from "react";
import classnames from "classnames";
import {css, StyleSheet} from "aphrodite";
import {CSSTransition} from "react-transition-group";
import Button from "../button/Button";
import DeprecatedHorizontalGroup from "../DeprecatedHorizontalGroup";
import {whitespaceSizeConstants} from "../styles/whitespace";
import latitudeColors from "../colors";
import Text from "../Text";

type TakeoverProps = {
  +visible: boolean,
  +children?: string | React.Node,
};

/**
 * Instead of using this wrapper (which is static, and won't code split for you), use
 * TakeoverLoader. The API is slightly different, but if you look for an example use of it,
 * converting to TakeoverLoader is trivial.
 */
function DeprecatedWrapperUseLoaderInstead({visible, children}: TakeoverProps) {
  return (
    <CSSTransition
      in={visible}
      appear={true}
      classNames={{
        appear: css(styles.takeoverAppear),
        appearActive: css(styles.takeoverAppearActive),
        enter: css(styles.takeoverEnter),
        enterActive: css(styles.takeoverEnterActive),
        exit: css(styles.takeoverExit),
        exitActive: css(styles.takeoverExitActive),
      }}
      timeout={{
        appear: 300,
        enter: 300,
        exit: 300,
      }}
    >
      <div key="takeover" className={css(styles.takeoverContent)}>
        {children}
      </div>
    </CSSTransition>
  );
}

type TakeoverHeaderProps = {
  +children?: React.Node,
  +onDismiss: () => void,
  +onSave?: () => void,
  +saveEnabled?: boolean,
  +dismissLabel?: string,
  +saveLabel?: string,
  +title: string | React.Node,
  +dismissEnabled?: boolean,
};

function TakeoverHeader({
  children,
  onDismiss,
  onSave,
  saveEnabled,
  dismissEnabled = true,
  title,
  dismissLabel = "Cancel",
  saveLabel = "Save",
}: TakeoverHeaderProps) {
  return (
    <TakeoverCustomHeader
      title={title}
      buttonGroup={
        <DeprecatedHorizontalGroup>
          <Button
            kind="hollow"
            intent="none"
            onClick={onDismiss}
            disabled={!dismissEnabled}
          >
            {dismissLabel}
          </Button>
          {onSave ? (
            <Button
              kind="hollow"
              intent="basic"
              disabled={!saveEnabled}
              onClick={onSave}
            >
              {saveLabel}
            </Button>
          ) : null}
        </DeprecatedHorizontalGroup>
      }
    >
      {children}
    </TakeoverCustomHeader>
  );
}

type TakeoverCustomHeaderProps = {|
  +children?: React.Node,
  +buttonGroup: React.Node,
  +title: string | React.Node,
|};

function TakeoverCustomHeader({
  children,
  buttonGroup,
  title,
}: TakeoverCustomHeaderProps) {
  return (
    <div className={css(styles.takeoverHeader)}>
      <div className={css(styles.takeoverHeaderTitle)}>
        <Text weight="bold" color="white">
          {title}
        </Text>
      </div>
      <div className={css(styles.takeoverHeaderContent)}>{children}</div>
      <div className={css(styles.takeoverHeaderButtons)}>{buttonGroup}</div>
    </div>
  );
}

type TakeoverBodyProps = {
  +children?: string | React.Node,
  /*
   * use `noPadding={true}` if Takeover.Body must span the width and height
   * of the screen (ie. if there is a full width table or an element
   * that uses a border or background that goes to the edge)
   */
  +noPadding?: boolean,
  /*
   * use `scrollable={true}` if Takeover.Body might have content that overflows
   * and thus needs to be scrollable.
   */
  +scrollable?: boolean,
};

// This component is wrapped in puritan() because Specview
// does not currently support functional components
function TakeoverBody({
  children,
  noPadding = false,
  scrollable = false,
}: TakeoverBodyProps) {
  const bodyClasses = classnames("flexfill", {
    pal: !noPadding,
  });
  return (
    <div className={bodyClasses} style={{height: "100vh"}}>
      {scrollable ? (
        <div style={{display: "flex", overflowY: "scroll", height: "100%"}}>
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
}

const styles = StyleSheet.create({
  takeoverAppear: {
    opacity: 0,
    transform: "translateY(200px)",
  },
  takeoverAppearActive: {
    opacity: 1,
    transform: "translateY(0)",
    transitionProperty: "opacity, transform",
    transitionDuration: "500ms, 500ms",
    transitionTimingFunction: "cubic-bezier(.42,0,.58,1)",
  },
  takeoverEnter: {
    opacity: 0,
    transform: "translateY(200px)",
  },
  takeoverEnterActive: {
    opacity: 1,
    transform: "translateY(0)",
    transitionProperty: "opacity, transform",
    transitionDuration: "500ms, 500ms",
    transitionTimingFunction: "cubic-bezier(.42,0,.58,1)",
  },
  takeoverExit: {
    opacity: 1,
    transform: "translateY(0)",
  },
  takeoverExitActive: {
    opacity: 0,
    transform: "translateY(320px)",
    transitionProperty: "opacity, transform",
    transitionDuration: "500ms, 500ms",
    transitionTimingFunction: "cubic-bezier(.42,0,.58,1)",
  },
  takeoverContent: {
    position: "fixed",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: latitudeColors.white,
    display: "flex",
    flexDirection: "column",
  },
  takeoverHeader: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: whitespaceSizeConstants.m,
    paddingRight: whitespaceSizeConstants.m,
    background: "linear-gradient(96.51deg, #272C34 7.49%, #324354 102.28%)",
    color: latitudeColors.white,
  },
  takeoverHeaderTitle: {
    display: "flex",
    alignItems: "center",
    paddingRight: whitespaceSizeConstants.l,
    paddingTop: whitespaceSizeConstants.m,
    paddingBottom: whitespaceSizeConstants.m,
    marginRight: whitespaceSizeConstants.l,
  },
  takeoverHeaderContent: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    paddingTop: whitespaceSizeConstants.m,
    paddingBottom: whitespaceSizeConstants.m,
  },
  takeoverHeaderButtons: {
    paddingTop: whitespaceSizeConstants.m,
    paddingBottom: whitespaceSizeConstants.m,
  },
});

const Takeover = {
  DeprecatedWrapperUseLoaderInstead,
  Header: TakeoverHeader,
  CustomHeader: TakeoverCustomHeader,
  Body: TakeoverBody,
};

export default Takeover;
