/**
 * TEAM: frontend_infra
 *
 * @flow strict
 */

/* eslint-disable flexport/no-unused-aphrodite-styles */
import * as React from "react";
import {css} from "aphrodite";
import {createThemedStylesheet, type ThemeData} from "./styles";
import ThemeNameContext, {
  TRANSMISSION,
  type Theme,
} from "./context/ThemeNameContext";
import latitudeColors, {transmissionColors} from "./colors";
import Text from "./Text";

type BadgeIntent =
  | "ready"
  | "ready-green"
  | "pending"
  | "error"
  | "complete"
  | "due-soon";

type Props = {|
  /** Count determines when the badge is rendered and how. If either false, 0 or undefined the badge is not rendered. If true, the badge is rendered as a dot. If a number greater than 0, the badge is rendered with the number inside */
  +count?: number | boolean,
  /** The maximum value to be displayed. Any value larger will be shown as this number followed by a plus sign */
  +max?: number,
  /** The intent of the badge determines the background color */
  +intent?: BadgeIntent,
  /** Component wrapped by the badge. If there is one, the badge is rendered on the top right corner */
  +children?: React.Node,
|};

/**
 * @category General
 * @short The badge is a component displaying the number of items await your attention.
 * @brandStatus V3
 * @status Beta
 * The badge component informs the user that a certain element on the page has
 * new information for the user. A count can be provided to indicate exactly
 * how many new items there are. If a child is provided, the badge will render
 * to the top right of the child.
 */
export default function Badge({
  count,
  max = 99,
  intent = "ready",
  children = null,
}: Props) {
  const theme = React.useContext(ThemeNameContext);
  const styles = getStyle(theme);

  // Either undefined, false or 0
  if (count == null || count === 0) {
    return children;
  }

  const isStatusDot = typeof count === "boolean" && !children;
  const badge = (
    <div
      className={css(
        styles[intent],
        typeof count === "boolean" ? styles.dotBadge : styles.badge,
        isStatusDot && styles.statusDot
      )}
    >
      {typeof count === "boolean" ? null : (
        <Text color={getTextColor(intent)} scale="subtext">
          {count <= max ? count : `${max}+`}
        </Text>
      )}
    </div>
  );

  return children === null ? (
    badge
  ) : (
    <div className={css(styles.badgeBase)}>
      {children}
      <div className={css(styles.badgeWrapper)}>{badge}</div>
    </div>
  );
}

function getTextColor(intent: BadgeIntent) {
  if (intent === "ready-green" || intent === "pending") {
    return "grey60";
  }
  return "white";
}

function getThemeColors(themeName: Theme) {
  if (themeName === TRANSMISSION) {
    return {
      ready: transmissionColors.green40,
    };
  }
  return {
    ready: latitudeColors.indigo30,
  };
}

const getStyle = createThemedStylesheet(({themeName}: ThemeData) => {
  const themeColors = getThemeColors(themeName);
  return {
    badgeBase: {
      display: "inline-block",
      position: "relative",
    },
    badgeWrapper: {
      position: "absolute",
      pointerEvents: "none",
      top: 0,
      right: 0,
      transform: "translateX(50%) translateY(-50%)",
    },
    ready: {
      backgroundColor: themeColors.ready,
    },
    "ready-green": {
      backgroundColor: latitudeColors.green40,
      color: latitudeColors.grey60,
    },
    pending: {
      backgroundColor: latitudeColors.grey30,
    },
    error: {
      backgroundColor: latitudeColors.red40,
    },
    complete: {
      backgroundColor: latitudeColors.black,
    },
    "due-soon": {
      backgroundColor: latitudeColors.orange30,
    },
    badge: {
      display: "inline-flex",
      justifyContent: "center",
      minWidth: 20,
      borderRadius: 20,
      padding: "2px 5px",
    },
    dotBadge: {
      display: "block",
      borderRadius: 100,
      height: 8,
      width: 8,
    },
    statusDot: {
      display: "inline-block",
      height: 12,
      minWidth: 12,
    },
  };
});
