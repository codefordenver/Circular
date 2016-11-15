class ApartmentsController < ApplicationController

  def show
    @apartment = Apartment.find(params[:id])
  end

  def create
    @apartment = Apartment.find_by(street_address: apartment_params[:street_address]);
    if !@apartment
      @apartment = Apartment.create(apartment_params)
      if @apartment.save
        @petition = Petition.new(apartment: @apartment)
        @petition.save
        flash[:success] = "Your petition was created. Thank you!"
        redirect_to apartment_path(@apartment)
      else
        flash[:warning] = @apartment.errors.full_messages.join(", ")
        redirect_to root_path
      end
    else
      flash[:success] = "A petition already exists!"
      redirect_to apartment_path(@apartment)
    end
  end

  private

  def apartment_params
    params.require(:apartment).permit(:street_address)
  end

end
