module Overrides
  class OmniauthCallbackController < DeviseTokenAuth::OmniauthCallbacksController
    def omniauth_success
      get_resource_from_auth_hash
      create_token_info
      set_token_on_resource
      create_auth_params

      if resource_class.devise_modules.include?(:confirmable)
        # don't send confirmation email!!!
        @resource.skip_confirmation!
      end

      begin
        sign_in(:user, @resource, store: false, bypass: false)
        @resource.save!

        yield @resource if block_given?

        render_data_or_redirect('deliverCredentials', @auth_params.as_json, @resource.as_json)
      rescue ActiveRecord::RecordNotUnique
        recordNotUniqueErrorMessage = "Your email address is already associated with an account!\nPlease choose a different method of signing in."
        
        raise Exception.new(recordNotUniqueErrorMessage)
      end
    end
  end
end