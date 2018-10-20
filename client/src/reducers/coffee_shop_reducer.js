export default function coffeeShopReducer(state = defaultState, action) {
  switch(action.type) {
    case "SENDING_LOGIN":
      return {...state, requestPending: true}

    case "ADD_COFFEE_SHOP":
      return {...state, ...action.coffeeShop, requestPending: false, errors: null}

    case "ADD_COFFEE_SHOP_ERRORS":
      return {...state, errors: action.errors}

    case "RESET_STATE":
      return {...state, ...action.payload.coffeeShop};
    
    case "@@RESET":
      return defaultState;

    default: 
      return state;
  }
}

const defaultState = {
  id: null,
  name: null,
  address: null,
  errors: null,
  requestPending: false
}
