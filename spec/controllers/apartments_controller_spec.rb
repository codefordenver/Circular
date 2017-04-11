require 'rails_helper'

RSpec.describe ApartmentsController, type: :controller do

  describe "GET #find" do
    it "returns http success if the apartment exsists" do
      apartment = create(:apartment)
      get :find, :street_address => apartment.street_address 
      
      expect(response).to have_http_status(302)
    end
  end
end
