export default function coffeeShopReducer(state = {
  id: null,
  name: null,
  address: null
}, action) {
  switch(action.type) {
    case "ADD_COFFEE_SHOP":
      return action.coffeeShop;

    default: 
      return state;
  }
}
