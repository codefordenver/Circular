FactoryGirl.define do
  factory :apartment do
    street_address { Faker::Address.street_address }
  end
end
