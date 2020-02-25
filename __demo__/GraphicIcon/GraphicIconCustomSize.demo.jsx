/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";

import GraphicIcon from "../../GraphicIcon";
/**
 * @title Custom Size
 * @description All graphic icons have square dimensions so specifying a width will apply an equal width and height to the element.
 */
export default function GraphicIconCustomSize() {
  return <GraphicIcon icon="document_add" width={200} />;
}
