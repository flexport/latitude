/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow
 */

/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/forbid-elements */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable flexport/no-unused-aphrodite-styles */

import * as React from "react";
import {css, StyleSheet} from "aphrodite";
import invariant from "../tools/invariant";
import {border, typeScale, fontWeights} from "../styles/index";

import latitudeColors from "../colors";
import {whitespaceSizeConstants} from "../styles/whitespace";
import Icon from "../Icon";

type Tab = {|
  +name: string,
  +id: string,
  +status?: ?Status,
|};

export type Status = "complete"; // will support other types when status component is built

type Props = {|
  /** array of tabs of type {name: string, id: string, status: Status} */
  +tabs: $ReadOnlyArray<Tab>,
  /** activeTab is the id of the currently active tab */
  +activeTab: string,
  /** onTabChange is called with the ID when the user navigates to a tab */
  +onTabChange: string => void,
  /** An open area on the right end of TabHeader usually meant for button(s) */
  +components?: React.Node,
  /** whether the tabs will be centered or not */
  +centerTabs?: boolean,
|};

/**
 * @short Use this to build tabs
 * @brandStatus V2
 * @status In Review
 * @category Navigation
 * The component provides uniform designs for building Tab Headers so that they
 * look the same across the app. */
export default function TabHeader({
  tabs,
  activeTab,
  onTabChange,
  components,
  centerTabs,
}: Props) {
  invariant(
    tabs.map<string>(f => f.id).filter(id => id === activeTab).length === 1,
    "invalid active tab value"
  );

  return (
    <div className={css(styles.outer)}>
      <div className={css(styles.container, centerTabs && styles.centerTabs)}>
        {tabs.map(t => (
          <TabComponent
            id={t.id}
            key={t.id}
            name={t.name}
            status={t.status}
            onClick={onTabChange}
            active={activeTab === t.id}
          />
        ))}
      </div>
      <div>{components}</div>
    </div>
  );
}

const TabComponent = (props: {
  +id: string,
  +name: string,
  +status?: ?Status,
  +onClick: string => void,
  +active: boolean,
}) => {
  const {id, name, status, onClick, active} = props;
  const handleClick = () => {
    onClick(id);
  };

  return (
    <a
      id={`th-${id}`}
      className={css(styles.tab, active && styles.active)}
      onClick={handleClick}
      role="button"
      title={name}
    >
      {/* TODO(ddzoan) Replace this with the pill/status component (LDS-463) when it's ready */}
      {status === "complete" ? (
        <Icon
          iconName="check"
          size="s"
          color="green40"
          className={css(styles.status)}
          deprecatedAllowColorInheritance={false}
        />
      ) : null}
      {name}
    </a>
  );
};

export const _test = {TabComponent};

const styles = StyleSheet.create({
  tab: {
    color: latitudeColors.grey60,
    padding: whitespaceSizeConstants.s,
    ...border.b.m,
    ...typeScale.base,
    borderColor: "transparent",
    ":hover": {
      cursor: "pointer",
      borderColor: latitudeColors.grey40,
    },
    marginRight: whitespaceSizeConstants.xl,
    // pseudo-element prevents the element from growing on becoming bold
    ":after": {
      display: "block",
      content: "attr(title)",
      fontWeight: "bold",
      height: 1,
      color: "transparent",
      overflow: "hidden",
      visibility: "hidden",
    },
  },
  container: {
    display: "flex",
    flex: 1,
  },
  centerTabs: {
    justifyContent: "center",
  },
  outer: {
    alignItems: "center",
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    ...border.b.s,
    borderColor: latitudeColors.grey60,
  },
  active: {
    color: latitudeColors.grey60,
    borderColor: latitudeColors.grey60,
    fontWeight: fontWeights.bold,
    ":hover": {
      borderColor: latitudeColors.grey60,
    },
  },
  status: {
    marginRight: whitespaceSizeConstants.s,
  },
});
