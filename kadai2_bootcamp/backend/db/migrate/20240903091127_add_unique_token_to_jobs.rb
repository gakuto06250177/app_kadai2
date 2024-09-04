class AddUniqueTokenToJobs < ActiveRecord::Migration[7.2]
  def change
    add_column :jobs, :unique_token, :string
  end
end
