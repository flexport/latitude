/**
 * TEAM: frontend_infra
 * WATCHERS: dounan, Stephane-Y
 *
 * @flow
 */

/**
 * connectToStores makes it easy to get data from all stores and keep the data
 * up to date, and allows you to remove store dependencies and object copying
 * from render().
 *
 * =============================================================================
 * Basic Usage
 * =============================================================================
 *
 *   connectToStores takes two arguments. The first is the list of Stores that you
 *   want to subscribe to. The second is a mapping function that maps those props
 *   to the props of the wrapped component. The mapping function is called whenever a
 *   CHANGED event occurs in any of the subscribed stores.
 *
 *   ```
 *   import ShipmentStore from "stores/ShipmentStore";
 *   import AuthStore from "stores/AuthStore";
 *
 *   // props that the parent component should provide
 *   type PropsFromParent = {
 *     clientId: number,
 *   };
 *
 *   // props provided by connectToStores mapping function, and the props that will be
 *   // received by our inner component
 *   type Props = {
 *     clientShipments: Array<Shipment>,
 *     client: Client,
 *   };
 *
 *   class ViewComponent extends Component<Props> {
 *     ...
 *   };
 *
 *   const connector = (connectToStores(
 *     [ShipmentStore, ClientStore]
 *     function(propsFromParent: PropsFromParent): Props {
 *       const shipments = ShipmentStore.getAll();
 *       return {
 *         clientShipments: shipments.filter(s => s.client.id === propsFromParent.clientId),
 *         client: ClientStore.get(propsFromParent.clientId)
 *       };
 *   }): React.ComponentType<Props> => React.ComponentType<PropsFromParent);
 *
 *   const ConnectedViewComponent = connector(ViewComponent);
 *
 *   export default ConnectedViewComponent;
 *   ```
 *
 * =============================================================================
 * Motivation
 * =============================================================================
 *
 *   connectToStores solves the following issues:
 *
 *   - External dependencies in render:
 *     Having external data dependencies in render prevents you from making
 *     your component a pure component because if the store data changes, you
 *     want the component to re-render even if props and state haven't changed.
 *     connectToStores allows you to pull your data dependencies out to props.
 *     This also results in components that are easier to test.
 *
 *   - Data staleness:
 *     Prior to connectToStores, it was recommended to put data into your
 *     component state (instead of in render). Your component then had to make
 *     sure it listened to the correct CHANGED events from the stores to
 *     refetch the data. connectToStores does that for you automatically.
 *
 *   - Object copying:
 *     Many components perform map/filter/etc on data from the stores in render
 *     which create new object instances. This is inefficient and defeats any
 *     pure component optimizations in your child components. connectToStores
 *     only recomputes your data when data in the stores CHANGED instead of on
 *     every render and allows you to cache your results.
 */

import * as React from "react";
import {EventTypes} from "../constants/_MutationConstants";

// =============================================================================
// Initialize the Stores
// =============================================================================

// Cannot type this properly because different Stores have diffrent methods.
type Store = any;

type Listener = () => void;

function isEventEmitter(obj: Store): boolean {
  return (
    typeof obj.on === "function" && typeof obj.removeListener === "function"
  );
}

export function _subscribeToStores(stores: Array<Store>, listener: Listener) {
  stores.forEach(store => {
    if (isEventEmitter(store)) {
      store.on(EventTypes.CHANGED, listener);
    }
  });
}

export function _unsubscribeFromStores(
  stores: Array<Store>,
  listener: Listener
) {
  stores.forEach(store => {
    if (isEventEmitter(store)) {
      store.removeListener(EventTypes.CHANGED, listener);
    }
  });
}

// The state must be wrapped to avoid setState's merging api
type WrappedState<T> = {
  inner: T,
};

// =============================================================================
// connectToStores
// =============================================================================
function connectToStores<
  ChildProps: {},
  ChildComponent: React.ComponentType<ChildProps>,
  ParentProps: {},
  MappedProps: React.ElementConfig<ChildComponent>
>(
  stores: Array<Store>,
  mapStoresToProps: ParentProps => MappedProps
): ChildComponent => React.ComponentType<ParentProps> {
  // eslint-disable-next-line func-names
  return function(ChildComponent: ChildComponent) {
    const name =
      ChildComponent.displayName || ChildComponent.name || "Component";

    class Connect extends React.Component<
      ParentProps,
      WrappedState<MappedProps>
    > {
      static displayName = `connectToStores(${name})`;

      state = Connect.getDerivedStateFromProps(this.props);
      mounted = false;

      static getDerivedStateFromProps(nextProps: ParentProps) {
        const newState = mapStoresToProps(nextProps);
        return {inner: newState};
      }

      componentDidMount() {
        this.mounted = true;
        _subscribeToStores(stores, this._handleChange);
      }

      componentWillUnmount() {
        this.mounted = false;
        _unsubscribeFromStores(stores, this._handleChange);
      }

      _handleChange = () => {
        // You might be wondering why we need to track mounted state ourselves
        // when we subscribe/unsubscribe to stores above.  You can get into a
        // case were an event (say the CHANGED event on the ShipmentStore)
        // triggers a large number of handlers.  This way this works is the
        // store grabs all handlers first, then fires the first one.  That
        // event can result in later handlers unsubscribing because they were
        // unmounted.  But because the array of handlers was grabbed first,
        // once that handler is done resolving, it continues down the list and
        // eventually fires the handler that was removed, but not in the copy
        // of the array.  So to handle this case, we track mounted / unmounted
        // state in this component, and only fire the setState if we are still
        // mounted. - benbernard 2018-10-04
        if (!this.mounted) return;
        this.setState(Connect.getDerivedStateFromProps(this.props));
      };

      render() {
        return <ChildComponent {...this.state.inner} />;
      }
    }

    return Connect;
  };
}

export default connectToStores;
