class ApartmentsController < ApplicationController

  def create
    @apartment = Apartment.new(apartment_params)
    if @apartment.save
      redirect_to root_path
    else
      puts "error"
    end

  end



  private

  def apartment_params
    params.require(:apartment).permit(:street_address)
  end



end
