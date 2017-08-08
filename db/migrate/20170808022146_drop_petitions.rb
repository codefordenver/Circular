class DropPetitions < ActiveRecord::Migration[5.0]
  def change
    drop_table :petitions
  end
end
