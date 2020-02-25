/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import BaseReactMultiselect, {
  type Option,
  type ReactSelectKey,
  type ReactSelectRenderOptions,
} from "./BaseReactMultiselect";

export type {Option};

type Props<T> = {|
  +value: T | null,
  +placeholder: string,
  /**
   * You have 3 ways to render option:
   * 1) have the valueRenderer take care of it
   * 2) Provide an option renderer, and have react select render the options for you
   * 3) Provide a menuRenderer, and take full control of the look and feel of the menu
   */
  +renderOptions: ReactSelectRenderOptions<T>,
  +onChange: (T | null) => void,
  +isLarge: boolean,
  /** this is a function that converts a type T to a unique string value. it's needed by react select to link values to options. */
  +keyFn: T => ReactSelectKey,
  +options: $ReadOnlyArray<Option<T>>,
  +onTextInputChange?: (query: string) => void,
  +disabled: boolean,
  /** indicates the selected value is invalid. */
  +isInvalid: boolean,
  // if you want to filter options, you should do so before you pass them in.
  /** this should be deprecated. */
  +filterOption?: (T, string) => boolean,
  /** determines if the user can X out a selected value */
  +isNullable: boolean,
  /** renders the selected value into the text input. You can also render just text. */
  +valueRenderer: (?T) => React.Node,
  /** focus the control when it mounts */
  +autoFocus: boolean,
|};

const DEFAULT_PROPS = {
  placeholder: "",
  isLarge: false,
  disabled: false,
  isInvalid: false,
  isNullable: true,
  autoFocus: false,
};

/**
 * @short Use BaseReactSelect when you want bare metal access to the react-select library.
 * @category Data Entry
 * @brandStatus V2
 * @status Stable
 * Try and use AlgoliaInput, or SearchableSelectInput instead. If you absolutely
 * need to override react-select, you can use this component. We purposefully
 * restrict some of the options that react-select gives you to a more reasonable
 * set, and to prepare for the upgrade to the 2.0 library of react-select (where
 * the API changes a lot).
 * @extends React.Component */
export default class BaseReactSelect<T> extends React.PureComponent<Props<T>> {
  static defaultProps = DEFAULT_PROPS;

  handleChange(vals: $ReadOnlyArray<T>) {
    this.props.onChange(vals.length === 0 ? null : vals[0]);
  }

  render() {
    const {
      isLarge,
      disabled,
      isInvalid,
      value,
      options,
      placeholder,
      keyFn,
      valueRenderer,
      onTextInputChange,
      renderOptions,
      filterOption,
      isNullable,
      autoFocus,
    } = this.props;

    const castedVals: $ReadOnlyArray<T> = value ? [value] : [];

    return (
      <BaseReactMultiselect
        isLarge={isLarge}
        isInvalid={isInvalid}
        disabled={disabled}
        onChange={this.handleChange.bind(this)}
        values={castedVals}
        options={options}
        singleSelect={{isNullable}}
        keyFn={keyFn}
        valueRenderer={valueRenderer}
        placeholder={placeholder}
        onTextInputChange={onTextInputChange}
        filterOption={filterOption}
        renderOptions={renderOptions}
        autoFocus={autoFocus}
      />
    );
  }
}
