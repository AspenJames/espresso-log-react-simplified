class CreateEspressos < ActiveRecord::Migration[5.2]
  def change
    create_table :espressos do |t|
      t.integer :dose
      t.integer :yield
      t.integer :time
      t.string :notes
      t.integer :origin_id

      t.timestamps
    end
  end
end
