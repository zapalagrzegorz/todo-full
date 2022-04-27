Rails.application.routes.draw do
  root to: 'static_pages#root'
  resources :users, only: %i[new create]
  resource :session, only: %i[new create destroy]

  namespace :api, defaults: { format: :json } do
    resources :todos, only: %i[index show create update destroy] do
      resources :steps, only: %i[create]
    end

    resources :steps, only: %i[index update destroy]
  end
end
