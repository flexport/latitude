/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
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

type OptionalParams = {|
  rememberHighlightPosition?: boolean,
|};

const defaultOptionalParams = {
  rememberHighlightPosition: false,
};

type Dropdown = {|
  isOpen: boolean,
  highlightedIndex: number | null,
  handlers: {
    handleInputMouseDown: () => void,
    handleInputFocus: () => void,
    handleInputBlur: () => void,
    handleListItemClick: (label: string) => void,
    handleInputKeyDown: (e: KeyboardEvent) => void,
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
  onChange: (label: string) => void,
  // used to keep track of which label is currently selected
  selectedLabel: string | null,
  optionalParams?: OptionalParams
): Dropdown {
  const [isOpen, setIsOpen] = React.useState(false);
  const [highlightedIndex, setHighlightedIndex] = React.useState(null);

  const opts = {
    ...defaultOptionalParams,
    ...optionalParams,
  };

  function openDropdown() {
    if (opts.rememberHighlightPosition) {
      const indexOfSelected = options.indexOf(selectedLabel);
      setHighlightedIndex(indexOfSelected !== -1 ? indexOfSelected : null);
    } else {
      setHighlightedIndex(null);
    }

    setIsOpen(true);
  }

  const handleInputMouseDown = () => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }

    openDropdown();
  };

  const handleInputFocus = () => {
    openDropdown();
  };

  const handleInputBlur = () => {
    setHighlightedIndex(null);
    setIsOpen(false);
  };

  const handleListItemClick = (label: string) => {
    onChange(label);

    setIsOpen(false);
    setHighlightedIndex(null);
  };

  const handleInputKeyDown = (e: KeyboardEvent) => {
    if (options.length === 0) {
      return;
    }

    switch (e.keyCode) {
      case UP: {
        e.preventDefault();

        if (!isOpen && highlightedIndex === null) {
          openDropdown();
        } else if (highlightedIndex === null || highlightedIndex === 0) {
          setHighlightedIndex(options.length - 1);
        } else {
          setHighlightedIndex(highlightedIndex - 1);
        }

        break;
      }

      case DOWN: {
        e.preventDefault();

        if (!isOpen && highlightedIndex === null) {
          openDropdown();
        } else if (
          highlightedIndex === null ||
          highlightedIndex === options.length - 1
        ) {
          setHighlightedIndex(0);
        } else {
          setHighlightedIndex(highlightedIndex + 1);
        }

        break;
      }

      case RIGHT: {
        if (highlightedIndex !== null) {
          onChange(options[highlightedIndex]);
        }
        break;
      }

      case ENTER: {
        if (highlightedIndex !== null) {
          onChange(options[highlightedIndex]);

          setHighlightedIndex(null);
          setIsOpen(false);
        }

        break;
      }

      case BACKSPACE: {
        setIsOpen(true);
        break;
      }

      case ESC: {
        setIsOpen(false);
        setHighlightedIndex(null);
        break;
      }

      case SHIFT: {
        setIsOpen(true);
        break;
      }

      case CAPS: {
        setIsOpen(true);
        break;
      }

      default: {
        setIsOpen(true);
        setHighlightedIndex(null);
        break;
      }
    }
  };

  return {
    isOpen,
    highlightedIndex,
    handlers: {
      handleInputMouseDown,
      handleInputFocus,
      handleInputBlur,
      handleListItemClick,
      handleInputKeyDown,
    },
  };
}

export default useDropdown;
