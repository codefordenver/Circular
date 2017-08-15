class DropApartments < ActiveRecord::Migration[5.0]
  def change
    drop_table :apartments
  end
end
