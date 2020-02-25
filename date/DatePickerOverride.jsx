/**
 * TEAM: frontend_infra
 * @flow
 */

import DatePicker from "react-datepicker";

/*
 * This class is needed to override componentWillReceiveProps on DatePicker.
 * By default, if the inline calendar is rendered, it only looks for changes
 * in month to re-center the calendar. This makes it look for year as well.
 * TODO(dmnd): This is no longer needed in 1.6: https://github.com/Hacker0x01/react-datepicker/commit/326a18d22cec44e7cbbe706d549e8cc6bf9394cd
 */
/**
 * Consider removing unsafe lifecycle methods for future concurrent mode support!
 * See https://reactjs.org/blog/2018/03/29/react-v-16-3.html#component-lifecycle-changes
 */
/* eslint-disable react/no-unsafe */
export default class DatePickerOverride extends DatePicker<*> {
  UNSAFE_componentWillReceiveProps(nextProps: any) {
    const currentMonth = this.props.selected && this.props.selected.month();
    const currentYear = this.props.selected && this.props.selected.year();
    const nextMonth = nextProps.selected && nextProps.selected.month();
    const nextYear = nextProps.selected && nextProps.selected.year();
    if (
      this.props.inline &&
      (currentMonth !== nextMonth || currentYear !== nextYear)
    ) {
      this.setPreSelection(nextProps.selected);
    }
  }
}
