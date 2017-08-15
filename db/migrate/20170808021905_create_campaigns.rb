class CreateCampaigns < ActiveRecord::Migration[5.0]
  def change
    create_table :campaigns do |t|
      t.string :name
      t.string :street_address
      t.float :lat
      t.float :lng
      t.integer :vote_count, default: 1

      t.timestamps
    end
  end
end
