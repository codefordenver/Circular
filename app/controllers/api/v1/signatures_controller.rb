class Api::V1::SignaturesController < Api::V1::BaseController

  def create
    @signature = Signature.create(signature_params)
    if @signature.save
      json_response(@signature, :created)
    else
      render json: { errors: @signature.errors.messages }, status: :unprocessable_entity
    end
  end
  
  private
  
  def signature_params
    params.permit(:user_id, :campaign_id)
  end
end