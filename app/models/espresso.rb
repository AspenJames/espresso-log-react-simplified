class Espresso < ApplicationRecord
  belongs_to :origin
  has_one :coffee_shop, :through => :origin
end
