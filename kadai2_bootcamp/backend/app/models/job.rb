class Job < ApplicationRecord
  validates :unique_token, uniqueness: true
end