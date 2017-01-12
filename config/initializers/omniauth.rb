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
end