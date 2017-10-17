class Api::V1::SignaturesController < Api::V1::BaseController
  before_action :set_campaign, only: [:index]

  def create
    @signature = Signature.create(signature_params)
    if @signature.save
      json_response(@signature, :created)
    else
      render json: { errors: @signature.errors.messages }, status: :unprocessable_entity
    end
  end

  def index #list of signatures by campaign id
    json_response(@signatures)
  end
  
  private
  
  def signature_params
    params.permit(:user_id, :campaign_id)
  end

  def set_campaign
    @signatures = Signature.where(campaign_id: params['id'])
    @signatures = @signatures.map do |signature|
      User.find(signature.user_id).name
    end
    @signatures
  end
end