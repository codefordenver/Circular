require 'rails_helper'

RSpec.feature "User creates a petition" do
  scenario "User enters addresss for apartment that has no campaign" do

    visit '/'
    fill_in "street_address", with: "1000 Broadway"
    click_on "Submit"
    expect(current_path).to eq apartment_path(Apartment.last)
    expect(page).to have_content("A campaign was created for 1000 Broadway")
    expect(Apartment.count).to eq(1)
    expect(Apartment.last.petition.apartment_id).to eq(Apartment.last.id)

  end

  scenario "User enters addresss for apartment that has a campaign" do

    apt = Apartment.create(street_address: "1000 Broadway")
    Petition.create(apartment: apt)
    expect(Apartment.count).to eq(1)
    expect(Petition.count).to eq(1)

    visit '/'
    fill_in "street_address", with: "1000 Broadway"
    click_on "Submit"
    expect(current_path).to eq apartment_path(Apartment.last)
    expect(page).to have_content("A campaign already exists for 1000 Broadway")
    expect(Apartment.count).to eq(1)
    expect(Petition.count).to eq(1)

  end

  scenario "User enters empty addresss for apartment and receives an error" do

    visit '/'
    fill_in "street_address", with: ""
    click_on "Submit"
    expect(current_path).to eq root_path
    expect(page).to have_content("Street address can't be blank")
    expect(Apartment.count).to eq(0)
    expect(Petition.count).to eq(0)

  end

end
