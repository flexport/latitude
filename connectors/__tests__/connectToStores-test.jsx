/**
 * TEAM: frontend_infra
 * WATCHERS: dounan, Stephane-Y
 *
 * @flow
 */
/* eslint-disable no-unused-expressions */

import * as React from "react";
import {mount, shallow} from "enzyme";
import EventEmitter from "events";
import {EventTypes} from "../../constants/_MutationConstants";
import connectToStores, {
  _unsubscribeFromStores,
  _subscribeToStores,
} from "../connectToStores";

class Store extends EventEmitter {
  _value: number = 100;

  getValue() {
    return this._value;
  }

  setValue(newVal: number) {
    this._value = newVal;
    this.emit(EventTypes.CHANGED);
  }
}

describe("_subscribeToStores", () => {
  it("subscribes from all provided stores", () => {
    const s1 = new Store();
    const s2 = new Store();

    const listener = jest.fn();
    s1.emit(EventTypes.CHANGED);
    expect(listener.mock.calls.length).toBe(0);

    _subscribeToStores([s1, s2], listener);
    s1.emit(EventTypes.CHANGED);
    expect(listener.mock.calls.length).toBe(1);
    s2.emit(EventTypes.CHANGED);
    expect(listener.mock.calls.length).toBe(2);
  });
});

describe("_unsubscribeFromStores", () => {
  it("unsubscribes from all provided stores", () => {
    const s1 = new Store();
    const s2 = new Store();

    const listener = jest.fn();
    s1.on(EventTypes.CHANGED, listener);
    s2.on(EventTypes.CHANGED, listener);
    s1.emit(EventTypes.CHANGED);
    expect(listener.mock.calls.length).toBe(1);

    _unsubscribeFromStores([s1, s2], listener);
    s1.emit(EventTypes.CHANGED);
    expect(listener.mock.calls.length).toBe(1);
    s2.emit(EventTypes.CHANGED);
    expect(listener.mock.calls.length).toBe(1);
  });
});

describe("connectToStores", () => {
  type PropsFromParent = {
    +someProp: number,
  };

  type PropsFromStores = {
    +derivedProp: number,
    +storeProp: number,
  };

  type Props = PropsFromParent & PropsFromStores;

  // eslint-disable-next-line flexport/puritan-extends-component,react
  class View extends React.PureComponent<Props> {
    render() {
      return <div />;
    }
  }

  let MyStore;
  let AnotherStore;

  function defaultMapStoresToProps(propsFromParent: any) {
    const storeProp =
      propsFromParent.someProp === 0
        ? MyStore.getValue()
        : AnotherStore.getValue();
    return {
      ...propsFromParent,
      derivedProp: propsFromParent.someProp + 1,
      storeProp,
    };
  }

  // NOTE: Need to use mount() whenever we want to trigger componentDidMount
  // and subscribe to the necessary stores.

  beforeEach(() => {
    MyStore = new Store();
    AnotherStore = new Store();
  });

  it("has the right displayname", () => {
    const Connected = connectToStores(
      [MyStore, AnotherStore],
      defaultMapStoresToProps
    )(View);
    expect(Connected.displayName).toBe("connectToStores(View)");
  });

  it("renders the View with the right props", () => {
    const Connected = connectToStores(
      [MyStore, AnotherStore],
      defaultMapStoresToProps
    )(View);
    const wrapper = shallow(<Connected someProp={10} />);
    const viewWrapper = wrapper.find(View);
    expect(Object.keys(viewWrapper.props()).length).toBe(3);
    expect(viewWrapper.prop("someProp")).toBe(10);
    expect(viewWrapper.prop("derivedProp")).toBe(11);
    expect(viewWrapper.prop("storeProp")).toBe(100);
  });

  it("subscribes to all stores on mount", () => {
    const Connected = connectToStores(
      [MyStore, AnotherStore],
      defaultMapStoresToProps
    )(View);
    expect(MyStore.listenerCount(EventTypes.CHANGED)).toBe(0);
    expect(AnotherStore.listenerCount(EventTypes.CHANGED)).toBe(0);

    mount(<Connected someProp={0} />);
    expect(MyStore.listenerCount(EventTypes.CHANGED)).toBe(1);
    expect(AnotherStore.listenerCount(EventTypes.CHANGED)).toBe(1);
  });

  it("recomputes the props on CHANGED", () => {
    const Connected = connectToStores(
      [MyStore, AnotherStore],
      defaultMapStoresToProps
    )(View);
    // Passing in 0 for someProp triggers the access of stores.MyStore
    const wrapper = mount(<Connected someProp={0} />);
    let viewWrapper = wrapper.find(View);
    expect(viewWrapper.prop("storeProp")).toBe(100);

    MyStore.setValue(999);
    viewWrapper = wrapper.find(View);
    expect(viewWrapper.instance().props.storeProp).toBe(999);
  });

  it("recomputes the props when parent passes new props", () => {
    const Connected = connectToStores(
      [MyStore, AnotherStore],
      defaultMapStoresToProps
    )(View);
    const wrapper = shallow(<Connected someProp={10} />);
    let viewWrapper = wrapper.find(View);
    expect(viewWrapper.prop("someProp")).toBe(10);
    expect(viewWrapper.prop("derivedProp")).toBe(11);

    wrapper.setProps({someProp: 990});
    viewWrapper = wrapper.find(View);
    expect(viewWrapper.prop("someProp")).toBe(990);
    expect(viewWrapper.prop("derivedProp")).toBe(991);
  });

  it("unsubscribes from all stores on unmount", () => {
    const Connected = connectToStores(
      [MyStore, AnotherStore],
      defaultMapStoresToProps
    )(View);
    // Passing in 0 for someProp triggers the access of stores.MyStore
    const wrapper = mount(<Connected someProp={0} />);
    expect(MyStore.listenerCount(EventTypes.CHANGED)).toBe(1);
    expect(AnotherStore.listenerCount(EventTypes.CHANGED)).toBe(1);

    wrapper.unmount();
    expect(MyStore.listenerCount(EventTypes.CHANGED)).toBe(0);
    expect(AnotherStore.listenerCount(EventTypes.CHANGED)).toBe(0);
  });
});

describe("connectFnToStores", () => {
  type PropsFromParent = {
    +someProp: number,
  };

  type PropsFromStores = {
    +derivedProp: number,
    +storeProp: number,
  };

  type Props = PropsFromParent & PropsFromStores;

  // eslint-disable-next-line autofix/no-unused-vars
  function FnView(props: Props) {
    return null;
  }

  function defaultMapStoresToProps(propsFromParent: PropsFromParent) {
    const storeProp =
      propsFromParent.someProp === 0
        ? MyStore.getValue()
        : AnotherStore.getValue();
    return {
      ...propsFromParent,
      derivedProp: propsFromParent.someProp + 1,
      storeProp,
    };
  }

  let MyStore;
  let AnotherStore;

  beforeEach(() => {
    MyStore = new Store();
    AnotherStore = new Store();
  });

  // NOTE: Need to use mount() whenever we want to trigger componentDidMount
  // and subscribe to the necessary stores.

  it("has the right displayname", () => {
    const Connected = connectToStores(
      [MyStore, AnotherStore],
      defaultMapStoresToProps
    )(FnView);
    expect(Connected.displayName).toBe("connectToStores(FnView)");
  });

  it("renders the View with the right props", () => {
    const Connected = connectToStores(
      [MyStore, AnotherStore],
      defaultMapStoresToProps
    )(FnView);
    const wrapper = shallow(<Connected someProp={10} />);
    const viewWrapper = wrapper.find(FnView);
    expect(Object.keys(viewWrapper.props()).length).toBe(3);
    expect(viewWrapper.prop("someProp")).toBe(10);
    expect(viewWrapper.prop("derivedProp")).toBe(11);
    expect(viewWrapper.prop("storeProp")).toBe(100);
  });

  // Don't need to test this thoroughly since this is just an alias for connectToStores.
  // Just want to make sure that the basic cases still work.
});

// =============================================================================
// Flow type tests
// =============================================================================

// Don't need to use jest functions here, but they do provide an intuitive way
// to document the test cases.
describe("connectToStores flow types", () => {
  type PropsFromParent = {
    +numberProp: number,
    +stringProp: string,
  };

  type PropsFromStores = {
    +arrNumberProp: Array<number>,
    +arrStringProp: Array<string>,
  };

  type Props = PropsFromStores & PropsFromParent;

  const goodMapping = (propsFromParent: PropsFromParent) => ({
    ...propsFromParent,
    arrNumberProp: [propsFromParent.numberProp],
    arrStringProp: [propsFromParent.stringProp],
  });

  describe("es6 class component", () => {
    // eslint-disable-next-line flexport/puritan-extends-component,react
    class MyComponent extends React.PureComponent<Props> {}

    it("works for the happy case", () => {
      const WrappedComponent = connectToStores([], goodMapping)(MyComponent);
      <WrappedComponent stringProp="hi" numberProp={1} />;
    });

    it("does not allow missing required prop", () => {
      const WrappedComponent = connectToStores([], goodMapping)(MyComponent);
      // $ExpectError
      <WrappedComponent stringProp="hi" />;
    });

    it("does not allow wrong type for prop `numberProp` from parent", () => {
      const WrappedComponent = connectToStores([], goodMapping)(MyComponent);
      // $ExpectError
      <WrappedComponent numberProp="shouldBeNumber" stringProp="hi" />;
    });

    it("does not allow wrong type for prop `stringProp` from parent", () => {
      const WrappedComponent = connectToStores([], goodMapping)(MyComponent);
      // $ExpectError
      <WrappedComponent numberProp={1} stringProp={2} />;
    });

    it("does not allow wrong type for prop `arrNumberProp` from mapping", () => {
      const badMapping = (propsFromParent: PropsFromParent) => ({
        ...propsFromParent,
        arrNumberProp: [propsFromParent.stringProp],
        arrStringProp: [propsFromParent.stringProp],
      });
      // $ExpectError
      const BadlyWrappedComponent = connectToStores([], badMapping)(
        MyComponent
      );
      <BadlyWrappedComponent numberProp={1} stringProp="hi" />;
    });

    it("does not allow wrong type for prop `arrStringProp` from mapping", () => {
      const badMapping = (propsFromParent: PropsFromParent) => ({
        ...propsFromParent,
        arrNumberProp: [propsFromParent.numberProp],
        arrStringProp: [propsFromParent.numberProp],
      });
      // $ExpectError
      const BadlyWrappedComponent = connectToStores([], badMapping)(
        MyComponent
      );
      <BadlyWrappedComponent numberProp={1} stringProp="hi" />;
    });

    it("disallows accessing invalid props from parent", () => {
      const mappingWithBadPropAccess = (propsFromParent: PropsFromParent) => {
        // $ExpectError
        propsFromParent.doesNotExist;
        return {
          ...propsFromParent,
          arrNumberProp: [propsFromParent.numberProp],
          arrStringProp: [propsFromParent.stringProp],
        };
      };
      const WrappedComponent = connectToStores([], mappingWithBadPropAccess)(
        MyComponent
      );
      <WrappedComponent numberProp={1} stringProp="hi" />;
    });

    it("does not allow missing required prop that is not in defaultProps", () => {
      // eslint-disable-next-line flexport/puritan-extends-component,react
      class ComponentWithDefaultProps extends React.PureComponent<Props> {
        static defaultProps = {numberProp: 1};
      }
      const WrappedComponent = connectToStores([], goodMapping)(
        ComponentWithDefaultProps
      );
      // $ExpectError
      <WrappedComponent />;
    });

    it("does not allow wrong type for prop in defaultProps", () => {
      // eslint-disable-next-line flexport/puritan-extends-component,react
      class ComponentWithDefaultProps extends React.PureComponent<Props> {
        static defaultProps = {numberProp: 1};
      }
      const WrappedComponent = connectToStores([], goodMapping)(
        ComponentWithDefaultProps
      );
      // $ExpectError
      <WrappedComponent numberProp="shouldBeNumber" stringProp="hi" />;
    });

    it("does not allow wrong type for prop that is not in defaultProps", () => {
      // eslint-disable-next-line flexport/puritan-extends-component,react
      class ComponentWithDefaultProps extends React.PureComponent<Props> {
        static defaultProps = {numberProp: 1};
      }
      const WrappedComponent = connectToStores([], goodMapping)(
        ComponentWithDefaultProps
      );
      // $ExpectError
      <WrappedComponent stringProp={1} />;
    });

    it("do allow missing required prop that is in defaultProps", () => {
      // eslint-disable-next-line flexport/puritan-extends-component,react
      class ComponentWithDefaultProps extends React.PureComponent<Props> {
        static defaultProps = {numberProp: 1};
      }
      const WrappedComponent = connectToStores(
        [],
        (propsFromParent: {+stringProp: string}) => ({
          ...propsFromParent,
          arrNumberProp: [],
          arrStringProp: [propsFromParent.stringProp],
        })
      )(ComponentWithDefaultProps);
      // $ExpectError
      <WrappedComponent stringProp={1} />;
    });
  });

  describe("functional component", () => {
    // eslint-disable-next-line autofix/no-unused-vars
    function FnComponent(props: Props): null {
      return null;
    }

    it("works for the happy case", () => {
      const WrappedComponent = connectToStores([], goodMapping)(FnComponent);
      <WrappedComponent stringProp="hi" numberProp={1} />;
    });

    it("does not allow missing required prop", () => {
      const WrappedComponent = connectToStores([], goodMapping)(FnComponent);
      // $ExpectError
      <WrappedComponent stringProp="hi" />;
    });

    it("does not allow wrong type for prop `numberProp` from parent", () => {
      const WrappedComponent = connectToStores([], goodMapping)(FnComponent);
      // $ExpectError
      <WrappedComponent numberProp="shouldBeNumber" stringProp="hi" />;
    });

    it("does not allow wrong type for prop `stringProp` from parent", () => {
      const WrappedComponent = connectToStores([], goodMapping)(FnComponent);
      // $ExpectError
      <WrappedComponent numberProp={1} stringProp={2} />;
    });

    it("does not allow wrong type for prop `arrNumberProp` from mapping", () => {
      const badMapping = (propsFromParent: PropsFromParent) => ({
        ...propsFromParent,
        arrNumberProp: [propsFromParent.stringProp],
        arrStringProp: [propsFromParent.stringProp],
      });
      // $ExpectError
      const BadlyWrappedComponent = connectToStores([], badMapping)(
        FnComponent
      );
      <BadlyWrappedComponent numberProp={1} stringProp="hi" />;
    });

    it("does not allow wrong type for prop `arrStringProp` from mapping", () => {
      const badMapping = (propsFromParent: PropsFromParent) => ({
        ...propsFromParent,
        arrNumberProp: [propsFromParent.numberProp],
        arrStringProp: [propsFromParent.numberProp],
      });
      // $ExpectError
      const BadlyWrappedComponent = connectToStores([], badMapping)(
        FnComponent
      );
      <BadlyWrappedComponent numberProp={1} stringProp="hi" />;
    });

    it("disallows accessing invalid props from parent", () => {
      const mappingWithBadPropAccess = (propsFromParent: PropsFromParent) => {
        // $ExpectError
        propsFromParent.doesNotExist;
        return {
          ...propsFromParent,
          arrNumberProp: [propsFromParent.numberProp],
          arrStringProp: [propsFromParent.stringProp],
        };
      };
      const WrappedComponent = connectToStores([], mappingWithBadPropAccess)(
        FnComponent
      );
      <WrappedComponent numberProp={1} stringProp="hi" />;
    });
  });
});
