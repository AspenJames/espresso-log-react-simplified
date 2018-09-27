Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :coffee_shops, :only => [:create, :update, :destroy]
      resources :espressos,  :only => [:create, :update, :destroy]
      resources :origins,  :only => [:create, :update, :destroy]

      get '/:id' => 'coffee_shops#search'
      post '/login' => 'sessions#create'
      post '/logout' => 'sessions#destroy'
    end
  end
end
