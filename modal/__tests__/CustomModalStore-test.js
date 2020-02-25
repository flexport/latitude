/**
 * TEAM: frontend_infra
 *
 * @flow
 */
// eslint-disable-next-line import/no-named-as-default
import CustomModalStore from "../CustomModalStore";
// eslint-disable-next-line import/first
import {EventTypes} from "../Constants";

describe("CustomModalStore", () => {
  const modalUniqueId = "FirstModal";
  const secondModal = "SecondModal";
  let emitterFn = jest.fn();
  describe("_show", () => {
    beforeEach(() => {
      CustomModalStore._reset();
      emitterFn = jest.fn();
      CustomModalStore.on(EventTypes.CHANGED, emitterFn);
    });
    it("shows the given modal id", () => {
      CustomModalStore._show({
        uniqueId: modalUniqueId,
        actionError: new Error(),
      });
      expect(CustomModalStore.getVisible()).toEqual([
        {uniqueId: modalUniqueId},
      ]);
      expect(emitterFn.mock.calls.length === 1);
    });
    it("can add two modals", () => {
      CustomModalStore._show({
        uniqueId: modalUniqueId,
        actionError: new Error(),
      });
      CustomModalStore._show({uniqueId: secondModal, actionError: new Error()});
      expect(CustomModalStore.getVisible()).toEqual([
        {uniqueId: secondModal},
        {uniqueId: modalUniqueId},
      ]);
      expect(emitterFn.mock.calls.length === 2);
      // this should actually error, but need to decide the best way to mock Raven / invariants
    });
  });
  describe("_remove", () => {
    beforeEach(() => {
      CustomModalStore._reset();
    });
    it("removes a modal that is added", () => {
      CustomModalStore._show({
        uniqueId: modalUniqueId,
        actionError: new Error(),
      });
      CustomModalStore._remove({
        uniqueId: modalUniqueId,
        actionError: new Error(),
      });
      expect(CustomModalStore.getVisible()).toEqual([]);
      expect(emitterFn.mock.calls.length === 1);
    });
    it("only removes one of the modals", () => {
      const secondModal = "SecondModal";
      CustomModalStore._show({
        uniqueId: modalUniqueId,
        actionError: new Error(),
      });
      CustomModalStore._show({uniqueId: secondModal, actionError: new Error()});
      CustomModalStore._remove({
        uniqueId: modalUniqueId,
        actionError: new Error(),
      });
      expect(CustomModalStore.getVisible()).toEqual([{uniqueId: secondModal}]);
      CustomModalStore._remove({
        uniqueId: secondModal,
        actionError: new Error(),
      });
      expect(CustomModalStore.getVisible()).toEqual([]);
      expect(emitterFn.mock.calls.length === 4);
    });
  });
});
