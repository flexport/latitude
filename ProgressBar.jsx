/**
 * TEAM: frontend_infra
 * @flow strict
 */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import latitudeColors from "./colors";

type Props = {|
  /** The content that is loading */
  +children?: React.Node,
  /** The loader will take care of the show hide logic. Pass your loading conditional here and wrap your data with this loader. */
  +loaded: boolean,
  /** Whether the loader spans the full width of it's container */
  +isFullWidth?: boolean,
  /** Deprecated! Do not use the overlay prop. */
  +overlay?: boolean,
|};

const LOADER_WIDTH = 50;
const LOADER_BORDER = 4;

/**
 * @short A pure CSS progress bar with an indeterminate loading animation.
 * @brandStatus V2
 * @status Stable
 * @category Data Display
 *
 * Indefinite progress bars should be used to indicate that data is loading and will take an unknown amount of time. Progress bars are best used in information-dense UIs like data tables.
 */
export default function ProgressBar({
  children = <span />,
  loaded,
  isFullWidth = true,
  overlay = false,
}: Props) {
  if (loaded) {
    return <span>{children}</span>;
  }

  return (
    <span>
      <div className={css(styles.overlayContainer)}>
        <div
          className={css(
            styles.base,
            isFullWidth && styles.fullWidth,
            overlay && styles.overlayElement
          )}
        >
          <div
            className={css(
              styles.indeterminateLoading,
              isFullWidth && styles.fullWidthIndeterminateLoading
            )}
          />
        </div>
      </div>
    </span>
  );
}

const indeterminateLoader = {
  from: {
    left: -(LOADER_WIDTH / 4),
    width: "30%",
  },
  "50%": {
    width: "30%",
  },
  "70%": {
    width: "70%",
  },
  "80%": {
    left: "50%",
  },
  "95%": {
    left: "120%",
  },
  to: {
    left: "100%",
  },
};

const fullWidthIndeterminateLoader = {
  from: {
    left: -(LOADER_WIDTH / 3.5),
    width: "0%",
  },
  "25%": {
    width: "10%",
  },
  "50%": {
    width: "30%",
  },
  "70%": {
    width: "70%",
  },
  "80%": {
    left: "50%",
  },
  "95%": {
    left: "120%",
  },
  to: {
    left: "100%",
  },
};

const lightPrimary = latitudeColors.grey40;
const darkPrimary = latitudeColors.grey60;

const progress = {
  "100%, 0%": {
    backgroundColor: lightPrimary,
  },
  "40%": {
    backgroundColor: darkPrimary,
  },
  "66%": {
    backgroundColor: lightPrimary,
  },
  "80%, 90%": {
    backgroundColor: darkPrimary,
  },
};

const styles = StyleSheet.create({
  base: {
    height: LOADER_BORDER,
    width: LOADER_WIDTH,
    position: "relative",
    overflow: "hidden",
    backgroundColor: latitudeColors.grey20,
  },
  indeterminateLoading: {
    display: "block",
    position: "absolute",
    left: -(LOADER_WIDTH / 4),
    width: LOADER_WIDTH / 4,
    height: LOADER_BORDER,
    backgroundColor: lightPrimary,
    animationName: [indeterminateLoader, progress],
    animationDuration: "2s, 6s",
    animationTimingFunction: "linear, ease-in-out",
    animationIterationCount: "infinite, infinite",
  },
  fullWidth: {
    width: "100%",
  },
  fullWidthIndeterminateLoading: {
    left: "-25%",
    width: "25%",
    animationName: [fullWidthIndeterminateLoader, progress],
  },
  overlayContainer: {
    position: "relative",
  },
  overlayElement: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(255,255,255,0.78)",
  },
});
