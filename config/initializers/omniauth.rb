OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, ENV['google_client_id'], ENV['google_client_secret'] #, {client_options: {ssl: {ca_file: Rails.root.join("cacert.pem").to_s}}}
  {
     :name => "google",
     :scope => "email, profile, plus.me, http://gdata.youtube.com",
     :prompt => "select_account",
     :image_aspect_ratio => "square",
     :image_size => 50
   }

   #Contact facebook, pull keys from 'congfig/secrets.yml', obtain user information.
   provider :facebook,
   Rails.application.secrets.facebook_app_id,
   Rails.application.secrets.facebook_app_secret,
   {
     :name => "facebook",
     :scope => "email, public_profile",
     :display => 'popup',
     :prompt => "select account",
     :image_aspect_ratio => "square",
     :image_size => 50
   }
end
