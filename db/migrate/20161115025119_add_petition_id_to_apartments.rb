class AddPetitionIdToApartments < ActiveRecord::Migration[5.0]
  def change
    add_reference :apartments, :petition, index: true
  end
end
