require 'rails_helper'

RSpec.describe 'Campaigns API', type: :request do
  let!(:campaigns) { create_list(:campaign, 10) }
  let!(:campaign_id) { campaigns.first.id }

  describe 'GET /api/v1/campaigns' do
    before { get '/api/v1/campaigns' }

    it 'returns campaigns' do
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
      expect(response).to have_http_status(200)
    end
  end

  describe 'GET /api/v1/campaigns/:id' do
    before { get "/api/v1/campaigns/#{campaign_id}" }

    it 'returns the campaign' do
      expect(json).not_to be_empty
      expect(json['id']).to eq(campaign_id)
      expect(response).to have_http_status(200)
    end

    context 'when the record does not exist' do
      let(:campaign_id) { 100 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Campaign/)
      end
    end
  end

  describe 'POST /campaigns' do
    let(:valid_attributes) { { street_address: '950 N Clarkson St, Denver CO 80218' }}

    context 'when the request is valid' do
      before { post '/api/v1/campaigns', params: valid_attributes }

      it 'creates an campaign' do
        expect(json['street_address']).to eq('950 N Clarkson St, Denver CO 80218')
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before { post '/api/v1/campaigns', params: { street_address: '' } }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body).to match(/Validation failed: Street address can't be blank/)
      end
    end
  end

  describe 'PUT /api/v1/campaigns/:id' do
    let(:valid_attributes) { { street_address: '950 N Clarkson St, Denver CO 80218' }}
    before { put "/api/v1/campaigns/#{campaign_id}", params: valid_attributes }

    it 'updates the record' do
      expect(response.body).to be_empty
      expect(response).to have_http_status(204)
    end
  end

  describe 'DELETE /api/v1/campaigns/:id' do
    before { delete "/api/v1/campaigns/#{campaign_id}" }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end

  describe "GET #find" do
    it "returns http success if an campaign exists" do
      get "/api/v1/campaigns/find",  params: { lat: campaigns.first.lat, lng: campaigns.first.lng }

      expect(response).to be_success
    end
    it "returns http failure if there are no campaigns" do
      get "/api/v1/campaigns/find",  params: { lat: 0, lng: 0 }

      expect(response).to be_success
      expect(json["results"]).to eql(nil)
    end

    it "returns campaigns within 250 meters of search location" do
      campaign1 = create(:campaign, lat: 50.000000, lng: 50.000000)
      campaign2 = create(:campaign, lat: 50.0018, lng: 50.0019)
      # apt 2 is 242 m away from apt 1 according to http://andrew.hedges.name/experiments/haversine/
      campaign3 = create(:campaign, lat: 50.0019, lng: 50.0019)
      # apt 3 is 251 m away from apt 1 according to http://andrew.hedges.name/experiments/haversine/

      get "/api/v1/campaigns/find",  params: { lat: campaign1.lat, lng: campaign1.lng }

      expect(json.pluck("id")).to include(campaign1.id)
      expect(json.pluck("id")).to include(campaign2.id)
      expect(json.pluck("id")).to_not include(campaign3.id)
    end
  end
end
