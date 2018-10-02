class Espresso < ApplicationRecord
  belongs_to :origin
  has_one :coffee_shop, :through => :origin

  validates :dose, :yield, :time, :days_off_roast, :presence => true, :numericality => {:greater_than => 0}
  # validates :dose, :yield, :time, :days_off_roast, :presence => true, :inclusion => { :in => (0..60).to_a, :message => "%{value} must be a positive, whole number"}
end
