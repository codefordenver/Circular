FactoryGirl.define do
  factory :campaign do
    street_address { Faker::Address.street_address }
    lat { rand(-90.000000000...90.000000000) }
    lng { rand(-180.000000000...180.000000000) }
  end
end
