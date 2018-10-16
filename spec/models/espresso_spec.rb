require 'rails_helper'

RSpec.describe Espresso, type: :model do
  before :each do 
    @coffee_shop = CoffeeShop.create.tap do |cs|
      cs.name = "New Cafe"
      cs.address = "111 Cafe Ave"
      cs.email = "new_cafe@email.com"
      cs.password = "P@ssw0rd"
    end
    @origin = @coffee_shop.origins.build(:name => "Guatemala")
    @coffee_shop.save
  end

  it "can be created with valid info and a valid origin" do
    @espresso = @origin.espressos.build.tap do |e|
      e.dose = 18
      e.yield = 32
      e.time = 28
      e.days_off_roast = 4
    end
    @origin.save
    expect(@espresso).to be_valid
  end

  it "cannot be created without a valid origin" do
    @espresso = Espresso.new.tap do |e|
      e.dose = 18
      e.yield = 32
      e.time = 28
      e.days_off_roast = 4
    end
    expect(@espresso).not_to be_valid
  end

  it "can be created with an optional notes field" do 
    @espresso = @origin.espressos.build.tap do |e|
      e.dose = 18
      e.yield = 32
      e.time = 28
      e.days_off_roast = 4
      e.notes = "Very tasty!"
    end
    @origin.save
    expect(@espresso.notes).to eq("Very tasty!")
  end

  it "only saves whole numbers for numeric inputs" do
    @espresso = @origin.espressos.build.tap do |e|
      e.dose = 18.4
      e.yield = 32.52
      e.time = 25.6
      e.days_off_roast = 4
      e.notes = "Very tasty!"
    end
    @origin.save
    expect(@espresso.dose).to eq(18)
    expect(@espresso.yield).to eq(32)
    expect(@espresso.time).to eq(25)
  end
end
