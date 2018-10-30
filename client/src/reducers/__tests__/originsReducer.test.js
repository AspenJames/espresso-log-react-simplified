import originsReducer from '../originsReducer';

const defaultState = {
  posting: false,
  origins: []
};

const populatedState = {
  posting: false,
  origins: [
    {id: 1, name: "Guatemala"},
    {id: 2, name: "Ethiopia"}
  ]
};

describe("originsReducer", () => {
  it("POSTING_ORIGIN sets posting to true", () => {
    expect(originsReducer(undefined, {
      type: "POSTING_ORIGIN"
    })).toEqual({
      posting: true,
      origins: []
    });
  });

  it("ADD_ORIGIN adds to the origins array", () => {
    expect(originsReducer(undefined, {
      type: "ADD_ORIGIN",
      origin: {
        id: 3,
        name: "Kenya"
      }
    })).toEqual({
      posting: false,
      origins: [
        {id: 3, name: "Kenya"}
      ]
    });
  });

  it("RESET_STATE returns the origins object", () => {
    // This is called with a payload of entire state object 
    // from browser localStorage - see /src/middleware/*
    expect(originsReducer(undefined, {
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
    })).toEqual(populatedState);
  });

  it("@@RESET returns default state regardless of current/passed in state", () => {
    expect(originsReducer(populatedState, {
      type: "@@RESET"
    })).toEqual(defaultState);
  });

  it("defaults to returning the current/passed in state", () => {
    expect(originsReducer(populatedState, {
      type: "GARBAGE_TYPE"
    })).toEqual(populatedState);
  });
});