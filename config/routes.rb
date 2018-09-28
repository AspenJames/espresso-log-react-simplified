Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :coffee_shops, :only => [:show, :create, :update, :destroy]
      resources :origins,  :only => [:create, :update, :destroy] do
        resources :espressos,  :only => [:index, :create, :update, :destroy]
      end
      post '/login' => 'sessions#create'
      post '/logout' => 'sessions#destroy'
    end
  end
end
