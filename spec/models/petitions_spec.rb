require 'rails_helper'

RSpec.describe Petition, type: :model do
  it { should belong_to(:apartment) }

  it "should not create a petition if one already exists for apartment" do
    apt = Apartment.create(street_address: "test")
    Petition.create(apartment: apt)
    expect(Petition.count).to eq(1)
    expect { Petition.create(apartment: apt) }.to raise_error
    expect(Petition.count).to eq(1)
  end

end
