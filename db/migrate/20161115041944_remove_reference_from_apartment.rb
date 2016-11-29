class RemoveReferenceFromApartment < ActiveRecord::Migration[5.0]
  def change
    remove_reference(:apartments, :petition, index: true)
  end
end
