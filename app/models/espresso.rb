class Espresso < ApplicationRecord
  belongs_to :origin
  has_one :coffee_shop, :through => :origin

  validates :dose, :yield, :time, :days_off_roast, :numericality => {:greater_than => 0}
end
