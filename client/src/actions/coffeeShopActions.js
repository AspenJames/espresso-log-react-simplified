export const addCoffeeShop = coffeeShop => ({type: "ADD_COFFEE_SHOP", coffeeShop: {
  id: coffeeShop.id,
  name: coffeeShop.name,
  address: coffeeShop.address
}});
