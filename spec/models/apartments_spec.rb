require 'rails_helper'

RSpec.describe Apartment, type: :model do
  it { should have_one(:petition) }
  it { should validate_uniqueness_of(:street_address) }
  it { should validate_presence_of(:street_address) }
end
