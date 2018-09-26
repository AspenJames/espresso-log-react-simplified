class Origin < ApplicationRecord
  belongs_to :coffee_shop
  has_many :espressos
end
