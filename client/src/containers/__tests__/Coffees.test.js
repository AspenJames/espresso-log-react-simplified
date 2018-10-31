import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../../reducers';
import localStorageLoad from '../../middleware/localStorageLoad';
import localStorageDump from '../../middleware/localStorageDump';
import Coffees from '../Coffees';
import { addCoffeeShop } from '../../actions/coffeeShopActions';
import { addOrigin } from '../../actions/originsActions';
import CoffeeForm from '../../components/CoffeeForm';
import CoffeesList from '../../components/CoffeesList';

describe("Coffees container", () => {
  let props;
  let mountedCoffees;
  // this function checks if our mountedCoffees
  // is defined. If yes, return it. If no, mount 
  // our component and return it.
  // Usage: coffees([array of actions])
  // => dispatches actions and mounts 
  const coffees = (actions = []) => {
    if(!mountedCoffees) {
      const store = createStore(rootReducer, applyMiddleware(localStorageLoad, thunk, localStorageDump));
      // dispatch any actions passed in
      actions.forEach(action => store.dispatch(action));
      mountedCoffees = mount(
        <Provider store={store}>
          <Coffees {...props} />
        </Provider>
      );
    }
    return mountedCoffees;
  };

  beforeEach(() => {
    // This resets our component before each test 
    // to ensure a clean testing environment
    props = {
      // No props for this component
      // adding `history` to prevent error on mount
      history: []
    };
    mountedCoffees = undefined;
  });

  it("renders with a logged in user", () => {
    expect(coffees([addCoffeeShop({ id: 1, name: "cafe", address: "111 Programmer Ave" })])).toBeDefined();
  });

  it("redirects withouot a logged in user", () => {
    let coffee = coffees().find(Coffees).first();
    // We redirect with `this.props.history.push()`
    // props.history is simulated here, so we're 
    // simply looking for the pushed item
    expect(coffee.props().history).toContain('/');
  });

  describe("When a user is logged in", () => {
    it("always renders a CoffeeForm", () => {
      let coffee = coffees(
        [addCoffeeShop({ id: 1, name: "cafe", address: "111 Programmer Ave" })]
        ).find(Coffees).first();
      expect(coffee.find(CoffeeForm).length).toBe(1);
    });

    it("does not render a CoffeesList when store.origins are empty", () => {
      let coffee = coffees(
        [addCoffeeShop({ id: 1, name: "cafe", address: "111 Programmer Ave" })]
        ).find(Coffees).first();
      expect(coffee.find(CoffeesList).length).toBe(0);
    });

    it("renders a message stating you have no coffees yet", () => {
      let p = coffees(
        [addCoffeeShop({ id: 1, name: "cafe", address: "111 Programmer Ave" })]
      ).find("p").first();
      expect(p.text()).toEqual("You don't have any coffees in our system yet!");
    })

    it("renders a CoffeesList when store.origins is populated", () => {
      let coffee = coffees(
        [
          addCoffeeShop({ id: 1, name: "cafe", address: "111 Programmer Ave" }),
          addOrigin({ id: 1, name: "Guatemala" })
        ]
      ).find(Coffees).first();
      expect(coffee.find(CoffeesList).length).toBe(1);
    });

    it("passes props.origins to CoffeesList when store.origins is populated", () => {
      let coffee = coffees(
        [
          addCoffeeShop({ id: 1, name: "cafe", address: "111 Programmer Ave" }),
          addOrigin({ id: 1, name: "Guatemala" })
        ]
      ).find(Coffees).first();
      let coffeesList = coffee.find(CoffeesList).first();
      expect(coffeesList.props().coffees).toContainEqual({ id: 1, name: "Guatemala" });
    });

  });

});
