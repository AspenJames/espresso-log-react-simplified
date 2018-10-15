require 'rails_helper'

RSpec.describe CoffeeShop, type: :model do
  it "can be created with valid info" do
    @coffee_shop = CoffeeShop.new.tap do |cs|
      cs.name = "New Cafe"
      cs.address = "111 Cafe Ave"
      cs.email = "new_cafe@email.com"
      cs.password = "P@ssw0rd"
    end
    expect(@coffee_shop).to be_valid
  end

  it "does not allow creation without name" do
    @coffee_shop = CoffeeShop.new.tap do |cs|
      cs.address = "111 Cafe Ave"
      cs.email = "new_cafe@email.com"
      cs.password = "P@ssw0rd"
    end
    expect(@coffee_shop).not_to be_valid
  end

  it "does not allow creation without an address" do 
    @coffee_shop = CoffeeShop.new.tap do |cs|
      cs.name = "New Cafe"
      cs.email = "new_cafe@email.com"
      cs.password = "P@ssw0rd"
    end
    expect(@coffee_shop).not_to be_valid
  end

  it "does not allow creation without an email" do 
    @coffee_shop = CoffeeShop.new.tap do |cs|
      cs.name = "New Cafe"
      cs.address = "111 Cafe Ave"
      cs.password = "P@ssw0rd"
    end
    expect(@coffee_shop).not_to be_valid
  end

  it "does not allow creation withouot a password" do
    @coffee_shop = CoffeeShop.new.tap do |cs|
      cs.name = "New Cafe"
      cs.address = "111 Cafe Ave"
      cs.email = "new_cafe@email.com"
    end
    expect(@coffee_shop).not_to be_valid
  end

  it "enforces unique names" do
    @coffee_shop = CoffeeShop.new.tap do |cs|
      cs.name = "New Cafe"
      cs.address = "111 Cafe Ave"
      cs.email = "new_cafe@email.com"
      cs.password = "P@ssw0rd"
    end
    @coffee_shop.save
    expect(@coffee_shop).to be_valid

    @coffee_shop_two = CoffeeShop.new.tap do |cs|
      cs.name = "New Cafe"
      cs.address = "222 Cafe Ave"
      cs.email = "new_cafe_two@email.com"
      cs.password = "P@ssw0rd"
    end
    @coffee_shop_two.save
    expect(@coffee_shop_two).not_to be_valid
  end

  it "enforces unique emails" do 
    @coffee_shop = CoffeeShop.new.tap do |cs|
      cs.name = "New Cafe"
      cs.address = "111 Cafe Ave"
      cs.email = "new_cafe@email.com"
      cs.password = "P@ssw0rd"
    end
    @coffee_shop.save
    expect(@coffee_shop).to be_valid

    @coffee_shop_two = CoffeeShop.new.tap do |cs|
      cs.name = "New Cafe Two"
      cs.address = "222 Cafe Ave"
      cs.email = "new_cafe@email.com"
      cs.password = "P@ssw0rd"
    end
    @coffee_shop_two.save
    expect(@coffee_shop_two).not_to be_valid
  end

  it "enforces unique addresses" do
    @coffee_shop = CoffeeShop.new.tap do |cs|
      cs.name = "New Cafe"
      cs.address = "111 Cafe Ave"
      cs.email = "new_cafe@email.com"
      cs.password = "P@ssw0rd"
    end
    @coffee_shop.save
    expect(@coffee_shop).to be_valid

    @coffee_shop_two = CoffeeShop.new.tap do |cs|
      cs.name = "New Cafe Two"
      cs.address = "111 Cafe Ave"
      cs.email = "new_cafe_two@email.com"
      cs.password = "P@ssw0rd"
    end
    @coffee_shop_two.save
    expect(@coffee_shop_two).not_to be_valid
  end


  it "authenticates a user, returning the record with correct password" do
    @coffee_shop = CoffeeShop.new.tap do |cs|
      cs.name = "New Cafe"
      cs.address = "111 Cafe Ave"
      cs.email = "new_cafe@email.com"
      cs.password = "P@ssw0rd"
    end
    @coffee_shop.save
    expect(@coffee_shop.authenticate("P@ssw0rd")).to eq(@coffee_shop)
  end

  it "returns false with failed authentication" do 
    @coffee_shop = CoffeeShop.new.tap do |cs|
      cs.name = "New Cafe"
      cs.address = "111 Cafe Ave"
      cs.email = "new_cafe@email.com"
      cs.password = "P@ssw0rd"
    end
    @coffee_shop.save

    expect(@coffee_shop.authenticate("password")).to eq(false)
  end
end
