/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow strict
 */

import * as React from "react";
import {css, StyleSheet} from "aphrodite";
import latitudeColors from "./colors";

type Props = {|
  /** The content that is loading */
  +children?: React.Node,
  /** The loader will take care of the show hide logic. Pass your loading conditional here and wrap your data with this loader. */
  +loaded: boolean,
  /** Whether the loader spans the full width of it's container */
  +isFullWidth?: boolean,
  /** Optionally specify a size for the loader. By default the loader is 50px. */
  +size?: number,
  /** Deprecated! Do not use the overlay prop. */
  +overlay?: boolean,
|};

const LOADER_SIZE = 50;

const rotateKeyframes = {
  "100%": {
    transform: "rotate(360deg)",
  },
};

const styles = StyleSheet.create({
  center: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  circularWrapper: {
    position: "relative",
    display: "inline-block",
  },
  loader: {
    animationName: rotateKeyframes,
    animationDuration: "2s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    transformOrigin: "center center",
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
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
  fullWidthContainer: {
    width: "100%",
  },
});

type KeyframeColors = {|
  +light: string,
  +medium: string,
  +dark: string,
|};

const cyclePrimaryKeyframes = ({light, medium, dark}: KeyframeColors) => ({
  "100%, 0%": {
    stroke: medium,
  },
  "40%": {
    stroke: dark,
  },
  "66%": {
    stroke: light,
  },
  "80%, 90%": {
    stroke: dark,
  },
});

const indefiniteKeyframes = {
  "0%": {
    strokeDasharray: "1, 200",
    strokeDashoffset: "0",
  },
  "50%": {
    strokeDasharray: "89, 200",
    strokeDashoffset: "-35px",
  },
  "100%": {
    strokeDasharray: "89, 200",
    strokeDashoffset: "-124px",
  },
};

const keyframeColors = {
  light: latitudeColors.grey40,
  medium: latitudeColors.grey50,
  dark: latitudeColors.grey60,
};

const spinnerStyles = StyleSheet.create({
  loaderPath: {
    animationName: [indefiniteKeyframes, cyclePrimaryKeyframes(keyframeColors)],
    animationDuration: "1.5s, 6s",
    animationTimingFunction: "ease-in-out, ease-in-out",
    animationIterationCount: "infinite, infinite",
    strokeDashoffset: 0,
  },
});

/**
 * @short A pure CSS loader with an indeterminate loading animation that should be used as a placeholder element to indicate that data is loading.
 * @brandStatus V2
 * @status Stable
 * @category Data Display
 */
function Loader({
  children,
  loaded,
  isFullWidth = true,
  size = LOADER_SIZE,
  overlay = false,
}: Props) {
  const loader = (
    <div className={css(styles.overlayContainer)}>
      <div
        className={css(
          styles.circularWrapper,
          isFullWidth && styles.center,
          overlay && styles.overlayElement
        )}
        style={{width: size, height: size}}
      >
        <svg className={css(styles.loader)} viewBox="25 25 50 50">
          <circle
            className={css(spinnerStyles.loaderPath)}
            cx="50"
            cy="50"
            r="20"
            fill="none"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
        </svg>
      </div>
    </div>
  );

  return (
    <span className={css(isFullWidth && styles.fullWidthContainer)}>
      {loaded === false ? loader : children}
    </span>
  );
}

export default Loader;
