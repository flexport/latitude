/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import type {Option as CheckboxListOption} from "../CheckboxList";
import popupWithClickAway from "../tools/popupWithClickAway";
import type {PopupWithClickAwayProps} from "../tools/popupWithClickAway";
import Icon, {type IconNames} from "../Icon";
import generateOverviewText from "./generateOverviewText";
import {focusedStyle, getInputStyles} from "../styles/input";
import Text from "../Text";
import ThemeNameContext, {type Theme} from "../context/ThemeNameContext";
import invariant from "../tools/invariant";
import type {FilterMode} from "../filter/MultiselectFilter";
import {LabelContext, type LabelContextType} from "../Label";
import MultiselectOptions from "./MultiselectOptions";
import PopupWithClickAway from "../popup/PopupWithClickAway";

import {zIndices} from "../tools/zIndices";

export type Option<K> = {|
  +value: K,
  +label: string,
  iconName?: IconNames,
  +disabled?: boolean,
|};

// we insist this be a string. we used to accept numbers
// as well, but the upside in flexibility wasn't worth the downside
// of Flow not handling union types elegantly and filter serialization
// becoming more difficult.
export type MultiselectKey = string;

export type Props<K> = PopupWithClickAwayProps &
  MultiselectProps & {
    options: $ReadOnlyArray<Option<K>>,
    value: $ReadOnlyArray<K>,
    onChange: (value: Array<K>) => void,
    onBlur: () => void,
    onFocus: () => void,
    /** if the items you are providing are not strings, you need to provide a function that takes an object of type K and generates strings so we can dedupe / tell what's selected. */
    toKeyFn: K => MultiselectKey,
  };

type AllProps<K> = Props<K> & {
  /** $Hide(provided by higher order component) */
  +theme: Theme,
};

type Placement = "bottom-end" | "bottom-start";

type MultiselectProps = {|
  /** creates a section above the options that allows you to select all */
  +displaySelectAllButton: boolean,
  +disabled: boolean,
  /** a default generation algorith is used, called `generateOverviewText`, but you can use it yourself with different props and pass in the text it creates optionally */
  +displayText?: string,
  +isInvalid: boolean,
  /** we generate a summary of what's selected, and if you provide this can say something like "2 people selected" instead of "2 items selected" */
  +someSelectedUnits?: string,
  /** controls where the dropdown menu is anchord in relation to the multiselect input */
  +placement: Placement,
  /** whether or not a searchable input is visible */
  +filterSearchMode: FilterMode,
|};

export const DEFAULT_PROPS = {
  displaySelectAllButton: true,
  disabled: false,
  isInvalid: false,
  placement: "bottom-end",
  toKeyFn: defaultKeyFn,
  filterSearchMode: {type: "none"},
};

export function defaultKeyFn<K>(val: K): MultiselectKey {
  invariant(
    typeof val === "string",
    "if not providing a string value in options, provide a to key function."
  );
  return val;
}

const getSimplifiedOptions = <K>(props: AllProps<K>) => {
  const simplifiedOptions: $ReadOnlyArray<
    CheckboxListOption<string>
  > = props.options.map(option => ({
    value: props.toKeyFn(option.value),
    label: option.label,
    disabled: option.disabled,
  }));
  const simplifiedValues = props.value.map(props.toKeyFn);
  return {simplifiedOptions, simplifiedValues};
};

const getDisplayText = <K>(
  props: AllProps<K>,
  simplifiedValues: $ReadOnlyArray<string>
) =>
  props.displayText ||
  generateOverviewText(props.options, simplifiedValues, props.toKeyFn, {
    someSelectedUnits: props.someSelectedUnits,
  });

/**
 * Consider removing unsafe lifecycle methods for future concurrent mode support!
 * See https://reactjs.org/blog/2018/03/29/react-v-16-3.html#component-lifecycle-changes
 */
/* eslint-disable react/no-unsafe */
/**
 * @short Use MultiselectInput when constructing forms, if you need to select multiple values from a list.
 * @category Data Entry
 * @brandStatus V2
 * @status Stable
 * @extends React.Component */
class MultiselectInputClass<K> extends React.PureComponent<AllProps<K>> {
  static defaultProps = DEFAULT_PROPS;

  static contextType = LabelContext;
  context: LabelContextType;
  UNSAFE_componentWillReceiveProps(nextProps: Props<K>) {
    if (!nextProps.isPopupVisible && this.props.isPopupVisible) {
      this.setBlur();
    } else if (!this.props.isPopupVisible && nextProps.isPopupVisible) {
      this.setFocus();
    }
  }

  setFocus = () => {
    if (this.context.labelOnFocus) {
      this.context.labelOnFocus();
    }
  };
  setBlur = () => {
    if (this.context.labelOnBlur) {
      this.context.labelOnBlur();
    }
  };

  handleChange = (simpleVals: $ReadOnlyArray<MultiselectKey>) => {
    const {options, toKeyFn, onChange} = this.props;
    const vals = simpleVals
      .map(simpleVal =>
        options.find(option => toKeyFn(option.value) === simpleVal)
      )
      .filter(Boolean)
      .map(option => option.value);
    onChange(vals);
  };

  render() {
    return (
      <ThemeNameContext.Consumer>
        {theme => this.renderForTheme(theme)}
      </ThemeNameContext.Consumer>
    );
  }

  renderForTheme(theme: Theme) {
    const {placement} = this.props;
    const {simplifiedOptions, simplifiedValues} = getSimplifiedOptions(
      this.props
    );
    const displayText = getDisplayText(this.props, simplifiedValues);
    return (
      <PopupWithClickAway
        onClose={this.props.onBlur}
        onOpen={this.props.onFocus}
      >
        {(Target, Popup, {isOpen, togglePopup}) => (
          <>
            <Target>
              <SelectButton
                theme={theme}
                displayText={displayText}
                onClick={togglePopup}
                isPopupVisible={isOpen}
                disabled={this.props.disabled}
                isInvalid={this.props.isInvalid}
              />
            </Target>
            <Popup
              placement={placement}
              zIndex={zIndices.zIndex1500AboveModal.value}
            >
              <MultiselectOptions
                values={simplifiedValues}
                options={simplifiedOptions}
                onChange={this.handleChange}
                displaySelectAllButton={this.props.displaySelectAllButton}
                filterSearchMode={this.props.filterSearchMode}
              />
            </Popup>
          </>
        )}
      </PopupWithClickAway>
    );
  }
}

type SelectButtonProps = {|
  +displayText: string,
  +onClick: () => void,
  +isPopupVisible: boolean,
  +disabled: boolean,
  +isInvalid: boolean,
  +theme: Theme,
|};

const SelectButton = (props: SelectButtonProps) => {
  const {displayText, onClick, isPopupVisible, disabled, isInvalid} = props;
  const handlePopupToggle = disabled ? null : onClick;
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      className={css(
        ...getInputStyles({size: "m", isInvalid, disabled}),
        styles.selectDisplay,
        isPopupVisible && styles.selectDisplayFocused
      )}
      onClick={handlePopupToggle}
      data-qa="select-button"
    >
      <div className={css(styles.selectDisplayText)}>
        <Text color={disabled ? "grey40" : "grey60"}>{displayText}</Text>
      </div>
      <Icon
        iconName={isPopupVisible ? "upOpen" : "downOpen"}
        alignment="center"
      />
    </div>
  );
};

export const _test = {
  MultiselectInputClass,
};

// TODO(zgotsch): Prop types are broken here because popupWithClickAway doesn't have working flow types
const Multiselect = popupWithClickAway(MultiselectInputClass);

export default Multiselect;

const styles = StyleSheet.create({
  selectDisplay: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  selectDisplayText: {
    flexGrow: "1",
    overflowX: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  selectDisplayFocused: {
    ...focusedStyle,
    ":hover": {
      ...focusedStyle,
    },
  },
});
