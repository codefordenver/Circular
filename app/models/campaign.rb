class Campaign < ApplicationRecord
  has_many :signatures
  has_many :users, through: :signatures
  validates :street_address, presence: true, uniqueness: true
  validates :lat, presence: true
  validates :lng, presence: true

  acts_as_geolocated
end
