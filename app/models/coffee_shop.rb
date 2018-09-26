class CoffeeShop < ApplicationRecord
  has_secure_password
  has_many :origins
  has_many :espressos, :through => :origins
end
