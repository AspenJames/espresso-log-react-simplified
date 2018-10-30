import coffeeShopReducer from '../coffeeShopReducer';

const defaultState = {
  id: null,
  name: null,
  address: null,
  errors: [],
  requestPending: false
};

describe("coffeeShopReducer", () => {
  it("should respond to SENDING_COFFEE_SHOP_REQUEST", () => {
    expect(coffeeShopReducer(undefined, {type: "SENDING_COFFEE_SHOP_REQUEST"})).toEqual({
      id: null,
      name: null,
      address: null,
      errors: [],
      requestPending: true
    });
  });

  it("ADD_COFFEE_SHOP should return the passed in coffeeShop object", () => {
    expect(coffeeShopReducer(undefined, {
      type: "ADD_COFFEE_SHOP",
      coffeeShop: {
        id: 1,
        name: 'Cafe',
        address: '111 Programmer Ave'
      }
    })).toEqual({
      id: 1,
      name: 'Cafe',
      address: '111 Programmer Ave',
      errors: [],
      requestPending: false
    });
  });

  it("ADD_COFFEE_SHOP_ERRORS should populate errors array", () => {
    expect(coffeeShopReducer(undefined, {
      type: "ADD_COFFEE_SHOP_ERRORS",
      errors: ["Invalid address", "Name taken"]
    })).toEqual({
      id: null,
      name: null,
      address: null,
      errors: ["Invalid address", "Name taken"],
      requestPending: false
    });
  });

  it("RESET_STATE should return the coffeeShop object", () => {
    // This is called with a payload of entire state object 
    // from browser localStorage - see /src/middleware/*
    expect(coffeeShopReducer(undefined, {
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
            {id: 1, name: "Guatemala"},
            {id: 2, name: "Ethiopia"}
          ],
          posting: false
        },
        espressos: {
          espressos: [
            {id: 1, dose: 18, yield: 34, time: 26, days_off_roast: 8, notes: ''}
          ],
          loading: false,
          request_pending: false,
          error: ''
        }
      }
    })).toEqual({
      id: 1,
      name: "Cafe",
      address: "111 Programmer Ave",
      errors: [],
      requestPending: false
    });
  });

  it("RESET_ERRORS should clear the errors array", () => {
    expect(coffeeShopReducer({
      id: 1,
      name: "Cafe",
      address: "111 Programmer Ave",
      errors: ["invalid address"],
      requestPending: false
    }, {
      type: "RESET_ERRORS"
    })).toEqual({
      id: 1,
      name: "Cafe",
      address: "111 Programmer Ave",
      errors: [],
      requestPending: false
    });
  });

  it("@@RESET should return default state regardless of current state", () => {
    expect(coffeeShopReducer({
      id: 1,
      name: "Cafe",
      address: "111 Programmer Ave",
      errors: ["invalid address"],
      requestPending: false
    }, {
      type: "@@RESET"
    })).toEqual(defaultState);
  });

  it("defaults to returning current/passed in state", () => {
    expect(coffeeShopReducer({
      id: 1,
      name: "Cafe",
      address: "111 Programmer Ave",
      errors: ["invalid address"],
      requestPending: false
    }, {
      type: "GARBAGE_TYPE"
    })).toEqual({
      id: 1,
      name: "Cafe",
      address: "111 Programmer Ave",
      errors: ["invalid address"],
      requestPending: false
    });
  });
});