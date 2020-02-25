/**
 * TEAM: frontend_infra
 * WATCHERS: ctan
 *
 * @flow
 */

import * as React from "react";
import {isEqual} from "lodash";
import {StyleSheet, css} from "aphrodite";
import colors, {type Color} from "./colors";

export type Option = {|
  +label: string,
  +value: string,
  +disabled?: boolean,
|};

export type HighlighterProps = {|
  /** any React.Node, Highlighter will add a highlight background alongside it's children */
  +children: React.Node,
  /** color of the highlight */
  +color: Color,
  /** Ref (`React.createRef`) attached to whichever element is currently highlighted, does not have to be a direct descendent  */
  +selectionRef: {current: null | HTMLElement},
  /** default size and location of the highlighter, defaults to 0 for everything */
  +defaultSizeAndLocation?: {|
    left: number,
    top: number,
    height: number,
    width: number,
  |},
  /** if true, renders the highlight before there is a selected element, defaults to false */
  +initializeWithoutSelection?: boolean,
|};

/**
 * @short Highlighter adds a background fill to a selected element
 * @brandStatus V3
 * @status Stable
 * @category Interaction */
const Highlighter = React.memo<HighlighterProps>(function Highlighter({
  children,
  color,
  selectionRef,
  defaultSizeAndLocation = {
    left: 0,
    top: 0,
    height: 0,
    width: 0,
  },
  initializeWithoutSelection = false,
}: HighlighterProps) {
  const [sizeAndLocation, setSizeAndLocation] = React.useState(
    defaultSizeAndLocation
  );
  const [oocssWaitComplete, setOocssWaitComplete] = React.useState(false);
  const [isHighlightVisible, setIsHighlightVisible] = React.useState(false);
  const highlightTimeoutId = React.useRef();
  const showHighlight = () => {
    highlightTimeoutId.current = setTimeout(() => {
      setIsHighlightVisible(true);
    }, 0);
  };

  React.useEffect(() => {
    let oocssTimeoutId;

    if (!isHighlightVisible && initializeWithoutSelection)
      setIsHighlightVisible(true);

    // fixes bug where the background position is calculated before aphrodite styles are applied to the DOM
    if (!oocssWaitComplete) {
      oocssTimeoutId = setTimeout(setOocssWaitComplete, 0, true);
    }

    // On unmount, clear any timeouts
    return () => {
      clearTimeout(highlightTimeoutId.current);

      clearTimeout(oocssTimeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useLayoutEffect(() => {
    if (!oocssWaitComplete) return;

    const elementToHighlight = selectionRef.current;
    const newSizeAndLocation = elementToHighlight
      ? {
          left: elementToHighlight.offsetLeft,
          top: elementToHighlight.offsetTop,
          height: elementToHighlight.offsetHeight,
          width: elementToHighlight.offsetWidth,
        }
      : {
          left: 0,
          top: 0,
          height: 0,
          width: 0,
        };

    if (!isEqual(sizeAndLocation, newSizeAndLocation)) {
      setSizeAndLocation(newSizeAndLocation);

      if (
        !isHighlightVisible &&
        !initializeWithoutSelection &&
        newSizeAndLocation.width > 0 &&
        newSizeAndLocation.height > 0
      )
        showHighlight();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oocssWaitComplete, children]);

  return (
    <>
      {isHighlightVisible && (
        <div
          aria-hidden="true"
          className={css(styles.highlight)}
          style={{
            backgroundColor: colors[color],
            height: sizeAndLocation.height,
            width: sizeAndLocation.width,
            transform: `translate(${sizeAndLocation.left}px, ${
              sizeAndLocation.top
            }px)`,
          }}
        />
      )}
      {children}
    </>
  );
});

export default Highlighter;

const styles = StyleSheet.create({
  highlight: {
    position: "absolute",
    left: 0,
    top: 0,
    transition: "300ms ease",
    transitionProperty:
      "width, height, transform, borderRadius, backgroundColor",
    transformStyle: "flat",
    animation: "3s linear 1s",
    overflow: "hidden",
    pointerEvents: "none",
    userSelect: "none",
  },
});
