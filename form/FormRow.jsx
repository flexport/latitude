/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow
 */
/* eslint-disable react/prefer-stateless-function */

import * as React from "react";
import {css, StyleSheet} from "aphrodite";
import invariant from "../tools/invariant";

import {GridContext} from "./FormSection";
import {gridRules, spanRules} from "./formTools";

type ColumnSpan = Array<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8>;

type FormRowProps = {|
  /** Specify a column span for each row element, alternatively specify responsive column spans and any or all breakpoints */
  +columnSpans: ColumnSpan,
  /** An array of form elements (generally our data entry components) */
  +children: React.Node,
|};

/**
 * @short Wrapper component for groups of data entry components
 * @brandStatus V2
 * @status Beta
 * @category Forms
 *
 * `FormRows` must live inside `FormSection`s. See [FormSection](/design/components/FormSection)  documentation for examples. See [Form Guidelines](/design/guidelines/forms) for detailed usage information.
 * @extends React.Component */
export default class FormRow extends React.PureComponent<FormRowProps> {
  render() {
    const {children, columnSpans} = this.props;
    invariant(
      // Filter out false-y children elements to allow
      // conditionally passing in elements
      // https://github.com/facebook/react/issues/7685
      columnSpans.length >= React.Children.toArray(children).length,
      "You must specify as many columnSpans as row elements!"
    );
    return (
      <GridContext.Consumer>
        {grid => {
          const spanCount = columnSpans.reduce((a, b) => a + b, 0);
          invariant(
            spanCount <= grid.columns,
            `FormRow elements may only span as many columns as specified in the FormSection. Your columnSpans add up to ${spanCount}, but this FormSection only allows up to ${
              grid.columns
            } columns.`
          );
          return (
            <article
              className={css(
                formStyles.row,
                gridRules[`grid-${grid.columnGap}`]
              )}
              style={{
                marginBottom: `${grid.rowGap}px`,
                gridTemplateColumns:
                  grid.columns === 1 || grid.minColumnWidth == null
                    ? "1fr"
                    : `repeat(auto-fill, minmax(${
                        grid.minColumnWidth
                      }px, 1fr))`,
              }}
            >
              {React.Children.toArray(children).map((child, i) => {
                const spanRule = `span-${columnSpans[
                  i
                ].toString()}-of-${grid.columns.toString()}-${grid.columnGap.toString()}`;
                return (
                  <div
                    className={css(formStyles.column, spanRules[spanRule])}
                    style={{minWidth: grid.minColumnWidth}}
                    // eslint-disable-next-line react/no-array-index-key
                    key={i}
                  >
                    {child}
                  </div>
                );
              })}
            </article>
          );
        }}
      </GridContext.Consumer>
    );
  }
}

const formStyles = StyleSheet.create({
  row: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    "@supports (display: grid)": {
      display: "grid",
      flexWrap: "unset",
      flexDirection: "unset",
    },
  },
  column: {
    display: "flex",
    flexDirection: "column",
    "@supports (display: grid)": {
      display: "block",
      flexDirection: "unset",
    },
  },
});
