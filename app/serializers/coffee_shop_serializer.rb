class CoffeeShopSerializer < ActiveModel::Serializer
  attributes :id, :name, :address
  has_many :origins
  has_many :espressos, :through => :origins
end
