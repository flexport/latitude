/**
 * TEAM: frontend_infra
 * @flow strict
 */

/* eslint-disable react/forbid-elements */
/* eslint-disable flexport/no-unused-aphrodite-styles */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import sizes, {type Size} from "../sizes";
import latitudeColors from "../colors";
import Icon from "../Icon";
import IconButton from "../button/IconButton";

type Props = {|
  /** Description of the filter, e.g. `date` */
  +label: string,
  /** Whether the label hides if there is any selectedText */
  +shyLabel?: boolean,
  /** Text to be displayed that represents what's filtered */
  +selectedText?: string | null,
  /**
   * Replaces the downOpen icon with an X button. When this button is pressed,
   * onRemove is called
   */
  +onRemove?: () => void,
  /** Whether the filter is active or not */
  +isActive?: boolean,
  /** Called when the filter button is clicked */
  +onClick?: () => void,
  /** Whether the filter is disabled */
  +disabled?: boolean,
  /** The size of the filter button */
  +size?: Size,
|};

/**
 * This hook exists so that transition related styles are injected after
 * aphrodite styles are injected. This avoids a flash of transitioning
 * styles on component mount
 */
function useTransitionStyles() {
  const [transitionStyles, setTransitionStyles] = React.useState({});
  const timerId = React.useRef();

  // On mount
  React.useEffect(() => {
    timerId.current = setTimeout(() => {
      setTransitionStyles({
        transitionProperty: "background, border-color, box-shadow, color, fill",
        transitionDuration: "150ms",
      });
    }, 0);

    // On unmount: clear timer so state won't be set when component is unmounted
    return () => {
      if (timerId.current) clearTimeout(timerId.current);
    };
  }, []);

  return transitionStyles;
}

function FilterButton({
  label,
  shyLabel = false,
  selectedText,
  onRemove,
  isActive = false,
  onClick,
  disabled = false,
  size = "m",
}: Props) {
  const transitionStyles = useTransitionStyles();

  const endGlyph = onRemove ? (
    <IconButton
      type="button"
      iconName="cancel"
      kind="blank"
      intent="none"
      onClick={(e: Event) => {
        e.stopPropagation();
        onRemove();
      }}
      disabled={disabled}
    />
  ) : (
    <Icon iconName="downOpen" alignment="center" color="inherit" />
  );

  // For a11y
  function onKeyPress(e: SyntheticKeyboardEvent<HTMLElement>) {
    e.stopPropagation();
    if (onClick && (e.key === "Enter" || e.key === " ")) onClick();
  }

  return (
    // Use a span instead of a button because endGlyph can be a button, and you
    // can't nest buttons inside other buttons
    <span
      role="button"
      className={css(
        styles.container,
        isActive && styles.active,
        disabled && styles.disabled
      )}
      style={{
        height: sizes[size],
        ...transitionStyles,
      }}
      onClick={disabled ? null : onClick}
      onKeyPress={disabled ? null : onKeyPress}
      tabIndex={disabled ? null : "0"}
    >
      <FilterLabel
        label={label}
        selectedText={selectedText}
        shyLabel={shyLabel}
        disabled={disabled}
      />
      <div className={css(styles.endGlyphContainer)}>{endGlyph}</div>
    </span>
  );
}

type FilterLabelProps = {|
  +label: string,
  +selectedText?: string | null,
  +shyLabel: boolean,
  +disabled: boolean,
|};

function FilterLabel({label, selectedText, shyLabel}: FilterLabelProps) {
  const transformationProperties = {
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease-in-out",
  };

  const labelNode = (
    <span
      style={{
        color: latitudeColors.grey40,
        ...transformationProperties,
      }}
    >
      {label}
    </span>
  );

  const selectedTextNode = (
    <span
      style={{
        fontWeight: 700,
        color: latitudeColors.grey60,
        ...transformationProperties,
      }}
    >
      {selectedText}
    </span>
  );

  if (selectedText == null) {
    return labelNode;
  } else if (shyLabel) {
    return selectedTextNode;
  }

  return (
    <>
      {labelNode}
      <span style={{margin: "0 4px"}} />
      {selectedTextNode}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "inline-flex",
    flexDirection: "row",
    alignItems: "center",
    background: latitudeColors.white,
    border: `2px solid ${latitudeColors.grey20}`,
    padding: "0 10px 0 12px",
    fill: latitudeColors.grey60,
    transitionTimingFunction: "ease-in-out",
    cursor: "pointer",

    ":hover": {
      boxShadow: "0px 2px 4px rgba(39, 44, 52, 0.25)",
    },

    ":focus": {outline: "none"},
  },
  endGlyphContainer: {
    display: "flex",
    alignItems: "center",
    paddingLeft: "8px",
  },
  active: {
    borderColor: latitudeColors.grey60,
    backgroundColor: latitudeColors.grey60,
    fill: latitudeColors.white,

    ":nth-child(1n) > span": {
      color: latitudeColors.white,
    },
  },
  disabled: {
    background: latitudeColors.grey20,
    borderColor: latitudeColors.grey20,
    cursor: "default",

    ":nth-child(1n) > span": {
      color: latitudeColors.grey40,
    },
  },
});

export default FilterButton;
