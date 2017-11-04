class RenameCampaignsUsersTable < ActiveRecord::Migration[5.0]
  def change
    rename_table :campaigns_users, :signatures
  end
end
