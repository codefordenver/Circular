class Api::V1::ApartmentsController < Api::V1::BaseController

  def index
    respond_with Apartment.all
  end

  def create
    respond_with :api, :v1, Apartment.create(apartment_params)
  end

  def update
    apartment = Apartment.find(params['id'])
    apartment.update_attributes(apartment_params)
    respond_with apartment, json: apartment
  end

  private

  def apartment_params
    params.require(:apartment).permit(:id, :street_address)
  end
end