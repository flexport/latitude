/**
 * TEAM: frontend_infra
 * WATCHERS: legalosLOTR
 *
 * @flow strict
 */

export default {
  type: "languageDetector",
  init: () => {},
  detect: () => {
    let found;

    if (
      typeof window !== "undefined" &&
      // very rarely, window.location is null. possibly due to some weird browser extension.
      // https://sentry.io/flexport/flexport/issues/592460179/
      window.location != null
    ) {
      const query = window.location.search.substring(1);
      const params = query.split("&");
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < params.length; i++) {
        const pos = params[i].indexOf("=");
        if (pos > 0) {
          const key = params[i].substring(0, pos);
          if (key === "lang") {
            found = params[i].substring(pos + 1);
          }
        }
      }
    }

    return found;
  },
  cacheUserLanguage: () => {},
};
