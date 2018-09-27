export default function coffeeShopReducer(state = {
  name: null,
  address: null,
  email: null
}, action) {
  switch(action.type) {
    case "ADD_COFFEE_SHOP":
      return state;

    default: 
      return state;
  }
}