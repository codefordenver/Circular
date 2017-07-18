class AddNameToApartments < ActiveRecord::Migration[5.0]
  def change
    add_column :apartments, :name, :string
  end
end
