class Petition < ApplicationRecord
  belongs_to :apartment
  validates :apartment_id, uniqueness: true


end
