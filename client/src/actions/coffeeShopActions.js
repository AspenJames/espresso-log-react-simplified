import { addOrigin } from "./originsActions";

export const addCoffeeShop = coffeeShop => ({
  type: "ADD_COFFEE_SHOP", coffeeShop: {
    id: coffeeShop.id,
    name: coffeeShop.name,
    address: coffeeShop.address
  }
});

export const signupCoffeeShop = data => {
  return dispatch => {
    dispatch({ type: "SENDING_COFFEE_SHOP_REQUEST" });
    return fetch(`/api/v1/coffee_shops`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(resp => resp.json())
      .then(json => {
        if (json.coffee_shop) {
          // Update redux store with return data
          dispatch(addCoffeeShop(json.coffee_shop));
        } else {
          dispatch({ type: "ADD_COFFEE_SHOP_ERRORS", errors: json.errors });
        }
      });
  }
}

export const loginCoffeeShop = data => {
  return dispatch => {
    dispatch({ type: 'SENDING_COFFEE_SHOP_REQUEST' });
    return fetch(`/api/v1/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(resp => resp.json())
      .then(json => {
        if (json.coffee_shop) {
          // Update redux store with return data
          dispatch(addCoffeeShop(json.coffee_shop));
          json.coffee_shop.origins.forEach(origin => dispatch(addOrigin(origin)));
        } else {
          dispatch({ type: "ADD_COFFEE_SHOP_ERRORS", errors: json.error });
        }
      });
  }
}