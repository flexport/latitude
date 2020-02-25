/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow strict
 */
import * as React from "react";
import {css} from "aphrodite";

import {getButtonStyle} from "../button/styles";
import stringOrFalse from "../tools/stringOrFalse";
import invariant from "../tools/invariant";
import ThemeNameContext from "../context/ThemeNameContext";
import type {ButtonIntent} from "./Button";
import Link from "../Link";

type AnchorButtonKind = "solid" | "hollow" | "bare" | "blank";
export type Props<T: EventTarget = EventTarget> = {|
  /** We skew toward only using specifying an intent when there is a direct correlation to the primary action. Intents convey meaning and reinforce importance. */
  +intent?: ButtonIntent,
  /** Defines the height of the button. Button sizes correspond to the main form sizes. */
  +size?: "s" | "m" | "l",
  /** Solid buttons usually constitute a primary action and hollow buttons are generally secondary. Bare buttons can be used for rows of buttons or for more subtle buttons. */
  +kind?: AnchorButtonKind,
  /** Buttons should generally use auto width ("responsive"). Full width buttons work great for tables. */
  +width?: "responsive" | "full",
  /** The text that represents the primary action of the button. */
  +label?: string,
  /** Anchor tags can't technically be disabled so this prop removes the href, desaturates the color of the label, and removes pointer-events. */
  +disabled?: boolean,
  /** The url that should be navigated to upon click */
  +href?: string,
  +children?: React.Node,
  /** Whether the link should be used to download the content of the href. */
  +download?: boolean,
  /** Whether the url should be opened in a new tab */
  +openInNewTab?: boolean,
  +onClick?: (
    event: SyntheticMouseEvent<T> | SyntheticKeyboardEvent<T>
  ) => void,
  +onMouseDown?: (event: SyntheticMouseEvent<T>) => void,
  +onMouseUp?: (event: SyntheticMouseEvent<T>) => void,
  /**
   * our single page app routing (called spaMixin) hijacks all clicks on
   * anchor tags. You might not want this, most often for switching between
   * applications (you want a full page reload). Set this to true to disable that
   * behavior.
   */
  +disableSpaHijack?: boolean,
|};

/**
 * @short Just like button but with anchor tags and an href prop. AnchorButton can be used for launching downloads, linking to new in-app routes, or linking to an external resource.
 * @brandStatus V2
 * @status Stable
 * @category Interaction */
export default function AnchorButton({
  children,
  disabled = false,
  disableSpaHijack = false,
  download = false,
  href,
  intent = "none",
  kind = "hollow",
  label,
  openInNewTab = false,
  onClick,
  onMouseDown,
  onMouseUp,
  size = "m",
  width = "responsive",
}: Props<>) {
  const theme = React.useContext(ThemeNameContext);

  invariant(
    !(kind === "solid" && intent === "none"),
    "Solid buttons must have an intent!"
  );

  const buttonStyles = getButtonStyle(
    theme,
    kind,
    intent,
    size,
    width,
    disabled
  );
  const labelOrFalse = stringOrFalse(label);

  return (
    <Link
      href={href}
      className={css(...buttonStyles.button)}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      download={download}
      openInNewTab={openInNewTab}
      disableSpaHijack={disableSpaHijack}
      role="button"
      onClick={onClick}
    >
      <div className={css(...buttonStyles.label)}>
        {labelOrFalse || children}
      </div>
    </Link>
  );
}
