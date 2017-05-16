class ApartmentsController < ApplicationController
  protect_from_forgery except: [:show, :find]

  def show
    @apartment = Apartment.find(params[:id])
  end

  def find
    @apartment = Apartment.find_by("street_address": apartment_params[:street_address])
    if @apartment
      render :js => "window.location = '#{apartment_path(@apartment.id)}'"
    else
      render status: 404
    end
  end

  def create
    @apartment = Apartment.find_or_create_by("street_address": apartment_params[:street_address])
      if @apartment
        render :js => "window.location = '#{apartment_path(@apartment.id)}'"
      else
        render status: 404
      end
  end

  private

  def apartment_params
    params.require(:apartment).permit(:street_address)
  end

end
