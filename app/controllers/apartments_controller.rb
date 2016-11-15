class ApartmentsController < ApplicationController

  def show
    @apartment = Apartment.find(params[:id])
  end

  def create
    @apartment = Apartment.create(apartment_params)
    if @apartment.save
      @petition = Petition.new(apartment: @apartment)
      @petition.save
      flash[:success] = "Your petition was created. Thank you!"
      redirect_to apartment_path(@apartment)
    else
      flash[:warning] = "Something went wrong with your petition."
      redirect_to root_path
    end
  end

  private

  def apartment_params
    params.require(:apartment).permit(:street_address, :petition_id)
  end

end
