class ApartmentsController < ApplicationController
  protect_from_forgery except: [:show, :find]

  def show
    @apartment = Apartment.find(params[:id])
  end

  # def find
  #   @apartment = Apartment.find_by("street_address": apartment_params[:street_address])
  #   if @apartment
  #     render :js => "window.location = '#{apartment_path(@apartment.id)}'"
  #   else
  #     render status: 404
  #   end
  # end

  def create
    @apartment = Apartment.find_or_create_by("street_address": apartment_params[:street_address])
    # @apartment = Apartment.find_or_create_by("street_address": apartment_params[:street_address])
    binding.pry
      if @apartment
        render :js => "window.location = '#{apartment_path(@apartment.id)}'"
        # flash[:success] = "A campaign was created for #{@apartment.street_address}. Thank you!"
      # elsif @apartment
      #   flash[:success] = "A campaign already exists for #{@apartment.street_address}!"
      #     render :js => "window.location = '#{apartment_path(@apartment.id)}'"
      else
        # flash[:warning] = @apartment.errors.full_messages.join(", ")
        render status: 404
        # render :js => "window.location = '#{root_path}'"
      end
  end

  private

  def apartment_params
    params.require(:apartment).permit(:street_address)
  end

end
