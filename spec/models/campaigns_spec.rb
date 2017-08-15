require 'rails_helper'

RSpec.describe Campaign, type: :model do
  it { should validate_uniqueness_of(:street_address) }
  it { should validate_presence_of(:street_address) }
end
