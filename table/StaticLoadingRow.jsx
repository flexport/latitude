/**
 * TEAM: frontend_infra
 *
 * @flow strict
 */

import * as React from "react";
import Group from "../Group";
import Button from "../button/Button";
import Text from "../Text";

type Props = {|
  +onLoadMoreClick: () => void,
  +fetchedItemCount: number,
  +totalItemCount: number,
|};

export default function StaticLoadingRow({
  onLoadMoreClick,
  fetchedItemCount,
  totalItemCount,
}: Props) {
  return (
    <Group justifyContent="center">
      <Button
        kind="blank"
        intent="none"
        label="Load more"
        onClick={onLoadMoreClick}
      />
      <Text>
        Showing {fetchedItemCount} of {totalItemCount}
      </Text>
    </Group>
  );
}
