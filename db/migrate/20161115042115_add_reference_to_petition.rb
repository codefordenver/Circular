class AddReferenceToPetition < ActiveRecord::Migration[5.0]
  def change
    add_reference :petitions, :apartment, index: false, foreign_key: true
    add_index :petitions, :apartment_id, unique: true

  end
end
