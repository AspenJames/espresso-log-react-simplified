export default function coffeeShopReducer(state = {
  id: null,
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