Rails.application.routes.draw do
  resources :levels, except: [:index, :edit, :new]
  resources :libraries
  root to: 'pages#home'
end
