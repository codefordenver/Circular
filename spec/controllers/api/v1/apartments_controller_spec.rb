require 'rails_helper'

RSpec.describe Api::V1::ApartmentsController, type: :controller do
  let!(:apartments) { create_list(:apartment, 10) }
  let!(:apartment_id) { apartments.first.id }

  describe 'GET /apartments' do
    before { get :index }

    it 'returns apartments' do
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
      expect(response).to be_success
    end
  end
end