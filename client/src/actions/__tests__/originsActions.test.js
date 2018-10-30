import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  createOrigin,
  addOrigin
} from '../originsActions';

global.fetch = require('jest-fetch-mock');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const defaultState = {posting: false, origins: []};

describe("addOrigin", () => {
  const origin = { id: 1, name: 'Guatemala' }
  it("returns an action of type 'ADD_ORIGIN'", () => {
    expect(addOrigin(origin)).toMatchObject({
      type: "ADD_ORIGIN"
    });
  });

  it("returns an action with the passed in origin object", () => {
    expect(addOrigin(origin)).toMatchObject({
      origin
    });
  });
});

describe("createOrigin", () => {
  const data = {
    origin: {
      id: 1,
      name: 'Guatemala'
    },
    coffeeShopId: 1
  };

  const returnData = {
    origin: {
      id: 1,
      name: 'Guatemala'
    }
  };

  it("dispatches an action of 'POSTING_ORIGIN'", () => {
    const expectedActions = {type: "POSTING_ORIGIN"};
    const store = mockStore(defaultState);
    fetch.mockResponseOnce(JSON.stringify(returnData));
    return (
      store.dispatch(createOrigin(data))
        .then(() => {
          expect(store.getActions()).toContainEqual(expectedActions);
        })
    );
  });

  it("dispatches an action of 'ADD_ORIGIN' with return data", () => {
    const expectedActions = {type: "ADD_ORIGIN", origin: returnData.origin};
    const store = mockStore(defaultState);
    fetch.mockResponseOnce(JSON.stringify(returnData));
    return (
      store.dispatch(createOrigin(data))
        .then(() => {
          expect(store.getActions()).toContainEqual(expectedActions);
        })
    );
  });
});
