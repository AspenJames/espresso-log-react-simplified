require 'rails_helper'

RSpec.describe Origin, type: :model do
  before :each do 
    @coffee_shop = CoffeeShop.create.tap do |cs|
      cs.name = "New Cafe"
      cs.address = "111 Cafe Ave"
      cs.email = "new_cafe@email.com"
      cs.password = "P@ssw0rd"
    end
  end

  it "can be created with a name and a coffee shop" do
    @origin = @coffee_shop.origins.build(:name => "Guatemala")
    expect(@origin).to be_valid
  end

  it "is not valid without a coffee shop" do 
    @origin = Origin.create(:name => "Guatemala")
    expect(@origin).not_to be_valid
  end

  it "is not valid without a name" do
    @origin = Origin.create(:coffee_shop_id => 1)
    expect(@origin).not_to be_valid
  end
end
