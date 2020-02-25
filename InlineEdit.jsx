/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import invariant from "./tools/invariant";
import {ENTER} from "./constants/interactions/KeyCodes";
import {
  HORIZONTAL_INPUT_PADDING_SMALL_PX,
  HORIZONTAL_INPUT_PADDING_BASE_PX,
  HORIZONTAL_INPUT_PADDING_LARGE_PX,
} from "./styles/input";
import IconButton from "./button/IconButton";
import Button from "./button/Button";
import Text from "./Text";
import useSetTimeout from "./hooks/useSetTimeout";
import {commonT as t} from "./config/I18n";

export type RenderProp<T> = (props: {
  +value: T,
  +placeholder?: string,
  +onChange: (newValue: T) => void,
  +inputRef: (HTMLElement | null) => void,
  +onKeyDown: (e: KeyboardEvent) => void,
}) => React.Node;

type Props<T> = {|
  /** The value to be displayed when in display mode */
  +value: T,
  /**
   * A placeholder value to display if value is unset.
   * Text inputs cannot be unset unless a placeholder is given
   */
  +placeholder?: string,
  /** Called when the user has approved a change to the input's value */
  +onChange: (newValue: T) => void,
  /** Determines the style of edit button to be displayed */
  +editStyle?: "button" | "pencil",
  /** Whether the display mode text will wrap or overflow */
  +textWrap?: boolean,
  +size?: "s" | "m" | "l",
  /** A renderProp that will render the input with the appropriate props */
  +children: RenderProp<T>,
  /** A static React Node that will be displayed when in display Mode */
  +staticView?: React.Node,
|};

const TRANSITION_DURATION = 150;

/**
 * @short A wrapper component that transforms an input into an inline-editable input.
 * @category Data Entry
 * @brandStatus V2
 * @status Beta
 */
function InlineEdit<T>({
  value,
  placeholder,
  onChange,
  editStyle = "button",
  textWrap = false,
  size = "m",
  children,
  staticView,
}: Props<T>) {
  const lastInputRef = React.useRef(null);

  const [editMode, setEditMode] = React.useState(false);
  const [editText, setEditText] = React.useState(value);

  // used to keep track of transition states between display mode and edit mode
  const [transitioningIn, setTransitioningIn] = React.useState(false);
  const [transitioningOut, setTransitioningOut] = React.useState(false);

  const setTimeout = useSetTimeout();

  const handleEditClick = React.useCallback(() => {
    setEditText(value);
    setTransitioningIn(true);

    setTimeout(() => {
      setEditMode(true);
      lastInputRef.current = null;
      setTransitioningIn(false);
    }, TRANSITION_DURATION);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleCancelClick = React.useCallback(() => {
    setEditText(value);
    setTransitioningOut(true);

    setTimeout(() => {
      setEditMode(false);
      setTransitioningOut(false);
    }, TRANSITION_DURATION);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleCheckClick = React.useCallback(() => {
    setTransitioningOut(true);

    setTimeout(() => {
      setEditMode(false);
      setTransitioningOut(false);
    }, TRANSITION_DURATION);

    if (
      typeof editText === "string" &&
      editText.trim() === "" &&
      !placeholder
    ) {
      return;
    }

    onChange(editText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editText]);

  let content = null;

  const stringifiedValue = String(value);
  const valueOrPlaceholder = stringifiedValue || placeholder;
  const shouldShowPlaceholder = !stringifiedValue;

  if (editMode && !(transitioningIn || transitioningOut)) {
    content = (
      <div className={css(styles.editableContainer)}>
        {children({
          value: editText,
          onChange: setEditText,
          placeholder,
          onKeyDown: (e: KeyboardEvent) => {
            if (e.keyCode === ENTER && !e.shiftKey) {
              handleCheckClick();
            }
          },
          inputRef: inputRef => {
            if (inputRef !== null) {
              if (!lastInputRef.current) {
                // $FlowFixMe(Dirak) inputRef has select()
                inputRef.select();
              }

              lastInputRef.current = inputRef;
            }
          },
        })}

        <div className={css(styles.actionButtonsContainer)}>
          <div style={{marginRight: "4px"}}>
            <IconButton
              iconName="cancel"
              type="button"
              size="s"
              onClick={handleCancelClick}
            />
          </div>
          <IconButton
            iconName="check"
            type="button"
            intent="basic"
            size="s"
            onClick={handleCheckClick}
          />
        </div>
      </div>
    );
  } else if (editStyle === "button") {
    content = (
      <>
        <div
          className={css(
            styles.editButtonValueContainer,
            textWrap ? styles.wrap : styles.noWrap
          )}
        >
          {staticView || (
            <Text color={shouldShowPlaceholder ? "grey40" : "grey60"}>
              {valueOrPlaceholder}
            </Text>
          )}
        </div>
        <div
          className={css(
            styles.editButtonContainer,
            (transitioningIn || transitioningOut) && styles.hidden
          )}
        >
          <Button intent="basic" kind="blank" onClick={handleEditClick}>
            {t("Edit")}
          </Button>
        </div>
      </>
    );
  } else if (editStyle === "pencil") {
    invariant(
      textWrap,
      "InlineEditable with pencil editStyle must have prop textWrap set to true"
    );

    content = (
      <div className={css(styles.pencilContentContainer)}>
        <div
          className={css(
            styles.penciledValueContainer,
            textWrap ? styles.wrap : styles.noWrap
          )}
        >
          {staticView || (
            <Text
              color={shouldShowPlaceholder ? "grey40" : "grey60"}
              display="inline"
            >
              {valueOrPlaceholder}
            </Text>
          )}
        </div>
        <div
          className={css(
            styles.pencilIconContainer,
            (transitioningIn || transitioningOut) && styles.hidden
          )}
        >
          <IconButton
            iconName="pencil"
            intent="none"
            kind="blank"
            type="button"
            onClick={handleEditClick}
          />
        </div>
      </div>
    );
  } else {
    throw new Error(
      "InlineEditable editStyle must either be 'button' or 'pencil'"
    );
  }

  const horizontalPadding = getHorizontalPadding(size);

  const transitionInStyle = {
    transition: "transform 75ms ease-in-out",
    transform: `translateX(${horizontalPadding}px)`,
  };

  const transitionOutStyle = {
    transition: "transform 75ms ease-in-out",
    transform: `translateX(-${horizontalPadding}px)`,
    marginLeft: horizontalPadding,
  };

  let style;
  if (transitioningOut) {
    style = transitionOutStyle;
  } else if (transitioningIn) {
    style = transitionInStyle;
  } else {
    style = {};
  }

  return (
    <div className={css(styles.container)} style={style}>
      {content}
    </div>
  );
}

const getHorizontalPadding = (size: "s" | "m" | "l"): number => {
  switch (size) {
    case "s": {
      return HORIZONTAL_INPUT_PADDING_SMALL_PX;
    }
    case "m": {
      return HORIZONTAL_INPUT_PADDING_BASE_PX;
    }
    case "l": {
      return HORIZONTAL_INPUT_PADDING_LARGE_PX;
    }
    default: {
      return HORIZONTAL_INPUT_PADDING_BASE_PX;
    }
  }
};

const styles = StyleSheet.create({
  container: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    position: "relative",
    width: "100%",
    paddingRight: "30px",
    lineHeight: "18px",
    minHeight: "30px",
  },

  hidden: {
    display: "none",
  },

  editableContainer: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    flex: "1",
  },

  actionButtonsContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "4px",
    position: "absolute",
    width: "100%",
    top: "100%",
    zIndex: "1",
  },

  editButtonContainer: {
    position: "absolute",
    top: "0",
    right: "0",
    padding: `6px 0px 4px 0px`,
  },

  wrap: {
    whiteSpace: "pre-line",
  },

  noWrap: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },

  editButtonValueContainer: {
    minHeight: "30px",
    border: "1px solid transparent",
    padding: `6px 0px 4px 0px`,
  },

  pencilContentContainer: {
    position: "relative",
    width: "100%",
    border: "1px solid transparent",
    padding: `6px 0px 4px 0px`,
  },

  penciledValueContainer: {
    display: "inline",
    position: "relative",
    boxDecorationBreak: "clone",
  },

  pencilIconContainer: {
    position: "absolute",
    display: "inline",
    marginLeft: "8px",
    padding: `2px 0px 4px 0px`,
  },
});

export default InlineEdit;
