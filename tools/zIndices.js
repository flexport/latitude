/**
 * TEAM: frontend_infra
 * WATCHERS: Stephane-Y
 *
 * @flow strict
 */

const _zIndices = {
  zIndexBackground: {
    name: "zIndexBackground",
    key: "Background",
    value: -50,
  },
  zIndexMainContent: {
    name: "zIndexMainContent",
    key: "MainContent",
    value: 0,
  },
  zIndex0MainContent: {
    name: "zIndex0MainContent",
    key: "0MainContent",
    value: 0,
  },
  zIndex2: {
    name: "zIndex2",
    key: "2",
    value: 2,
  },
  zIndex4: {
    name: "zIndex4",
    key: "4",
    value: 4,
  },
  zIndex6: {
    name: "zIndex6",
    key: "6",
    value: 6,
  },
  zIndex8: {
    name: "zIndex8",
    key: "8",
    value: 8,
  },
  zIndex10: {
    name: "zIndex10",
    key: "10",
    value: 10,
  },
  zIndex15: {
    name: "zIndex15",
    key: "15",
    value: 15,
  },
  zIndexPopup: {
    name: "zIndexPopup",
    key: "Popup",
    value: 20,
  },
  zIndex20Popup: {
    name: "zIndex20Popup",
    key: "20Popup",
    value: 20,
  },
  zIndex25: {
    name: "zIndex25",
    key: "25",
    value: 25,
  },
  zIndex30: {
    name: "zIndex30",
    key: "30",
    value: 30,
  },
  zIndex40: {
    name: "zIndex40",
    key: "40",
    value: 40,
  },
  zIndexFloater: {
    name: "zIndexFloater",
    key: "Floater",
    value: 50,
  },
  zIndex50Floater: {
    name: "zIndex50Floater",
    key: "50Floater",
    value: 50,
  },
  zIndex60: {
    name: "zIndex60",
    key: "60",
    value: 60,
  },
  zIndex70: {
    name: "zIndex70",
    key: "70",
    value: 70,
  },
  zIndexNavigation: {
    name: "zIndexNavigation",
    key: "Navigation",
    value: 80,
  },
  zIndex80Navigation: {
    name: "zIndex80Navigation",
    key: "80Navigation",
    value: 80,
  },
  zIndexPageOverlay: {
    name: "zIndexPageOverlay",
    key: "PageOverlay",
    value: 100,
  },
  zIndex100PageOverlay: {
    name: "zIndex100PageOverlay",
    key: "100PageOverlay",
    value: 100,
  },
  // this is required for the CalendarDateInput to appear
  // above the Confirm Delivery Appointment modal
  zIndex1500AboveModal: {
    name: "zIndex1500AboveModal",
    key: "1500AboveModal",
    value: 1500,
  },
  zIndexTrump: {
    name: "zIndexTrump",
    key: "Trump",
    value: 9999,
  },
  zIndex9999Trump: {
    name: "zIndex9999Trump",
    key: "9999Trump",
    value: 9999,
  },
};

export type ZIndexClasses = $Keys<typeof _zIndices>;

// eslint-disable-next-line import/prefer-default-export
export const zIndices: {
  [name: ZIndexClasses]: {
    name: ZIndexClasses,
    key: string,
    value: number,
  },
} = _zIndices;
