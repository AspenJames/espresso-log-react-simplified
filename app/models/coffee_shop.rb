class CoffeeShop < ApplicationRecord
  has_secure_password
  has_many :origins
  has_many :espressos, :through => :origins

  validates :name, :email, :address, :presence => true, :uniqueness => true
end
