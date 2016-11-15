class AddReferenceToPetition < ActiveRecord::Migration[5.0]
  def change
    add_reference :petitions, :apartment, index: true
  end
end
