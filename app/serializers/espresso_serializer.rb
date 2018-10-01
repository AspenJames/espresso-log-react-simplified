class EspressoSerializer < ActiveModel::Serializer
  attributes :id, :dose, :yield, :time, :notes, :days_off_roast
end
