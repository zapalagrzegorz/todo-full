Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :users, only: %i[new create]

    resource :session, only: %i[create destroy]

    resources :todos, only: %i[index create update destroy] do
      resources :steps, only: %i[index create]
    end

    resources :steps, only: %i[update destroy]
  end
  root to: 'static_pages#root'
  get '*path', to: 'static_pages#root'
end
