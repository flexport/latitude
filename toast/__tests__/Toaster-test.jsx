/**
 * TEAM: frontend_infra
 * @flow
 */
import * as React from "react";
import {shallow} from "enzyme";
import Toaster from "../Toaster";

describe("Toaster", () => {
  it("renders when empty", () => {
    expect(shallow(<Toaster toasts={[]} />)).toMatchSnapshot();
  });

  it("renders when not empty", () => {
    const toasts = [
      {
        id: 0,
        message: "hello",
        intent: "success",
      },
      {
        id: 1,
        message: "hello",
        intent: "success",
      },
    ];
    expect(shallow(<Toaster toasts={toasts} />)).toMatchSnapshot();
  });
});
