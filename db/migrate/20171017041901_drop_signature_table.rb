class DropSignatureTable < ActiveRecord::Migration[5.0]
  def change
    drop_table :signatures
  end
end
