class AddLongAndLatToApartments < ActiveRecord::Migration[5.0]
  def change
    add_column :apartments, :long, :real
    add_column :apartments, :lat, :real
  end
end
