class EspressoSerializer < ActiveModel::Serializer
  attributes :id, :dose, :yield, :time, :notes
  belongs_to :origin
  has_one :coffee_shop, :through => :origin
end
