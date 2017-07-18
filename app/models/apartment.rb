class Apartment < ApplicationRecord
  has_one :petition
  validates :street_address, presence: true, uniqueness: true
  acts_as_geolocated
end
