FactoryGirl.define do
  factory :apartment do
    street_address { Faker::Address.street_address }
    lat { rand(-90.000000000...90.000000000) }
    long { rand(-180.000000000...180.000000000) }
  end
end
