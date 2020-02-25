/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 *
 * @flow
 */

import * as React from "react";
import {css, StyleSheet} from "aphrodite";
import {typeScale} from "../styles";
import colors from "../colors";
import ThemeNameContext, {type Theme} from "../context/ThemeNameContext";
import getThemeColors from "../styles/getThemeColors";
import Icon from "../Icon";

export const DEFAULT_COLUMN_WIDTH_PX = 40;

export type SortDirection = "asc" | "desc" | "none";

type CellProps<Data> = {
  data?: Data,
  children: Data => string | React.Node,
};

type Cell<Data> = React.Element<React.ComponentType<CellProps<Data>>>;

type HeaderRenderer = (
  sortDirection: SortDirection,
  onSortChange: (SortDirection) => mixed
) => React.Node;

type Props<Data> = {
  /** something to identify this column, e.g. when indicating which columns are visible */
  +name: string,
  /** flex value to indicate how this column grows/shrinks relative to other columns */
  +flex: string,
  +header?: HeaderRenderer,
  +width: number | string,
  +justifyContent: "flex-start" | "flex-end",
  +border: Array<"l" | "r">,
  +striped: boolean,
  +minWidth: number | string,
  +maxWidth: number | string,
  // to display content, either pass a function that renders a
  /** Cell component as a child, or a value function */
  +children?: Data => Cell<Data>,
  +value?: Data => string | React.Node,
};

/* eslint-disable react/prefer-stateless-function */
// $FlowUpgradeFixMe(0.84.0 -> 0.85.0)
export default class Column<Data> extends React.Component<Props<Data>> {
  static defaultProps = {
    flex: "1",
    width: DEFAULT_COLUMN_WIDTH_PX,
    justifyContent: "flex-start",
    border: [],
    striped: true,
    minWidth: "0",
    maxWidth: "none",
  };
}

const TextHeader = ({name}: {+name: string}) => (
  <div className={css(styles.textHeader)} title={name}>
    {name}
  </div>
);

function ButtonHeader(props: {+button: React.Node}) {
  const {button} = props;
  return <div className={css(styles.buttonHeader)}>{button}</div>;
}

export class SortableTextHeader extends React.PureComponent<{|
  +name: string,
  +sortDirection: SortDirection,
  +onSortChange: (sortDirection: SortDirection) => mixed,
|}> {
  static contextType = ThemeNameContext;
  context: Theme;

  render() {
    const {name, sortDirection, onSortChange} = this.props;

    const themeColors = getThemeColors(this.context);
    const {primary} = themeColors;

    return (
      <div
        className={css(styles.sortableTextHeaderWrapper, styles.textHeader)}
        role="button"
        tabIndex={0}
        onClick={() => onSortChange(sortDirection === "asc" ? "desc" : "asc")}
        onKeyDown={event =>
          event.keyCode === 13 // 13 = enter key.
            ? onSortChange(sortDirection === "asc" ? "desc" : "asc")
            : null
        }
        title={name}
      >
        <div
          className={css(styles.sortableTextHeaderText)}
          style={{
            color: sortDirection !== "none" ? colors[primary] : colors.grey50,
          }}
        >
          {name}
        </div>
        <div className={css(styles.sortableTextHeaderIndicator)}>
          <Icon
            iconName={{asc: "up", desc: "down", none: "up"}[sortDirection]}
            size="xxxs"
            color={sortDirection !== "none" ? primary : "grey50"}
          />
        </div>
      </div>
    );
  }
}

export {TextHeader};
export {ButtonHeader};

const styles = StyleSheet.create({
  textHeader: {
    ...typeScale.subtext,
    color: colors.grey50,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontWeight: 600,
    padding: "0px 12px",
    margin: "4px 0px",
    textAlign: "left",
  },
  buttonHeader: {
    padding: "0px 12px",
    display: "flex",
  },
  sortableTextHeaderWrapper: {
    display: "flex",
    flex: 1,
    minHeight: 0,
    minWidth: 0,
    cursor: "pointer",
    outline: "none",
  },
  sortableTextHeaderText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    paddingRight: "8px",
  },
  sortableTextHeaderIndicator: {
    flex: 1,
  },
});
