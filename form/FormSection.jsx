/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow
 */
/* eslint-disable react/prefer-stateless-function */

import * as React from "react";
import {css, StyleSheet} from "aphrodite";

import Text from "../Text";
import DeprecatedVerticalGroup from "../DeprecatedVerticalGroup";
import IconButton from "../button/IconButton";

type Gutter = 12 | 20 | 32;

type FormSectionProps = {|
  /** Form sections usually span one or two columns, but can span up to four columns for dense layouts or rows with many common data entry components. */
  +columns: number,
  /** The title of the section should be used to introduce the group of form elements. */
  +sectionTitle?: string,
  /** Optional field for supplying a form description. Descriptions help set expectations and directions for the user. */
  +description?: string,
  /** Sets the minimum column width (in px). This allows the grid to know when it needs to break to new lines. */
  +minColumnWidth: number,
  /** The amount of space between columns and between elements that wrap to a new line in a FormRow. */
  +columnGap: Gutter,
  /** The amount of space between FormRows */
  +rowGap: Gutter,
  /** An array of FormRows or FormSections. All forms are composed of one to many sections with any number of FormRows and sub-sections. */
  +children: React.Node,
  /**
   * A trash icon opposite the section title will only appear if an onDelete function is provided.
   * This is generally meant to be used for nested sections. In some instances, a form may require
   * a user to dynamically add and remove sub-sections (like adding/removing a number of containers).
   */
  +onRequestDelete?: () => void,
|};

type Grid = {|
  +columns: number,
  +columnGap: Gutter,
  +rowGap: Gutter,
  +minColumnWidth: ?number,
|};

export const GridContext: React.Context<Grid> = React.createContext({
  columns: 1,
  columnGap: 20,
  rowGap: 32,
  minColumnWidth: 80,
});

/**
 * @short Groups of FormRows
 * @brandStatus V2
 * @status Beta
 * @category Forms
 *
 * See [Form Guidelines](/design/guidelines/forms) for detailed usage information. Refer to [FormRow documentation](/design/components/FormRow) for specific implementation of `FormRow`s
 * @extends React.Component */
export default class FormSection extends React.PureComponent<FormSectionProps> {
  static defaultProps = {
    columnGap: 20,
    rowGap: 32,
  };
  render() {
    const {
      children,
      description,
      sectionTitle,
      minColumnWidth: minColumnWidthThatDespiteTheFlowTypeCouldBeMissing,
      columnGap,
      rowGap,
      columns,
      onRequestDelete,
    } = this.props;

    const minColumnWidth: ?number = minColumnWidthThatDespiteTheFlowTypeCouldBeMissing;

    return (
      <GridContext.Provider
        value={{columns, columnGap, rowGap, minColumnWidth}}
      >
        <section>
          {!sectionTitle && !description ? null : (
            <hgroup className={css(formStyles.hgroup)}>
              <DeprecatedVerticalGroup>
                {sectionTitle ? (
                  <div className={css(formStyles.sectionHeader)}>
                    <Text weight="bold">{sectionTitle}</Text>
                    {onRequestDelete ? (
                      <IconButton
                        type="button"
                        iconName="trash"
                        intent="none"
                        kind="hollow"
                        onClick={onRequestDelete}
                      />
                    ) : null}
                  </div>
                ) : null}
                {description ? (
                  <div style={{maxWidth: "540px"}}>
                    <Text>{description}</Text>
                  </div>
                ) : null}
              </DeprecatedVerticalGroup>
            </hgroup>
          )}
          {children}
        </section>
      </GridContext.Provider>
    );
  }
}

const formStyles = StyleSheet.create({
  hgroup: {
    marginBottom: "20px",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
  },
});
