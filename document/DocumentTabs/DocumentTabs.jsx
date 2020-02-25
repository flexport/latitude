/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import colors from "../../colors";
import DocumentTab from "./DocumentTab";
import MoreTab from "./MoreTab";
import IconButton from "../../button/IconButton";
import type {Size} from "./sizes";

const MIN_ELEMENT_WIDTH = 130;
const MAX_ELEMENT_WIDTH = 200;

type Props = {|
  /** A list of document names to be displayed. */
  +documentNameOptions: $ReadOnlyArray<{+key: number, +name: string}>,
  /** The key of the currently selected document. */
  +selectedKey: number,
  /** A callback called when the add button is pressed. */
  +onAdd: () => void,
  /** A callback called when a tab is selected. */
  +onSelect: (key: number) => void,
  /** A callback called when a document is deleted. */
  +onDelete: (key: number) => void,
  /** The size of document tabs. */
  +size?: Size,
|};

type Dimensions = {|
  tabWidth: number,
  slices: number,
|};

function calculateWidths(
  containerWidth: number,
  minWidth: number,
  maxWidth: number,
  elementCount: number
): Dimensions {
  if (elementCount * maxWidth < containerWidth) {
    return {tabWidth: maxWidth, slices: elementCount};
  }

  const maxSlicesCount = Math.floor(containerWidth / minWidth);
  const slices = Math.min(maxSlicesCount, elementCount);
  // slices will be 0 sometimes.
  const tabWidth = slices !== 0 ? containerWidth / slices : 0;

  return {
    tabWidth,
    slices,
  };
}

/**
 * @short A tab header for managing multiple documents
 * @brandStatus V2
 * @status Beta
 * @category Documents
 */
function DocumentTabs({
  documentNameOptions,
  selectedKey,
  onAdd,
  onSelect,
  onDelete,
  size = "m",
}: Props) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = React.useState({
    tabWidth: 0,
    slices: 0,
  });
  const {tabWidth, slices} = dimensions;

  const offsetWidth = containerRef?.current?.offsetWidth || 0;

  React.useEffect(() => {
    if (containerRef.current !== null) {
      const dimensions = calculateWidths(
        // container size offset by size of addition button
        containerRef.current.offsetWidth,
        MIN_ELEMENT_WIDTH,
        MAX_ELEMENT_WIDTH,
        documentNameOptions.length
      );

      setDimensions(dimensions);
    }
  }, [documentNameOptions, offsetWidth]);

  const isOverflowing = documentNameOptions.length > slices;
  const nonOverflowCount = isOverflowing ? slices - 1 : slices;

  return (
    <div
      className={css(styles.container, tabWidth === 0 && styles.hidden)}
      style={{display: documentNameOptions.length !== 0 ? "flex" : "none"}}
    >
      <div className={css(styles.tabsContainer)} ref={containerRef}>
        {documentNameOptions.slice(0, nonOverflowCount).map(({name, key}) => (
          <DocumentTab
            isOverflow={false}
            width={tabWidth}
            isSelected={key === selectedKey}
            onClick={() => onSelect(key)}
            onDelete={() => onDelete(key)}
            size={size}
            isInDropdown={false}
            key={key}
          >
            {name}
          </DocumentTab>
        ))}

        {isOverflowing ? (
          <MoreTab
            width={tabWidth}
            size={size}
            selectedLabel={
              selectedKey < nonOverflowCount
                ? null
                : (
                    documentNameOptions.find(({key}) => key === selectedKey) ||
                    {}
                  ).name
            }
          >
            {documentNameOptions.slice(nonOverflowCount).map(({name, key}) => (
              <DocumentTab
                isOverflow={true}
                width={tabWidth}
                isSelected={key === selectedKey}
                onClick={() => onSelect(key)}
                onDelete={() => onDelete(key)}
                isInDropdown={true}
                size={size}
                key={key}
              >
                {name}
              </DocumentTab>
            ))}
          </MoreTab>
        ) : (
          undefined
        )}
      </div>

      <div className={css(styles.addButtonWrapper)}>
        <IconButton
          iconName="upload"
          type="button"
          intent="none"
          kind="bare"
          onClick={onAdd}
        />
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    padding: "12px 28px",
    flexDirection: "row",
    width: "100%",
    alignItems: "stretch",
  },
  tabsContainer: {
    flexDirection: "row",
    display: "flex",
    flex: "1 1 auto",
    alignItems: "stretch",
    padding: "2px 0",
    overflow: "hidden",
  },
  addButtonWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 4px 0 28px",
    // Hack: since inverted colors for buttons are not yet supported
    ":nth-child(1n) > button": {
      fill: colors.white,
      ":hover": {
        background: colors.grey60,
      },
      ":hover span svg": {
        fill: colors.white,
      },
    },
  },
  hidden: {
    visibility: "hidden",
  },
});

export const test = {calculateWidths};
export default DocumentTabs;
