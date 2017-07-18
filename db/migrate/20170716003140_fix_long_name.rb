class FixLongName < ActiveRecord::Migration[5.0]
  def change
    rename_column :apartments, :long, :lng
  end
end
