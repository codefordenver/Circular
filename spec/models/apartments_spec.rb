require 'rails_helper'

RSpec.describe Apartment, type: :model do
  it { should have_one(:petition) }
end
