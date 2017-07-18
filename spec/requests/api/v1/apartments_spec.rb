require 'rails_helper'

RSpec.describe 'Apartments API', type: :request do
  let!(:apartments) { create_list(:apartment, 10) }
  let!(:apartment_id) { apartments.first.id }

  describe 'GET /api/v1/apartments' do
    before { get '/api/v1/apartments' }

    it 'returns apartments' do
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
      expect(response).to have_http_status(200)
    end
  end


  describe 'GET /api/v1/apartments/:id' do
    before { get "/api/v1/apartments/#{apartment_id}" }

    it 'returns the apartment' do
      expect(json).not_to be_empty
      expect(json['id']).to eq(apartment_id)
      expect(response).to have_http_status(200)
    end

    context 'when the record does not exist' do
      let(:apartment_id) { 100 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Apartment/)
      end
    end
  end

  describe 'POST /apartments' do
    let(:valid_attributes) { { street_address: '950 N Clarkson St, Denver CO 80218' }}

    context 'when the request is valid' do
      before { post '/api/v1/apartments', params: valid_attributes }

      it 'creates an apartment' do
        expect(json['street_address']).to eq('950 N Clarkson St, Denver CO 80218')
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before { post '/api/v1/apartments', params: { street_address: '' } }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body).to match(/Validation failed: Street address can't be blank/)
      end
    end
  end

  describe 'PUT /api/v1/apartments/:id' do
    let(:valid_attributes) { { street_address: '950 N Clarkson St, Denver CO 80218' }}
    before { put "/api/v1/apartments/#{apartment_id}", params: valid_attributes }

    it 'updates the record' do
      expect(response.body).to be_empty
      expect(response).to have_http_status(204)
    end
  end

  describe 'DELETE /api/v1/apartments/:id' do
    before { delete "/api/v1/apartments/#{apartment_id}" }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end

  describe "GET #find" do
    it "returns http success if an apartment exists" do
      get "/api/v1/apartments/find",  params: { lat: apartments.first.lat, lng: apartments.first.lng }

      expect(response).to be_success
    end
    it "returns http failure if there are no apartments" do
      get "/api/v1/apartments/find",  params: { lat: 0, lng: 0 }

      expect(response).to have_http_status(:no_content)
    end

    it "returns apartments within 250 meters of search location" do
      apartment1 = create(:apartment, lat: 50.000000, lng: 50.000000)
      apartment2 = create(:apartment, lat: 50.0018, lng: 50.0019)
      # apt 2 is 242 m away from apt 1 according to http://andrew.hedges.name/experiments/haversine/
      apartment3 = create(:apartment, lat: 50.0019, lng: 50.0019)
      # apt 3 is 251 m away from apt 1 according to http://andrew.hedges.name/experiments/haversine/

      get "/api/v1/apartments/find",  params: { lat: apartment1.lat, lng: apartment1.lng }

      expect(json.pluck("id")).to include(apartment1.id)
      expect(json.pluck("id")).to include(apartment2.id)
      expect(json.pluck("id")).to_not include(apartment3.id)
    end
  end
end
