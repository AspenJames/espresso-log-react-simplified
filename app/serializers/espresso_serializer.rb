class EspressoSerializer < ActiveModel::Serializer
  attributes :id, :dose, :yield, :time, :notes
end
