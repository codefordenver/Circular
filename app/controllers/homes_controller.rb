class HomesController < ApplicationController

  def index
    @apartment = Apartment.new
    @apartments = Apartment.all
  end


end
