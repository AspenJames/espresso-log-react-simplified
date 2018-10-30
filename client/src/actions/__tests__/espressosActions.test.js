import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  fetchEspressos,
  addEspresso,
  postEspresso,
  updateEspresso,
  deleteEspresso
} from '../espressosActions';

global.fetch = require('jest-fetch-mock');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const defaultState = {
  loading: false,
  request_pending: false,
  error: '',
  espressos: []
};

describe("addEspresso", () => {
  const espresso = {
    id: 1,
    dose: 18,
    yield: 36,
    time: 27,
    days_off_roast: 4,
    notes: "Tasty"
  };

  it("returns an action of type 'ADD_ESPRESSO'", () =>  {
    expect(addEspresso(espresso)).toMatchObject({
      type: "ADD_ESPRESSO"
    });
  });

  it("returns an action with the passed in espresso object", () => {
    expect(addEspresso(espresso)).toMatchObject({
      espresso
    });
  });
});

describe("fetchEspressos", () => {
  const returnData = {
    espressos: [
      {
        id: 1,
        dose: 18,
        yield: 36,
        time: 25,
        days_off_roast: 4,
        notes: ''
      },
      {
        id: 2,
        dose: 18,
        yield: 34,
        days_off_roast: 5,
        notes: ''
      }
    ]
  };

  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponseOnce(JSON.stringify(returnData));
  })

  it("dispatches a type of 'LOADING_ESPRESSOS' before sending a fetch request", () => {
    const expectedActions = { type: "LOADING_ESPRESSOS" };
    const store = mockStore(defaultState);
    return (
      store.dispatch(fetchEspressos(1))
        .then(() => {
          expect(store.getActions()).toContainEqual(expectedActions);
        })
    );
  });

  it("dispatches an action of type 'FETCH_ESPRESSOS' with a payload matching returnData", () => {
    const expectedActions = { type: "FETCH_ESPRESSOS", espressos: returnData.espressos };
    const store = mockStore(defaultState);
    return (
      store.dispatch(fetchEspressos(1))
        .then(() => {
          expect(store.getActions()).toContainEqual(expectedActions);
        })
    );
  });
});

describe("postEspresso", () => {
  const data = {
    espresso: {
      id: 1,
      dose: 18,
      yield: 36,
      time: 28,
      days_off_roast: 6,
      notes: ''
    } 
  };

  const returnData = {
    espresso: {
      id: 1,
      dose: 18,
      yield: 36,
      time: 28,
      days_off_roast: 6,
      notes: ''
    }
  };

  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponseOnce(JSON.stringify(returnData));
  });

  it("dispatches an action of 'SENDING_REQUEST'", () => {
    const expectedActions = {type: 'SENDING_REQUEST'};
    const store = mockStore(defaultState);
    return (
      store.dispatch(postEspresso(1, data))
        .then(() => {
          expect(store.getActions()).toContainEqual(expectedActions);
        })
    );
  });

  it("dispatches an action of 'ADD_ESPRESSO' with payload of return data", () => {
    const expectedActions = {type: "ADD_ESPRESSO", espresso: returnData.espresso};
    const store = mockStore(defaultState);
    return (
      store.dispatch(postEspresso(1, data))
        .then(() => {
          expect(store.getActions()).toContainEqual(expectedActions);
        })
    );
  });
});

describe("updateEspresso", () => {
  const data = {
    coffeeShopId: 1,
    originId: 1,
    espresso: {
      id: 1,
      dose: 19,
      yield: 38,
      time: 27,
      days_off_roast: 4,
      notes: ''
    }
  };

  const returnData = {
    espresso: {
      id: 1,
      dose: 19,
      yield: 38,
      time: 27,
      days_off_roast: 4,
      notes: ''
    }
  };

  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponseOnce(JSON.stringify(returnData));
  });

  it("dispatches an action of 'SENDING_REQUEST' before the fetch", () => {
    const expectedActions = {type: 'SENDING_REQUEST'};
    const store = mockStore(defaultState);
    return (
      store.dispatch(updateEspresso(data))
        .then(() => {
          expect(store.getActions()).toContainEqual(expectedActions);
        })
    );
  });

  it("dispatches an action of 'UPDATE_ESPRESSO' with return data", () => {
    const expectedActions = {type: "UPDATE_ESPRESSO", espresso: returnData.espresso};
    const store = mockStore(defaultState);
    return (
      store.dispatch(updateEspresso(data))
        .then(() => {
          expect(store.getActions()).toContainEqual(expectedActions);
        })
    );
  });
});

describe("deleteEspresso", () => {
  const returnData = {
    espresso: {
      id: 1,
      dose: 18,
      yield: 36,
      time: 27,
      days_off_roast: 4,
      notes: ''
    }
  };

  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponseOnce(JSON.stringify(returnData));
  });

  it("dispatches an action of 'SENDING_REQUEST' before the fetch", () => {
    const expectedActions = {type: "SENDING_REQUEST"};
    const store = mockStore(defaultState);
    return (
      store.dispatch(deleteEspresso(1, 1))
        .then(() => {
          expect(store.getActions()).toContainEqual(expectedActions);
        })
    );
  });

  it("dispatches an action of 'DELETE_ESPRESSO' with the id of the return data", () => {
    const expectedActions = {type: "DELETE_ESPRESSO", espressoID: returnData.espresso.id};
    const store = mockStore(defaultState);
    return (
      store.dispatch(deleteEspresso(1, 1))
        .then(() => {
          expect(store.getActions()).toContainEqual(expectedActions);
        })
    );
  });
});