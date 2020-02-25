/**
 * TEAM: shipment_data
 *
 * @flow
 */
import {_ToastStore} from "../ToastStore";

describe("ToastStore", () => {
  describe("getAll", () => {
    it("works when first inited", () => {
      const store = new _ToastStore();
      expect(store.getAll()).toEqual([]);
    });
  });

  describe("_show", () => {
    it("adds the toast", () => {
      const store = new _ToastStore();
      const toast = {message: "foo", intent: "success", removeAfter: null};
      store._show(toast);
      expect(store.getAll()).toEqual([{...toast, id: 0}]);
    });
  });

  describe("_remove", () => {
    it("removes the toast", () => {
      const store = new _ToastStore();
      const toast = {message: "foo", intent: "success", removeAfter: null};
      store._show(toast);
      expect(store.getAll().length).toEqual(1);
      store._remove(store.getAll()[0]);
      expect(store.getAll().length).toEqual(0);
    });

    it("works with multiple toasts", () => {
      const store = new _ToastStore();
      const toast1 = {message: "foo", intent: "success", removeAfter: null};
      const toast2 = {message: "foo", intent: "success", removeAfter: null};
      store._show(toast1);
      store._show(toast2);
      expect(store.getAll().length).toEqual(2);
      store._remove(store.getAll()[0]);
      expect(store.getAll().length).toEqual(1);
    });
  });
});
