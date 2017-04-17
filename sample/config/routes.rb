Rails.application.routes.draw do
  namespace :admin do
    resources :users
    resources :tweets
  end
end
