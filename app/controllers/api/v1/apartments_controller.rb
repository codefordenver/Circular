class Api::V1::ApartmentsController < Api::V1::BaseController
  before_action :set_apartment, only: [:show, :update, :destroy]

  def index
    @apartments = Apartment.all
    json_response(@apartments)
  end

  def create
    @apartment = Apartment.create!(apartment_params)
    json_response(@apartment, :created)
  end

  def show
    json_response(@apartment)
  end

  def update
    @apartment.update(apartment_params)
    head :no_content
  end

  def destroy
    @apartment.destroy
    head :no_content
  end

  def find
    @apartments = Apartment.within_radius(250, params[:lat], params[:lng]).order_by_distance(params[:lat], params[:lng])
    if @apartments.empty?
      head :no_content
    else
      json_response(@apartments)
    end
  end

  private

  def apartment_params
    params.permit(:street_address, :lat, :lng)
  end

  def set_apartment
    @apartment = Apartment.find(params[:id])
  end
end
