# Rails.application.routes.draw do
Rails.application.routes.draw do
  get 'auth/:provider/callback', to: 'sessions#create'
  get 'auth/failure', to: redirect('/')
  get 'signout', to: 'sessions#destroy', as: 'signout'

  resources :sessions, only: [:create, :destroy]
  resource :home, only: [:show, :index]

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: "homes#index"
  
  get 'apartments/find', to: 'apartments#find'
  resources :apartments
end
