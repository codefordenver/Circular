class Campaign < ApplicationRecord
  validates :street_address, presence: true, uniqueness: true
  acts_as_geolocated
end
