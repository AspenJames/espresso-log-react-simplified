class CreateCoffeeShops < ActiveRecord::Migration[5.2]
  def change
    create_table :coffee_shops do |t|
      t.string :name
      t.string :address
      t.string :email
      t.string :password_digest

      t.timestamps
    end
  end
end
