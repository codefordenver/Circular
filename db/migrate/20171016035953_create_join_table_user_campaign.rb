class CreateJoinTableUserCampaign < ActiveRecord::Migration[5.0]
  def change
    create_join_table :users, :campaigns do |t|
      t.index [:user_id, :campaign_id]
      t.index [:campaign_id, :user_id]
    end
  end
end
