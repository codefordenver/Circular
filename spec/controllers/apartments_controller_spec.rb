require 'rails_helper'

RSpec.describe ApartmentsController, type: :controller do

  describe "GET #find" do
    it "returns http success if the apartment exists" do
      apartment = create(:apartment)
      get :find, :street_address => apartment.street_address

      expect(response).to be_success
    end
  end
end
