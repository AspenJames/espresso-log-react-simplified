export default function coffeeShopReducer(state = defaultState, action) {
  switch(action.type) {
    case "ADD_COFFEE_SHOP":
      return action.coffeeShop;
    
    case "@@RESET":
      return defaultState;

    default: 
      return state;
  }
}

const defaultState = {
  id: null,
  name: null,
  address: null
}
