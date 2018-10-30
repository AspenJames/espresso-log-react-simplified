import { addCoffeeShop } from '../coffeeShopActions';

const coffeeShop = {
  id: 1,
  name: "Cafe",
  address: "111 Programmer Ave"
};

describe("addCoffeeShop", () => {
  it("creates an action of type 'ADD_COFFEE_SHOP", () => {
    expect(addCoffeeShop(coffeeShop)).toMatchObject({
      type: "ADD_COFFEE_SHOP"
    });
  });

  it("creates an action with the passed in coffee shop object", () => {
    expect(addCoffeeShop(coffeeShop)).toMatchObject({
      coffeeShop
    });
  });
});