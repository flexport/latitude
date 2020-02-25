/**
 * TEAM: frontend_infra
 * WATCHERS: zgotsch
 * @flow
 */
import * as React from "react";
import {mount} from "enzyme";
import Button from "../../button/Button";
import PopupWithClickAway from "../PopupWithClickAway";

function onClickOutsideHelper(
  inner: (
    attachPoint: HTMLElement,
    simulateClickForOnClickOutside: (wrapper: any, target: any) => void
  ) => void
) {
  const div = global.document.createElement("div");
  global.document.body.appendChild(div);

  // $FlowFixMe(zach): Mock addEventListener
  document._oldAddEventListener = document.addEventListener;
  // $FlowFixMe(zach): Mock removeEventListener
  document._oldRemoveEventListener = document.removeEventListener;

  const eventMap = {};
  // $FlowFixMe(zach): Mock addEventListener
  document.addEventListener = jest.fn((event, cb) => {
    if (!Object.hasOwnProperty.call(eventMap, event)) {
      eventMap[event] = [];
    }
    // Events are called in the order they are added.
    eventMap[event].push(cb);
  });
  // $FlowFixMe(zach): Mock removeEventListener
  document.removeEventListener = jest.fn((event, cb) => {
    if (Object.hasOwnProperty.call(eventMap, event)) {
      eventMap[event] = eventMap[event].filter(handler => handler !== cb);
    }
  });

  const simulateClickForOnClickOutside = (wrapper, target) => {
    eventMap.mousedown.forEach(handler => {
      // TODO(zach): There is a bug in react-onclickoutside which causes this to throw
      //   This is a stopgap so this test works, but we may see this error in production.
      //   If so, here are some terms which may help the grepper: getInstance
      //   See https://github.com/Pomax/react-onclickoutside/issues/271 for more info.
      try {
        handler.call(this, {target: target.getDOMNode()});
      } catch (e) {
        if (e.message.match(/getInstance/)) {
          // do nothing
        } else {
          throw e;
        }
      }
    });
    wrapper.update();
  };

  inner(div, simulateClickForOnClickOutside);

  // $FlowFixMe(zach): Mock addEventListener
  document.addEventListener = document._oldAddEventListener;
  // $FlowFixMe(zach): Mock removeEventListener
  document.removeEventListener = document._oldRemoveEventListener;

  // clean up div
  div.remove();
}

function SimplePopup() {
  return (
    <PopupWithClickAway>
      {(Target, Popup, {openPopup, closePopup}) => (
        <>
          <Target>
            <div id="non-popup-content" />
            <Button onClick={openPopup}>Open</Button>
          </Target>
          <Popup placement="bottom-start">
            <div id="popup-content">
              Hello world!
              <Button onClick={closePopup}>Close</Button>
            </div>
          </Popup>
        </>
      )}
    </PopupWithClickAway>
  );
}

function NestedPopup() {
  return (
    <PopupWithClickAway>
      {(
        Target,
        Popup,
        {openPopup: openPopupAlpha, closePopup: closePopupAlpha}
      ) => (
        <>
          <Target>
            <div id="non-popup-content-alpha" />
            <Button onClick={openPopupAlpha}>Open popup alpha</Button>
          </Target>
          <Popup placement="bottom-start">
            <div id="popup-content-alpha">
              <PopupWithClickAway>
                {(
                  Target,
                  Popup,
                  {openPopup: openPopupBeta, closePopup: closePopupBeta}
                ) => (
                  <>
                    <Target>
                      <div id="non-popup-content-beta" />
                      <Button onClick={openPopupBeta}>Open popup beta</Button>
                    </Target>
                    <Popup placement="bottom-start">
                      <div id="popup-content-beta">
                        Hello world!
                        <Button onClick={closePopupBeta}>
                          Close popup beta
                        </Button>
                      </div>
                    </Popup>
                  </>
                )}
              </PopupWithClickAway>
              <Button onClick={closePopupAlpha}>Close popup alpha</Button>
            </div>
          </Popup>
        </>
      )}
    </PopupWithClickAway>
  );
}

describe("PopupWithClickAway", () => {
  describe("A non-nested popup", () => {
    const expectClosed = wrapper =>
      expect(wrapper.find("#popup-content").length).toBe(0);
    const expectOpen = wrapper =>
      expect(wrapper.find("#popup-content").length).toBe(1);

    it("displays the non popup content", () => {
      const wrapper = mount(<SimplePopup />);
      expect(wrapper.find("#non-popup-content").length).toBe(1);
      expect(wrapper.find(Button).length).toBe(1);
    });

    it("does not display the popup content", () => {
      const wrapper = mount(<SimplePopup />);
      expectClosed(wrapper);
    });

    it("opens the popup when the button is clicked", () => {
      const instance = mount(<SimplePopup />);
      instance.find(Button).simulate("click");
      expectOpen(instance);
    });

    it("continues to display the non-popup content when the popup is open", () => {
      const wrapper = mount(<SimplePopup />);
      wrapper.find(Button).simulate("click");
      expect(wrapper.find("#non-popup-content").length).toBe(1);
    });

    it("closes the popup when the close button is clicked", () => {
      const wrapper = mount(<SimplePopup />);
      wrapper.find(Button).simulate("click");
      wrapper.find("#popup-content button").simulate("click");
      wrapper.setProps({
        in: false,
        onExited() {
          expectClosed(wrapper);
        },
      });
    });

    it("doesn't close the popup when clicked inside the popup", () => {
      onClickOutsideHelper((attachPoint, simulateClickForOnClickOutside) => {
        const wrapper = mount(
          <>
            <div id="outside">outside</div>
            <SimplePopup />
          </>,
          {attachTo: attachPoint}
        );

        wrapper.find(Button).simulate("click");
        expectOpen(wrapper);

        simulateClickForOnClickOutside(wrapper, wrapper.find("#popup-content"));
        expectOpen(wrapper);

        wrapper.detach();
      });
    });

    it("doesn't close the popup when clicked inside the Target", () => {
      onClickOutsideHelper((attachPoint, simulateClickForOnClickOutside) => {
        const wrapper = mount(
          <>
            <div id="outside">outside</div>
            <SimplePopup />
          </>,
          {attachTo: attachPoint}
        );

        wrapper.find(Button).simulate("click");
        expectOpen(wrapper);

        simulateClickForOnClickOutside(
          wrapper,
          wrapper.find("#non-popup-content")
        );
        expectOpen(wrapper);

        wrapper.detach();
      });
    });

    it("closes the popup when clicked outside the popup and Target", () => {
      onClickOutsideHelper((attachPoint, simulateClickForOnClickOutside) => {
        const wrapper = mount(
          <div>
            <div id="outside">outside</div>
            <SimplePopup />
          </div>,
          {attachTo: attachPoint}
        );

        wrapper.find(Button).simulate("click");
        expectOpen(wrapper);

        simulateClickForOnClickOutside(wrapper, wrapper.find("#outside"));

        wrapper.setProps({
          children: React.cloneElement(wrapper.props().children[1], {
            in: false,
            onExited() {
              expectClosed(wrapper);
            },
          }),
        });

        wrapper.detach();
      });
    });
  });

  describe("A nested popup", () => {
    it("renders a nested popup", () => {
      const wrapper = mount(<NestedPopup />);
      expect(wrapper.find("#non-popup-content-alpha").length).toBe(1);
    });

    it("opens popup alpha when the 'open alpha' button is clicked", () => {
      const wrapper = mount(<NestedPopup />);
      expect(wrapper.find("#popup-content-alpha").length).toBe(0);
      wrapper
        .find(Button)
        .at(0)
        .simulate("click");
      expect(wrapper.find("#popup-content-alpha").length).toBe(1);
    });

    it("opens popup beta when the 'open beta' button is clicked", () => {
      const wrapper = mount(<NestedPopup />);
      expect(wrapper.find("#non-popup-content-beta").length).toBe(0);
      wrapper
        .find(Button)
        .at(0)
        .simulate("click");
      expect(wrapper.find("#non-popup-content-beta").length).toBe(1);
      expect(wrapper.find("#popup-content-beta").length).toBe(0);
      wrapper
        .find(Button)
        .at(1)
        .simulate("click");
      expect(wrapper.find("#popup-content-beta").length).toBe(1);
    });

    it("closes only beta when the 'close beta' button is clicked", () => {
      const wrapper = mount(<NestedPopup />);
      wrapper
        .find(Button)
        .at(0)
        .simulate("click");
      wrapper
        .find(Button)
        .at(1)
        .simulate("click");
      expect(wrapper.find("#popup-content-alpha").length).toBe(1);
      expect(wrapper.find("#popup-content-beta").length).toBe(1);
      wrapper
        .find(Button)
        .at(2)
        .simulate("click");
      wrapper.setProps({
        in: false,
        onExited() {
          expect(wrapper.find("#popup-content-alpha").length).toBe(1);
          expect(wrapper.find("#popup-content-beta").length).toBe(0);
        },
      });
    });

    it("closes alpha and beta when the 'close alpha' button is clicked", () => {
      const wrapper = mount(<NestedPopup />);
      wrapper
        .find(Button)
        .at(0)
        .simulate("click");
      wrapper
        .find(Button)
        .at(1)
        .simulate("click");
      expect(wrapper.find("#popup-content-alpha").length).toBe(1);
      expect(wrapper.find("#popup-content-beta").length).toBe(1);
      wrapper
        .find(Button)
        .at(3)
        .simulate("click");
      wrapper.setProps({
        in: false,
        onExited() {
          expect(wrapper.find("#popup-content-alpha").length).toBe(0);
          expect(wrapper.find("#popup-content-beta").length).toBe(0);
        },
      });
    });

    it("doesn't close any popup when clicked inside of the beta popup", () => {
      onClickOutsideHelper((attachPoint, simulateClickForOnClickOutside) => {
        const wrapper = mount(<NestedPopup />, {attachTo: attachPoint});

        wrapper
          .find(Button)
          .at(0)
          .simulate("click");
        wrapper
          .find(Button)
          .at(1)
          .simulate("click");

        expect(wrapper.find("#popup-content-alpha").length).toBe(1);
        expect(wrapper.find("#popup-content-beta").length).toBe(1);

        simulateClickForOnClickOutside(
          wrapper,
          wrapper.find("#popup-content-beta")
        );

        expect(wrapper.find("#popup-content-alpha").length).toBe(1);
        expect(wrapper.find("#popup-content-beta").length).toBe(1);
      });
    });

    it("closes beta when clicked inside the alpha popup but not the beta popup", () => {
      onClickOutsideHelper((attachPoint, simulateClickForOnClickOutside) => {
        const wrapper = mount(<NestedPopup />, {attachTo: attachPoint});

        wrapper
          .find(Button)
          .at(0)
          .simulate("click");
        wrapper
          .find(Button)
          .at(1)
          .simulate("click");

        expect(wrapper.find("#popup-content-alpha").length).toBe(1);
        expect(wrapper.find("#popup-content-beta").length).toBe(1);

        simulateClickForOnClickOutside(
          wrapper,
          wrapper.find("#popup-content-alpha")
        );

        wrapper.setProps({
          in: false,
          onExited() {
            expect(wrapper.find("#popup-content-alpha").length).toBe(1);
            expect(wrapper.find("#popup-content-beta").length).toBe(0);
          },
        });
      });
    });

    it("closes both popups when clicked outside both popups", () => {
      onClickOutsideHelper((attachPoint, simulateClickForOnClickOutside) => {
        const wrapper = mount(
          <div>
            <div id="outside" />
            <NestedPopup />
          </div>,
          {attachTo: attachPoint}
        );

        wrapper
          .find(Button)
          .at(0)
          .simulate("click");
        wrapper
          .find(Button)
          .at(1)
          .simulate("click");

        expect(wrapper.find("#popup-content-alpha").length).toBe(1);
        expect(wrapper.find("#popup-content-beta").length).toBe(1);

        simulateClickForOnClickOutside(wrapper, wrapper.find("#outside"));

        wrapper.setProps({
          children: React.cloneElement(wrapper.props().children[1], {
            in: false,
            onExited() {
              expect(wrapper.find("#popup-content-alpha").length).toBe(0);
              expect(wrapper.find("#popup-content-beta").length).toBe(0);
            },
          }),
        });
      });
    });
  });
});
