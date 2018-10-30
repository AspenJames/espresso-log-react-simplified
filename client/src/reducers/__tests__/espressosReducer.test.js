import espressosReducer from '../espressosReducer';

const defaultState = {
  loading: false,
  request_pending: false,
  error: '',
  espressos: []
};

const populatedState = {
  loading: false,
  request_pending: false,
  error: '',
  espressos: [
    { id: 1, dose: 18, yield: 36, time: 27, days_off_roast: 4, notes: '' },
    { id: 2, dose: 18, yield: 34, time: 29, days_off_roast: 5, notes: '' }
  ]
};

describe("espressosReducer", () => {
  it("LOADING_ESPRESSOS sets loading to true", () => {
    expect(espressosReducer(undefined, {
      type: "LOADING_ESPRESSOS"
    })).toEqual({
      loading: true,
      request_pending: false,
      error: '',
      espressos: []
    });
  });

  it("FETCH_ESPRESSOS sets loading to false, populates espressos array", () => {
    expect(espressosReducer({
      loading: true,
      request_pending: false,
      error: '',
      espressos: []
    }, {
      type: "FETCH_ESPRESSOS",
      espressos: [
        {id: 1, dose: 18, yield: 36, time: 27, days_off_roast: 4, notes: ''},
        {id: 2, dose: 18, yield: 34, time: 29, days_off_roast: 5, notes: ''}
      ]
    })).toEqual(populatedState);
  });

  it("ADD_ESPRESSO should add to the existing espressos array", () => {
    expect(espressosReducer(populatedState, {
      type: "ADD_ESPRESSO",
      espresso: {
        id: 3, dose: 19, yield: 35, time: 28, days_off_roast: 8, notes: ''
      }
    })).toEqual({
      loading: false,
      request_pending: false,
      error: '',
      espressos: [
        { id: 1, dose: 18, yield: 36, time: 27, days_off_roast: 4, notes: '' },
        { id: 2, dose: 18, yield: 34, time: 29, days_off_roast: 5, notes: '' },
        { id: 3, dose: 19, yield: 35, time: 28, days_off_roast: 8, notes: '' }
      ]
    });
  });

  it("ADD_ERROR sets the error property", () => {
    expect(espressosReducer(populatedState, {
      type: "ADD_ERROR",
      error: "Dose must be a number"
    })).toEqual(Object.assign({}, populatedState, {error: "Dose must be a number"}));
  });

  it("UPDATE_ESPRESSO updates an instance in the state", () => {
    expect(espressosReducer(populatedState, {
      type: "UPDATE_ESPRESSO",
      espresso: {
        id: 1, dose: 19, yield: 36, time: 27, days_off_roast: 6, notes: ''
      }
    })).toEqual({
      loading: false,
      request_pending: false,
      error: '',
      espressos: [
        { id: 1, dose: 19, yield: 36, time: 27, days_off_roast: 6, notes: '' },
        { id: 2, dose: 18, yield: 34, time: 29, days_off_roast: 5, notes: '' }
      ]
    });
  });

  it("SENDING_REQUEST sets request_pending to true and clears error", () => {
    expect(espressosReducer(Object.assign({}, populatedState, {error: "Error"}), {
      type: "SENDING_REQUEST"
    })).toEqual({
      loading: false,
      request_pending: true,
      error: '',
      espressos: [
        { id: 1, dose: 18, yield: 36, time: 27, days_off_roast: 4, notes: '' },
        { id: 2, dose: 18, yield: 34, time: 29, days_off_roast: 5, notes: '' }
      ]
    });
  });

  it("DELETE_ESPRESSO removes the espresso matching passed in id", () => {
    expect(espressosReducer(populatedState, {
      type: "DELETE_ESPRESSO",
      espressoId: 1
    })).toEqual({
      loading: false,
      request_pending: false,
      error: '',
      espressos: [
        { id: 2, dose: 18, yield: 34, time: 29, days_off_roast: 5, notes: '' }
      ]
    });
  });

  it("RESET_STATE should return the espresso objects", () => {
    // This is called with a payload of entire state object 
    // from browser localStorage - see /src/middleware/*
    expect(espressosReducer(undefined, {
      type: "RESET_STATE",
      payload: {
        coffeeShop: {
          id: 1,
          name: 'Cafe',
          address: '111 Programmer Ave',
          errors: [],
          requestPending: false
        },
        origins: {
          origins: [
            { id: 1, name: "Guatemala" },
            { id: 2, name: "Ethiopia" }
          ],
          posting: false
        },
        espressos: {
          espressos: [
            { id: 1, dose: 18, yield: 34, time: 26, days_off_roast: 8, notes: '' }
          ],
          loading: false,
          request_pending: false,
          error: ''
        }
      }
    })).toEqual({
      loading: false,
      request_pending: false,
      error: '',
      espressos: [
        { id: 1, dose: 18, yield: 34, time: 26, days_off_roast: 8, notes: '' }
      ]
    });
  });

  it("@@RESET sets default state regardless of input", () => {
    expect(espressosReducer(populatedState, {
      type: "@@RESET"
    })).toEqual(defaultState);
  });

  it("defaults to returning current/passed in state", () => {
    expect(espressosReducer(populatedState, {
      type: "GARBAGE_TYPE"
    })).toEqual(populatedState);
  });
});