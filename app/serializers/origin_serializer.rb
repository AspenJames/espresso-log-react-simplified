class OriginSerializer < ActiveModel::Serializer
  attributes :id, :name
  belongs_to :coffee_shop
  has_many :espressos
end
