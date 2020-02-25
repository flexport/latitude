/**
 * TEAM: frontend_infra
 *
 * @flow strict
 */

const getFullStoryLink = (): ?string =>
  window.FS && typeof window.FS.getCurrentSessionURL === "function"
    ? window.FS.getCurrentSessionURL(true)
    : null;

export default getFullStoryLink;
