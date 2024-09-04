class AddCategoryAndSalaryToJobs < ActiveRecord::Migration[7.2]
  def change
    add_column :jobs, :category, :string
    add_column :jobs, :salary, :integer
  end
end
