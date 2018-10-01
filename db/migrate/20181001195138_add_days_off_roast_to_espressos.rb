class AddDaysOffRoastToEspressos < ActiveRecord::Migration[5.2]
  def change
    add_column :espressos, :days_off_roast, :integer
  end
end
