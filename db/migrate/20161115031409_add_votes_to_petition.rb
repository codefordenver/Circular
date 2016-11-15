class AddVotesToPetition < ActiveRecord::Migration[5.0]
  def change
    add_column :petitions, :vote_count, :integer, default: 1
  end
end
