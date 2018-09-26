class CreateOrigins < ActiveRecord::Migration[5.2]
  def change
    create_table :origins do |t|
      t.string :name
      t.integer :coffee_shop_id

      t.timestamps
    end
  end
end
