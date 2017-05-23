require 'rails_helper'

RSpec.describe 'Apartments API', type: :request do
  let!(:apartments) { create_list(:apartment, 10) }
  let!(:apartment_id) { apartments.first.id }

  describe 'GET /apartments' do
    before { get '/apartments' }

    it 'returns apartments' do
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end
  end
end