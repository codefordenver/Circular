class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  protect_from_forgery with: :null_session
  include Response
  include ExceptionHandler
  helper_method :current_user

 def current_user
   @current_user ||= User.find(session[:user_id]) if session[:user_id]
 end
end
