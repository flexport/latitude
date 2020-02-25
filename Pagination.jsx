/**
 * TEAM: frontend_infra
 *
 * @flow
 */

import * as React from "react";
import {css, StyleSheet} from "aphrodite";

import IconButton from "./button/IconButton";
import Text from "./Text";
import invariant from "./tools/invariant";

type Props = {
  /** The current page index */
  +page: number,
  /** The items displayed per page */
  +itemsPerPage: number,
  /** The total count of items */
  +totalItemCount: number,
  /** Callback invoked with the new page number when user clicks one of the arrows */
  +onChange: (page: number) => void,
};

export default function Pagination({
  page,
  itemsPerPage,
  totalItemCount,
  onChange,
}: Props) {
  invariant(totalItemCount >= 0, "Total item count cannot be negative");
  invariant(itemsPerPage >= 1, "Items per page must be at least 1");
  invariant(page >= 0, "Current page must be at least 0");

  const startIndex = page * itemsPerPage;
  const end = Math.min(startIndex + itemsPerPage, totalItemCount);

  invariant(
    startIndex <= totalItemCount,
    "Page number is outside possible range of total items"
  );

  const text =
    totalItemCount === 0
      ? "0 of 0"
      : `${startIndex + 1} - ${end} of ${totalItemCount}`;

  return (
    <div className={css(styles.container)}>
      <Text>{text}</Text>
      <IconButton
        iconName="left"
        type="button"
        kind="bare"
        onClick={() => onChange(page - 1)}
        disabled={page === 0}
      />
      <IconButton
        iconName="right"
        type="button"
        kind="bare"
        onClick={() => onChange(page + 1)}
        disabled={end === totalItemCount}
      />
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "inline-flex",
    alignItems: "center",
  },
});
