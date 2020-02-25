/**
 * TEAM: frontend_infra
 * @flow
 */
import * as React from "react";
import {mount} from "enzyme";
import Toast from "../Toast";

describe("Toast", () => {
  it("calls callback function when undo is clicked", () => {
    const callbackFn = jest.fn();
    const action = {type: "undo", onClick: callbackFn};
    const toast = mount(
      <Toast message="test message" intent="success" action={action} />
    );
    toast.find("button").simulate("click");
    expect(callbackFn).toHaveBeenCalled();
  });
});
