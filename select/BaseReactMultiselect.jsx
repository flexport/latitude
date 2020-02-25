/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {StyleSheet} from "aphrodite";
import classnames from "classnames";
import {uniqBy} from "lodash";
import Select, {Option as ReactSelectOption} from "./react-select-exported";
import Icon from "../Icon";
import TestAlgoliaField from "../form/TestAlgoliaField";
import {inputStyles, focusedStyle} from "../styles/input";
import {styles} from "../form/DeprecatedDropdownList";
import {css} from "../styles";
import borders from "../styles/borders";
import colors from "../colors";
import invariant from "../tools/invariant";
import {zIndices} from "../tools/zIndices";
import {LabelContext, type LabelContextType} from "../Label";

export type ReactSelectKey = string;

export type Option<T> = {
  /** label is what the input will search on */
  +label?: string,
  +option: T,
};

export type RSOption<T> = {
  +label: string,
  +option: T,
  +value: string,
};

export type ReactSelectRenderOptions<T> =
  | {+type: "valueRenderOnly"}
  | {
      +type: "valueOptionRenderer",
      +optionRenderer: T => React.Node,
    }
  | {
      +type: "valueAndMenuRenderer",
      +menuRenderer: (props: {
        +options: $ReadOnlyArray<RSOption<T>>,
        +selectValue: (RSOption<T>) => void,
        +optionRenderer: (RSOption<T>) => React.Node,
      }) => React.Node,
      +optionRenderer?: T => React.Node,
    };

type Props<T> = {|
  +values: $ReadOnlyArray<T>,
  +placeholder: string,
  +valueRenderer: (?T) => React.Node,
  +dropdownRendererOnEmptyQuery?: () => React.Node,
  +renderOptions: ReactSelectRenderOptions<T>,
  +onChange: ($ReadOnlyArray<T>) => void,
  +singleSelect?: {
    +isNullable: boolean,
  },
  +isLarge: boolean,
  +keyFn: T => ReactSelectKey,
  +options: $ReadOnlyArray<Option<T>>,
  +onTextInputChange?: (query: string) => void,
  +disabled: boolean,
  +isInvalid: boolean,
  +filterOption?: (T, string) => boolean,
  +autoFocus: boolean,
|};

type ReactSelectState = {
  isFocused: boolean,
  isOpen: boolean,
  query: string,
};

const DEFAULT_PROPS = {
  singleSelect: undefined,
  placeholder: "",
  isLarge: false,
  disabled: false,
  isInvalid: false,
  autoFocus: false,
};

const SENTINEL_OPTION_VALUE = "__BaseReactMultiSelectSentinelValue";

type SentinelOption = {
  +label: "",
  +option: void,
  +value: typeof SENTINEL_OPTION_VALUE,
};

export default class BaseReactMultiselect<T> extends React.PureComponent<
  Props<T>,
  ReactSelectState
> {
  static defaultProps = DEFAULT_PROPS;
  static contextType = LabelContext;

  context: LabelContextType;

  constructor(props: Props<T>) {
    super(props);

    this.state = {
      isFocused: false,
      isOpen: false,
      query: "",
    };
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      this.handleFocus();
    }
  }

  arrowFunction = () => (open: {isOpen: boolean}) =>
    renderReactSelectArrow(
      open,
      this.props.options.length,
      this.props.values.length
    );

  handleFocus = () => {
    this.setState({isFocused: true});
    if (this.context.labelOnFocus) {
      this.context.labelOnFocus();
    }
  };

  // eslint-disable-next-line autofix/no-unused-vars
  handleBlur = (event: Event) => {
    this.setState({isFocused: false});
    if (this.context.labelOnBlur) {
      this.context.labelOnBlur();
    }
  };

  isSingleSelect = () => this.props.singleSelect != null;

  render() {
    if (!__TEST_ENV__) {
      const {values, keyFn} = this.props;
      let textInputStyle = {...unsetInputStyle};
      if (this.state.isFocused) {
        textInputStyle = {
          ...textInputStyle,
          ...focusedStyle,
        };
      }
      if (this.props.disabled) {
        textInputStyle = {
          ...textInputStyle,
          // $FlowUpgradeFixMe(0.110.1 -> 0.111.1)
          ...inputStyles.disabled._definition,
        };
      }
      if (this.props.isInvalid) {
        textInputStyle = {
          ...textInputStyle,
          // $FlowUpgradeFixMe(0.110.1 -> 0.111.1)
          ...inputStyles.isInvalid._definition,
        };
      }

      const value = getValuesForReactSelect(
        values,
        keyFn,
        this.isSingleSelect()
      );
      const {
        valueRenderer,
        dropdownRendererOnEmptyQuery,
        renderOptions,
      } = this.props;
      const {isOpen, query} = this.state;

      let optRender;
      let menuRenderer;
      if (renderOptions.type === "valueOptionRenderer") {
        optRender = (option: Option<T>) =>
          renderOptions.optionRenderer(option.option);
      } else if (renderOptions.type === "valueAndMenuRenderer") {
        menuRenderer = this.customMenuRenderer;
        const {optionRenderer} = renderOptions;
        if (optionRenderer != null) {
          optRender = (option: Option<T>) => optionRenderer(option.option);
        }
      }

      if (optRender == null) {
        optRender = (option: Option<T>) => valueRenderer(option.option);
      }

      // Workaround for the fact that react-select does not call `menuRenderer`
      // when there are no options. `customMenuRenderer` will filter out this
      // sentinel before calling the underlying `menuRenderer`
      const usingSentinel = menuRenderer != null;

      const resetOptions = this.props.singleSelect
        ? {
            clearable: this.props.singleSelect.isNullable,
            resetValue: this.props.singleSelect.isNullable ? null : undefined,
          }
        : undefined;

      const dropdownContentsOnEmptyQuery =
        dropdownRendererOnEmptyQuery && dropdownRendererOnEmptyQuery();
      const shouldShowEmptyQueryDropdown =
        query === "" && dropdownContentsOnEmptyQuery && isOpen;

      return (
        <div
          className={classnames(css(algoliaStyles.componentContainer), {
            isLarge: this.props.isLarge,
          })}
        >
          <Select
            noResultsText=""
            closeOnSelect={this.isSingleSelect()}
            optionRenderer={optRender}
            valueRenderer={(option: Option<T>) => valueRenderer(option.option)}
            backspaceToRemoveMessage=""
            filterOption={this.filterOption}
            value={value}
            options={this.getRSOptions(usingSentinel)}
            onInputChange={this.handleInputChange}
            onChange={this.handleChange}
            selectOption={null}
            multi={!this.isSingleSelect()}
            autoBlur={this.isSingleSelect()}
            autoFocus={this.props.autoFocus}
            openOnFocus={true}
            menuContainerStyle={
              menuRenderer
                ? algoliaStyles.listContainerForCustomMenu._definition
                : algoliaStyles.listContainer._definition
            }
            placeholder={this.props.placeholder}
            arrowRenderer={this.arrowFunction()}
            clearRenderer={renderReactSelectClear}
            style={textInputStyle}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onOpen={this.handleOpen}
            onClose={this.handleClose}
            disabled={this.props.disabled}
            searchable={true}
            menuRenderer={menuRenderer}
            {...resetOptions}
          />

          {shouldShowEmptyQueryDropdown ? (
            // onMouseDown needs to be specially handled here to prevent
            // interaction on the dropdown from making the input lose focus.
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            <div
              className={css(algoliaStyles.emptyQueryDropdownContainer)}
              onMouseDown={(event: Event) => {
                if (!this.isSingleSelect()) {
                  event.preventDefault();
                }
              }}
            >
              {dropdownContentsOnEmptyQuery}
            </div>
          ) : null}
        </div>
      );
    }
    // Stub out Algolia field to accept JSON input to avoid network requests
    // to Algolia
    return (
      <TestAlgoliaField
        value={this.props.values}
        onChange={({value, full}) => {
          if (full !== null) {
            invariant(typeof value === "string", "Expect value to be a string");
            // TODO(elmiratapkanova) create TestAlgoliaMultiInput component
            if (Array.isArray(full)) {
              // $FlowUpgradeFixMe(0.110.1 -> 0.111.1)
              this.handleChange(full.map(option => ({value, ...option})));
            } else {
              // $FlowFixMe(osuushi) untyped code only used in browser tests
              this.handleChange({value, option: {value: full}});
            }
          }
        }}
      />
    );
  }

  handleOpen = () => {
    // eslint-disable-next-line no-unused-expressions
    this.props.options.length === 0 &&
      this.props.onTextInputChange &&
      this.props.onTextInputChange("");

    this.setState({isOpen: true});
  };

  handleClose = () => {
    this.setState({isOpen: false});
  };

  handleInputChange = (query: string) => {
    // eslint-disable-next-line no-unused-expressions
    this.props.onTextInputChange && this.props.onTextInputChange(query);
    this.setState({query});
    return query;
  };

  handleChange = (
    values:
      | $ReadOnlyArray<{value: string, option: T}>
      | {value: string, option: T}
      | null
  ) => {
    if (this.isSingleSelect()) {
      if (Array.isArray(values)) {
        invariant(
          values.length === 0,
          "Got a non-empty array in onChange for a single-item Algolia input"
        );
        this.props.onChange([]);
      } else {
        this.props.onChange(values ? [values.option] : []);
      }
    } else {
      invariant(
        Array.isArray(values),
        "Got a non-array values in AlgoliaMultiInput handleChange"
      );
      this.props.onChange(values.map(option => option.option));
    }
  };

  customMenuRenderer = ({
    options,
    optionRenderer,
    optionClassName,
    focusedOption,
    valueArray,
    focusOption,
    selectValue,
  }: {
    +options: $ReadOnlyArray<RSOption<T> | SentinelOption>,
    +optionRenderer: (RSOption<T>) => React.Node,
    +optionClassName: ?string,
    +focusedOption: ?RSOption<T>,
    +valueArray: ?$ReadOnlyArray<RSOption<T>>,
    +focusOption: (RSOption<T>) => void,
    +selectValue: (RSOption<T>) => void,
  }) => {
    const {disabled, renderOptions} = this.props;
    invariant(renderOptions.type === "valueAndMenuRenderer", "");

    const wrappedOptionRenderer = (option: RSOption<T>) => {
      const isFocused = focusedOption && focusedOption.value === option.value;
      const isSelected =
        valueArray && valueArray.some(o => o.value === option.value);
      let className = optionClassName || "Select-option";
      if (isFocused) {
        className = `${className} is-focused`;
      }
      if (isSelected) {
        className = `${className} is-selected`;
      }

      return (
        <ReactSelectOption
          option={option}
          instancePrefix={option.value}
          className={className}
          isDisabled={disabled}
          isFocused={isFocused}
          isSelected={isSelected}
          onFocus={focusOption}
          onSelect={selectValue}
        >
          {optionRenderer(option)}
        </ReactSelectOption>
      );
    };

    const optionsForRendering: $ReadOnlyArray<RSOption<T>> = options.reduce(
      (list, option) => {
        if (option.value !== SENTINEL_OPTION_VALUE) {
          list.push(option);
        }

        return list;
      },
      []
    );

    return renderOptions.menuRenderer({
      options: optionsForRendering,
      optionRenderer: wrappedOptionRenderer,
      optionClassName,
      focusedOption,
      valueArray,
      focusOption,
      selectValue,
    });
  };

  getRSOptions = (includeSentinel: boolean) => {
    const {values, options, keyFn} = this.props;
    // need to add the selected values to options for react-select
    // so that no matter what the user searches for, they can see their original
    // choices at the bottom of the list.
    const valueOptions: Array<RSOption<T>> = values.map(val => {
      const objectKey = keyFn(val);
      return {
        value: objectKey,
        option: val,
        label: "",
      };
    });
    // and we need to dedupe in case the user is searching for their
    // starting option
    let mergedOptions: Array<RSOption<T>> = options
      .map((option: Option<T>) => ({
        value: keyFn(option.option),
        option: option.option,
        // react-select needs a string label. This saves us from implicitly
        // getting a label of "null" or "undefined"
        label: option.label || "",
      }))
      .concat(valueOptions);
    mergedOptions = (uniqBy(mergedOptions, option =>
      keyFn(option.option)
    ): Array<RSOption<T>>);

    if (!includeSentinel) {
      return mergedOptions;
    }

    // Workaround for the fact that react-select does not call `menuRenderer`
    // when there are no options. `customMenuRenderer` will filter out this
    // sentinel before calling the underlying `menuRenderer`
    const optionsWithSentinel: Array<RSOption<T> | SentinelOption> = [
      ...mergedOptions,
      ({
        value: SENTINEL_OPTION_VALUE,
        label: "",
        option: undefined,
      }: SentinelOption),
    ];

    return optionsWithSentinel;
  };

  filterOption = (
    option: RSOption<T> | SentinelOption,
    filter: string
  ): boolean => {
    if (option.value === SENTINEL_OPTION_VALUE) {
      // The sentinel should always be included
      return true;
    }

    const {filterOption} = this.props;
    if (filterOption != null) {
      return filterOption(option.option, filter);
    }

    return option.label.toLowerCase().includes(filter.toLowerCase());
  };
}
const algoliaStyles = StyleSheet.create({
  componentContainer: {
    position: "relative",
  },
  listContainer: {
    ...styles.listContainer._definition,
    width: "100%",
    paddingTop: 0,
    paddingBottom: 0,
  },
  listContainerForCustomMenu: {
    width: "100%",
    border: 0,
    backgroundColor: "transparent",
    borderRadius: 0,
  },
  emptyQueryDropdownContainer: {
    ...styles.listContainer._definition,
    top: "100%",
    width: "100%",
    position: "absolute",
    paddingTop: 0,
    paddingBottom: 0,
    zIndex: zIndices.zIndexFloater.value,
  },
});

const renderReactSelectArrow = ({isOpen}, options, values) => {
  const icon = isOpen ? "upOpen" : "downOpen";
  // Only show a dropdown arrow if there's actually stuff to put in the dropdown
  if (options > 0 && values < options) {
    return <Icon iconName={icon} size="xs" alignment="center" />;
  }
  return null;
};

const renderReactSelectClear = () => (
  <Icon iconName="cancel" size="xs" alignment="center" />
);

/**
 * react-select expects the object key for a selected value in single select mode,
 * and an array of the selected values in multi-select mode.
 * No choice selected in single seleect mode is 'null'.
 */
function getValuesForReactSelect<T>(
  values: $ReadOnlyArray<T>,
  valueFn: T => ReactSelectKey,
  isSingleSelect: boolean
): ?Array<ReactSelectKey> | ReactSelectKey {
  if (isSingleSelect) {
    if (values.length === 0) {
      return null;
    }
    const objectKey = valueFn(values[0]);
    return objectKey;
  }

  return values.map(value => {
    const objectKey = valueFn(value);
    return objectKey;
  });
}

export function basicOptionRenderer<T>(keyName: string): T => React.Node {
  const foo = (option: T) => {
    invariant(
      option && typeof option === "object" && option[keyName] !== undefined,
      // $FlowUpgradeFixMe(0.94.0 -> 0.95.1)
      `basic option renderer can't find ${keyName} on algolia object ${JSON.stringify(
        option
      )}`
    );
    invariant(
      typeof option[keyName] === "string",
      // $FlowUpgradeFixMe(0.94.0 -> 0.95.1)
      `basic option renderer at key ${keyName} is not a string ${JSON.stringify(
        option[keyName]
      )}`
    );
    const optionName: string = option[keyName];
    return <span>{optionName}</span>;
  };
  foo.displayName = "BasicReactSelectOption";
  return foo;
}

// unset the fields that break react-select
const unsetInputStyle = {
  display: undefined,
  ":hover": {
    borderColor: colors.grey40,
    boxShadow: "0 2px 2px rgba(0,0,0,0.05)",
    "::placeholder": {
      color: colors.grey40,
    },
  },
  backgroundColor: colors.white,
  ...borders.a.m,
  borderColor: colors.grey20,
  color: colors.grey60,
  ":focus": {
    ...focusedStyle,
  },
  fontSize: "initial",
  width: "100%",
  cursor: "text",
  "::placeHolder": {
    color: colors.grey30,
  },
};

export const _test = {getValuesForReactSelect};
