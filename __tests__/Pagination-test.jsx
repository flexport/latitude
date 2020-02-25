/**
 * TEAM: frontend_infra
 *
 * @flow strict-local
 */

import * as React from "react";
import {shallow} from "enzyme";

import Pagination from "../Pagination";
import IconButton from "../button/IconButton";
import Text from "../Text";

describe("Pagination", () => {
  it("should display the range", () => {
    const wrapper = shallow(
      <Pagination
        page={1}
        itemsPerPage={10}
        totalItemCount={30}
        onChange={() => {}}
      />
    );
    expect(wrapper.find(Text).prop("children")).toEqual("11 - 20 of 30");
  });

  it("should disable left button on first page", () => {
    const wrapper = shallow(
      <Pagination
        page={0}
        itemsPerPage={10}
        totalItemCount={10}
        onChange={() => {}}
      />
    );
    expect(
      wrapper
        .find(IconButton)
        .first()
        .prop("disabled")
    ).toEqual(true);
  });

  it("should disable right button on last page", () => {
    const wrapper = shallow(
      <Pagination
        page={1}
        itemsPerPage={10}
        totalItemCount={20}
        onChange={() => {}}
      />
    );
    expect(
      wrapper
        .find(IconButton)
        .last()
        .prop("disabled")
    ).toEqual(true);
  });

  it("should show upper range of total item count on last page", () => {
    const wrapper = shallow(
      <Pagination
        page={1}
        itemsPerPage={10}
        totalItemCount={15}
        onChange={() => {}}
      />
    );
    expect(wrapper.find(Text).prop("children")).toEqual("11 - 15 of 15");
  });

  describe("button interactions", () => {
    it("should call onChange with one less than the current page on left click", () => {
      const initialPage = 1;
      const onChangeSpy = jest.fn();
      const wrapper = shallow(
        <Pagination
          page={initialPage}
          itemsPerPage={10}
          totalItemCount={30}
          onChange={onChangeSpy}
        />
      );
      wrapper
        .find(IconButton)
        .first()
        .simulate("click");
      expect(onChangeSpy).toHaveBeenCalledWith(initialPage - 1);
    });

    it("should call onChange with one more than the current page on right click", () => {
      const initialPage = 1;
      const onChangeSpy = jest.fn();
      const wrapper = shallow(
        <Pagination
          page={initialPage}
          itemsPerPage={10}
          totalItemCount={30}
          onChange={onChangeSpy}
        />
      );
      wrapper
        .find(IconButton)
        .last()
        .simulate("click");
      expect(onChangeSpy).toHaveBeenCalledWith(initialPage + 1);
    });
  });

  it("should have the 0 total items case", () => {
    const wrapper = shallow(
      <Pagination
        page={0}
        itemsPerPage={10}
        totalItemCount={0}
        onChange={() => {}}
      />
    );
    expect(wrapper.find(Text).prop("children")).toEqual("0 of 0");
  });
});
