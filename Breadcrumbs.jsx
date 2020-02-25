/**
 * TEAM: frontend_infra
 *
 * @flow strict
 */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import colors from "./colors";
import Link from "./Link";
import Icon from "./Icon";

type BreadcrumbProps = {|
  /** URL a Breadcrumb item points to */
  +href?: string,
  /** called when the Breadcrumb item is clicked */
  +onClick?: () => void,
  /** element, text, or  number rendered within the breadcrumb */
  // flowlint-next-line unclear-type:off
  +content: string | React.Element<any> | number, // This `any` is fine, alternative to React.Node which uses React.Element<any>, disallowing boolean, null, and void cases
|};

type Props = {|
  /** array of breadcrumb item props that defines the breadcrumbs shown and the
   * breadcrumb order, null, void, and false values are allowed
   * and skipped over
   */
  +items: $ReadOnlyArray<BreadcrumbProps | false | null | void>,
|};

/**
 * @category Navigation
 * @short A simple navigation component that displays a hierarchy of items/links in a row.
 * @brandStatus V3
 * @status Beta
 * The Breadcrumbs component displays a horizontal ordered list of items and/or
 * links representing user location. It accepts an array of configurations each
 * representing a visible breadcrumb. The content of each breadcrumb can be text, an
 * element, or a number. If an `href` or `onClick` prop is passed for a
 * breadcrumb, it will be styled to show it is selectable.
 */
export default function Breadcrumbs({items}: Props) {
  const filteredItems: Array<BreadcrumbProps> = [];

  // `Array.filter` not used because of limited Flow refinement support, see: https://github.com/facebook/flow/issues/1414
  items.forEach(props => {
    if (
      typeof props === "object" &&
      props !== null &&
      props !== false &&
      props !== undefined
    )
      filteredItems.push(props);
  });

  return (
    <div className={css(styles.breadcrumbsContainer)}>
      {filteredItems.map((props, index) => (
        <Breadcrumb
          {...props}
          key={props.href != null ? props.href : index}
          active={index === filteredItems.length - 1}
        />
      ))}
    </div>
  );
}

function Breadcrumb({
  href,
  content,
  active,
  onClick,
}: {|
  ...BreadcrumbProps,
  +active: boolean,
|}) {
  return (
    <>
      {href != null || onClick != null ? (
        <Link
          onClick={onClick}
          href={href}
          disableSpaHijack={true}
          className={css(
            styles.breadcrumb,
            active && styles.activeBreadcrumb,
            styles.clickableBreadcrumb
          )}
        >
          {content}
        </Link>
      ) : (
        <div
          className={css(styles.breadcrumb, active && styles.activeBreadcrumb)}
        >
          {content}
        </div>
      )}

      {!active && (
        <div className={css(styles.iconWrapper)}>
          <Icon
            iconName="rightOpen"
            color="grey40"
            size="xs"
            alignment="center"
          />
        </div>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  breadcrumbsContainer: {
    display: "flex",
    alignItems: "center",
  },
  iconWrapper: {
    margin: "0 8px",
    position: "relative",
  },
  breadcrumb: {
    color: colors.grey60,
    position: "relative",
  },
  activeBreadcrumb: {
    color: colors.grey50,
  },
  clickableBreadcrumb: {
    cursor: "pointer",
    ":hover": {
      textDecoration: "underline",
    },
  },
});
