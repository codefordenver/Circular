class Api::V1::PetitionsController < Api::V1::BaseController
  before_action :set_petition, only: [:show, :update, :destroy]

  def index
    @petitions = Petition.all
    json_response(@petitions)
  end

  def create
    @petition = Petition.create!(petition_params)
    json_response(@petition, :created)
  end

  def show
    json_response(@petition)
  end

  def update
    @petition.update(petition_params)
    head :no_content
  end

  def destroy
    @petition.destroy
    head :no_content
  end

  private

  def petition_params
    params.permit(:vote_count, :apartment_id)
  end

  def set_petition
    @petition = Petition.find(params[:id])
  end
end
