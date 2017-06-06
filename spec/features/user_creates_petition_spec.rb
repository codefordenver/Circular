require 'rails_helper'

RSpec.feature "User creates a petition", js: true do
  scenario "User enters address for apartment that has no campaign" do

    visit '/'
    fill_in "apartment", with: "1000 Broadway"
    click_on "Submit"
    expect(current_path).to eq root_path 
    expect(page).to have_selector('#modal', visible: true)
  end

  scenario "User enters addresss for apartment that has a campaign" do

    apt = Apartment.create(street_address: "1000 Broadway")
    Petition.create(apartment: apt)
    expect(Apartment.count).to eq(1)
    expect(Petition.count).to eq(1)

    visit '/'
    fill_in "apartment", with: "1000 Broadway"
    click_on "Submit"
    expect(current_path).to eq apartment_path(Apartment.last)
    expect(Apartment.count).to eq(1)
    expect(Petition.count).to eq(1)

  end

  scenario "User enters empty addresss for apartment and receives an error" do

    visit '/'
    fill_in "apartment", with: ""
    click_on "Submit"
    expect(current_path).to eq root_path
    expect(page).to have_content("Street address can't be blank")
    expect(Apartment.count).to eq(0)
    expect(Petition.count).to eq(0)

  end

end
