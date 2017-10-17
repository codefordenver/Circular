Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    omniauth_callbacks: 'overrides/omniauth_callback'
  }

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
      get 'campaigns/find', to: 'campaigns#find'
      resources :campaigns
      post 'signatures', to: 'signatures#create'
      get 'signatures/:id', to: 'signatures#index'
    end
  end	
end
