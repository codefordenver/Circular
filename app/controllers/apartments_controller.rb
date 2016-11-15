class ApartmentsController < ApplicationController

  def show
    @apartment = Apartment.find(params[:id])
  end

  def create
    @petition = Petition.new
    @petition.save
    @apartment = Apartment.create(apartment_params)
    if @apartment.save
      @apartment.update_attributes(petition_id: @petition.id)
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
