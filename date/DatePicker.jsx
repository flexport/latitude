/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";

import typeof DatePickerOverrideType from "./DatePickerOverride";

const LazyDatePicker = React.lazy(() => {
  /* eslint-disable flexport/dynamic-import-webchunkname */
  const imports = [
    import(/* webpackChunkName: "DatePickerOverride" */ "./DatePickerOverride"),
    import(/* webpackChunkName: "react-datepicker" */ "../vendor_stylesheets/react-datepicker.css"),
    import(/* webpackChunkName: "DatePickerStylesOverride" */ "./DatePickerStylesOverride.css"),
  ];
  /* eslint-enable flexport/dynamic-import-webchunkname */

  return Promise.all(imports).then(([componentModule]) => componentModule);
});

export default function DatePicker(
  props: React.ElementConfig<DatePickerOverrideType>
) {
  return (
    <React.Suspense fallback={null}>
      <LazyDatePicker {...props} />
    </React.Suspense>
  );
}
