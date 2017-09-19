class Campaign < ApplicationRecord
  validates :street_address, presence: true, uniqueness: true
  validates :lat, presence: true
  validates :lng, presence: true

  acts_as_geolocated
end
