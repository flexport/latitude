/**
 * TEAM: frontend_infra
 * @flow strict
 */

import * as React from "react";
import {isEqual} from "lodash";
import {
  UP,
  DOWN,
  RIGHT,
  ENTER,
  BACKSPACE,
  ESC,
  SHIFT,
  CAPS,
} from "../constants/interactions/KeyCodes";
import PopupWithClickAway from "../popup/PopupWithClickAway";

type AdditionalProps = {|
  popper?: {current: ?PopupWithClickAway},
  rememberHighlightPosition?: boolean,
  onChange?: (label: string) => void,
  // used to keep track of which label is currently selected
  selectedLabel?: ?string,
  onMouseDown?: (e: Event) => void,
  onFocus?: (e: Event) => void,
  onBlur?: (e: Event) => void,
  onKeyDown?: (e: KeyboardEvent) => void,
|};

export type Dropdown = {|
  isOpen: boolean,
  highlightedIndex: ?number,
  highlightedLabel: ?string,
  setHighlightedLabel: (string | null) => void,
  handlers: {
    handleItemClick: (label: string) => void,
    handleMouseDown: (e: Event) => void,
    handleFocus: (e: Event) => void,
    handleBlur: (e: Event) => void,
    handleKeyDown: (e: KeyboardEvent) => void,
    handleChange: (label: string) => void,
  },
|};

/**
 * Encapsulates the logic required to drive a dropdown. useDropdown is a hook
 * that takes in a list of option labels and an onChange callback, and returns
 * the state of the dropdown, as well as eventHandler hooks that should be hooked
 * into the input an dropdowns
 */
function useDropdown(
  options: $ReadOnlyArray<string>,
  {
    onChange,
    selectedLabel,
    rememberHighlightPosition = false,
    onMouseDown,
    onFocus,
    onBlur,
    onKeyDown,
    popper,
  }: AdditionalProps
): Dropdown {
  const {setHighlightedLabel, setHighlightedIndex, highlighted} = useHighlight({
    options,
  });
  const [isOpen, setIsOpen] = React.useState(false);
  const hideTimeoutId = React.useRef();

  function openDropdown(_e: Event) {
    if (rememberHighlightPosition) {
      if (selectedLabel !== undefined) setHighlightedLabel(selectedLabel);
    } else {
      setHighlightedIndex(null);
    }

    show();
  }

  function show() {
    if (hideTimeoutId.current) clearTimeout(hideTimeoutId.current);

    setIsOpen(true);

    if (popper && popper.current) popper.current.openPopup();
  }

  function hide() {
    if (hideTimeoutId.current) clearTimeout(hideTimeoutId.current);

    setIsOpen(false);

    if (popper && popper.current) popper.current.closePopup();
  }

  function delayedHide() {
    if (hideTimeoutId.current) clearTimeout(hideTimeoutId.current);

    hideTimeoutId.current = setTimeout(hide, 100); // Wait in case refocused to a related element (e.g. DropdownList)
  }

  return {
    isOpen,
    highlightedIndex: highlighted.index,
    highlightedLabel: highlighted.label,
    handlers: {
      handleMouseDown: e => {
        if (isOpen) {
          hide();

          if (popper && popper.current) popper.current.closePopup();

          return;
        }

        openDropdown(e);

        if (onMouseDown) onMouseDown(e);
      },
      handleFocus: e => {
        openDropdown(e);

        if (onFocus) onFocus(e);
      },
      handleBlur: e => {
        setHighlightedLabel(null);

        delayedHide(); // Used in case focus in passed over for grabbing the scroll handle

        if (onBlur) onBlur(e);
      },
      handleKeyDown: (e: KeyboardEvent) => {
        if (onKeyDown) onKeyDown(e);

        if (options.length === 0) {
          return;
        }

        switch (e.keyCode) {
          case UP: {
            e.preventDefault();

            if (!isOpen && highlighted.index == null) {
              openDropdown(e);
            } else if (highlighted.index == null || highlighted.index === 0) {
              setHighlightedIndex(options.length - 1);
            } else {
              setHighlightedIndex(highlighted.index - 1);
            }

            break;
          }

          case DOWN: {
            e.preventDefault();

            if (!isOpen && highlighted.index === null) {
              openDropdown(e);
            } else if (
              highlighted.index === null ||
              highlighted.index === options.length - 1
            ) {
              setHighlightedIndex(0);
            } else {
              setHighlightedIndex(highlighted.index + 1);
            }

            break;
          }

          case RIGHT: {
            if (highlighted.index != null) {
              if (onChange) onChange(options[highlighted.index]);
            }
            break;
          }

          case ENTER: {
            if (highlighted.index != null) {
              if (onChange) onChange(options[highlighted.index]);

              setHighlightedIndex(null);
              hide();
            }

            break;
          }

          case BACKSPACE: {
            show();
            break;
          }

          case ESC: {
            hide();
            setHighlightedIndex(null);
            break;
          }

          case SHIFT: {
            show();
            break;
          }

          case CAPS: {
            show();
            break;
          }

          default: {
            break;
          }
        }
      },
      handleItemClick: (label: string) => {
        if (onChange) onChange(label);

        hide();
        setHighlightedIndex(null);
      },
      handleChange: (label: string) => {
        if (onChange) onChange(label);
      },
    },
    setHighlightedLabel,
  };
}

function useHighlight({options}: {options: $ReadOnlyArray<string>}) {
  const [highlighted, setHighlighted] = React.useState<{
    index: number | null,
    label: string | null,
  }>({
    index: null,
    label: null,
  });
  const previousOptions = React.useRef(options);

  // Highlight position after options length changes (e.g. SearchableSelectInput)

  // If list length becomes 0, update highlight to null
  if (options.length === 0 && highlighted.index !== null) {
    setHighlighted({label: null, index: null});
  } else if (
    // If list length changes, but highlighted label is still in list update
    // highlight index so same label was selected as before
    options.includes(highlighted.label)
  ) {
    if (options.indexOf(highlighted.label) !== highlighted.index) {
      setHighlightedIndex(options.indexOf(highlighted.label));
    }
  } else if (
    // Otherwise if list changes, reset highlight
    !isEqual(previousOptions.current, options)
  ) {
    previousOptions.current = options;

    setHighlighted({label: null, index: null});
  }

  function setHighlightedLabel(label: string | null) {
    if (label === null) {
      if (highlighted.label !== null || highlighted.label !== null) {
        setHighlighted({label: null, index: null});
      }

      return;
    }

    const indexOfSelected = options.indexOf(label);

    if (indexOfSelected === highlighted.index && label === highlighted.label)
      return;

    setHighlighted({index: indexOfSelected, label});
  }

  function setHighlightedIndex(index: number | null) {
    if (index === null) {
      if (highlighted.index !== null || highlighted.label !== null) {
        setHighlighted({index: null, label: null});
      }

      return;
    }

    const labelOfSelected = options[index];

    if (index === highlighted.index && labelOfSelected === highlighted.label)
      return;

    setHighlighted({index, label: labelOfSelected});
  }

  return {
    setHighlighted,
    setHighlightedIndex,
    setHighlightedLabel,
    highlighted,
  };
}
export default useDropdown;
