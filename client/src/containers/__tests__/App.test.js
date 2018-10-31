import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../../reducers';
import localStorageLoad from '../../middleware/localStorageLoad';
import localStorageDump from '../../middleware/localStorageDump';
import App from '../App';
import { addCoffeeShop } from '../../actions/coffeeShopActions';
import { addOrigin } from '../../actions/originsActions';
import NavBar from '../../components/NavBar';

describe("App.js", () => {
  let props;
  let mountedApp;
  // this function checks if our mountedApp
  // is defined. If yes, return it. If no, mount 
  // our component and return it.
  // Usage: coffees([array of actions])
  // => dispatches actions and mounts 
  const app = (actions = []) => {
    if (!mountedApp) {
      const store = createStore(rootReducer, applyMiddleware(localStorageLoad, thunk, localStorageDump));
      // dispatch any actions passed in
      actions.forEach(action => store.dispatch(action));
      mountedApp = mount(
        <Provider store={store}>
          <App {...props} />
        </Provider>
      );
    };
    return mountedApp;
  };

  beforeEach(() => {
    // This resets our component before each test
    // to ensure we have a clean testing environment
    props = {
      // no props for this component
    }
    mountedApp = undefined;
  });

  afterEach(() => {
    // completes our cleanup
    mountedApp.unmount();
  });

  it("renders without crashing", () => {
    let mountedApp = app();
    expect(mountedApp).toBeDefined()
  });
  
  it("renders a header", () => {
    let mountedApp = app();
    expect(mountedApp.find('header').length).toBe(1);
  });

  it("renders a <Router>", () => {
    let mountedApp = app();
    expect(mountedApp.find(Router).length).toBe(1);
  });

  it("renders a NavBar component", () => {
    let mountedApp = app();
    expect(mountedApp.find(NavBar).length).toBe(1);
  });
})