/**
 * TEAM: frontend_infra
 * @flow strict
 */

/* eslint-disable flexport/no-unused-aphrodite-styles */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import {zIndices} from "../tools/zIndices";
import {type Size} from "../sizes";
import PopupWithClickAway, {
  ActualPlacementContext,
  type PopperPlacement,
} from "../popup/PopupWithClickAway";
import FilterButton from "./FilterButton";
import colors from "../colors";

type Props = {|
  ...React.ElementConfig<typeof FilterButton>,
  +isActive?: void,
  +onClick?: void,
  /** the size of the filter button */
  +size?: Size,
  /** controls where the dropdown menu is anchored in relation to the multiselect input */
  +placement?: PopupPlacement,
  /** The dropdown contents */
  +children: React.Node | ((closePopup: () => void) => React.Node),
  /** whether to use a Portal or React Fragment component */
  +noPortal?: boolean,
|};

export {ActualPlacementContext};

export type PopupPlacement = PopperPlacement;

/** This context tells child components that it is within a Filter */
export const InFilterContext = React.createContext<boolean>(false);

/**
 * @short A presentational skeleton for filters that can be used to build Custom Filters
 * @brandStatus V2
 * @status Stable
 * @category Filter
 * BaseFilter serves as a skeleton than can be extended to create custom
 * filters with. BaseFilter controls the presentation of the filter button
 * and the filter dropdown. If you build a custom filter, consider contributing your
 * filter to Latitude so it can be used by others. See
 * [Latitude contribution guidelines for more details](/components/contributing)
 */
function BaseFilter({
  children,
  selectedText,
  placement = "bottom-start",
  noPortal = false,
  ...filterButtonProps
}: Props) {
  return (
    <PopupWithClickAway escToClose={true}>
      {(Target, Popup, {togglePopup, closePopup, isOpen}) => (
        <>
          <Target>
            <FilterButton
              {...filterButtonProps}
              onClick={togglePopup}
              isActive={isOpen}
              selectedText={selectedText}
            />
          </Target>
          <Popup
            placement={placement}
            noPortal={noPortal}
            zIndex={zIndices.zIndexPopup.value}
          >
            <div className={css(styles.dropdownContainer)}>
              <InFilterContext.Provider value={true}>
                {typeof children === "function"
                  ? children(closePopup)
                  : children}
              </InFilterContext.Provider>
            </div>
          </Popup>
        </>
      )}
    </PopupWithClickAway>
  );
}

const styles = StyleSheet.create({
  dropdownContainer: {
    display: "flex",
    margin: "6px 0",
    boxShadow: "0px 0px 10px rgba(57, 65, 77, 0.15)",
    background: colors.white,
    overflow: "hidden",
  },
});

export default BaseFilter;
